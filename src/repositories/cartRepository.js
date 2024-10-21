import cartDao from "../dao/cartsDao.js";

class CartRepository {
    async createCart(){
        return await cartDao.save({products: []}); 
    }

    async getCartById(id){
        return await cartDao.findById(id);
    }

    async updateCart(id, cartData) {
        return await cartDao.update(id, cartData); 
    }

    async emptyCart(id) {
        return await cartDao.delete(id); 
    }
}

export default new CartRepository(); 