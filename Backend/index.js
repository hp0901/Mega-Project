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

app.use(
  cors({
    origin: [
      "*",
      "http://localhost:3000",                // ✅ for local frontend
      "https://megaproject09.netlify.app",  // ✅ your deployed frontend
      "https://mega-project-bs9q.onrender.com" // ✅ backend (for internal calls)
    ],
    credentials: true,
  })
);


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
