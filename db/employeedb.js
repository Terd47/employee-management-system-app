var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "terdl",
  password: "School1"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("CREATE DATABASE employeedb", function (err, result) {
    if (err) throw err;
    console.log("Database created");
  });
});