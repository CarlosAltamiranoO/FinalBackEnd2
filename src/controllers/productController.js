import productService from "../services/productService.js";

class ProductController {
    async getProducts(req, res) {
        const {limit = 10, page = 1, sort, query} = req.query; 
        try {
            const products = await productService.getProducts({limit, page, sort, query});
            console.log("Productos:", limit) 
            res.json(products); 
        } catch (error) {
            res.status(500).send("Error interno del servidor")
            console.error(error) 
        }
    }

    async getProductById(req, res) {
        const { id } = req.params; 
        try {
            const product = await productService.getProductById(id); 
            if(!product) return res.status(404).send("Producto no encontrado"); 
            res.json(product); 
        } catch (error) {
            res.status(500).send("Error interno del servidor")
            console.error(error) 
        }
    }

    async createProduct(req, res) {
        try {
            const product = await productService.createProduct(req.body); 
            res.status(201).json(product); 
        } catch (error) {
            res.status(500).send("Error interno del servidor") 
            console.error(error)
        }

    }

    async updateProduct(req, res) {
        const { id } = req.params; 
        try {
            const updateProduct = await productService.updateProduct(id, req.body); 
            if(!updateProduct) return res.status(404).send("Producto no encontrado"); 
            res.json(updateProduct); 
        } catch (error) {
            res.status(500).send("Error interno del servidor")
            console.error(error) 
        }

    }

    async deleteProduct(req, res) {
        const { id } = req.params; 
        try {
            const deleteProduct = await productService.deleteProduct(id); 
            if(!deleteProduct) return res.status(404).send("Producto no encontrado"); 
            res.json({message: "Producto eliminado!"}); 
        } catch (error) {
            res.status(500).send("Error interno del servidor")
            console.error(error)
        }
    }

}

export default ProductController; 