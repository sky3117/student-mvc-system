const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
    minlength: [2, "Name must have at least 2 characters"]
  },
  roll: {
    type: Number,
    required: [true, "Roll number is required"],
    unique: true,
    min: [1, "Roll number must be greater than 0"]
  },
  age: {
    type: Number,
    required: [true, "Age is required"],
    min: [5, "Age must be at least 5"],
    max: [100, "Age must be 100 or less"]
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/.+@.+\..+/, "Please fill a valid email address"]
  },
  grade: {
    type: String,
    enum: ["A", "B", "C", "D", "E", "F"],
    default: "A"
  }
}, { timestamps: true });

studentSchema.virtual("isAdult").get(function () {
  return this.age >= 18;
});

studentSchema.set("toJSON", { virtuals: true });
studentSchema.set("toObject", { virtuals: true });

module.exports = mongoose.model("Student", studentSchema);
