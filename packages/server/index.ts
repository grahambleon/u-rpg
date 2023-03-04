import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

import rootRouter from "./routes/rootRouter.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: path.join(
    __dirname,
    process.env.NODE_ENV === "development" ? "../../.env.dev" : "../../.env"
  ),
});

const port = process.env.PORT || 8000;
const app = express();

// express middlewares
app.use(cors());
app.use(express.static(path.join(__dirname, "./public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(rootRouter);

app.listen(port, () => console.log(`Server listening on port ${port}`));
