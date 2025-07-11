import { Router } from "express";
import prisma from "../lib/prismaClient";
import authMiddleware from "../middleware/authMiddleware";


const accountRouter = Router();

accountRouter.get("/balance", authMiddleware, async (req, res) => {
  const userId = req.userId;

  const userAccount = await prisma.account.findFirst({
    where: {
      userId: userId,
    },
  });

  res.status(200).json({
    balance: userAccount?.balance,
  });
});

accountRouter.post("/transfer", authMiddleware, async (req, res) => {
  const { amount, to } = req.body;
  const userId = req.userId;
  try {
    prisma.$transaction(async (tx) => {
      const senderAccount = await tx.account.findFirst({
        where: {
          userId: userId,
        },
      });

      if (!senderAccount || senderAccount.balance < amount) {
        throw new Error("Insufficient balance");
      }

      const recipientAccount = await tx.account.findFirst({
        where: {
          userId: to,
        },
      });

      if (!recipientAccount) {
        throw new Error("Invalid account");
      }

      await tx.account.update({
        where: {
          userId: userId,
        },
        data: {
          balance: { decrement: amount },
        },
      });

      await tx.account.update({
        where: {
          userId: to,
        },
        data: {
          balance: { increment: amount },
        },
      });

      return res.json({
        message: "Transfer successful",
      });
    });
  } catch (error) {
    const err = error as Error;
    console.error("Transaction failed:", error);
    res.status(400).json({
      message: err.message,
    });
  }
});

export default accountRouter;
