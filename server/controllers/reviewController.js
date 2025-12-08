const router = require("express").Router();
const { isAuth } = require("../middlewares/authMiddleware");
const Review = require("../models/Review");
const Device = require("../models/Device");


router.post("/", isAuth, async (req, res) => {
    try {
        const review = await Review.create({
            device: req.body.productId,
            user: req.user._id,
            rating: req.body.rating,
            comment: req.body.comment
        });


        await Device.findByIdAndUpdate(
            req.body.productId,
            { $push: { reviewList: review._id } }
        );


        const allReviews = await Review.find({ device: req.body.productId });
        const avg =
            allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;

        await Device.findByIdAndUpdate(
            req.body.productId,
            { averageRating: avg.toFixed(1) }
        );

        res.status(201).json(review);

    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});



router.get("/:productId", async (req, res) => {
    try {
        const reviews = await Review.find({ product: req.params.productId })
            .populate("user", "firstName lastName email");

        res.json(reviews);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
