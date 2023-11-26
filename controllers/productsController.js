const { ObjectId } = require("mongodb")
const { productsCollection } = require("../mongoDBConfig/collections")
const { readDoc, createDoc, updateDoc, deleteDoc, readOneDoc } = require("../utils/mongoQueries")
const { uploadFile } = require("../utils/uploadFile")
const { deleteFiles } = require("../utils/fileReadAndDelete")

const getAllProducts = async (req, res) => {
    const products = await readDoc(productsCollection)
    res.send(products)
}

const saveProduct = async (req, res) => {
    req.body.img = uploadFile(req.file.filename)
    const result = await createDoc(req, productsCollection)
    res.send(result)
}

const updateProduct = async (req, res) => {
    const result = await updateDoc(req, productsCollection)
    res.send(result)
}

const deleteProduct = async (req, res) => {
    const product = await productsCollection().findOne({ _id: new ObjectId(req.params.id) })
    deleteFiles(product.image.split("files/")[1])
    const result = await deleteDoc(req, productsCollection)
    res.send(result)
}

const getOneProduct = async (req, res) => {
    const result = await readOneDoc(req, productsCollection)
    res.send(result || {})
}

const getPopularProducts = async (req, res) => {
    const popularProducts = await productsCollection().find({popular: true}).toArray()
    res.send(popularProducts)
}

module.exports = {
    getAllProducts,
    saveProduct,
    updateProduct,
    deleteProduct,
    getOneProduct,
    getPopularProducts,
}