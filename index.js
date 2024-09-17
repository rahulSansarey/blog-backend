// import { configDotenv } from "dotenv";
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import cloudinary from "cloudinary";
import fileUpload from "express-fileupload";
import cors from "cors";

dotenv.config({});
const app = express();

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use(
  cors({
    origin: [process.env.FRONTEND_URL], 
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Importing routes

import UserRoute from "./routes/userRoutes.js";
import BlogRoute from "./routes/blogRoutes.js";

// Middlware
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/users", UserRoute);
app.use("/api/v1", BlogRoute);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  connectDB();
  console.log("Server is listenning on PORT:", PORT);
});
