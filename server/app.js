// app.js
import express from "express";
import productRoute from "./routes/productRoute.js";
import userRoute from "./routes/userRoute.js";
import orderRoute from "./routes/orderRoute.js";
import paymentRoute from "./routes/paymentRoute.js";
import errorMiddleWare from "./middleware/error.js";

import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";
import cors from "cors";
import * as dotenv from "dotenv";
import path from "path";

dotenv.config();

const app = express();
const __dirname = path.resolve();

// ---------- CORS (DEV ONLY) ----------
// When everything is on ONE server in production, you don't need CORS.
// Keep this only for local dev (React on 3000, backend on 4000).
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: process.env.FRONT_END_URL || "http://localhost:3000",
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    })
  );
}
// -------------------------------------

// JSON body with raw body support (for Razorpay, etc.)
app.use(
  express.json({
    limit: "5mb",
    verify: (req, res, buf) => {
      req.rawBody = buf.toString();
    },
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

// ---------- API ROUTES ----------
app.use("/api/v1", productRoute);
app.use("/api/v1", userRoute);
app.use("/api/v1", orderRoute);
app.use("/api/v1", paymentRoute);
// -------------------------------

// ---------- SERVE REACT BUILD IN PRODUCTION ----------
if (process.env.NODE_ENV === "production") {
  // Serve static files from frontend/build
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  // Any route not starting with /api will return React index.html
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
  });
}
// ----------------------------------------------------

// Error middleware (last)
app.use(errorMiddleWare);

export default app;