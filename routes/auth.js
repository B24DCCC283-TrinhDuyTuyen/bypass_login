const express = require('express')
const router = express.Router()
const db = require('../db')

router.post('/login', (req, res) => {
    const username = req.body.username
    const password = req.body.password

    const query = "SELECT * FROM users WHERE username='" +
        username +
        "' AND password='" +
        password +
        "'";

    console.log(query)

    db.query(query, (err, result) => {
        if (result.length > 0) {
            res.send('success')
        } else {
            res.send('falied')
        }
    })
})
module.exports = router; 