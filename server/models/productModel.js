import { Schema, model } from "mongoose";

const productModel = new Schema({
    model: { type: String, required: true },
    price: { type: Number, required: true },
    brand: { type: String, required: true },
    description: { type: String, required: true },
    quantity: { type: Number },

    photos: [{ type: String, required: true }],
    comment: [{ type: String }],
});

export default model("Product", productModel);