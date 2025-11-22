const router = require('express').Router();
const authService = require('../services/authService');
const {getErrorMessage} = require("../utils/errorUtils");
const {isGuest, isAuth} = require("../middlewares/authMiddleWare");
const User = require('../models/User')
const sanitizeMiddleware = require('../middlewares/sanitizeMiddleware')


router.post('/register',sanitizeMiddleware, async (req, res) => {

    try {
        const result = await authService.register(req.body);
        res.cookie('auth', result.accessToken, {httpOnly: true, sameSite: 'none', secure: true});

        res.json(result);

    } catch (err) {
        res.status(401).json({message: err.message})

    }

});

router.post('/login', async (req, res) => {
    const userData = req.body;

    try {

        const result = await authService.login(userData);

        res.cookie('auth', result.accessToken, {httpOnly: true, sameSite: 'none', secure: true});

        res.json(result);

    } catch (err) {
        res.status(401).json({message: err.message})

    }

})

router.post('/logout', (req, res) => {
    res.clearCookie('auth')
    res.end()
});



router.get('/profile', isAuth, async (req, res) => {
    const id = req.user?._id
    console.log(id)

    try {
        let user = await authService.getInfo(id)
        res.json(user)
    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
})

router.put('/profile', isAuth,sanitizeMiddleware, async (req, res) => {
    const id = req.user?._id
    const userData = req.body;
    console.log(userData)

    try {
        const {user, token} = await authService.edit(id, userData);

        res.cookie('auth', token, {httpOnly: true, secure: true});
        res.status(200).json(user);

    } catch (err) {
        res.status(400).json({
            message: err.message
        })
        console.log(err.message)
    }
})

router.post('/get-owners', async (req, res) => {
    const { ownerIds } = req.body
    try {
        const owners =await authService.getOwners(ownerIds);
        console.log(owners)
        res.status(200).json(owners)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})

router.get('/:id', async (req, res) => {
    const {id} = req.params;

    try {
        const user = await authService.getUserById(id);
        res.status(200).json(user)
    }catch (err){
        res.status(400).json({message: err.message})
    }
})




module.exports = router;
