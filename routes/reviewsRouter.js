const { getAllReviewsOfProduct, makeReview, updateReview, deleteReview, getOneReview } = require("../controllers/reviewsController")

const reviewsRouter = require("express").Router()

reviewsRouter.get("/", getAllReviewsOfProduct)

reviewsRouter.post("/", makeReview)

reviewsRouter.patch("/:id", updateReview)

reviewsRouter.delete("/:id", deleteReview)

reviewsRouter.get("/:id", getOneReview)

module.exports = reviewsRouter