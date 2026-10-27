import mongoose from "mongoose";

const paymentschema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "userSchema", required: true },
    paymentMethod: {
        type: String,
        enum: ["cash", "card", "wallet", "bank"],
        default: "cash",
    },
    referenceNumber: { type: String, required: true },
    amountPaid: { type: Number, required: true },
    subtotal: Number,
    tax: Number,
    total: Number,
    items: [{
        name: String,
        img: String,
        categorey: String,
        price: Number,
        quantity: Number,
    }, ],
}, { timestamps: true });

export default mongoose.model("payment", paymentschema);