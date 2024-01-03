const { ctrlWrapper } = require("../helpers")
const { Course, Product } = require("../models")

const getAllCourses = async (req, res) => {
    const courses = await Course.find()

    res.status(200).json(courses)
}

const getCourseByAlias = async (req, res) => {
    const { alias } = req.params

    const course = await Course.findOne({ "pages.alias": alias }, { "pages.$": 1 })
    if (!course || !course.pages || course.pages.length === 0) {
        return res.status(404).json({ error: "Курс не знайдено" })
    }
    const page = course.pages[0]

    res.status(200).json(page)
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
