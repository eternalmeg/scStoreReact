const router = require("express").Router();
const { isAuth } = require("../middlewares/authMiddleWare");
const Order = require("../models/Order");
const Device = require("../models/Device")


router.get("/", isAuth, async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id })
            .populate("items.device")
            .sort({ createdAt: -1 });

        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.get("/:id", isAuth, async (req, res) => {
    try {
        const order = await Order.findOne({
            _id: req.params.id,
            user: req.user._id
        }).populate("items.device");

        if (!order) return res.status(404).json({ message: "Order not found" });

        res.json(order);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.patch("/:id/cancel", isAuth, async (req, res) => {
    const order = await Order.findOne({ _id: req.params.id, user: req.user._id });

    if (!order) {
        return res.status(404).json({ message: "Order not found" });
    }

    if (order.status !== "pending") {
        return res.status(400).json({ message: "Only pending orders can be cancelled" });
    }


    for (const item of order.items) {
        await Device.findByIdAndUpdate(item.device, {
            $inc: { quantity: item.quantity }
        });
    }

    order.status = "cancelled";
    await order.save();

    res.json({ message: "Order cancelled", order });
});


module.exports = router;
