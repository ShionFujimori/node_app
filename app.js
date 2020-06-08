const express = require('express');
const mysql = require('mysql');

const app = express();

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
	connection.query(
		'SELECT * FROM users',
		(error, results) => {
			console.log(results);
			res.render('hello.ejs');
		}
	);
});

// Run a local web server (localhost:3000)
app.listen(3000);
