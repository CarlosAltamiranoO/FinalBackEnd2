import express from "express";
import ProductController from "../controllers/productController.js";
import passport from 'passport'; 

const productController = new ProductController();
const productRouter = express.Router();

productRouter.get("/", passport.authenticate('jwt', { session: false }), productController.getProducts); 
productRouter.get("/:pid", passport.authenticate('jwt', { session: false }), productController.getProductById);
productRouter.post("/", passport.authenticate('jwt', { session: false }), productController.createProduct);
productRouter.put("/:pid", passport.authenticate('jwt', { session: false }), productController.updateProduct); 
productRouter.delete("/:pid", passport.authenticate('jwt', { session: false }), productController.deleteProduct); 

export default productRouter; 