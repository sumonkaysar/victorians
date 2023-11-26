const { couponsCollection } = require("../mongoDBConfig/collections")
const { readDoc, createDoc, updateDoc, deleteDoc, readOneDoc } = require("../utils/mongoQueries")

const getAllCoupons = async (req, res) => {
    const products = await readDoc(couponsCollection)
    res.send(products)
}

const createCoupon = async (req, res) => {
    const result = await createDoc(req, couponsCollection)
    res.send(result)
}

const updateCoupon = async (req, res) => {
    const result = await updateDoc(req, couponsCollection)
    res.send(result)
}

const deleteCoupon = async (req, res) => {
    const result = await deleteDoc(req, couponsCollection)
    res.send(result)
}

const matchCoupon = async (req, res) => {
    const {applicationId, couponCode} = req.body
    const result = await couponsCollection().findOne({applicationId, couponCode})
    if (result) {
        return res.send(result)
    }
    res.status(404).send({status: 404, message: "Invalid Coupon Code"})
}


module.exports = {
    getAllCoupons,
    createCoupon,
    updateCoupon,
    deleteCoupon,
    matchCoupon,
}