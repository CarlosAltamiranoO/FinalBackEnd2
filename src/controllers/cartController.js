import cartService from "../services/cartService.js";

class CartController {

    async create(req, res) {
        try {
            const newCart = await cartService.createCart(); 
            res.status(201).json(newCart); 
        } catch (error) {
            res.status(500).send("Error interno del servidor"); 
        }
    }

    async getCart(req, res) {
        const { cid } = req.params; 
        try {
            const cart = await cartService.getCartById(cid);
            if(!cart) return res.status(404).send("Carrito no encontrado"); 
            res.json(cart); 
        } catch (error) {
            res.status(500).send("Error interno del servidor"); 
        }
    }

    async addProductToCart(req, res) {
        const {cid, pid} = req.params;
        const {quantity = 1} = req.body; 
        try {
            const cart = await cartService.getCartById(cid);
            if(!cart) return res.status(404).send("Carrito no encontrado");

            const existingProduct = cart.products.find(item => item.product.id === pid); 
            if(existingProduct) {
                existingProduct.quantity += quantity; 
            } else {
                cart.products.push({product: pid, quantity }); 
            }
            await cartService.updateCart(cid, cart); 
            res.json(cart);
        } catch (error) {
            res.status(500).send("Error interno del servidor"); 
        }
    }
    async deleteProductCart (req, res){
        try {
            const cartId = req.params.cid
            const productId = req.params.pid
            let respuesta = await cartService.deleteProductCart(cartId, productId)
            res.json(JSON.stringify(respuesta))
        } catch (error) {
            res.json('Los datos ingresados son incorrectos')
        }
    }
    async emptyCart(req, res){
        try {
            const cartId = req.params.cid
            let respuesta = await cartService.emptyCart(cartId)
            res.json(JSON.stringify(respuesta))
        } catch (error) {
            res.json('Los datos ingresados son incorrectos')
        }
    }
    
}

export default CartController; 