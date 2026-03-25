const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const connectDB = require('./config/db')
const { errorHandler } = require('./middleware/errorMiddleware')
const { error } = require('node:console')
const port = process.env.PORT || 5000
const path = require('path')
const cors = require('cors')

connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use(errorHandler)
app.use(cors())

app.use('/api/studies', require('./routes/studyRoutes'))
app.use('/api/users', require('./routes/userRoutes'))
app.listen(port, () => console.log(`Server started on port ${port}`))