const express = require("express");
const app = express();
const salariesRouter = require('./routes/salaries');
const employeesRouter = require("./routes/employees");
const departmentsRouter = require("./routes/departments")
const port = process.env.PORT || 4001;

app.use(express.static("public"));
app.use(express.json());
app.use('/salaries', salariesRouter)
app.use("/employees", employeesRouter);
app.use("/departments", departmentsRouter);

app.get("/default", (req, res) => {
  res.send("Welcome to our server!");
});

app.listen(port, () => {
  console.log(`Web server is listening on port ${port}!`);
});
