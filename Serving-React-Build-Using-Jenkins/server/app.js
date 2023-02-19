import express from "express";
import config from "config";
import path from "path";
import { fileURLToPath } from "url"

import "./utils/dbConnect.js";

import rootRouter from "./controllers/index.js"
import adminRouter from "./controllers/admin/index.js";
import userRouter from "./controllers/user/index.js";

const app = express()
const port = process.env.PORT || config.get("PORT");
const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.static(path.join(__dirname, "build")));
app.use("/api", rootRouter);
app.use("/api/admin", adminRouter);
app.use("/api/user", userRouter);

app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(port, () => {
  console.log(`Server Started at ${port}`);
});
