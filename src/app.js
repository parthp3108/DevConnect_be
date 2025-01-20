

// require("dotenv").config({ path: "./src/.env" });
const express = require("express");
const connectDB = require("./config/database");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/requests");
const userRouter = require("./routes/user");

const app = express();



// CORS configuration
const cors = require("cors");
app.use(
  cors({
    origin: "http://43.204.102.111", // Update with your frontend's origin
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);


// Preflight handling
app.options("*", (req, res) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  res.status(200).end();
});

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Debugging middleware
app.use((req, res, next) => {
  console.log(`Incoming Request: ${req.method} ${req.url}`);
  console.log("Headers:", req.headers);
  next();
});

// Routes
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

// Database connection and server startup
connectDB()
  .then(() => {
    const PORT =7777;
    console.log("Database connection established");
    app.listen(7777, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err.message);
  });
