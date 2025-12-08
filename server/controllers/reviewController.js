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


//get user reviews

router.get("/userReviews", isAuth, async (req, res) => {
    try {
        const reviews = await Review.find({ user: req.user._id })
            .populate("device", "brand model images")
            .populate("user", "firstName lastName email");

        res.json(reviews);
    } catch (err) {
        console.error(err);
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







//edit user review
router.put("/:id", isAuth, async (req, res) => {
    try {
        const review = await Review.findOneAndUpdate(
            { _id: req.params.id, user: req.user._id },
            { rating: req.body.rating, comment: req.body.comment },
            { new: true, runValidators: true }
        );

        if (!review) return res.status(404).json({ message: "Review not found" });

        res.json(review);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

//delete user review

router.delete("/:id", isAuth, async (req, res) => {
    try {
        const review = await Review.findOneAndDelete({
            _id: req.params.id,
            user: req.user._id,
        });

        if (!review) return res.status(404).json({ message: "Review not found" });

        // Remove from Device.reviewList
        await Device.findByIdAndUpdate(review.device, {
            $pull: { reviewList: review._id }
        });

        res.json({ message: "Review deleted" });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});





module.exports = router;
