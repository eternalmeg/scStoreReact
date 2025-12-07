const jwt = require('../lib/jwt');
const SECRET = 'hklhkjhjhjhhkh445hhhkhj';


exports.authMiddleWare = async (req, res, next) => {

    const token = req.cookies['auth'];

    if (!token) {
        console.log('no token')
        return next();
    }
//todo verify token

    try {
        const decodedToken = await jwt.verify(token, SECRET);

        req.user = decodedToken;
        res.locals.isAuthenticatad = true;
        //if we have userProfile etc
        res.locals.user = decodedToken;

        next();

    } catch (err) {
        res.clearCookie('auth');
        return res.status(401).json({ message: "Unauthorized" });
    }
};
exports.isAuth = (req, res, next) => {
    if (!req.user) {
        console.log('User is not authenticated');
    }
    next();

}

exports.isGuest = (req, res, next) => {
    if (req.user) {
        return res.redirect('/');
    }
    next();
}