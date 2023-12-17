const { ObjectId } = require("mongodb")
const { reviewsCollection, usersCollection, productsCollection } = require("../mongoDBConfig/collections")
const { readDoc, createDoc, updateDoc, deleteDoc, readOneDoc } = require("../utils/mongoQueries")

const getAllReviewsOfProduct = async (req, res) => {
    const products = await readDoc(reviewsCollection)
    res.send(products)
}

const makeReview = async (req, res) => {
    const result = await createDoc(req, reviewsCollection)
    res.send(result)
}

const updateReview = async (req, res) => {
    // const result = await updateDoc(req, reviewsCollection)
    const reviewUpdated = await updateDoc(req, reviewsCollection)
    if (!reviewUpdated) {
        return;
    }
    const { productId, ratings } = await reviewsCollection().findOne({ _id: new ObjectId(req.params.id) })
    const productsUpdated = await productsCollection().updateOne({ _id: new ObjectId(productId) },
        { $inc: { totalRatings: ratings } },
        { upsert: true }
    )
    res.send(productsUpdated)
}

const deleteReview = async (req, res) => {
    const result = await deleteDoc(req, reviewsCollection)
    res.send(result)
}

const getOneReview = async (req, res) => {
    const { userId, productId } = req.params
    const review = await reviewsCollection().findOne({ userId, productId })
    res.send(review || {})
}


module.exports = {
    getAllReviewsOfProduct,
    makeReview,
    updateReview,
    deleteReview,
    getOneReview,
}