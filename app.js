const express = require("express")
const logger = require("morgan")
const cors = require("cors")
const swaggerUi = require("swagger-ui-express")
const swaggerDoc = require("./swagger.json")
const {
    contactsRouter,
    authRouter,
    carsRouter,
    servicesRouter,
    coursesRouter,
    productsRouter,
} = require("./routes/api")

const app = express()

const formatsLogger = app.get("env") === "development" ? "dev" : "short"

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())
app.use(express.static("public"))

app.use("/contacts", contactsRouter)
app.use("/users", authRouter)
app.use("/cars", carsRouter)
app.use("/courses", coursesRouter)
app.use("/services", servicesRouter)
app.use("/products", productsRouter)
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc))

app.use((req, res) => {
    res.status(404).json({ message: "Not found" })
})

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        error: err.message || "Internal Server Error",
    })
})

module.exports = app
