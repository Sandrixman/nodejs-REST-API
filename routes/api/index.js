const contactsRouter = require("./contacts")
const authRouter = require("./auth")
const carsRouter = require("./cars")
const coursesRouter = require("./courses")
const servicesRouter = require("./services")
const productsRouter = require("./products")

module.exports = {
    carsRouter,
    contactsRouter,
    authRouter,
    coursesRouter,
    servicesRouter,
    productsRouter,
}
