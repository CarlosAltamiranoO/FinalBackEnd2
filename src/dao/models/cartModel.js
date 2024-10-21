import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    products: [
        {
            _id: false,
            product: {
                type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true
            },
            quantity: {
                type: Number, required: true
            }
        }
    ]
}, { versionKey: false });

// Middleware pre que realiza la población automáticamente, cuando llamamos al findOne se ejecuta el middlelware
cartSchema.pre('findOne', function (next) {
    this.populate('products.product', '_id title price');
    next();
});

const CartModel = mongoose.model("carts", cartSchema);

export default CartModel;