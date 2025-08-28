import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    productName:
    {
        type: String,
        required: true
    },
    productPrice:
    {
        type: Number,
        required: true
    },
    productDescription:
    {
        type: String,
        required: true
    },
    productCountInStock: {
        type: Number,
        required: true
    },
    productImageUrl: {
        type: String,
        required: true
    },
    productCatagory: {
        type: String,
        required: true
    }
    
});

export default mongoose.model("products",productSchema)