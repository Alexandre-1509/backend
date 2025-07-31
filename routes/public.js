import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pkg from "@prisma/client";
const { PrismaClient } = pkg;

const router = express.Router();
const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET;

router.post("/cadastro", async (req, res) => {
  try {
    const user = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(user.password, salt);

    const users = await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: hashPassword,
      },
    });

    res.status(201).json({ message: "Usuário cadastrado com sucesso!", users });
  } catch (err) {
    console.log("Erro:", err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const userInfo = req.body;

    const user = await prisma.user.findUnique({
      where: { email: userInfo.email },
    });

    if (!user) {
      res.status(404).json({ message: "Usuário não encontrado!" });
    }

    const isMatch = await bcrypt.compare(userInfo.password, user.password);

    if (!isMatch) {
      res.status(400).json({ message: "Senha invalida" });
    }

    const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({token: token, id: user.id, email: user.email, name: user.name });
  } catch (err) {
    res.status(500).json({ message: "Erro no servidor", err });
  }
});

export default router;
