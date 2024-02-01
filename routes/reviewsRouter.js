const { getAllReviewsOfProduct, makeReview, updateReview, deleteReview, getOneReview, getSingleProductReviews, makeReviewReply, getReviewReplies } = require("../controllers/reviewsController")

const reviewsRouter = require("express").Router()

reviewsRouter.get("/", getAllReviewsOfProduct)

reviewsRouter.post("/", makeReview)

reviewsRouter.patch("/:id", updateReview)

reviewsRouter.delete("/:id", deleteReview)

reviewsRouter.get("/product/:productId", getSingleProductReviews)

reviewsRouter.get("/user/:userId/product/:productId", getOneReview)

reviewsRouter.get("/replies/:commentId", getReviewReplies)

reviewsRouter.post("/replies", makeReviewReply)

// reviewsRouter.get("/:id", getOneReview)

module.exports = reviewsRouter