import mongoose from "mongoose";
const popularschema = new mongoose.Schema({
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
const popularmodel = mongoose.model("popularschema", popularschema);
export default popularmodel;