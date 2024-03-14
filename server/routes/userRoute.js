import { Router } from "express";
import UserControllers from "../controllers/userControllers.js";

const router = Router();

router.get("/", UserControllers.getUser);

router.patch("/update", UserControllers.updateUser);

export default router;
