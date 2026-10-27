import mongoose from "mongoose";
const storeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: true,
    },
});

const storemodel = mongoose.model("store", storeSchema);
export default storemodel;