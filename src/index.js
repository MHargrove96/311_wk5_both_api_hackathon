const express = require("express");
const app = express();
const employeesRouter = require("./routes/employees");
const port = process.env.PORT || 4001;

app.use(express.static("public"));
app.use(express.json());
app.use("/employees", employeesRouter);

app.get("/default", (req, res) => {
  res.send("Welcome to our server!");
});

app.listen(port, () => {
  console.log(`Web server is listening on port ${port}!`);
});
