import { Router } from "express";
import productRouter from "./product.router";
import authRouter from "./auth.router";

const router = Router();

router.use("/products", productRouter);
router.use('/auth', authRouter)
export default router;