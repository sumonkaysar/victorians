const { ObjectId } = require("mongodb")
const { cartCollection, productsCollection } = require("../mongoDBConfig/collections")
const { readDoc, deleteDoc } = require("../utils/mongoQueries")

const getCartProducts = async (req, res) => {
    const products = await readDoc(cartCollection)
    res.send(products)
}

const saveCartProduct = async (req, res) => {
    const { userId, product } = req.body
    const cartItem = await cartCollection().findOne({ userId })
    let result = {};
    if (cartItem) {
        result = await cartCollection().updateOne({ userId }, { $push: { "products": product } })
    } else {
        result = await cartCollection().insertOne({ userId, products: [product] })
    }
    res.send(result)
}

const deleteCartProduct = async (req, res) => {
    const {productId, userId} = req.params
    const result = await cartCollection().updateOne({ userId }, { $pull: { "products": {productId} } })
    res.send(result)
}

const getMyCartProducts = async (req, res) => {
    const { userId } = req.query
    const myCart = await cartCollection().findOne({ userId })
    if (!myCart?.products) {
        return res.send([])
    }
    const productIds = myCart.products.map(product => new ObjectId(product.productId))
    const totalPrice = myCart.products.reduce((total, product) => total + product.price, 0)
    const products = await productsCollection().find({ _id: { $in: productIds } }).toArray()
    const cartProducts = products.map((product, i) => {
        product.packageId = myCart.products[i].packageId
        return product
    })
    res.send({cartProducts, totalPrice} || {})
}

const inCartAlready = async (req, res) => {
    const { userId, productId } = req.query
    const result = await cartCollection().findOne({ userId, "products.productId": productId })
    res.send(!!result)
}

const getCartPackage = async (req, res) => {
    const { packageId } = req.params
    const product = await productsCollection().findOne({ "packages.id": packageId })
    const package = product?.packages?.find(package => package.id === packageId)
    res.send(package || {})
}

module.exports = {
    getCartProducts,
    saveCartProduct,
    deleteCartProduct,
    inCartAlready,
    getMyCartProducts,
    getCartPackage,
}