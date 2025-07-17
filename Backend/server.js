require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { connectTodb } = require("./config/dbConnection")
const app = express()


app.use(cors({
    origin: process.env.CLIENT_URL || "*",
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
}))

app.use(express.json())

const PORT = process.env.PORT || 3000;
connectTodb();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
