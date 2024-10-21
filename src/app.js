import express from 'express'
import handlebars from 'express-handlebars'
import cookieParser from "cookie-parser";
import sessionRouter from "./routers/sessionsRouter.js";
import productsRouter from "./routers/productsRouter.js"
import cartsRouter from "./routers/cartsRouter.js"
import viewsRouter from './routers/viewsRouter.js';
import passport from "passport";
import initializePassport from "./config/config.js";
import "./database.js";


const app = express();
const PUERTO = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("./src/public"));
app.use(cookieParser());
app.use(passport.initialize());
initializePassport();

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", `./src/views`);

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/sessions", sessionRouter);
app.use("/", viewsRouter);

app.listen(PUERTO, () => {
    console.log(`Servidor escuchando en el puerto ${PUERTO}`);
});