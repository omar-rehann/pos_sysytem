import mongoose from "mongoose";
const productschema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    categorey: {
        type: String,
        required: true,
    },
});
const productmodel = mongoose.model("productschema", productschema);
export default productmodel;