import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import mangermodel from "../modules/manger.js";
import imagekit from "../config/imagekit.js";

// add manger
const addmanger = async(req, res) => {
    try {
        const { name, email, password, number, adress, store } = req.body;
        const image = req.file;

        if (!name || !image || !email || !password || !number || !adress || !store) {
            return res.status(400).json({
                success: false,
                message: "Name, image, email, password, number, address and store are required",
            });
        }

        const exist = await mangermodel.findOne({ email });
        if (exist) {
            return res.status(409).json({
                success: false,
                message: "Email already exists",
            });
        }

        const uploadImage = await imagekit.upload({
            file: image.buffer.toString("base64"),
            fileName: image.originalname,
            folder: "/image",
        });

        const hashpassword = await bcrypt.hash(password, 10);

        const newmanger = new mangermodel({
            name,
            email,
            password: hashpassword,
            adress,
            number,
            store,
            img: uploadImage.url,
            imageFileId: uploadImage.fileId,
        });
        await newmanger.save();

        return res.status(201).json({
            success: true,
            message: "Manger created successfully",
            manger: newmanger,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// show manger
const showmanger = async(req, res) => {
    try {
        // never send the password hash to the frontend
        const mangerdata = await mangermodel.find({}).select("-password");
        if (mangerdata.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No Manger found",
            });
        }

        return res.status(200).json({
            success: true,
            data: mangerdata,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
// delete manger
const deletemanger = async(req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "Invalid manager ID" });
        }

        const manger = await mangermodel.findByIdAndDelete(id);
        if (!manger) {
            return res.status(404).json({ success: false, message: "No Manger found with this ID" });
        }

        if (manger.imageFileId) {
            try {
                await imagekit.deleteFile(manger.imageFileId);
            } catch (imageError) {
                console.error("Failed to delete image:", imageError);
            }
        }

        return res.status(200).json({ success: true, message: "Manger deleted successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

// edit manger
const editmanger = async(req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "Invalid manager ID" });
        }

        const { name, email, password, adress, store, number } = req.body;
        const manger = await mangermodel.findById(id);
        if (!manger) {
            return res.status(404).json({
                success: false,
                message: "Manger not found",
            });
        }

        const updates = {};
        if (name) updates.name = name;
        if (email) updates.email = email;
        if (adress) updates.adress = adress;
        if (number) updates.number = number;
        if (store) updates.store = store;
        // empty password = keep the old one
        if (password) updates.password = await bcrypt.hash(password, 10);

        let uploadedImage;
        if (req.file) {
            uploadedImage = await imagekit.upload({
                file: req.file.buffer.toString("base64"),
                fileName: req.file.originalname,
                folder: "/image",
            });
            updates.img = uploadedImage.url;
            updates.imageFileId = uploadedImage.fileId;
        }

        const updatedmanger = await mangermodel
            .findByIdAndUpdate(id, { $set: updates }, { new: true, runValidators: true })
            .select("-password");

        if (uploadedImage && manger.imageFileId && manger.imageFileId !== uploadedImage.fileId) {
            try {
                await imagekit.deleteFile(manger.imageFileId);
            } catch (imageError) {
                console.error("Failed to delete old image:", imageError);
            }
        }

        return res.status(200).json({
            success: true,
            message: "Manger updated successfully",
            data: updatedmanger,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export { addmanger, showmanger, deletemanger, editmanger };