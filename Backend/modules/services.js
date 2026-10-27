import mongoose from "mongoose";
const servicesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
});
const servicesmodel = mongoose.model("services", servicesSchema);
export default servicesmodel;