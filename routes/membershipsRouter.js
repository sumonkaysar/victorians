const { getMemberships, getOneMembership, saveMembership, updateMembership, deleteMembership } = require("../controllers/membershipsController")

const membershipsRouter = require("express").Router()

membershipsRouter.get("/", getMemberships)

membershipsRouter.post("/", saveMembership)

membershipsRouter.patch("/:id", updateMembership)

membershipsRouter.delete("/:id", deleteMembership)

membershipsRouter.get("/:id", getOneMembership)

module.exports = membershipsRouter