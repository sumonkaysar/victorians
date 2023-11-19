const { cartCollection } = require("../mongoDBConfig/collections")
const { readDoc, createDoc, updateDoc, deleteDoc, readOneDoc } = require("../utils/mongoQueries")

const getCartProducts = async (req, res) => {
    const products = await readDoc(cartCollection)
    res.send(products)
}

const saveCartProduct = async (req, res) => {
    const result = await createDoc(req, cartCollection)
    res.send(result)
}

const deleteCartProduct = async (req, res) => {
    const result = await deleteDoc(req, cartCollection)
    res.send(result)
}

module.exports = {
    getCartProducts,
    saveCartProduct,
    deleteCartProduct,
}