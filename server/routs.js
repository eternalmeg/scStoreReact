const router = require('express').Router();


const authController = require('./controllers/authController');
const deviceController = require('./controllers/deviceController');
const adminController = require('./controllers/adminController');
const reviewController = require('./controllers/reviewController');
const cartController = require('./controllers/cartController');
const orderController = require('./controllers/orderController');



router.use('/auth',authController);
router.use('/devices', deviceController);
router.use('/reviews', reviewController);
router.use('/admin', adminController);
router.use('/cart', cartController);
router.use('/orders', orderController);



module.exports = router;