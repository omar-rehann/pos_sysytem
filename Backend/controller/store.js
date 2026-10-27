import imagekit from "../config/imagekit.js";
import storemodel from "../modules/store.js";

//  add store
const addstore = async(req, res) => {
    try {
        const { name } = req.body;
        const image = req.file;

        if (!name || !image) {
            return res.status(401).json({
                success: false,
                message: "Not Use Name or name is wrong or image ist wrong",
            });
        }
        const uploadImage = await imagekit.upload({
            file: image.buffer.toString('base64'),
            fileName: image.originalname,
            folder: "/image",
        });
        const newstore = new storemodel({
            name,
            img: uploadImage.url
        });
        await newstore.save();
        return res.status(201).json({
            success: true,
            message: "Store created successfully",
            store: newstore,
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    };
};

// show store
const showstore = async(req, res) => {
    try {
        const storedata = await storemodel.find({});
        if (storedata.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No stores found",
            });
        }

        return res.status(200).json({
            success: true,
            data: storedata,
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    };

};
//delete store
const deletestore = async(req, res) => {
    try {
        const { id } = req.params;
        const deletedStore = await storemodel.findByIdAndDelete(id);
        if (!deletedStore) {
            return res.status(404).json({
                success: false,
                message: "No store found with this ID",
            });
        } else {
            if (store.imageFileId) {
                await imagekit.deleteFile(store.imageFileId);
            }
            await storemodel.findByIdAndDelete(id);
            return res.status(200).json({
                success: true,
                message: "Store and image deleted successfully",
            });
        }

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    };

}


//  edit store
const editstore = async(req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const store = await storemodel.findById(id);
        if (!store) {
            return res.status(404).json({
                success: false,
                message: "Store not found",
            });
        }
        const updates = {};
        if (name !== undefined) {
            updates.name = name;
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
        const updatedStore = await storemodel.findByIdAndUpdate(
            id, { $set: updates }, { new: true, runValidators: true }
        );
        if (
            uploadedImage &&
            store.imageFileId &&
            store.imageFileId !== uploadedImage.fileId
        ) {
            try {
                await imagekit.deleteFile(store.imageFileId);
            } catch (imageError) {
                console.error("Failed to delete old image:", imageError);
            }
        }
        return res.status(200).json({
            success: true,
            message: "Store updated successfully",
            data: updatedStore,
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
    addstore,
    showstore,
    deletestore,
    editstore

}