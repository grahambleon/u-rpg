import express from "express";
import clientIndexPath from "../config/clientIndexPath.js";

const clientRouter = express.Router();
const clientRoutes = ["/"];

clientRouter.get(clientRoutes, (req, res) => {
  res.sendFile(clientIndexPath(), (err) =>
    console.log(err || "Client index transferred")
  );
});

export default clientRouter;
