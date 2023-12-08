import express from "express";
import mongoose from "mongoose";
import postActionsRoutes from "./src/routes/postActionsRoutes";
import userActionsRoutes from "./src/routes/userActionsRoutes";
import managerActionsRoutes from "./src/routes/managerActionsRoutes";
import commentActionsRoutes from "./src/routes/commentsActionsRoutes";
import dotenv from "dotenv";
const cookieParser = require("cookie-parser");
dotenv.config();
const app = express();
const PORT = process.env.PORT;
const DB_URI = process.env.DB_URI || "mongodb://localhost:27017";
const cors = require("cors");

const admin = require("firebase-admin");
const serviceAccount = require("./service_accunt.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const corsOptions = {
  origin: process.env.URL_FRONTED,
  credentials: true,
};
app.use(cors(corsOptions));

app.use(cookieParser());

const apiV1 = "/api/v1";
//Sign-Up, Sign-in
app.use(apiV1 + "/users", userActionsRoutes);
//User posts
app.use(apiV1 + "/user/action", postActionsRoutes);
app.use(apiV1 + "/user/action", commentActionsRoutes);
//Get all the users
app.use(apiV1 + "/manager/users", managerActionsRoutes);
// Connect to MongoDB
mongoose
  .connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as mongoose.ConnectOptions)
  .then(() => {
    console.log("Connected to MongoDB");
    // Start the server after successfully connecting to MongoDB
    app.listen(PORT, () => {
      console.log("Server is running on port " + PORT);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
