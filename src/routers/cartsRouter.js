import express from "express";
import CartController from "../controllers/cartController.js";
import passport from 'passport'; 

const cartRouter = express.Router();
const cartController = new CartController(); 

cartRouter.post("/", passport.authenticate('jwt', { session: false }), cartController.create); 
cartRouter.get("/:cid", passport.authenticate('jwt', { session: false }), cartController.getCart); 
cartRouter.post("/:cid/product/:pid", passport.authenticate('jwt', { session: false }), cartController.addProductToCart);
cartRouter.delete("/:cid/product/:pid", passport.authenticate('jwt', { session: false }), cartController.deleteProductCart)
cartRouter.delete("/:cid", passport.authenticate('jwt', { session: false }), cartController.emptyCart)


export default cartRouter;