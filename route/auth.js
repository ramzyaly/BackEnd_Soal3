var a = require('express').Router()
var bodyParser = require('body-parser')
var cors = require('cors')
var mysql = require('mysql');
var db = mysql.createConnection({
     host: 'localhost', 
     user: 'ramzy', 
     password: '150992', 
     database: 'sekolahku' 
    });
db.connect();

a.use(bodyParser.json())
a.use(cors())
a.post('/login', (req, res) => {
    if (req.query.username && req.query.password) {
        console.log(req.query.username)
        console.log(req.query.password)
        var sql = `select * from users where username = ` + req.query.username + ` AND password =` + req.query.password;
        db.query(sql, (err, result) => {
            if (err) {
                console.log('masuk');
                response = [];
                response['login'] = 'failed';
                response['status'] = 'akun tidak terdaftar';
                res.send(response);
                throw err;
            }
            console.log('masuk if')
            console.log(result);
            res.send(result);
        });
    }
    else {
        response = { 'login': 'failed', 'status': 'password anda salah' };
        res.send(response);
    }
    console.log('masuk else')
});

a.post('/register', (req, res) => {
    var data = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    };
    var sql = 'insert into users set ?';
    db.query(sql, data, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Data sukses diinput!')
    });
});

module.exports = a