const express = require('express');
const path = require('path');
const session = require('express-session');
const mysql = require('mysql');

const app = express();

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'plagiarism_web'
});

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(__dirname + '/core_files'));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/core_files/HTML/loginPage.html'));
});

app.get('/home', function (req, res) {
    res.sendFile(__dirname + '/core_files/HTML/mainPage.html');
})

app.post('/auth', function (req, res) {
    var username = req.body.username;
    var password = req.body.password;

    if (username && password) {
        connection.query('INSERT INTO users (username, password) VALUES (?,?)', [username, password], function (error, results, fields) {
            req.session.loggedin = true;
            req.session.username = username;
            res.redirect('/home');
            res.end();
        });
    } else {
        res.send("Please enter a username and password");
        res.end();
    }
});


app.listen(8080);

connection.connect(function (err) {
    let createUsers = `create table if not exists users(
                            id int primary key auto_increment,
                            username varchar(50) not null,
                            password char(15) not null
    )`;

    connection.query(createUsers, function (err) {
        if (err) { console.log(err.message); }
    });

    let insertUser = `insert into users (username, password) values (?,?)`;
    let userDetails = ['thomas', '12345678'];

    connection.query(insertUser, userDetails, function (err) {
        if (err) { console.log(err.message); }
        console.log("User record inserted successfully.");
    });
});