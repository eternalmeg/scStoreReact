const router = require('express').Router();


const authController = require('./controllers/authController');
const deviceController = require('./controllers/deviceController');
const adminController = require('./controllers/adminController');
const reviewController = require('./controllers/reviewController');



router.use('/auth',authController);
router.use('/devices', deviceController);
router.use('/reviews', reviewController);
router.use('/admin', adminController);



module.exports = router;