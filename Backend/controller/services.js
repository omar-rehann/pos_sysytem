import servicesmodel from "../modules/services.js";
// add  services
const addservices = async(req, res) => {
    try {
        const { name, description } = req.body;

        if (!name || !description) {
            return res.status(401).json({
                success: false,
                message: "Not Use Name or name is wrong or description ist wrong",
            });
        }
        const newservices = new servicesmodel({
            name,
            description
        });
        await newservices.save();
        return res.status(201).json({
            success: true,
            message: "Services created successfully",
            services: newservices,
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    };
};
// show services
const showservices = async(req, res) => {
    try {
        const storeservices = await servicesmodel.find({});
        if (storeservices.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No Services found",
            });
        }
        return res.status(200).json({
            success: true,
            data: storeservices,
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
const deleteservices = async(req, res) => {
        try {
            const { id } = req.params;
            const deleteservices = await servicesmodel.findByIdAndDelete(id);
            if (!deleteservices) {
                return res.status(404).json({
                    success: false,
                    message: "No Services found with this ID",
                });
            } else {
                await servicesmodel.findByIdAndDelete(id);
                return res.status(200).json({
                    success: true,
                    message: "Services  deleted successfully",
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
const editservices = async(req, res) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;
        const services = await servicesmodel.findById(id);
        if (!services) {
            return res.status(404).json({
                success: false,
                message: "services not found",
            });
        }
        const updates = {};
        if (name !== undefined) {
            updates.name = name;
        }
        if (description !== undefined) {
            updates.description = description;
        }

        const updatedservices = await servicesmodel.findByIdAndUpdate(
            id, { $set: updates }, { new: true, runValidators: true }
        );
        return res.status(200).json({
            success: true,
            message: "Store updated successfully",
            services: updatedservices,
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
    addservices,
    showservices,
    deleteservices,
    editservices
}