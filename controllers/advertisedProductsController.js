const { productsCollection } = require("../mongoDBConfig/collections")
const { readDoc, createDoc, updateDoc, deleteDoc, readOneDoc } = require("../utils/mongoQueries")

const getAllProducts = async (req, res) => {
    try {
        const products = await readDoc(productsCollection)
        res.send(products)
    } catch (err) {
        console.log(err)
    }
}

const saveProduct = async (req, res) => {
    try {
        const result = await createDoc(req, productsCollection)
        res.send(result)
    } catch (err) {
        console.log(err)
    }
}

const updateProduct = async (req, res) => {
    try {
        const result = await updateDoc(req, productsCollection)
        res.send(result)
    } catch (err) {
        console.log(err)
    }
}

const deleteProduct = async (req, res) => {
    try {
        const result = await deleteDoc(req, productsCollection)
        res.send(result)
    } catch (err) {
        console.log(err)
    }
}

const getOneProduct = async (req, res) => {
    try {
        const result = await readOneDoc(req, productsCollection)
        res.send(result || {})
    } catch (err) {
        console.log(err)
    }
}


module.exports = {
    getAllProducts,
    saveProduct,
    updateProduct,
    deleteProduct,
    getOneProduct,
}