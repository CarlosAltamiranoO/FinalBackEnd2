import { createHash, isValidPassword } from "../utils/util.js";
import userRepository from "../repositories/userRepository.js";
import cartService from "./cartService.js";

class UserService {
    async registerUser(userData) {
        const existeUsuario = await userRepository.getUserByEmail(userData.email);
        if (existeUsuario) throw new Error("El usuario ya existe");

        userData.password = createHash(userData.password);

        const nuevoCarrito = await cartService.createCart();
        userData.cart = nuevoCarrito._id;

        return await userRepository.createUser(userData);
    }

    async loginUser(email, password) {
        const user = await userRepository.getUserByEmail(email);
        if (!user || !isValidPassword(password, user)) throw new Error("Credenciales incorrectas");
        return user;
    }
    async findOne(query){
        return await userRepository.findOne(query)
    }
}

export default new UserService(); 