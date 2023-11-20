const fs = require("fs");
const { productsCollection } = require("../mongoDBConfig/collections");

const uploadFile = async (req, res) => {
    const product = req.body
    product.image = `http://localhost:5000/upload/files/${req.file.filename}`
    
    const result = await productsCollection().insertOne(product)
    res.send({result, file: product.image})
}

const showUploadedFiles = async (req, res) => {
    fs.readFile(
        `./uploaded-files/${req.params.name}`,

        function (err, image) {
            if (err) {
                throw err;
            }
            res.setHeader('Content-Type', 'image/jpg');
            res.send(image);
        }
    );
}


module.exports = {
    uploadFile,
    showUploadedFiles,
}