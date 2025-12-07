// controllers/deviceController.js
const router = require("express").Router();
const deviceService = require("../services/deviceService");
const { isAdmin } = require("../middlewares/adminMiddleware");

// -------------------------
// PUBLIC ROUTES
// -------------------------

// GET /api/devices/latest
router.get("/latest", async (req, res) => {
    try {
        const devices = await deviceService.getLatest();
        res.json(devices);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// GET /api/devices
router.get("/", async (req, res) => {
    try {
        const devices = await deviceService.getAll();
        res.json(devices);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// GET /api/devices/:id
router.get("/:id", async (req, res) => {
    try {
        const device = await deviceService.getById(req.params.id);
        if (!device) return res.status(404).json({ message: "Not found" });

        res.json(device);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// -------------------------
// ADMIN ONLY ROUTES
// -------------------------

// POST /api/devices
router.post("/", isAdmin, async (req, res) => {
    try {
        const device = await deviceService.create(req.body);
        res.status(201).json(device);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT /api/devices/:id
router.put("/:id", isAdmin, async (req, res) => {
    try {
        const device = await deviceService.update(req.params.id, req.body);
        res.json(device);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE /api/devices/:id
router.delete("/:id", isAdmin, async (req, res) => {
    try {
        await deviceService.remove(req.params.id);
        res.status(204).end();
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
