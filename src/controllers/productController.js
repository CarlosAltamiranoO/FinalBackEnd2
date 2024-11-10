import productService from "../services/productService.js";

class ProductController {
    async getProducts(req, res) {
        const { limit = 10, page = 1, sort, query } = req.query;
        try {
            const products = await productService.getProducts({ limit, page, sort, query });
            res.json(products);
        } catch (error) {
            res.status(500).send("Error interno del servidor")
            console.error(error)
        }
    }

    async getProductById(req, res) {
        const { pid } = req.params;
        console.log ( pid)
        try {
            const product = await productService.getProductById(pid);
            if (!product) return res.status(404).send("Producto no encontrado");
            res.json(product);
        } catch (error) {
            console.error(error)
            res.status(500).send("Error interno del servidor")

        }
    }

    async createProduct(req, res) {
        try {
            const product = await productService.createProduct(req.body);
            res.status(201).json(product);
        } catch (error) {
            console.error(error)
            res.status(500).send("Error interno del servidor")
        }

    }

    async updateProduct(req, res) {
        const { pid } = req.params;
        try {
            const updateProduct = await productService.updateProduct(pid, req.body);
            if (!updateProduct) return res.status(404).send("Producto no encontrado");
            res.json(updateProduct);
        } catch (error) {
            console.error(error)
            res.status(500).send("Error interno del servidor")

        }

    }

    async deleteProduct(req, res) {
        const { pid } = req.params;
        try {
            const deleteProduct = await productService.deleteProduct(pid);
            if (!deleteProduct) return res.status(404).send("Producto no encontrado");
            res.json({ message: "Producto eliminado!" });
        } catch (error) {
            console.error(error)
            res.status(500).send("Error interno del servidor")

        }
    }

}

export default ProductController; 