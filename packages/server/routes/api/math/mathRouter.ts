import express from "express";
import { placeInTable } from "../../../utils/math/rolling.js";

const mathRouter = express.Router();

mathRouter.get("/pick", (req, res) => {
  const socketId = req.query.id as string;
  const sourceTable = ["pizza", "gaming", "dunking", "pebbing"];

  const digitAsString = socketId.replace(/\D/g, "").split("");
  const value = parseInt(digitAsString.join());
  const prob = parseInt(
    digitAsString.reduce((prev, cur) => {
      return prev + "9";
    }, "9")
  );

  if (isNaN(value) || socketId === "")
    return res.status(200).send(JSON.stringify("my friendan Brendan"));

  res.status(200).send(
    JSON.stringify(
      placeInTable({
        value,
        prob,
        sourceTable,
      })
    )
  );
});

export default mathRouter;
