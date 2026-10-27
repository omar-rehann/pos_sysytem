import ordermodel from "../modules/order.js";

// add order
const addorder = async(req, res) => {
    try {
        const { userId, name, price, categorey, quantity, img } = req.body;

        if (!userId || !name || !img || !price || !categorey || !quantity) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields: userId, name, img, price, categorey, quantity",
            });
        }

        const neworder = await ordermodel.create({
            user: userId,
            name,
            price: Number(price),
            img,
            categorey,
            quantity: Number(quantity),
        });

        return res.status(201).json({
            success: true,
            message: "Order Product created successfully",
            orders: neworder,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

// show orders (بتاعة اليوزر ده بس)
const showorder = async(req, res) => {
    try {
        const { userId } = req.query;
        if (!userId) {
            return res.status(400).json({ success: false, message: "userId is required" });
        }

        const orderdata = await ordermodel.find({ user: userId });
        return res.status(200).json({ success: true, orders: orderdata });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

// delete order
const deleteorder = async(req, res) => {
    try {
        const { id } = req.params;
        const deleted = await ordermodel.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({
                success: false,
                message: "No order Product found with this ID",
            });
        }

        return res.status(200).json({ success: true, message: "Order deleted successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

export { addorder, showorder, deleteorder };