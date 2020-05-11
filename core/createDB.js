var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "testUser",
  password: "test"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("CREATE DATABASE IF NOT EXISTS \`www\`", function (err, result) {
    if (err) throw err;
    console.log("Database created");
  });
  con.query(`CREATE TABLE IF NOT EXISTS \`www\`.\`users\` (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(30) NOT NULL,
    fullname VARCHAR(30) NOT NULL,
    password VARCHAR(50) NOT NULL)`, function (err,result) {
        if (err) throw err;
        console.log("Table created");
    })
});