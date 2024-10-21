import mongoose from "mongoose";
import configEnv from './config/configEnv.js';

mongoose.connect(configEnv.MongoUrl)
    .then(() => console.log("Conexión exitosa"))
    .catch(() => console.log("Vamos a morir, tenemos un error"))