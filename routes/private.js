import express from "express";
import pkg from "@prisma/client";
const { PrismaClient } = pkg;

const router = express.Router();
const prisma = new PrismaClient();


router.post('/novo-item', async (req, res) => {
  try{

    const itensInfo = req.body

    const novoItem = await prisma.items.create({
      data:{
        name: itensInfo.name,
        quantidade: itensInfo.quantidade
      }
    })

    res.status(201).json({ message: 'Item adicionado com sucesso!', novoItem})
  }catch(err){
    res.status(400).json('Erro ao adicionar novo produto')
  }
})

router.get('/estoque', async (req, res) => {
  try{
    const itemsListed = await prisma.items.findMany()

    res.status(200).json({message: 'Items listados com sucesso!!!', items: itemsListed})
  } catch(err){
    console.log(err)
  }
})

export default router
