const express = require("express")
const { Pool } = require("pg")

const sql = express()
const port = 3100

const pool = new Pool({
    user: "postgres",
    host: "nodejs-homework-rest-api-7or0.onrender.com",
    database: "postgres",
    password: "28101981",
    port: 5432,
})

pool.connect()
    .then(() => {
        sql.listen(port)
        console.log("Connected to PostgreSQL")
    })
    .catch((err) => console.error("Connection error", err.stack))

sql.get("/score", (req, res) => {
    pool.query("SELECT * FROM score_list")
        .then((result) => {
            res.json(result.rows)
        })
        .catch((error) => {
            console.error("Error executing query", error)
            res.status(500).send("Internal Server Error")
        })
})

sql.post("/score", (req, res) => {
    const { name, score } = req.body

    const insertQuery = {
        text: "INSERT INTO score_list(name, score) VALUES($1, $2)",
        values: [name, score],
    }

    pool.query(insertQuery)
        .then((result) => {
            res.status(201).send("Player added successfully")
        })
        .catch((error) => {
            console.error("Error executing query", error)
            res.status(500).send("Internal Server Error")
        })
})
