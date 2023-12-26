const express = require("express")
const carsRouter = express.Router()
const { carsCtrl } = require("../../controllers")

carsRouter.get("/", carsCtrl.getCars)

module.exports = carsRouter
