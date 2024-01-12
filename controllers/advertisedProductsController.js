const { ObjectId } = require("mongodb")
const { advertisedProductsCollection } = require("../mongoDBConfig/collections")
const { readDoc, createDoc, updateDoc, deleteDoc, readOneDoc } = require("../utils/mongoQueries")
const { uploadFile } = require("../utils/uploadFile")
const { deleteFiles } = require("../utils/fileReadAndDelete")

const getAllProducts = async (req, res) => {
    try {
        const products = await readDoc(advertisedProductsCollection)
        res.send(products)
    } catch (err) {
        console.log(err)
    }
}

const saveProduct = async (req, res) => {
    try {
        req.body.adImg = uploadFile(req.file.filename)
        if (req.body.selectedProducts) {
            req.body.selectedProducts = JSON.parse(req.body.selectedProducts)
        }
        const result = await createDoc(req, advertisedProductsCollection)
        res.send(result)
    } catch (err) {
        console.log(err)
    }
}

const updateProduct = async (req, res) => {
    try {
        if (req.file?.filename) {
            req.body.adImg = uploadFile(req.file.filename)
        }
        if (req.body.selectedProducts) {
            req.body.selectedProducts = JSON.parse(req.body.selectedProducts)
        }
        const result = await updateDoc(req, advertisedProductsCollection)
        res.send(result)
    } catch (err) {
        console.log(err)
    }
}

const deleteProduct = async (req, res) => {
    try {
        const ad = await advertisedProductsCollection().findOne({ _id: new ObjectId(req.params.id) })
        deleteFiles(ad.adImg.split("files/")[1])
        const result = await deleteDoc(req, advertisedProductsCollection)
        res.send(result)
    } catch (err) {
        console.log(err)
    }
}

const getOneProduct = async (req, res) => {
    try {
        const result = await readOneDoc(req, advertisedProductsCollection)
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