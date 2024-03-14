import { Schema, model } from "mongoose";

const userModel = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    name: { type: String, required: true },
    surname: { type: String },
    lastName: { type: String },
    birthday: { type: Date },
    address: { type: String },

    favorites: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    basket: [{type: Schema.Types.ObjectId, ref: 'Product' }],
});

export default model("User", userModel);
