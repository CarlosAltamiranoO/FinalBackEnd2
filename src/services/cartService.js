import cartRepository from "../repositories/cartRepository.js"

class CartService {
    async createCart() {
        return await cartRepository.createCart();
    }

    async getCartById(id) {
        return await cartRepository.getCartById(id);
    }

    async updateCart(id, cartData) {
        return await cartRepository.updateCart(id, cartData);
    }

    async emptyCart(id) {
        return await cartRepository.updateCart(id, { $set: { products: [] } });
    }
    async deleteProductCart(id, idProduct) {
        return await cartRepository.updateCart(id, { $pull: { products: { product: idProduct } } });

    }
    async ArrayProductsCart(id){
        const cart = await cartRepository.getCartById(id);
        if (!cart) return [];
        return cart.products;
    }
}

export default new CartService(); 