import productmodel from "../modules/product.js";
import imagekit from "../config/imagekit.js";
//Add product
const addproduct = async(req, res) => {
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
        const newproduct = new productmodel({
            name,
            price,
            img: uploadImage.url,
            categorey
        });
        await newproduct.save();
        return res.status(201).json({
            success: true,
            message: "Product created successfully",
            products: newproduct,
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    };
};
// Show product
const showproduct = async(req, res) => {
    try {
        const productdata = await productmodel.find({});
        if (productdata.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No Product found",
            });
        }

        return res.status(200).json({
            success: true,
            products: productdata,
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
const deleteproduct = async(req, res) => {
    try {
        const { id } = req.params;
        const deleteproduct = await productmodel.findByIdAndDelete(id);
        if (!deleteproduct) {
            return res.status(404).json({
                success: false,
                message: "No Product found with this ID",
            });
        } else {
            if (deleteproduct.imageFileId) {
                await imagekit.deleteFile(deleteproduct.imageFileId);
            }
            await productmodel.findByIdAndDelete(id);
            return res.status(200).json({
                success: true,
                message: "Product and image deleted successfully",
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
// edit product
const editproduct = async(req, res) => {
    try {
        const { id } = req.params;
        const { name, price, categorey } = req.body;
        const products = await productmodel.findById(id);
        if (!products) {
            return res.status(404).json({
                success: false,
                message: "Products not found",
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
        const updatedStore = await productmodel.findByIdAndUpdate(
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
            products: updatedStore,
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
export { addproduct, deleteproduct, editproduct, showproduct }