import { Router } from "express";
import productControllers from "../controllers/productControllers.js";
import { checkAuth } from "../middleware/checkAuth.js";

const router = Router();

router.get("/filter", productControllers.getProductFilter);
router.get("/", productControllers.getProducts);
router.get("/:id", productControllers.getProduct);
router.post("/:id/review", checkAuth, productControllers.addComment);

router.post("/addproduct", productControllers.addProduct);
router.post("/search", productControllers.searchProduct);



export default router;
