const express = require('express')
const app = express()
const mongoose = require('mongoose')
const routes = require('./routes/index')
const connectDB = require('./DB/connect')
const notFound = require('./middleware/notFound')
const errorHandler = require('./middleware/error')
require('dotenv').config()
const port = process.env.PORT || 3000

// in built middleware
app.use(express.json())

//user middlewear
app.use('/api/v1/tasks', routes)
app.use(notFound)
app.use(errorHandler)


app.get('/hello', (req, res) => {
    res.send('Task manager')
})

const start = async () => {
    try {
        await connectDB(process.env.DATABASE_CONNECTION)
        app.listen(port, () => {
            console.log('connected to database')
            console.log(`server is listening on port ${port}...`)
        })
    } catch (error) {
        console.log(error)
    }
}
start()

