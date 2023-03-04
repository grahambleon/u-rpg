import express from "express";

const apiRouter = express.Router();

apiRouter.get("/test", (req, res) => {
  res.status(200).send({ message: "HELL YEAH BROTHER! THAT THERE API IS DONE THERE CERRRRNECTED!" });
});

export default apiRouter;
