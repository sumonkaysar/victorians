const { getAllReviewsOfProduct, makeReview, updateReview, deleteReview, getOneReview, getSingleProductReviews } = require("../controllers/reviewsController")

const reviewsRouter = require("express").Router()

reviewsRouter.get("/", getAllReviewsOfProduct)

reviewsRouter.post("/", makeReview)

reviewsRouter.patch("/:id", updateReview)

reviewsRouter.delete("/:id", deleteReview)

reviewsRouter.get("/product/:productId", getSingleProductReviews)

reviewsRouter.get("/user/:userId/product/:productId", getOneReview)

// reviewsRouter.get("/:id", getOneReview)

module.exports = reviewsRouter