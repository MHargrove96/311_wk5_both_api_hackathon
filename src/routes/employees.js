const express = require("express");
const router = express.Router();
const employeesController = require("../controllers/employees");

router.get("/all", employeesController.getAllEmployees);
router.get("/id/:id", employeesController.getEmployeeByID);
router.get("/name/:firstname", employeesController.getEmployeeByFirstName);
router.get("/pay/:id", employeesController.getEmployeePay);
router.get("/department/:id", employeesController.getEmployeeDepartment);

module.exports = router;
