import mongoose from "mongoose";

const orderschema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "userSchema", required: true },
    name: { type: String, required: true },
    img: { type: String, required: true },
    price: { type: Number, required: true },
    categorey: { type: String, required: true },
    quantity: { type: Number, required: true, min: 1 },
});

const ordermodel = mongoose.model("orderschema", orderschema);
export default ordermodel;