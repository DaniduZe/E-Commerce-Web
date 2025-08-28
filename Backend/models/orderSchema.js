import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
    name:
    {
        type: String,
        required: true
    },
    orderId: {
        type: String,
        required: true,
        unique: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    email: {
        type: String,
        required: true
    },
    items: [
        {
            productId: String,
            quantity: Number,
            name: String,
            price: Number,
            totalItemPrice: Number
        }
    ],
    totalAmount: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    province: {
        type: String
    },
    postal_code: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    status:{
        type:String,
        default:'pending'
    }
});

export default mongoose.model("orders", orderSchema);
