import { Router } from "express";
import userRouter from "./userRouter";
import accountRouter from "./accountRouter";


const router = Router();

router.use("/user", userRouter);
router.use("/account", accountRouter);

export default router;