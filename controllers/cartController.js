const { ObjectId } = require("mongodb")
const { cartCollection, productsCollection } = require("../mongoDBConfig/collections")
const { readDoc } = require("../utils/mongoQueries")

const getCartProducts = async (req, res) => {
    try {
        const products = await readDoc(cartCollection)
        res.send(products)
    } catch (err) {
        console.log(err)
    }
}

const saveCartProduct = async (req, res) => {
    try {
        const { userId, product } = req.body
        const cartItem = await cartCollection().findOne({ userId })
        let result = {};
        if (cartItem) {
            result = await cartCollection().updateOne({ userId }, { $push: { "products": product } })
        } else {
            result = await cartCollection().insertOne({ userId, products: [product] })
        }
        res.send(result)
    } catch (err) {
        console.log(err)
    }
}

const deleteCartProduct = async (req, res) => {
    try {
        const { productId, userId } = req.params
        const result = await cartCollection().updateOne({ userId }, { $pull: { "products": { productId } } })
        res.send(result)
    } catch (err) {
        console.log(err)
    }
}

const getMyCartProducts = async (req, res) => {
    try {
        const { userId } = req.query
        const myCart = await cartCollection().findOne({ userId })
        if (!myCart?.products?.length > 0) {
            return res.send([])
        }
        const { products } = myCart
        const cartProducts = await productsCollection().aggregate([
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
                    popular: 1,
                }
            }
        ]).toArray()
        const totalPrice = cartProducts.reduce((total, product) => total + (product.packages[0] ? Number(product.packages[0].packagePrice) : 0), 0)
        res.send({ cartProducts, totalPrice, cartId: myCart._id } || {})
    } catch (err) {
        console.log(err)
    }
}

const inCartAlready = async (req, res) => {
    try {
        const { userId, productId } = req.query
        const result = await cartCollection().findOne({ userId, "products.productId": productId })
        res.send(!!(result?.userId))
    } catch (err) {
        console.log(err)
    }
}

const getCartPackage = async (req, res) => {
    try {
        const { packageId } = req.params
        const product = await productsCollection().findOne({ "packages.id": packageId })
        const package = product?.packages?.find(package => package.id === packageId)
        res.send(package || {})
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    getCartProducts,
    saveCartProduct,
    deleteCartProduct,
    inCartAlready,
    getMyCartProducts,
    getCartPackage,
}