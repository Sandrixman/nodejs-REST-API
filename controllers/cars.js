const { ctrlWrapper } = require("../helpers")
const { Car } = require("../models")

const getCars = async (req, res) => {
    const { page = 1, limit = 0 } = req.query
    const skip = (page - 1) * limit

    const cars = await Car.find().skip(skip).limit(parseInt(limit, 10))

    res.status(200).json(cars)
}

module.exports = {
    getCars: ctrlWrapper(getCars),
}
