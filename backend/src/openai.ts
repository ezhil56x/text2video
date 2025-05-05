import "dotenv/config";
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export async function generateManimCode(prompt: string): Promise<string> {
  const systemPrompt = "You are an assistant that generates Python code for Manim Community Edition v0.19.0 based on user prompts. Respond only with valid, executable Manim code. Do not include explanations, comments, markdown formatting, or extra text. Each response must be a complete Python script with all necessary imports and a Scene subclass. Assume the code will be executed directly"
  
  const res = await client.chat.completions.create({
    model: "gpt-4.1-nano",
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: prompt }
    ]
  })

  console.log(res.choices[0].message.content)

  return res.choices[0].message.content || ""
}