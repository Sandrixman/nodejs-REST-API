const express = require("express")
const servicesRouter = express.Router()
const { servicesCtrl } = require("../../controllers")

servicesRouter.get("/", servicesCtrl.getAllServices)
servicesRouter.get("/:alias", servicesCtrl.getServiceByAlias)

module.exports = servicesRouter
