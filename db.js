const mysql = require('mysql2')

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'apperttk',
    database: 'bypass_login'
})

db.connect(err => {
    if (err) {
        console.log("Errrrrrr", err)
    } else {
        console.log('connect success')
    }
})
module.exports = db