import express from "express";
import ProductManager from "../dao/db/product-manager-db.js";
import CartManager from "../dao/db/cart-manager-db.js";
import ViewController from "../controllers/viewController.js";
import { soloAdmin, soloUser } from "../middleware/auth.js";
import passport from "passport";

const router = express.Router();
const productManager = new ProductManager();
const cartManager = new CartManager();
const viewController = new ViewController();

router.get ("/products", passport.authenticate("jwt", {session: false}),  soloUser ,viewController.getProducts)
router.get ("/cart/:cid", passport.authenticate("jwt", {session: false}),  soloUser ,viewController.getCarritoById) //no se si es nesesario los midleware en esta ruta
router.get("/realtimeproducts",passport.authenticate("jwt", {session: false}) ,soloAdmin ,viewController.realtimeProducts)
router.get("/register", viewController.register) 
router.get("/login", viewController.login) 
router.get("/:cid/purchase", viewController.purchase)
export default router;