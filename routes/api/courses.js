const express = require("express")
const coursesRouter = express.Router()
const { coursesCtrl } = require("../../controllers")

coursesRouter.get("/", coursesCtrl.getAllCourses)
coursesRouter.get("/:alias", coursesCtrl.getCourseByAlias)

module.exports = coursesRouter
