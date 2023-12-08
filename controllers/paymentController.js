const SSLCommerzPayment = require('sslcommerz-lts')
const { productsCollection, usersCollection, pendingPaymentsCollection, purchasesCollection, premiumCollection } = require('../mongoDBConfig/collections')
const { ObjectId } = require('mongodb')

const store_id = process.env.STORE_ID
const store_passwd = process.env.STORE_PASS
const server = process.env.SERVER
const client = process.env.CLIENT

// IS THE SERVER IN LIVE(PODUCTION)
const is_live = false

const makePayment = async (req, res) => {
  const { userId, products } = req.body
  const tarnsactionId = `VICTORIANS_${new Date().getTime()}_${Math.random().toString(36).slice(2).toUpperCase()}`

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
        startPrice: 1,
        endPrice: 1,
        description: 1,
        packages: {
          $filter: {
            input: "$packages",
            as: "package",
            cond: { $or: products.map(product => ({ $eq: ["$$package.id", product.packageId] })) }
          }
        },
        img: 1,
        popular: 1
      }
    }
  ]).toArray()
  const totalPrice = dbProducts.reduce((total, product) => total + (product.packages[0] ? Number(product.packages[0].packagePrice) : 0), 0)
  const index = await pendingPaymentsCollection().createIndex({ "expireAt": 1 }, { expireAfterSeconds: 0 })
  if (!index) {
    return res.status(400).json({ error: 'Something went wrong' })
  }
  const result = await pendingPaymentsCollection().insertOne({
    userId,
    products,
    tarnsactionId,
    expireAt: new Date(Date.now() + 2 * 86400000) // remain for 2 days
  })
  if (!result) {
    return res.status(400).json({ error: 'Something went wrong' })
  }
  const user = await usersCollection().findOne({ _id: new ObjectId(userId) })

  const data = {
    total_amount: totalPrice,
    currency: 'BDT',
    tran_id: tarnsactionId,
    success_url: `${server}/payment/success`,
    fail_url: `${server}/payment/failure`,
    cancel_url: `${server}/payment/cancel`,
    ipn_url: `${server}/payment/ipn`,
    shipping_method: 'NO',
    product_name: dbProducts.map(product => product.sof_name).join(", "),
    product_category: 'Software',
    product_profile: 'general',
    cus_name: `${user.firstName} ${user.lastName}`,
    cus_email: user.email,
    cus_add1: user.location,
    cus_country: 'Bangladesh',
    cus_phone: '01700000000',
  };
  const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live)
  sslcz.init(data).then(apiResponse => {
    let GatewayPageURL = apiResponse.GatewayPageURL
    res.send({ GatewayPageURL })
  });
};

const paymentSuccess = async (req, res) => {

  const { tran_id: tarnsactionId } = req.body
  const pendingPayment = await pendingPaymentsCollection().findOne({ tarnsactionId })
  const {products, userId} = pendingPayment
  const result = await purchasesCollection().insertOne({
    products,
    userId,
    paymentData: req.body,
    purchasingTime: new Date().getTime
  })
  if (!result) {
    return res.status(400).json({ error: 'Something went wrong' })
  }
  const result2 = await premiumCollection().updateOne({userId}, {
    $addToSet: {
      products: { $each: products }
    }
  }, {upsert: true})
  if (!result2) {
    return res.status(400).json({ error: 'Something went wrong' })
  }
  const result3 = await pendingPaymentsCollection().deleteOne({tarnsactionId})
  if (!result3) {
    return res.status(400).json({ error: 'Something went wrong' })
  }
  res.redirect(`${client}/payment?status=success`)
}

const paymentFailure = async (req, res) => {
  res.redirect(`${client}/payment?status=failure`)
}

const paymentCancel = async (req, res) => {
  res.redirect(`${client}/payment?status=cancelled`)
}

const paymentIpn = async (req, res) => {
  res.redirect(`${client}/payment?status=ipn`)
}


module.exports = {
  makePayment,
  paymentSuccess,
  paymentFailure,
  paymentCancel,
  paymentIpn,
}