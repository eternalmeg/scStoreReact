const router = require("express").Router();
const { isAuth } = require("../middlewares/authMiddleWare");
const User = require("../models/User");
const Device = require("../models/Device");
const Order = require("../models/Order");



router.get("/", isAuth, async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate("cart.device");

        const cleanCart = user.cart.map(item => ({
            device: item.device._id,
            brand: item.device.brand,
            model: item.device.model,
            price: item.device.price,
            image: item.device.images?.[0] ?? "",
            quantity: item.quantity
        }));

        res.json(cleanCart);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.post("/add", isAuth, async (req, res) => {
    const { productId } = req.body;

    // Опит за увеличаване на quantity ако продуктът вече е в количката
    const updated = await User.updateOne(
        { _id: req.user._id, "cart.device": productId },
        { $inc: { "cart.$.quantity": 1 } }
    );

    // Ако matchedCount === 0 → продуктът не е бил в количката → добавяме нов
    if (updated.matchedCount === 0) {
        await User.updateOne(
            { _id: req.user._id },
            { $push: { cart: { device: productId, quantity: 1 } } }
        );
    }

    // Връщаме обновената количка
    const populated = await User.findById(req.user._id).populate("cart.device");

    res.json(
        populated.cart.map(i => ({
            device: i.device._id,
            brand: i.device.brand,
            model: i.device.model,
            price: i.device.price,
            image: i.device.images?.[0] || "",
            quantity: i.quantity
        }))
    );
});





router.put("/update", isAuth, async (req, res) => {
    const { productId, quantity } = req.body;

    // Validation
    if (!Number.isInteger(quantity) || quantity < 1) {
        return res.status(400).json({ message: "Quantity must be at least 1" });
    }

    // Update only the matching item inside the cart array
    const result = await User.updateOne(
        { _id: req.user._id, "cart.device": productId },
        { $set: { "cart.$.quantity": quantity } }
    );

    if (result.matchedCount === 0) {
        return res.status(404).json({ message: "Item not found" });
    }

    // Return updated cart
    const populated = await User.findById(req.user._id).populate("cart.device");

    res.json(
        populated.cart.map(i => ({
            device: i.device._id,
            brand: i.device.brand,
            model: i.device.model,
            price: i.device.price,
            image: i.device.images?.[0] || "",
            quantity: i.quantity
        }))
    );
});




router.delete("/remove/:id", isAuth, async (req, res) => {
    await User.findByIdAndUpdate(req.user._id, {
        $pull: { cart: { device: req.params.id } }
    });

    const populated = await User.findById(req.user._id).populate("cart.device");

    res.json(populated.cart.map(i => ({
        device: i.device._id,
        brand: i.device.brand,
        model: i.device.model,
        price: i.device.price,
        image: i.device.images?.[0] || "",
        quantity: i.quantity
    })));
});



router.post("/checkout", isAuth, async (req, res) => {
    const user = await User.findById(req.user._id).populate("cart.device");

    if (!user.cart.length) {
        return res.status(400).json({ message: "Cart is empty" });
    }

    // Проверка за наличност
    for (const item of user.cart) {
        const device = await Device.findById(item.device._id);

        if (device.quantity < item.quantity) {
            return res.status(400).json({
                message: `Not enough stock for ${device.brand} ${device.model}`
            });
        }

        // Update quantity без save() на user
        await Device.findByIdAndUpdate(device._id, {
            $inc: { quantity: -item.quantity }
        });
    }

    // Създаване на поръчката
    const order = await Order.create({
        user: user._id,
        items: user.cart.map(i => ({
            device: i.device._id,
            quantity: i.quantity
        })),
        totalPrice: user.cart.reduce(
            (sum, i) => sum + i.quantity * i.device.price,
            0
        )
    });

    // Изчистваме количката без save()
    await User.findByIdAndUpdate(user._id, { $set: { cart: [] } });

    res.json(order);
});





module.exports = router;
