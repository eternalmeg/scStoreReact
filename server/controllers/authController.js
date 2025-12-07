const router = require('express').Router();
const authService = require('../services/authService');
const { isAuth } = require("../middlewares/authMiddleWare");
const sanitizeMiddleware = require('../middlewares/sanitizeMiddleware');

// Helper: cookie options
const isProduction = process.env.NODE_ENV === "production";

function cookieOptions() {
    return {
        httpOnly: true,
        secure: isProduction,       // only secure in production
        sameSite: isProduction ? "none" : "lax" // lax works locally
    };
}

/* ---------------- REGISTER ---------------- */
router.post('/register', async (req, res) => {
    try {
        const result = await authService.register(req.body);

        res.cookie("auth", result.accessToken, cookieOptions());
        res.json(result);

    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

/* ---------------- LOGIN ---------------- */
router.post('/login', async (req, res) => {
    try {
        const result = await authService.login(req.body);

        res.cookie("auth", result.accessToken, cookieOptions());
        res.json(result);

    } catch (err) {
        res.status(401).json({ message: err.message });
    }
});

/* ---------------- LOGOUT ---------------- */
router.post('/logout', (req, res) => {
    res.clearCookie("auth", cookieOptions());
    res.status(200).json({ message: "Logged out" });
});

/* ---------------- PROFILE GET ---------------- */
router.get('/profile', isAuth, async (req, res) => {
    try {
        const id = req.user?._id;
        const user = await authService.getInfo(id);

        res.json(user);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

/* ---------------- PROFILE UPDATE ---------------- */
router.put('/profile', isAuth, sanitizeMiddleware, async (req, res) => {
    try {
        const id = req.user?._id;
        const { user, token } = await authService.edit(id, req.body);

        res.cookie("auth", token, cookieOptions());
        res.json(user);

    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

/* ---------------- GET MULTIPLE USERS (reviews etc.) ---------------- */
router.post('/get-owners', async (req, res) => {
    try {
        const owners = await authService.getOwners(req.body.ownerIds);
        res.json(owners);

    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

/* ---------------- GET USER BY ID ---------------- */
router.get('/:id', async (req, res) => {
    try {
        const user = await authService.getUserById(req.params.id);
        res.json(user);

    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
