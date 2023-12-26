const { couponsCollection } = require("../mongoDBConfig/collections")
const { readDoc, createDoc, updateDoc, deleteDoc } = require("../utils/mongoQueries")

const getAllCoupons = async (req, res) => {
    try {
        const products = await readDoc(couponsCollection)
        res.send(products)
    } catch (err) {
        console.log(err)
    }
}

const createCoupon = async (req, res) => {
    try {
        const result = await createDoc(req, couponsCollection)
        res.send(result)
    } catch (err) {
        console.log(err)
    }
}

const updateCoupon = async (req, res) => {
    try {
        const result = await updateDoc(req, couponsCollection)
        res.send(result)
    } catch (err) {
        console.log(err)
    }
}

const deleteCoupon = async (req, res) => {
    try {
        const result = await deleteDoc(req, couponsCollection)
        res.send(result)
    } catch (err) {
        console.log(err)
    }
}

const matchCoupon = async (req, res) => {
    try {
        const { applicationId, couponCode } = req.body
        const result = await couponsCollection().findOne({ applicationId, couponCode })
        if (result) {
            return res.send(result)
        }
        res.status(404).send({ status: 404, message: "Invalid Coupon Code" })
    } catch (err) {
        console.log(err)
    }
}


module.exports = {
    getAllCoupons,
    createCoupon,
    updateCoupon,
    deleteCoupon,
    matchCoupon,
}