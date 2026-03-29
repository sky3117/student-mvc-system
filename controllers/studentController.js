const Student = require("../models/student");

// Web routes
exports.getStudents = async (req, res, next) => {
  try {
    const search = req.query.search || "";
    const filter = search
      ? { $or: [{ name: new RegExp(search, "i") }, { email: new RegExp(search, "i") }, { grade: new RegExp(search, "i") }] }
      : {};
    const students = await Student.find(filter).sort({ createdAt: -1 });
    res.render("index", { students, search });
  } catch (err) {
    next(err);
  }
};

exports.showAddForm = (req, res) => {
  res.render("form", { student: {}, formAction: "/students", method: "POST", heading: "Add Student", errors: null });
};

exports.showEditForm = async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).render("404", { url: req.originalUrl });
    }
    res.render("form", { student, formAction: `/students/${student._id}?_method=PUT`, method: "POST", heading: "Edit Student", errors: null });
  } catch (err) {
    next(err);
  }
};

exports.addStudent = async (req, res, next) => {
  try {
    await Student.create(req.body);
    res.redirect("/");
  } catch (err) {
    const errors = err.errors ? Object.values(err.errors).map(e => e.message) : [err.message];
    res.status(400).render("form", { student: req.body, formAction: "/students", method: "POST", heading: "Add Student", errors });
  }
};

exports.updateStudent = async (req, res, next) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!student) {
      return res.status(404).render("404", { url: req.originalUrl });
    }
    res.redirect("/");
  } catch (err) {
    const errors = err.errors ? Object.values(err.errors).map(e => e.message) : [err.message];
    res.status(400).render("form", { student: { ...req.body, _id: req.params.id }, formAction: `/students/${req.params.id}?_method=PUT`, method: "POST", heading: "Edit Student", errors });
  }
};

exports.deleteStudent = async (req, res, next) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.redirect("/");
  } catch (err) {
    next(err);
  }
};

// API
exports.apiGetStudents = async (req, res, next) => {
  try {
    const students = await Student.find();
    res.json({ data: students });
  } catch (err) {
    next(err);
  }
};

exports.apiGetStudentById = async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json({ data: student });
  } catch (err) {
    next(err);
  }
};

exports.apiCreateStudent = async (req, res, next) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json({ data: student });
  } catch (err) {
    next(err);
  }
};

exports.apiUpdateStudent = async (req, res, next) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json({ data: student });
  } catch (err) {
    next(err);
  }
};

exports.apiDeleteStudent = async (req, res, next) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json({ message: "Student deleted" });
  } catch (err) {
    next(err);
  }
};
