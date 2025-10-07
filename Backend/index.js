const express = require("express");
const app = express();

const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const paymentRoutes = require("./routes/Payment");
const courseRoutes = require("./routes/Course");
const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");

dotenv.config();
const PORT = process.env.PORT || 4000;

// ----------------- DATABASE CONNECT -----------------
database.connect();

// ----------------- MIDDLEWARES -----------------
app.use(express.json());
app.use(cookieParser());

// CORS setup
const allowedOrigins = [
  "http://localhost:3000",
  "https://mega-project-ten.vercel.app",
  "https://mega-project-ntwu.vercel.app",
  "https://megaproject09.netlify.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like Postman)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true, // allows cookies to be sent
  })
);

// Handle preflight requests for all routes
app.options("*", cors({ origin: allowedOrigins, credentials: true }));

// File upload
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// Cloudinary connection
cloudinaryConnect();

// ----------------- ROUTES -----------------
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
// app.use("/api/v1/reach", contactUsRoute);

// Default route
app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Your server is up and running....",
  });
});

// ----------------- SERVER -----------------
app.listen(PORT, () => {
  console.log(`App is running at ${PORT}`);
});
