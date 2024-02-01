const { ObjectId } = require("mongodb")
const { reviewsCollection, productsCollection, reviewRepliesCollection } = require("../mongoDBConfig/collections")
const { readDoc, createDoc, updateDoc, deleteDoc } = require("../utils/mongoQueries")

const getAllReviewsOfProduct = async (req, res) => {
    try {
        const products = await readDoc(reviewsCollection)
        res.send(products)
    } catch (err) {
        console.log(err)
    }
}

const makeReview = async (req, res) => {
    try {
        const result = await createDoc(req, reviewsCollection)
        res.send(result)
    } catch (err) {
        console.log(err)
    }
}

const updateReview = async (req, res) => {
    try {
        // const result = await updateDoc(req, reviewsCollection)
        const reviewUpdated = await updateDoc(req, reviewsCollection)
        if (!reviewUpdated) {
            return;
        }
        const { productId, ratings } = await reviewsCollection().findOne({ _id: new ObjectId(req.params.id) })
        const productsUpdated = await productsCollection().updateOne({ _id: new ObjectId(productId) },
            { $inc: { totalRatings: ratings, totalRatedUser: 1 } },
            { upsert: true }
        )
        res.send(productsUpdated)
    } catch (err) {
        console.log(err)
    }
}

const deleteReview = async (req, res) => {
    try {
        const { productId, ratings } = await reviewsCollection().findOne({ _id: new ObjectId(req.params.id) })
        const result = await deleteDoc(req, reviewsCollection)
        if (!result) {
            return;
        }
        const productsUpdated = await productsCollection().updateOne({ _id: new ObjectId(productId) },
            { $inc: { totalRatings: ratings * (-1), totalRatedUser: -1 } },
            { upsert: true }
        )
        res.send(productsUpdated)
    } catch (err) {
        console.log(err)
    }
}

const getOneReview = async (req, res) => {
    try {
        const { userId, productId } = req.params
        const review = await reviewsCollection().findOne({ userId, productId })
        res.send(review || {})
    } catch (err) {
        console.log(err)
    }
}

const getSingleProductReviews = async (req, res) => {
    try {
        const { productId } = req.params
        const reviews = await reviewsCollection().find({ productId, status: "approved" }).toArray()
        res.send(reviews || [])
    } catch (err) {
        console.log(err)
    }
}

const makeReviewReply = async (req, res) => {
    try {
        const result = await createDoc(req, reviewRepliesCollection)
        res.send(result)
    } catch (err) {
        console.log(err)
    }
}

const getReviewReplies = async (req, res) => {
    try {
        const { commentId } = req.params
        const replies = await reviewRepliesCollection().find({ commentId }).toArray()
        res.send(replies)
    } catch (err) {
        console.log(err)
    }
}


module.exports = {
    getAllReviewsOfProduct,
    makeReview,
    updateReview,
    deleteReview,
    getOneReview,
    getSingleProductReviews,
    makeReviewReply,
    getReviewReplies,
}