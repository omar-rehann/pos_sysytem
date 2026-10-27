import mongoose from "mongoose";
const mangerSchema = new mongoose.Schema({
    img: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    number: {
        type: String,
        required: true,
    },
    adress: {
        type: String,
        required: true,
    },
    store: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        default: "Manager"
    },

});
const mangermodel = mongoose.model("manger", mangerSchema);
export default mangermodel;