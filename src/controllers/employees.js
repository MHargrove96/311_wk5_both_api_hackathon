const mysql = require("mysql");
const pool = require("../sql/connection");
const { handleSQLError } = require("../sql/error");

const getAllEmployees = (req, res) => {
  console.log("The getAllEmployees function is being called");
  console.log(req);
  pool.query("SELECT * From employees", (err, rows) => {
    if (err) return handleSQLError(res, err);
    return res.json(rows);
  });
};

module.exports = { getAllEmployees };
