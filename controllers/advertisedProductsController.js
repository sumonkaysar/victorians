const { advertisedProductsCollection } = require("../mongoDBConfig/collections")
const { readDoc, createDoc, updateDoc, deleteDoc, readOneDoc } = require("../utils/mongoQueries")
const { uploadFile } = require("../utils/uploadFile")

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
        // req.body.expireAt = new Date(Date.now() + Number(req.body.expireAt))
        // const index = await advertisedProductsCollection().createIndex({ "expireAt": 1 }, { expireAfterSeconds: 0 })
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
        const result = await updateDoc(req, advertisedProductsCollection)
        res.send(result)
    } catch (err) {
        console.log(err)
    }
}

const deleteProduct = async (req, res) => {
    try {
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