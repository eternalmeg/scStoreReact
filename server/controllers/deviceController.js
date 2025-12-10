
const router = require("express").Router();
const deviceService = require("../services/deviceService");
const { isAdmin } = require("../middlewares/adminMiddleware");
const Device = require("../models/Device");


router.get("/latest", async (req, res) => {
    try {
        const devices = await deviceService.getLatest();
        res.json(devices);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


router.get("/", async (req, res) => {
    try {
        const devices = await deviceService.getAll();
        res.json(devices);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.get("/search", async (req, res) => {
    try {
        const query = req.query.query?.toLowerCase() || "";

        if (!query) return res.json([]);

        const products = await Device.find({
            $or: [
                { brand: { $regex: query, $options: "i" } },
                { model: { $regex: query, $options: "i" } },
                { category: { $regex: query, $options: "i" } },
                { shortDescription: { $regex: query, $options: "i" } },
                { description: { $regex: query, $options: "i" } }
            ]
        });

        res.json(products);

    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});


router.get("/:id", async (req, res) => {
    try {
        const device = await deviceService.getById(req.params.id);
        if (!device) return res.status(404).json({ message: "Not found" });

        res.json(device);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.post("/create", isAdmin, async (req, res) => {
    try {
        const device = await deviceService.create(req.body);
        res.status(201).json(device);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


router.put("/:id", isAdmin, async (req, res) => {
    try {
        const device = await deviceService.update(req.params.id, req.body);
        res.json(device);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});




router.delete("/:id", isAdmin, async (req, res) => {
    try {
        await deviceService.remove(req.params.id);
        res.status(204).end();
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});





router.get("/search/:query", async (req, res) => {
    const query = req.params.query;

    try {
        const devices = await deviceService.search(query);
        res.json(devices);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


module.exports = router;
