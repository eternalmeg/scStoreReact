const router = require('express').Router();


const homeController = require('./controllers/homeController');
const authController = require('./controllers/authController');
const deviceController = require('./controllers/deviceController');
const chatController = require('./controllers/chatController')


router.use('/auth',authController);
router.use('/devices', deviceController);
router.use('/chat', chatController)


module.exports = router;