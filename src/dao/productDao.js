import ProductModel from "./models/productModel.js";

class ProductDao {
    async findById(id) {
        return await ProductModel.findById(id);
    }

    async find(query) {
        return await ProductModel.paginate({sort: query.sort, query: query.query},{limit: parseInt(query.limit), page: parseInt(query.page)});
        //return await ProductModel.find()
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