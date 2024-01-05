const { Contact, contactsJoiSchemas } = require("./contact")
const { Car } = require("./car")
const { Services, Courses, Product } = require("./firstCategory")
const { User, authJoiSchemas } = require("./user")

module.exports = {
    Services,
    Courses,
    Product,
    Car,
    Contact,
    contactsJoiSchemas,
    User,
    authJoiSchemas,
}
