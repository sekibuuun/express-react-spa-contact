import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

/* GET home page. */
router.get("/", async (req, res, next) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (err) {
    next(err);
  }
});

export { router };
