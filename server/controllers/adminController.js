const router = require('express').Router();
const { isAdmin } = require('../middlewares/adminMiddleware');

const Device = require('../models/Device');
const User = require('../models/User');
const Order = require('../models/Order');
const Review = require('../models/Review');
const bcrypt = require('bcrypt');

// --- DEVICE ROUTES --- //

// GET all devices
router.get('/devices', isAdmin, async (req, res) => {
    try {
        const devices = await Device.find();
        res.json(devices);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// GET one device
router.get('/devices/:id', isAdmin, async (req, res) => {
    try {
        const device = await Device.findById(req.params.id);
        res.json(device);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// CREATE device
router.post('/devices', isAdmin, async (req, res) => {
    try {
        const device = await Device.create(req.body);
        res.status(201).json(device);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// EDIT device
router.put('/devices/:id', isAdmin, async (req, res) => {
    try {
        const device = await Device.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(device);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE device
router.delete('/devices/:id', isAdmin, async (req, res) => {
    try {
        await Device.findByIdAndDelete(req.params.id);
        res.json({ message: "Deleted successfully" });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


// --- USER ROUTES --- //
// CREATE USER
router.post("/users", isAdmin, async (req, res) => {
    try {
        const { firstName, lastName, email, password, role, phone } = req.body;

        const existing = await User.findOne({ email });
        if (existing) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const hashedPass = await bcrypt.hash(password, 10);

        const user = await User.create({
            firstName,
            lastName,
            email,
            phone,
            role,
            password: hashedPass,
        });

        res.status(201).json({
            _id: user._id,
            firstName,
            lastName,
            email,
            role,
            phone
        });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// GET all users
router.get('/users', isAdmin, async (req, res) => {
    const users = await User.find();
    res.json(users);
});

// GET one user
router.get('/users/:id', isAdmin, async (req, res) => {
    const user = await User.findById(req.params.id);
    res.json(user);
});

// EDIT user
router.put('/users/:id', isAdmin, async (req, res) => {
    const updated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
});

// DELETE user
router.delete('/users/:id', isAdmin, async (req, res) => {
    try {
        const userId = req.params.id;
        const currentAdminId = req.user._id.toString();

        // 🚫 Prevent deleting yourself
        if (userId === currentAdminId) {
            return res.status(400).json({ message: "Admin cannot delete themselves." });
        }

        const user = await User.findByIdAndDelete(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ message: "User deleted" });

    } catch (err) {
        console.error("Delete user error:", err);
        res.status(500).json({ message: "Server error" });
    }
});



// --- REVIEWS ROUTES --- //

router.get('/reviews', isAdmin, async (req, res) => {
    const reviews = await Review.find()
        .populate("user")
        .populate("device");

    res.json(reviews);
});


router.delete('/reviews/:id', isAdmin, async (req, res) => {
    await Review.findByIdAndDelete(req.params.id);
    res.json({ message: "ReviewForm deleted" });
});



// --- ORDERS ROUTES --- //

// Get all orders
router.get("/orders", isAdmin, async (req, res) => {
    try {
        const orders = await Order.find()
            .populate("user", "firstName lastName email")
            .populate("items.device");

        res.json(orders);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.get("/orders/:id", isAdmin, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate("user", "firstName lastName email")
            .populate("items.device");

        res.json(order);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


router.patch('/orders/:id/status', isAdmin, async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true }
        ).populate("user");

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.json(order); // <-- ВРЪЩАМЕ ЦЕЛИЯ ORDER
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});




// DELETE ORDER (ADMIN ONLY)
router.delete("/orders/:id", isAdmin, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        // Връщаме стоката обратно в склада
        for (const item of order.items) {
            await Device.findByIdAndUpdate(item.device, {
                $inc: { quantity: item.quantity }
            });
        }

        await order.deleteOne();

        res.json({ message: "Order deleted" });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});






module.exports = router;
