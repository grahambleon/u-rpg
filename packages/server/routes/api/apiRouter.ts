import express from "express";

import mathRouter from "./math/mathRouter.js";

const apiRouter = express.Router();

apiRouter.use("/math", mathRouter);

export default apiRouter;
