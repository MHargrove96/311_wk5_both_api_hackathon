const mysql = require("mysql");
const pool = require("../sql/connection");
const { handleSQLError } = require("../sql/error");


const getAllDepartments = (req, res) => {
    console.log("The getAllDepartments function is being called");
  
    pool.query("SELECT * From departments LIMIT 100", (err, rows) => {
      if (err) return handleSQLError(res, err);
      return res.json(rows);
    });
  };
  
const getAllDepartmentsEmployees = (req, res) => {
    console.log("The getAllDepartments function is being called");
  
    pool.query(
      `SELECT e.emp_no, first_name, last_name, dept_name FROM employees as e
      LEFT JOIN dept_emp as de ON e.emp_no = de.emp_no
      LEFT JOIN departments AS d ON d.dept_no = de.dept_no
      LIMIT 100`,
      (err, rows) => {
      if (err) return handleSQLError(res, err);
      return res.json(rows);
    });
  };

const getDepartmentsNumber = (req, res) => {
    let sql = `SELECT * FROM departments WHERE dept_no = ?`
    sql = mysql.format(sql, [req.params.id])

   pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err);
    return res.json(rows);
})
};
 
const getDepartmentsName = (req, res) => {
  let sql = `SELECT * FROM departments WHERE dept_name = ?`
  sql = mysql.format(sql, [req.params.dept_name])

 pool.query(sql, (err, rows) => {
  if (err) return handleSQLError(res, err);
  return res.json(rows);
})
};

const updateDepartmentName = (req, res) => {
  let sql = "UPDATE departments set dept_name = ? WHERE dept_no = ?"
  console.log(req.body)
  const dept_name = req.body.dept_name
  sql = mysql.format(sql, [dept_name, req.params.dept_no])
  console.log(sql)
  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err);
    return res.json(rows);

});
}

const newDepartment = (req, res) => {
  const {dept_name, dept_no} = req.body;  
  let sql = "INSERT into departments (dept_name, dept_no) VALUES (?,?)"
  sql = mysql.format(sql, [dept_name, dept_no])

  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err);
    return res.json(rows);
});
}


const deleteDepartment = (req, res) => {
  let sql = "DELETE FROM departments WHERE dept_no = ?"
  sql = mysql.format(sql, [req.params.dept_no])

  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err);
    return res.json(rows);
});
}





module.exports = { getAllDepartments, getDepartmentsNumber, getDepartmentsName, updateDepartmentName, newDepartment, deleteDepartment, getAllDepartmentsEmployees };