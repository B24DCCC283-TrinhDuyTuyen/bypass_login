const express = require('express')
const bodyParser = require('body-parser')
const authRoutes = require('./routes/auth')

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('views'))
app.use('/', authRoutes)

app.listen(3000, () => {
    console.log('Server running at http://localhost:3000')
})