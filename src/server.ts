import express from "express";
import * as dotenv from "dotenv";
import convertRouter from "./routes/images";
dotenv.config();
const app = express();

app.use("api/", convertRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`server is running at http://localhost:${port}`);
});
