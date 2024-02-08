const { couponsCollection, productsCollection } = require("../mongoDBConfig/collections")
const { createDoc, deleteDoc } = require("../utils/mongoQueries")

const getAllCoupons = async (req, res) => {
    try {
        const couponInfo = await productsCollection().aggregate([
            { "$addFields": { "productId": { "$toString": "$_id" } } },
            {
                "$lookup": {
                    "from": "coupons",
                    "localField": "productId",
                    "foreignField": "productId",
                    "as": "couponInfo"
                }
            },
            {
                "$project": {
                    "sof_name": 1,
                    "couponInfo": 1
                }
            }
        ]).toArray()
        const coupons = couponInfo.map(coupon=> {
            coupon.couponInfo.forEach(singleInfo => singleInfo.sof_name=coupon.sof_name)
            return coupon.couponInfo
        })
        res.send(coupons.flat(1) || [])
    } catch (err) {
        console.log(err)
    }
}

const findCoupon = async (req, res) => {
    try {
        const {code, productId} = req.body
        const coupon = await couponsCollection().findOne({productId})
        if (coupon?.code === code) {
            return res.send({discount: coupon.discount})
        }
        res.send({error: "Not a valid coupon"})
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
        const {productId, type} = req.params
        const result = await couponsCollection().updateOne({productId, type},{
            $set: req.body
        })
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
    findCoupon,
}