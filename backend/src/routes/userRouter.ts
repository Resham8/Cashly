import { Router } from "express";
import { z } from "zod";
import prisma from "../lib/prismaClient";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcryt from "bcrypt";
import authMiddleware from "../middleware/authMiddleware";
dotenv.config();

const userRouter = Router();

const signUpSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(3).max(8),
  firstName: z.string(),
  lastName: z.string(),
});

const loginSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(3).max(8),
});

const updateSchema = z.object({
  password: z.string().min(3).max(8),
  firstName: z.string(),
  lastName: z.string(),
});

userRouter.post("/signup", async (req, res) => {
  const { success, error } = signUpSchema.safeParse(req.body);

  const { username, password, firstName, lastName } = req.body;

  if (!success) {
    res.status(411).json({
      message: "Email already taken / Incorrect inputs",
      error,
    });
    return;
  }

  const existingUser = await prisma.user.findFirst({
    where: {
      username: username,
    },
  });

  if (existingUser) {
    res.status(411).json({
      message: "Email already taken / Incorrect inputs",
    });
    return;
  }

  const passwordHash = await bcryt.hash(password, 4);

  const newUser = await prisma.user.create({
    data: {
      username,
      password: passwordHash,
      firstName,
      lastName,
    },
  });

  const newAccount = await prisma.account.create({data:{
    userId: newUser.id,
    balance: 1 + Math.random() * 10000
  }})


  res.status(200).json({
    message: "User created successfully",  
  });
});

userRouter.post("/login", async (req, res) => {
  const { success, error } = loginSchema.safeParse(req.body);

  const { username, password } = req.body;

  if (!success) {
    res.status(411).json({
      message: "Error while logging in",
      error,
    });
    return;
  }

  const user = await prisma.user.findFirst({
    where: {
      username: username,
    },
  });

  const pwdCheck = await bcryt.compare(password, user?.password as string);

  if (!user && !pwdCheck) {
    res.status(411).json({
      message: "Error while logging in",
    });
    return;
  }

  const token = jwt.sign(
    { userId: user?.id },
    process.env.JWT_SECRET as string
  );

  res.status(200).json({
    message: "User created successfully",
    token: token,
  });
});

userRouter.put("/", authMiddleware, async (req, res) => {
  const { password, firstName, lastName } = req.body;
  const userId = req.userId;

  const { success } = updateSchema.safeParse(req.body);

  if (!success) {
    res.status(411).json({ message: "Error while updating information" });
    return;
  }

  const existingUser = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });

  if (!existingUser) {
    res.status(411).json({ message: "Error while updating information" });
    return;
  }

  const updateData = {
    ...(firstName && { firstName }),
    ...(lastName && { lastName }),
  };

  if (password) {
    const upHashPwd = await bcryt.hash(password, 4);
    updateData.password = upHashPwd;
  }

  const user = await prisma.user.update({
    where: {
      id: userId,
    },
    data: updateData,
  });

  res.status(200).json({
    message: "Updated successfully",
  });
});

userRouter.get("/bulk", async (req, res) => {
  const filter = req.query.filter as string || "";

  const filteredUser = await prisma.user.findMany({
    omit: {
      password: true,
    },
    where: {
      OR: [
        {
          firstName: {
            contains: filter,
            mode: "insensitive",
          },
        },
        {
          lastName: {
            contains: filter,
            mode: "insensitive",
          },
        },
      ],
    },
  });

  res.json({
    users: filteredUser,
  });
});

export default userRouter;
