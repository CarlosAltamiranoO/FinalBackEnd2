import ProductModel from "./models/productModel.js";

class ProductDao {
    async findById(id) {
        return await ProductModel.findById(id);
    }

    async find(query) {
        if(!query) return await ProductModel.find(); // para el websocket
        return await ProductModel.paginate(query.query, {limit: query.limit, page: query.page, sort: query.sort});
    }

    async save(productData) {
        const product = new ProductModel(productData); 
        return await product.save(); 
    }

    async update(id, productData) {
        return await ProductModel.findByIdAndUpdate(id, productData); 
    }

    async delete(id) {
        return await ProductModel.findByIdAndDelete(id); 
    }

}

export default new ProductDao(); 