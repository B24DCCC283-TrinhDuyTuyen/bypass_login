const express = require('express')
const bodyParser = require('body-parser')
const authRoutes = require('./routes/auth')

const app = express()
const path = require('path')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('views'))
app.use('/', authRoutes)

app.listen(3000, () => {
    console.log('Server running at http://localhost:3000')
})

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'register.html'))
})

app.get('/change-password', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'change_password.html'));
});
app.get('/delete_account', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'delete_account.html'));
});