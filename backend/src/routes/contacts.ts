import express from "express";
import { getPrismaCilent } from "../lib/prisma-util";

const prisma = getPrismaCilent();
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const contacts = await prisma.contact.findMany();
    res.json(contacts);
  } catch (err) {
    next(err);
  }
});

export { router };
