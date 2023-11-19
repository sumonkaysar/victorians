const { ObjectId } = require("mongodb")

// create a mongodb document
const createDoc = (req, collection) => collection().insertOne(req.body)

// read all mongodb documents
const readDoc = (collection) => collection().find({}).toArray()

// update a mongodb document
const updateDoc = (req, collection) => collection().updateOne(
    {
        _id: new ObjectId(req.params.id)
    },
    {
        $set: req.body
    }
)

// delete a mongodb document
const deleteDoc = (req, collection) => collection().deleteOne({
    _id: new ObjectId(req.params.id)
})

// read a mongodb document
const readOneDoc = (req, collection) => collection().findOne({
    _id: new ObjectId(req.params.id)
})


module.exports = {
    createDoc,
    readDoc,
    updateDoc,
    deleteDoc,
    readOneDoc,
}