import express from "express";
import pkg from "@prisma/client";
const { PrismaClient } = pkg;

const router = express.Router();
const prisma = new PrismaClient();

router.get("/estoque", async (req, res) => {
  try {
    const users = await prisma.user.findMany()

    res.status(200).json(users)
  } catch (err) {
    console.error(err);
  }
});

export default router
