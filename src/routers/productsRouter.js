import express from "express";
import ProductController from "../controllers/productController.js";

const productController = new ProductController();
const productRouter = express.Router();

productRouter.get("/", productController.getProducts); 
productRouter.get("/:id", productController.getProductById);
productRouter.get("/", productController.createProduct);
productRouter.put("/:id", productController.updateProduct); 
productRouter.delete("/:id", productController.deleteProduct); 

export default productRouter; 