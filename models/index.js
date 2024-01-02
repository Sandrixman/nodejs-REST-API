const { Contact, contactsJoiSchemas } = require("./contact")
const { Car } = require("./car")
const { Course, Product } = require("./course")
const { User, authJoiSchemas } = require("./user")

module.exports = {
    Course,
    Product,
    Car,
    Contact,
    contactsJoiSchemas,
    User,
    authJoiSchemas,
}
