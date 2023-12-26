const { pdfMakeFunction } = require("../controllers/pdfController")

const pdfMakeRouter = require("express").Router()

pdfMakeRouter.post("/", pdfMakeFunction);

module.exports = pdfMakeRouter;