const mysql = require("mysql");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "back_system",
});

module.export = db;
