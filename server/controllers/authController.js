const router = require('express').Router();
const authService = require('../services/authService');
const { isAuth } = require("../middlewares/authMiddleware");
const sanitizeMiddleware = require('../middlewares/sanitizeMiddleware');


const isProduction = process.env.NODE_ENV === "production";

function cookieOptions() {
    return {
        httpOnly: true,
        secure: isProduction,       // only secure in production
        sameSite: isProduction ? "none" : "lax" // lax works locally
    };
}


router.post('/register', async (req, res) => {
    try {
        const result = await authService.register(req.body);

        res.cookie("auth", result.accessToken, cookieOptions());
        res.json(result);

    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


router.post('/login', async (req, res) => {
    try {
        const result = await authService.login(req.body);

        res.cookie("auth", result.accessToken, cookieOptions());
        res.json(result);

    } catch (err) {
        res.status(401).json({ message: err.message });
    }
});


router.post('/logout', (req, res) => {
    res.clearCookie("auth", cookieOptions());
    res.status(200).json({ message: "Logged out" });
});


router.get('/profile', isAuth, async (req, res) => {
    try {
        const id = req.user?._id;
        const user = await authService.getInfo(id);

        res.json(user);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


router.put('/users/update', isAuth, sanitizeMiddleware, async (req, res) => {
    try {
        const id = req.user?._id;
        const { user, token } = await authService.edit(id, req.body);

        res.cookie("auth", token, cookieOptions());
        res.json(user);

    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


router.post('/get-owners', async (req, res) => {
    try {
        const owners = await authService.getOwners(req.body.ownerIds);
        res.json(owners);

    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


router.get('/:id', async (req, res) => {
    try {
        const user = await authService.getUserById(req.params.id);
        res.json(user);

    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});




// GET /api/users/me
router.get("/users/me", isAuth, async (req, res) => {
    try {
        const user = await authService.getById(req.user._id);
        res.json(user);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;



module.exports = router;
