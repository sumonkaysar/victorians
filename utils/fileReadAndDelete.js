const fs = require("fs");

const readFiles = (res, filename) => {
    fs.readFile(
        `./uploaded-files/${filename}`,

        function (err, image) {
            if (err) {
                console.log(err);
                return res.status(404).send({message: "file not Found"})
            }
            res.setHeader('Content-Type', 'image/jpg');
            res.send(image);
        }
    );
}

const deleteFiles = (filename) => {
    fs.unlink(
        `./uploaded-files/${filename}`,
        function (err) {
            if (err) console.log(err)
        }
    );
}

module.exports = {
    readFiles,
    deleteFiles,
}