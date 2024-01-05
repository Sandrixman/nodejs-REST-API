const { ctrlWrapper } = require("../helpers")
const { Product } = require("../models")

const getProducts = async (req, res) => {
    const { categories } = req.body

    const products = await Product.find({ categories })

    res.status(200).json(products)
}

module.exports = {
    getProducts: ctrlWrapper(getProducts),
}
