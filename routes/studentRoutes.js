const express = require("express");
const router = express.Router();
const controller = require("../controllers/studentController");

// Web UI routes
router.get("/", controller.getStudents);
router.get("/students/new", controller.showAddForm);
router.post("/students", controller.addStudent);
router.get("/students/:id/edit", controller.showEditForm);
router.put("/students/:id", controller.updateStudent);
router.delete("/students/:id", controller.deleteStudent);

// API routes (REST)
router.get("/api/students", controller.apiGetStudents);
router.get("/api/students/:id", controller.apiGetStudentById);
router.post("/api/students", controller.apiCreateStudent);
router.put("/api/students/:id", controller.apiUpdateStudent);
router.delete("/api/students/:id", controller.apiDeleteStudent);

module.exports = router;
