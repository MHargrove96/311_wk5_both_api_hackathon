const mysql = require('mysql')
const pool = require('../sql/connection')
const { handleSQLError } = require('../sql/error')
// const router = express.Router()

const getSalaries = (req, res) => {
    pool.query("SELECT * FROM employees.salaries LIMIT 50", (err, rows) => {
      if (err) return handleSQLError(res, err)
      return res.json(rows);
    })
  }

  const getEmployeesById = (req, res) => {
    const {id} = req.params
    let sql ="SELECT * FROM ?? WHERE ?? = ?"
    sql = mysql.format(sql, ['salaries','emp_no', id])

    pool.query(sql, (err, results) => {
      if (err) return handleSQLError(res, err)
      console.log(results)
      return res.status(200).json(results);
    })
  }

  const getEmployeesByFirstName = (req, res) => {
    let sql ="SELECT * FROM ?? JOIN ?? WHERE ?? = ?? AND ?? = ?";
    const {first_name} = req.params
    sql = mysql.format(sql, ['salaries', 'employees', 'salaries.emp_no', 'employees.emp_no', 'first_name', first_name])

    pool.query(sql, (err, results) => {
      if (err) return handleSQLError(res, err)
      return res.json(results);
    })
  }


  module.exports = {
    getSalaries,
    getEmployeesById,
    getEmployeesByFirstName
  }