const express = require("express")
const productsRouter = express.Router()
const { productsCtrl } = require("../../controllers")

productsRouter.post("/", productsCtrl.getProducts)

module.exports = productsRouter
