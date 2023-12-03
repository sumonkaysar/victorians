const SSLCommerzPayment = require('sslcommerz-lts')
const { productsCollection } = require('../mongoDBConfig/collections')
const { ObjectId } = require('mongodb')

const store_id = process.env.STORE_ID
const store_passwd = process.env.STORE_PASS
const server = process.env.SERVER
const client = process.env.CLIENT

// IS THE SERVER IN LIVE(PODUCTION)
const is_live = process.env.IS_LIVE

const makePayment = async (req, res) => {
    const { userId, products } = req.body
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
                cond: {$or: products.map(product => ({ $eq: ["$$package.id", product.packageId] }))}
              }
            },
            img: 1,
            popular: 1
          }
        }
      ]).toArray()

    const tarnsactionId = `VICTORIANS_${new Date().getTime()}_${Math.random().toString(36).slice(2).toUpperCase()}`

    const data = {
        total_amount: 10000,
        currency: 'BDT',
        tran_id: tarnsactionId,
        success_url: `${server}/payment/success`,
        fail_url: `${server}/payment/failure`,
        cancel_url: `${server}/payment/cancel`,
        ipn_url: `${server}/payment/ipn`,
        shipping_method: 'NO',
        product_name: 'Sk c.',
        product_category: 'Electronic',
        product_profile: 'general',
        cus_name: 'sk Name',
        cus_email: 'sk@example.com',
        cus_add1: 'Dhaka',
        cus_postcode: '1000',
        cus_country: 'Bangladesh',
        cus_phone: '01614853501',
    };
    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live)
    sslcz.init(data).then(apiResponse => {
        res.data = data
        let GatewayPageURL = apiResponse.GatewayPageURL
        res.send({GatewayPageURL})
    });
};

const paymentSuccess = async (req, res) => {

    // const { tran_id } = req.app.get('data')
    console.log(req.body);
    // const data = {
    //     tran_id,
    //     status: "success"
    // }
    // const result = await usersCollection().updateOne(
    //     { uid: req.app.get('data').uid },
    //     { $set: { paidPremium: true } }
    // )
    // const queryString = Object.keys(data).map(key => key + '=' + data[key]).join('&')
    res.redirect(`${client}/payment`)
}

const paymentFailure = async (req, res) => {
    res.redirect(`${client}/payment?status=failure`)
}

const paymentCancel = async (req, res) => {
    res.redirect(`${client}/payment?status=cancelled`)
}

const paymentIpn = async (req, res) => {
    console.log(req.body);
    res.redirect(`${client}/payment?status=ipn`)
}


module.exports = {
    makePayment,
    paymentSuccess,
    paymentFailure,
    paymentCancel,
    paymentIpn,
}