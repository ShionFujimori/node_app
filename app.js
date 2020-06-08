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
  database: 'node_app'
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

// Run a local web server (localhost:3000)
app.listen(3000);
