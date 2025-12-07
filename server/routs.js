const router = require('express').Router();


const homeController = require('./controllers/homeController');
const authController = require('./controllers/authController');
const deviceController = require('./controllers/deviceController');
const adminController = require('./controllers/adminController')



router.use('/api/auth',authController);
router.use('/api/devices', deviceController);

router.use('/admin', adminController);



module.exports = router;