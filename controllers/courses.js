const { ctrlWrapper } = require("../helpers")
const { Course, Product } = require("../models")

const getAllCourses = async (req, res) => {
    const courses = await Course.find()

    res.status(200).json(courses)
}

const getCourseByAlias = async (req, res) => {
    const { alias } = req.params

    const course = await Course.findOne({ alias })
    if (!course) {
        return res.status(404).json({ error: "Курс не знайдено" })
    }

    res.status(200).json(course)
}

const getProducts = async (req, res) => {
    const { categories } = req.body

    const products = await Product.find({ categories })

    res.status(200).json(products)
}

module.exports = {
    getCourseByAlias: ctrlWrapper(getCourseByAlias),
    getAllCourses: ctrlWrapper(getAllCourses),
    getProducts: ctrlWrapper(getProducts),
}
