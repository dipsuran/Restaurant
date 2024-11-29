require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();
require("./config/db.js");

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1", require("./routes/testRoutes.js"));
app.use("/api/v1/auth", require("./routes/authRoutes.js"));
app.use("/api/v1/user", require("./routes/userRoutes.js"));
app.use("/api/v1/restaurant", require("./routes/restaurantRoutes.js"));
app.use("/api/v1/category", require("./routes/categoryRoutes.js"));
app.use("/api/v1/food", require("./routes/foodRoutes.js"));

app.get("/", (req, res) => {
  res.status(200).send("<h1>Hello Bhai</h1>");
});

const PORT = process.env.PORT || 8080;
app.listen(8080, () => {
  console.log(`Server running: http://localhost:${8080}/`);
});
