const axios = require("axios");
const { productsCollection, usersCollection, pendingPaymentsCollection, purchasesCollection, premiumCollection, cartCollection, packagesCollection, notificationsCollection } = require('../mongoDBConfig/collections')
const { ObjectId } = require('mongodb')

const aamarpayURL = process.env.AAMARPAY_URL
const store_id = process.env.STORE_ID
const signature_key = process.env.SIGNATURE_KEY
const server = process.env.SERVER
const client = process.env.CLIENT
let productNames = ""

const makeProductsPayment = async (req, res) => {
  try {
    const { products } = req.body

    const dbProducts = await productsCollection().aggregate([
      {
        $match: {
          $or: products.map(product => ({ "_id": new ObjectId(product.productId) }))
        }
      },
      {
        $project: {
          _id: 1,
          sof_name: 1,
          packages: {
            $filter: {
              input: "$packages",
              as: "package",
              cond: { $or: products.map(product => ({ $eq: ["$$package.id", product.packageId] })) }
            }
          },
        }
      }
    ]).toArray()
    req.body.products.forEach(product => product.duration = dbProducts.find(dbProduct => dbProduct._id.valueOf() == product.productId).packages[0].packageDuration)
    const totalPrice = dbProducts.reduce((total, product) => {
      const price = product.packages[0] ? Number(product.packages[0].packagePrice) : 0
      const discount = products?.find(p => p.productId === (product._id + ""))?.discount || 0
      total = total + price - Math.floor(price * discount / 100)
      return total
    }, 0)
    const names = dbProducts.map(product => product.sof_name).join(", ")
    makePayment(req, res, totalPrice, names)
  } catch (err) {
    console.log(err)
  }
};

const makePackagePayment = async (req, res) => {
  try {
    const { products, bundleId } = req.body

    const dbProducts = await productsCollection().aggregate([
      {
        $match: {
          $or: products.map(product => ({ "_id": new ObjectId(product.productId) }))
        }
      },
      {
        $project: {
          sof_name: 1,
        }
      }
    ]).toArray()
    const packageInfo = await packagesCollection().findOne({ "_id": new ObjectId(bundleId) })
    const names = dbProducts.map(product => product.sof_name).join(", ")
    const totalPrice = packageInfo.packagePrice - packageInfo.packagePrice * packageInfo.packageDiscount / 100

    makePayment(req, res, totalPrice, names)
  } catch (err) {
    console.log(err)
  }
};

const makePayment = async (req, res, totalPrice, names) => {
  try {
    const { userId, products, cartId, bundleId } = req.body
    const index = await pendingPaymentsCollection().createIndex({ "expireAt": 1 }, { expireAfterSeconds: 0 })
    if (!index) {
      return res.status(400).json({ error: 'Something went wrong' })
    }
    const transactionId = `VICTORIANS_${new Date().getTime()}_${Math.random().toString(36).slice(2).toUpperCase()}`
    const result = await pendingPaymentsCollection().insertOne({
      userId,
      products,
      transactionId,
      cartId,
      bundleId,
      expireAt: new Date(Date.now() + 2 * 86400000) // remain for 2 days
    })
    if (!result) {
      return res.status(400).json({ error: 'Something went wrong' })
    }
    const user = await usersCollection().findOne({ _id: new ObjectId(userId) })
    const formData = {
      signature_key,
      store_id,
      amount: totalPrice,
      currency: "BDT",
      tran_id: transactionId,
      desc: names,
      cus_name: `${user.firstName} ${user.lastName}`,
      cus_email: user.email,
      cus_phone: user.mobile || "+8801700000000",
      cus_add1: user.location,
      success_url: `${server}/payment/success`,
      fail_url: `${server}/payment/failure`,
      cancel_url: `${server}/payment/cancel`,
      type: "json",
    };
    const { data } = await axios.post(aamarpayURL, formData);
    if (data.result !== "true") {
      let errorMessage = "";
      for (let key in data) {
        errorMessage += data[key] + ". ";
      }
      return res.status(500).json({
        title: "error",
        errorMessage,
      });
    }
    productNames = names
    res.status(200).send({ payment_url: data.payment_url });
  } catch (err) {
    console.log(err)
  }
}

const paymentSuccess = async (req, res) => {
  try {
    const { mer_txnid: transactionId } = req.body
    const pendingPayment = await pendingPaymentsCollection().findOne({ transactionId })
    const { products, userId, bundleId } = pendingPayment

    const purchasingTime = new Date().getTime()
    const result = await purchasesCollection().insertOne({
      products,
      userId,
      paymentData: req.body,
      purchasingTime,
      bundleId,
    })
    if (!result) {
      return res.status(400).json({ error: 'Something went wrong' })
    }
    const newProducts = products.map(product => ({ ...product, purchasingTime, adminSeen: false }))
    const result2 = await premiumCollection().updateOne({ userId }, {
      $addToSet: {
        products: { $each: newProducts }
      }
    }, { upsert: true })
    if (!result2) {
      return res.status(400).json({ error: 'Something went wrong' })
    }
    const result3 = await pendingPaymentsCollection().deleteOne({ transactionId })
    if (!result3) {
      return res.status(400).json({ error: 'Something went wrong' })
    }
    const result4 = await cartCollection().deleteOne({ _id: new ObjectId(pendingPayment.cartId) })
    if (!result4) {
      return res.status(400).json({ error: 'Something went wrong' })
    }
    // notification
    const index = await notificationsCollection().createIndex({ "expireAt": 1 }, { expireAfterSeconds: 0 })
    if (!index) {
      return res.status(400).json({ error: 'Something went wrong' })
    }
    const result5 = await notificationsCollection().insertOne({
      userId,
      productsIds: products.map(product => product.productId),
      type: "purchased",
      seen: false,
      time: purchasingTime,
      expireAt: new Date(Date.now() + 30 * 86400000) // remain for 30 days
    })
    if (!result5) {
      return res.status(400).json({ error: 'Something went wrong' })
    }
    res.redirect(`${client}?paymentStatus=success&products=${productNames}`)
  } catch (err) {
    console.log(err)
    res.redirect(`${client}?paymentStatus=error`)
  }
}

const paymentFailure = async (req, res) => {
  try {
    res.redirect(`${client}?paymentStatus=failure`)
  } catch (err) {
    console.log(err)
  }
}

const paymentCancel = async (req, res) => {
  try {
    res.redirect(`${client}?paymentStatus=cancelled`)
  } catch (err) {
    console.log(err)
  }
}

module.exports = {
  makeProductsPayment,
  makePackagePayment,
  paymentSuccess,
  paymentFailure,
  paymentCancel,
}