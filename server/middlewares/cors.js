function setCors() {
    const allowed = ["http://localhost:5173", "https://scstorewithserver-1.onrender.com"];

    return function (req, res, next) {
        const origin = req.headers.origin;

        if (allowed.includes(origin)) {
            res.setHeader("Access-Control-Allow-Origin", origin);
        }


        res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET, POST, PUT, DELETE, PATCH");


        res.setHeader("Access-Control-Allow-Headers", "Content-type, X-Authorization");


        res.setHeader("Access-Control-Allow-Credentials", "true");


        if (req.method === "OPTIONS") {
            return res.status(200).end();
        }

        next();
    };
}

module.exports = {
    setCors
};
