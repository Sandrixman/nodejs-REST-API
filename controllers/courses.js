const { ctrlWrapper } = require("../helpers")
const { Course, Product } = require("../models")

const getAllCourses = async (req, res) => {
    const menu = await Course.find(
        {},
        {
            _id: 1,
            firstCategory: 1,
            "pages._id": 1,
            "pages.category": 1,
            "pages.alias": 1,
            "pages.title": 1,
        }
    )

    res.status(200).json(menu)
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
