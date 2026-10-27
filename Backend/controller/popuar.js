import popularmodel from "../modules/popular.js";
import imagekit from "../config/imagekit.js";
//Add popular product
const addpopular = async(req, res) => {
    try {
        const { name, price, categorey } = req.body;
        const image = req.file;
        if (!name || !image || !price || !categorey) {
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
        const newpopular = new popularmodel({
            name,
            price,
            img: uploadImage.url,
            categorey
        });
        await newpopular.save();
        return res.status(201).json({
            success: true,
            message: "Popular Product created successfully",
            products: newpopular,
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    };
};
// Show popular product
const showpopular = async(req, res) => {
    try {
        const populartdata = await popularmodel.find({});
        if (populartdata.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No Popular Product found",
            });
        }

        return res.status(200).json({
            success: true,
            products: populartdata,
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    };

};
// Delete product
const deletepopular = async(req, res) => {
    try {
        const { id } = req.params;
        const deleteproduct = await popularmodel.findByIdAndDelete(id);
        if (!deleteproduct) {
            return res.status(404).json({
                success: false,
                message: "No popular Product found with this ID",
            });
        } else {
            if (deleteproduct.imageFileId) {
                await imagekit.deleteFile(deleteproduct.imageFileId);
            }
            await popularmodel.findByIdAndDelete(id);
            return res.status(200).json({
                success: true,
                message: "popular Product and image deleted successfully",
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
// editpopular product
const editpopular = async(req, res) => {
    try {
        const { id } = req.params;
        const { name, price, categorey } = req.body;
        const products = await popularmodel.findById(id);
        if (!products) {
            return res.status(404).json({
                success: false,
                message: "popular Products not found",
            });
        }
        const updates = {};
        if (name !== undefined) {
            updates.name = name;
        }
        if (price !== undefined) {
            updates.price = price;
        }
        if (categorey !== undefined) {
            updates.categorey = categorey;
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
        const updatedStore = await popularmodel.findByIdAndUpdate(
            id, { $set: updates }, { new: true, runValidators: true }
        );
        if (
            uploadedImage &&
            products.imageFileId &&
            products.imageFileId !== uploadedImage.fileId
        ) {
            try {
                await imagekit.deleteFile(products.imageFileId);
            } catch (imageError) {
                console.error("Failed to delete old image:", imageError);
            }
        }
        return res.status(200).json({
            success: true,
            message: "Products updated successfully",
            popular: updatedStore,
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
    addpopular,
    showpopular,
    deletepopular,
    editpopular
}