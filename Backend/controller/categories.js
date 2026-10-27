import categoresmodel from "../modules/categories.js";
import imagekit from "../config/imagekit.js";

//Add Categoreis
const addcategories = async(req, res) => {
    try {
        const { name, store } = req.body;
        const image = req.file;
        if (!name || !image || !store) {
            return res.status(401).json({
                success: false,
                message: "Not Use Name or name is wrong or image ist wrong or Store ist wrong",
            });
        }
        const uploadImage = await imagekit.upload({
            file: image.buffer.toString('base64'),
            fileName: image.originalname,
            folder: "/image",
        });
        const newcategories = new categoresmodel({
            name,
            store,
            img: uploadImage.url
        });
        await newcategories.save();
        return res.status(201).json({
            success: true,
            message: "Store created successfully",
            categories: newcategories,
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    };
};

// Show Categories
const showcategories = async(req, res) => {
    try {
        const categoriesdata = await categoresmodel.find({});
        if (categoriesdata.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No categories found",
            });
        }

        return res.status(200).json({
            success: true,
            data: categoriesdata,
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    };

};
// Delet Categories
const deletecategories = async(req, res) => {
    try {
        const { id } = req.params;
        const deletecategories = await categoresmodel.findByIdAndDelete(id);
        if (!deletecategories) {
            return res.status(404).json({
                success: false,
                message: "No Categories found with this ID",
            });
        } else {
            if (deletecategories.imageFileId) {
                await imagekit.deleteFile(deletecategories.imageFileId);
            }
            await categoresmodel.findByIdAndDelete(id);
            return res.status(200).json({
                success: true,
                message: "Categories and image deleted successfully",
            });
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    };

};


// edit Categories
const editcategories = async(req, res) => {
    try {
        const { id } = req.params;
        const { name, store } = req.body;
        const categories = await categoresmodel.findById(id);
        if (!categories) {
            return res.status(404).json({
                success: false,
                message: "Categories not found",
            });
        }
        const updates = {};
        if (name !== undefined) {
            updates.name = name;
        }
        if (store !== undefined) {
            updates.store = store;
        }
        let uploadedImage;
        if (req.file) {
            uploadedImage = await imagekit.upload({
                file: req.file.buffer,
                fileName: req.file.originalname,
                folder: "/possysytem",
            });
            updates.img = uploadedImage.url;
            updates.imageFileId = uploadedImage.fileId;
        }
        const updatedStore = await categoresmodel.findByIdAndUpdate(
            id, { $set: updates }, { new: true, runValidators: true }
        );
        if (
            uploadedImage &&
            categories.imageFileId &&
            categories.imageFileId !== uploadedImage.fileId
        ) {
            try {
                await imagekit.deleteFile(categories.imageFileId);
            } catch (imageError) {
                console.error("Failed to delete old image:", imageError);
            }
        }
        return res.status(200).json({
            success: true,
            message: "Store updated successfully",
            categories: updatedStore,
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
export {
    addcategories,
    showcategories,
    deletecategories,
    editcategories
}