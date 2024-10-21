import mongoose from "mongoose";

mongoose.connect("mongodb+srv://carloscbautn:1234@cluster0.98dxrol.mongodb.net/e-comerce?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("Conexión exitosa"))
    .catch(() => console.log("Vamos a morir, tenemos un error"))