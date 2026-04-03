const express = require('express')
const router = express.Router()
const db = require('../db')

router.post('/login', (req, res) => {
    const username = req.body.username
    const password = req.body.password

    const query = "SELECT * FROM users WHERE username='" + username + "' AND password='" + password + "'";

    console.log(query)

    db.query(query, (err, result) => {
        if (err) {
            return res.send('Lỗi truy vấn SQL')
        }
        if (result.length > 0) {
            const user = result[0]
            res.send(`Đăng nhập thành công ㄱㄱㄱ Xin chào ${user.username}
                <br><a href="/change_password.html?user=${user.username}">Bấm vào đây để đổi mật khẩu</a></br>
                <a href='delete_account.html'>Bấm vào đây để xóa tài khoản</a>`)
        } else {
            res.send('Tài khoản hoặc mật khẩu không chính xác @@')
        }
    })
})

router.post('/register', (req, res) => {
    const username = req.body.username
    const password = req.body.password

    const checkUser = 'SELECT * FROM users where username = ?'

    db.query(checkUser, [username], (err, result) => {
        if (err) return res.send('Lỗi')
        if (result.length > 0) {
            return res.send('Tài khoản đã tồn tại!!')
        }

        const insertQuery = "INSERT INTO users (username, password) VALUES ('" + username + "', '" + password + "')"
        console.log(insertQuery)
        db.query(insertQuery, (err, result) => {
            if (err) {
                return res.status(500).send('Lỗii')
            }
            res.send(`<h3>Đăng kí thành công!</h3> <p>Chào mừng ${username}</p> <a href='/login.html'>Quay lại đăng nhập</a>`)
        })
    })
})


router.post('/change-password', (req, res) => {
    const username = req.body.username;
    const newPassword = req.body.newPassword;

    const query = "UPDATE users SET password='" + newPassword + "' WHERE username='" + username + "'";

    console.log(query);

    db.query(query, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Lỗi Database rồi! @@");
        }

        if (result.affectedRows > 0) {
            res.send(`<h3>Đổi mật khẩu thành công!</h3><a href='/login.html'>Quay lại</a>`);
        } else {
            res.send("Không đổi được mật khẩu");
        }
    });
});

router.post('/delete_account', (req, res) => {
    const username = req.body.username

    const query = "DELETE FROM users WHERE username = '" + username + "'"

    console.log(query)

    db.query(query, (err, result) => {
        if (err) return res.status(500).send("Lỗi hệ thống khi xóa!");

        if (result.affectedRows > 0) {
            res.send(`<h3>Đã xóa thành công tài khoản ${username}!</h3> <a href='/login.html'>Quay lại</a>`);
        } else {
            res.send("Không tìm thấy user để xóa!");
        }
    })
})
module.exports = router;

