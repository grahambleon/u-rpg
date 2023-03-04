import express from "express";

import apiRouter from "./apiRouter.js";
import clientRouter from "./clientRouter.js";

const rootRouter = express.Router();

rootRouter.use("/api", apiRouter);
rootRouter.use("/", clientRouter);

export default rootRouter;