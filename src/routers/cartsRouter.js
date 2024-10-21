import express from "express";
import CartController from "../controllers/cartController.js";

const cartRouter = express.Router();
const cartController = new CartController(); 

cartRouter.post("/", cartController.create); 
cartRouter.get("/:cid", cartController.getCart); 
cartRouter.post("/:cid/product/:pid", cartController.addProductToCart);
cartRouter.delete("/:cid/product/:pid", cartController.deleteProductCart)
cartRouter.delete("/:cid", cartController.emptyCart)


export default cartRouter;