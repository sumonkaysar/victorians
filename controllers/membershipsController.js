const { membershipsCollection } = require("../mongoDBConfig/collections")
const { readDoc, createDoc, updateDoc, deleteDoc, readOneDoc } = require("../utils/mongoQueries")

const getMemberships = async (req, res) => {
    const products = await readDoc(membershipsCollection)
    res.send(products)
}

const saveMembership = async (req, res) => {
    const result = await createDoc(req, membershipsCollection)
    res.send(result)
}

const updateMembership = async (req, res) => {
    const result = await updateDoc(req, membershipsCollection)
    res.send(result)
}

const deleteMembership = async (req, res) => {
    const result = await deleteDoc(req, membershipsCollection)
    res.send(result)
}

const getOneMembership = async (req, res) => {
    const result = await readOneDoc(req, membershipsCollection)
    res.send(result || {})
}

module.exports = {
    getMemberships,
    saveMembership,
    deleteMembership,
    updateMembership,
    getOneMembership,
}