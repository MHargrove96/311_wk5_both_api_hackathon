const express = require("express");
const router = express.Router();
const employeesController = require("../controllers/employees");

router.get("/all", employeesController.getAllEmployees);

module.exports = router;