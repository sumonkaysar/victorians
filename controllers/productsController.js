const { productsCollection } = require("../mongoDBConfig/collections")
const { readDoc, createDoc, updateDoc, deleteDoc, readOneDoc } = require("../utils/mongoQueries")
const { uploadFile } = require("../utils/uploadFile")

const getAllProducts = async (req, res) => {
    const products = await readDoc(productsCollection)
    res.send(products)
}

const saveProduct = async (req, res) => {
    req.body.image = uploadFile(req.file.filename)
    const result = await createDoc(req, productsCollection)
    res.send(result)
}

const updateProduct = async (req, res) => {
    const result = await updateDoc(req, productsCollection)
    res.send(result)
}

const deleteProduct = async (req, res) => {
    const result = await deleteDoc(req, productsCollection)
    res.send(result)
}

const getOneProduct = async (req, res) => {
    const result = await readOneDoc(req, productsCollection)
    res.send(result || {})
}


module.exports = {
    getAllProducts,
    saveProduct,
    updateProduct,
    deleteProduct,
    getOneProduct,
}