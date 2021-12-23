import express from "express";
import * as dotenv from "dotenv";
import convertRouter from "./routes/images";
import morgan from "morgan";

dotenv.config();
const app = express();

// get port from .env file
const port = process.env.PORT || 3000;

// middleware morgan logger
app.use(morgan("dev"));

// static middleware
app.use("/images", express.static(__dirname + "/images"));
app.use("/updatedImages", express.static(__dirname + "/updatedImages"));

// routes middleware
app.use("/api", convertRouter);

app.listen(port, () => {
  console.log(`server is running at http://localhost:${port}`);
});
