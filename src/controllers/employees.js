const mysql = require("mysql");
const pool = require("../sql/connection");
const { handleSQLError } = require("../sql/error");

const getAllEmployees = (req, res) => {
  console.log("The getAllEmployees function is being called");
  // console.log(req);
  pool.query("SELECT * From employees LIMIT 50", (err, rows) => {
    if (err) return handleSQLError(res, err);
    return res.json(rows);
  });
};

const getEmployeeByID = (req, res) => {
  console.log("Im in the getEmployeeByID Function");

  const { id } = req.params;
  console.log("im the ID:", id);

  let sql = "SELECT * FROM ?? WHERE ?? = ?";
  sql = mysql.format(sql, ["employees", "emp_no", id]);

  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err);
    console.log(err);
    return res.json(rows);
  });
};

const getEmployeeByFirstName = (req, res) => {
  console.log("Im in the getEmployeeByFirstName function");
  const { firstname } = req.params;
  console.log("Im the first name:", firstname);
  let sql = "SELECT * FROM ?? WHERE LOWER(??) = ?";
  sql = mysql.format(sql, ["employees", "first_name", firstname.toLowerCase()]);
  console.log(sql);

  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err);
    console.log(err);
    return res.json(rows);
  });
};

const getEmployeePay = (req, res) => {
  console.log("Im in the getEmployeePay function");
  const { id } = req.params;
  console.log("im the id:", id);
  let sql = `
    SELECT * FROM ?? 
    JOIN ?? WHERE ?? = ??
    AND ?? = ?
    ORDER BY ?? DESC LIMIT ?
    `;
  sql = mysql.format(sql, [
    "employees",
    "salaries",
    "salaries.emp_no",
    "employees.emp_no",
    "employees.emp_no",
    id,
    "from_date",
    1,
  ]);
  console.log("im the SQL:", sql);

  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err);
    console.log(err);
    return res.json(rows);
  });
};

const getEmployeeDepartment = (req, res) => {
  console.log("Im in the getEmployeeDepartment function");
  const { id } = req.params;
  console.log("im the id:", id);
  let sql = `
    SELECT ?? FROM ?? 
    LEFT JOIN ?? ON ?? = ?? 
    LEFT JOIN ?? ON ?? = ?? 
    WHERE ?? = ?
    LIMIT ?`;

  const columns = [
    "employees.emp_no",
    "employees.birth_date",
    "employees.first_name",
    "employees.last_name",
    "employees.gender",
    "employees.hire_date",
    "departments.dept_name",
  ];

  sql = mysql.format(sql, [
    columns,
    "employees", //select
    "dept_emp", //join1
    "employees.emp_no",
    "dept_emp.emp_no",
    "departments", //join2
    "dept_emp.dept_no",
    "departments.dept_no",
    "employees.emp_no",
    id,
    100,
  ]);
  console.log("im the SQL:", sql);

  pool.query(sql, (err, rows) => {
    console.log("IM IN THE ERROR", err);
    if (err) return handleSQLError(res, err);
    console.log(err);
    return res.json(rows);
  });
};

module.exports = {
  getAllEmployees,
  getEmployeeByID,
  getEmployeeByFirstName,
  getEmployeePay,
  getEmployeeDepartment,
};
