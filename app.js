// load modules
const express = require('express');
const mysql = require('mysql');

// create an instance of the express module
const app = express();

// required to obtain the value of a form
app.use(express.urlencoded({extended: false}));

// serve static files (css, js, images)
app.use(express.static('public'));

// mysql connection info
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1122Shion',
  database: 'node_app',
  multipleStatements: true
});

// mysql check error
connection.connect((err) => {
  if (err) {
    console.log('error connecting: ' + err.message);
    return;
  }
  console.log('success');
});

// '/' routing
app.get('/', (req, res) => {
	res.render('top.ejs');
});

// '/users' routing
app.get('/users', (req, res) => {
    connection.query(
        'SELECT * FROM users',
        (error, results) => {
            res.render('users.ejs', {items: results});
        });
});

// '/new' routing
app.get('/new', (req, res) => {
    res.render('new.ejs');
});

// '/create' routing
app.post('/create', (req, res) => {
    connection.query(
        'INSERT INTO users (name) VALUES (?)',
        [req.body.name],
        (error, results) => {
            res.redirect('/users');
        }
    );
});

// '/delete/:id' routing
app.post('/delete/:id', (req, res) => {
    connection.query(
        'DELETE FROM users WHERE id = ?; \
        ALTER TABLE users AUTO_INCREMENT = 1',
        [req.params.id],
        (error, results) => {
            res.redirect('/users');
        }
    );
});

// '/edit/:id' routing
app.get('/edit/:id', (req, res) => {
    connection.query(
        'SELECT * FROM users WHERE id = ?',
        [req.params.id],
        (error, results) => {
            res.render('edit.ejs', {item: results[0]});
        }
    );
});

// Run a local web server (localhost:3000)
app.listen(3000);
