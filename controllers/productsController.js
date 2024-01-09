const { ObjectId } = require("mongodb")
const { productsCollection, premiumCollection } = require("../mongoDBConfig/collections")
const { readDoc, createDoc, updateDoc, deleteDoc, readOneDoc } = require("../utils/mongoQueries")
const { uploadFile } = require("../utils/uploadFile")
const { deleteFiles } = require("../utils/fileReadAndDelete")

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
        req.body.img = uploadFile(req.file.filename)
        req.body.packages = JSON.parse(req.body.packages)
        const result = await createDoc(req, productsCollection)
        res.send(result)
    } catch (err) {
        console.log(err)
    }
}

const updateProduct = async (req, res) => {
    try {
        if (req.file?.filename) {
            req.body.img = uploadFile(req.file.filename)
        }
        if (req.body.packages) {
            req.body.packages = JSON.parse(req.body.packages)
        }
        const result = await updateDoc(req, productsCollection)
        res.send(result)
    } catch (err) {
        console.log(err)
    }
}

const deleteProduct = async (req, res) => {
    try {
        const product = await productsCollection().findOne({ _id: new ObjectId(req.params.id) })
        deleteFiles(product.image.split("files/")[1])
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

const getPopularProducts = async (req, res) => {
    try {
        const popularProducts = await productsCollection().find({ popular: true }).toArray()
        res.send(popularProducts)
    } catch (err) {
        console.log(err)
    }
}

const searchProducts = async (req, res) => {
    try {
        const { name } = req.query
        const products = await productsCollection().find({ sof_name: { '$regex': name, '$options': 'i' } }).toArray()
        res.send(products)
    } catch (err) {
        console.log(err)
    }
}

const makeProductPopular = async (req, res) => {
    try {
        const result = await updateDoc(req, productsCollection)
        res.send(result)
    } catch (err) {
        console.log(err)
    }
}

const getPackageProducts = async (req, res) => {
    try {
        const { name } = req.query
        const result = await productsCollection().find({ "packages.packageName": name }).toArray()
        res.send(result)
    } catch (err) {
        console.log(err)
    }
}

const getCategoryProducts = async (req, res) => {
    try {
        const { name } = req.query
        const result = await productsCollection().find({ "category": name }).toArray()
        res.send(result)
    } catch (err) {
        console.log(err)
    }
}

const getMyPaidProducts = async (req, res) => {
    try {
        const { userId } = req.query
        const paidProductsInfo = await premiumCollection().findOne({ userId })
        if (!(paidProductsInfo?.products?.length > 0)) {
            return res.json([])
        }
        res.send(paidProductsInfo)
    } catch (err) {
        console.log(err)
    }
}

const getAllProductsNamesByProductIds = async (req, res) => {
    try {
        const productIds = req.body.map(id => new ObjectId(id))
        const products = await productsCollection().aggregate([
            {
                $match: { _id: { $in: productIds } }
            },
            { $project: { sof_name: 1 } },
        ]).toArray()
        res.send({ status: 200, products })
    } catch (err) {
        console.log(err)
    }
}

const getProductsByProductIdAndPackageId = async (req, res) => {
    try {
        const selectedProducts = req.body
        const products = await productsCollection().aggregate([
            {
                $match: {
                    $or: selectedProducts.map(product => ({ "_id": new ObjectId(product.productId) }))
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
                            cond: { $or: selectedProducts.map(product => ({ $eq: ["$$package.id", product.packageId] })) }
                        }
                    },
                    img: 1,
                    popular: 1,
                }
            }
        ]).toArray()
        res.send(products)
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
    getPopularProducts,
    searchProducts,
    makeProductPopular,
    getPackageProducts,
    getCategoryProducts,
    getMyPaidProducts,
    getAllProductsNamesByProductIds,
    getProductsByProductIdAndPackageId,
}