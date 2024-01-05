const { ctrlWrapper } = require("../helpers")
const { Services } = require("../models")

const getAllServices = async (req, res) => {
    const menu = await Services.find(
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

const getServiceByAlias = async (req, res) => {
    const { alias } = req.params

    const course = await Services.findOne({ "pages.alias": alias }, { "pages.$": 1 })
    if (!course || !course.pages || course.pages.length === 0) {
        return res.status(404).json({ error: "Курс не знайдено" })
    }
    const page = course.pages[0]

    res.status(200).json(page)
}

module.exports = {
    getAllServices: ctrlWrapper(getAllServices),
    getServiceByAlias: ctrlWrapper(getServiceByAlias),
}
