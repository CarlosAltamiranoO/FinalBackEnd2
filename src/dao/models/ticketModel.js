import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
    code: {
        type: String, unique: true, required: true
    },
    purchase_dateTime:{
        type: Date, required: true, default: Date.now
    },
    amount:{
        type: Number, required: true
    },
    purchaser:{
        type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true
    }

})

const ticketModel = mongoose.model('ticket', ticketSchema)
export default ticketModel