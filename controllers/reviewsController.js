const { reviewsCollection } = require("../mongoDBConfig/collections")
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
    const result = await updateDoc(req, reviewsCollection)
    res.send(result)
}

const deleteReview = async (req, res) => {
    const result = await deleteDoc(req, reviewsCollection)
    res.send(result)
}

const getOneReview = async (req, res) => {
    const result = await readOneDoc(req, reviewsCollection)
    res.send(result || {})
}


module.exports = {
    getAllReviewsOfProduct,
    makeReview,
    updateReview,
    deleteReview,
    getOneReview,
}