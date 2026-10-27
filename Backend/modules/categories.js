import mongoose from "mongoose";
const catrgoriesschema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: true,
    },
    store: {
        type: String,
        required: true,
    },
});
const categoresmodel = mongoose.model("catrgoriesschema", catrgoriesschema);
export default categoresmodel;