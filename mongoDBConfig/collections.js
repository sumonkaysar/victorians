const { client } = require("./mongoClient")

const DB = 'victorians';

const productsCollection = () => client().db(DB).collection("products")

module.exports = {
    productsCollection,
}