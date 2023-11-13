import express from "express";
import { getPrismaCilent } from "../lib/prisma-util";

const prisma = getPrismaCilent();
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    res.json({});
  } catch (err) {
    next(err);
  }
});

export { router };
