import { Router } from "express";
import authRouter from "./auth";
import { auth } from "../middlewares/auth";

const router = Router();

router.use("/", authRouter);
// router.use("/employees", auth, employeeRouter);

export default router;
