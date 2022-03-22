const express = require("express");
const router = express.Router();
const departmentsController = require("../controllers/departments");

router.get("/all", departmentsController.getAllDepartments);
router.get("/employees/all", departmentsController.getAllDepartmentsEmployees);
router.get("/:id", departmentsController.getDepartmentsNumber);
router.get("/:dept_name", departmentsController.getDepartmentsName);
router.put("/:dept_no", departmentsController.updateDepartmentName);
router.post("/", departmentsController.newDepartment)
router.delete("/:dept_no", departmentsController.deleteDepartment)



module.exports = router;
