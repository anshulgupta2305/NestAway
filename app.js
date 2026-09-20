require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

const listingRoutes = require("./routes/listing");
const ExpressError = require("./utils/ExpressError");

const app = express();

const MONGO_URI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/nestaway";
const PORT = process.env.PORT || 8080;

async function connectDB() {
  await mongoose.connect(MONGO_URI);
  console.log("✓ Connected to MongoDB");
}

connectDB().catch((err) => {
  console.error("MongoDB connection failed:", err.message);
  process.exit(1);
});

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.redirect("/listings");
});

app.use("/listings", listingRoutes);

app.use((req, res, next) => {
  next(new ExpressError("The page you are looking for does not exist.", 404));
});

app.use((err, req, res, next) => {
  const status = err.statusCode || 500;
  const message = err.message || "Something went wrong.";
  res.status(status).render("error", { status, message });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`✓ NestAway running at http://localhost:${PORT}`);
});
