import paymentmodel from "../modules/payment.js";
import ordermodel from "../modules/order.js";

const TAX_RATE = 0.14;

const addpayment = async(req, res) => {
    try {
        const { userId, paymentMethod, referenceNumber, amountPaid } = req.body;

        if (!userId || !referenceNumber || amountPaid === undefined) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }
        const orders = await ordermodel.find({ user: userId });
        if (orders.length === 0) {
            return res.status(400).json({ success: false, message: "No orders to checkout" });
        }

        const items = orders.map((o) => ({
            name: o.name,
            img: o.img,
            categorey: o.categorey,
            price: Number(o.price),
            quantity: Number(o.quantity),
        }));

        const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
        const tax = subtotal * TAX_RATE;
        const total = subtotal + tax;

        if (Number(amountPaid) < total) {
            return res.status(400).json({
                success: false,
                message: `Amount paid is less than total (${total.toFixed(2)})`,
            });
        }

        const payment = await paymentmodel.create({
            user: userId,
            paymentMethod,
            referenceNumber,
            amountPaid: Number(amountPaid),
            subtotal,
            tax,
            total,
            items,
        });

        await ordermodel.deleteMany({ user: userId });

        return res.status(201).json({ success: true, message: "Payment completed", payment });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: error.message });
    }
};
const showinvoices = async(req, res) => {
    try {
        const { userId } = req.query;
        if (!userId) {
            return res.status(400).json({ success: false, message: "userId is required" });
        }

        const invoices = await paymentmodel.find({ user: userId }).sort({ createdAt: -1 });
        return res.status(200).json({ success: true, invoices });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: error.message });
    }
};
const showallinvoices = async(req, res) => {
    try {
        const invoices = await paymentmodel
            .find({})
            .populate("user", "name email")
            .sort({ createdAt: -1 });

        return res.status(200).json({ success: true, invoices });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

export { addpayment, showinvoices, showallinvoices };