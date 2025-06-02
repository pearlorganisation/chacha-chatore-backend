import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { errorHandler } from "./src/utils/error/errorHandler.js";

const app = express();

app.use(
  cors({
    origin:
      process.env.NODE_ENV === "development"
        ? [
          "http://localhost:3000",
          "http://localhost:3002",
          "http://localhost:3001",
          "http://localhost:5173",
          "http://localhost:5174", 
          "https://bimalinstitute.com",
          "https://www.bimalinstitute.com", 
        ]
        : [
          "https://bimalinstitute.com",
          "https://www.bimalinstitute.com",
          "http://localhost:3000"
        ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"], // Specify allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Specify allowed headers
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

//Routes Imports
import authRoutes from "./src/routes/auth/auth.js";
import blogRoutes from "./src/routes/blog/blog.js";
import userRoutes from "./src/routes/user/user.js";

app.get("/", (req, res) => {
  res.status(200).send("APIs are working...");
});

// Routes Definitions
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/blogs", blogRoutes);

app.use(errorHandler);

export { app };
