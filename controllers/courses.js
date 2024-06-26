const { ctrlWrapper } = require("../helpers")
const { Courses } = require("../models")

const getAllCourses = async (req, res) => {
    const menu = await Courses.find(
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
    const category = req.params

    const course = await Courses.findOne({ "pages.alias": category.alias }, { "pages.$": 1 })
    if (!course || !course.pages || course.pages.length === 0) {
        return res.status(404).json({ error: "Курс не знайдено" })
    }
    const page = course.pages[0]

    res.status(200).json(page)
}

module.exports = {
    getAllCourses: ctrlWrapper(getAllCourses),
    getCourseByAlias: ctrlWrapper(getCourseByAlias),
}
