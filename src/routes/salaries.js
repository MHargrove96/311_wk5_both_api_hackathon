const express = require('express')
const employeesController = require('../controllers/salaries')
const router = express.Router()
const pool = require('../sql/connection')

router.get('/salaries', employeesController.getSalaries)

router.get('/:id', employeesController.getEmployeesById)

router.get('/first_name/:first_name', employeesController.getEmployeesByFirstName)

module.exports = router