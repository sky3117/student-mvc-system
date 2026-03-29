const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const morgan = require("morgan");
const path = require("path");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/studentDB";

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(morgan("dev"));

mongoose.connect(MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB connection failed:", err));

const studentRoutes = require("./routes/studentRoutes");
app.use('/', studentRoutes);

// 404/Landing
app.use((req, res) => {
  res.status(404).render("404", { url: req.originalUrl });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err);
  if (req.accepts("json")) {
    return res.status(err.status || 500).json({ error: err.message || "Internal Server Error" });
  }
  res.status(err.status || 500).render("error", { error: err });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
