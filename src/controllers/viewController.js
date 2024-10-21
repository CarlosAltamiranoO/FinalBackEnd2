import productService from "../services/productService.js";
import cartService from "../services/cartService.js";
import userService from "../services/userService.js";
import { generateUniqueTicketCode, calculateTotalPrice } from "../utils/ticketUtils.js";

class ViewController {
    async getProducts(req, res) {
        const { limit = 2, page = 1, sort = null, query = null } = req.query;
        try {
            const products = await productService.getProducts({ limit, page, sort, query });
            const nuevoArray = products.docs.map(producto => {
                //const { _id, ...rest } = producto.toObject(); //nesesito el _id para pasar el flecht ver como0 hacerlo sin tener que mandar ese dato
                const rest = producto.toObject();
                return rest;
            });
            res.render("products", {
                productos: nuevoArray,
                hasPrevPage: products.hasPrevPage,
                hasNextPage: products.hasNextPage,
                prevPage: products.prevPage,
                nextPage: products.nextPage,
                currentPage: products.page,
                totalPages: products.totalPages,
                carrito: req.user.cart
            });
        } catch (error) {
            res.status(500).send("Error interno del servidor")
            console.error(error)
        }
    }
    async getCarritoById(req, res) {
         const cartId = req.params.cid;
 
         try {
             const carrito = await cartService.getCartById(cartId);
 
             if (!carrito) {
                 console.log("No existe ese carrito con el id");
                 return res.status(404).json({ error: "Carrito no encontrado" });
             }
 
             const productosEnCarrito = carrito.products.map(item => ({
                 product: item.product.toObject(),
                 quantity: item.quantity
             }))
 
             res.render("carrito", { productos: productosEnCarrito, cartId: cartId });
         } catch (error) {
             console.error("Error al obtener el carrito", error);
             res.status(500).json({ error: "Error interno del servidor" });
         }
 
     }
     async register(req, res) {
         res.render("register");
     }
     async login(req, res) {
         res.render("login");
     }
     async realtimeProducts(req, res) {
         res.render("realtimeproducts")
     }
     
    async purchase(req, res) {
        const cartId = req.params.cid
        const productsFail = []
        const productsWin = []
        const products = await cartService.ArrayProductsCart(cartId)

        if(!products) console.log("problema")

        for (const item of products) {
            const product = await productService.getProductById(item.product._id) // obtiene producto para modificar porteriomente
            if (product.stock >= item.quantity) {
                product.stock -= item.quantity //descontamos al producto los que se despachan
                await productService.updateProduct(product._id, product) // actualizamos el producto de la BS con los nuevos stock
                productsWin.push({quantity: item.quantity, title: product.title, price: product.price })  // se agrega al array el item de producto del carrito ya para despache
            }
            else  productsFail.push(item.product._id) // se guarda en array de descarte
        }
        const userTicket= await userService.findOne({cart: cartId});
        const ticket = {
            fecha: new Date(),
            codigo: generateUniqueTicketCode(),
            email: userTicket.email,
            productos: productsWin,
            total: calculateTotalPrice(productsWin),
            productosrechasados: productsFail
        };
        res.json(ticket)
    }
}
export default ViewController