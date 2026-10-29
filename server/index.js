require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const db = require('./db.js')
const router = require('./router/index.js')
const errorHandlingMiddleware = require('./middlewares/errorHandlingMiddleware.js')

const PORT = process.env.PORT || 5000
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use('/api', router)
app.use(errorHandlingMiddleware)

const start = async () => {
    try {
        await db.raw('SELECT 1')
        console.log('Database connected successfully')
        app.listen(PORT, () => {
            console.log(`Server started on PORT = ${PORT}`)
        })
    } catch (e) {
        console.log(e)
    }
}

start()
