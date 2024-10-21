import express from "express";
import ViewController from "../controllers/viewController.js";
import { soloAdmin, soloUser } from "../middleware/auth.js";
import passport from "passport";

const viewRouter = express.Router();
const viewController = new ViewController();

viewRouter.get ("/products", passport.authenticate("jwt", {session: false}),  soloUser ,viewController.getProducts)
viewRouter.get ("/cart/:cid", passport.authenticate("jwt", {session: false}),  soloUser ,viewController.getCarritoById) //no se si es nesesario los midleware en esta ruta
viewRouter.get("/realtimeproducts",passport.authenticate("jwt", {session: false}) ,soloAdmin ,viewController.realtimeProducts)
viewRouter.get("/register", viewController.register) 
viewRouter.get("/login", viewController.login) 
viewRouter.get("/:cid/purchase", viewController.purchase)
export default viewRouter;