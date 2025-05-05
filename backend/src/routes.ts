import { Router } from "express";
import { generateManimCode } from "./openai";
import { renderManim } from "./manim";
import prisma from './prisma';

import path from "path";
import { v4 as uuidv4 } from 'uuid';

const router = Router();

router.post("/generate", async (req, res) => {
  try {
    const { prompt } = req.body;
    const code = await generateManimCode(prompt);
    const filename = `${uuidv4()}.mp4`;

    renderManim(code, filename);
    await prisma.prompt.create({
      data: { prompt, filename }
    });

    res.json({ filename });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: "Generation failed" });
  }
});

router.get("/video/:filename", (req, res) => {
  const file = path.join(__dirname, "..", "outputs", req.params.filename);
  res.sendFile(file);
});

router.get("/history", async (_, res) => {
  const history = await prisma.prompt.findMany({
    orderBy: { createdAt: "desc" }
  });
  
  res.json(history);
});

router.get("/chat/:id", async (req, res) => {
  const { id } = req.params;
  const prompt = await prisma.prompt.findUnique({
    where: { id }
  });
  
  if (!prompt) {
    res.status(404).json({ error: "Prompt not found" });
    return;
  }

  res.json(prompt);
});

export default router;
