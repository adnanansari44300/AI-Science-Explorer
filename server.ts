import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Lazy init Gemini Client
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      console.warn("Warning: GEMINI_API_KEY environment variable is not set.");
    }
    aiClient = new GoogleGenAI({
      apiKey: key || "MOCK_KEY",
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// 1. API: Health Check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// 2. API: Science AI Chat
app.post("/api/gemini/chat", async (req, res) => {
  const { message, history, grade = "6", language = "English" } = req.body;

  if (!message) {
    res.status(400).json({ error: "Message is required." });
    return;
  }

  try {
    const ai = getGeminiClient();
    if (!process.env.GEMINI_API_KEY) {
      // Return a simulated, high-quality, friendly mock educational response for local/no-key testing
      res.json({
        text: `### 1. Short Answer\nHere is a friendly answer about **${message}** for Grade ${grade}! Since the API Key is not set yet, I'm displaying a preview response.\n\n### 2. Easy Explanation\nIn science, we discover how things work. Whether it is why the sky is blue (light scattering) or how volcanoes erupt (molten rock under pressure), everything has a cool scientific explanation!\n\n### 3. Real-Life Example\nThink of it like blowing up a balloon until it pops—that's similar to pressure building up in a volcano!\n\n### 4. Fun Fact\nDid you know that lightning is five times hotter than the surface of the sun?\n\n### 5. Key Points\n* Science is all about observing and asking questions.\n* Pressure and temperature drive many earth reactions.\n* Everything we see is made of tiny building blocks called atoms.\n\n### 6. Mini Quiz\nWhat are the tiny building blocks of all matter?\nA) Cells\nB) Atoms\nC) Bricks\n||Answer: B||\n\n### 7. Related Topics\nVolcanoes, Atoms, Pressure`
      });
      return;
    }

    const systemInstruction = `You are a friendly, highly engaging, and expert AI Science Tutor called "AI Science Explorer".
Your target users are students in Grades 5 to 8 (ages 10-14).
Explain concepts clearly, with simple and enthusiastic language. Do not use overly advanced jargon without explaining it.
Always encourage curiosity and critical thinking, never encourage cheating.
Current Grade Level context of student: Grade ${grade} (Ages ${parseInt(grade) + 5}-${parseInt(grade) + 6}).
Preferred Language for communication: ${language}. (If Urdu is selected, write the explanations beautifully in Urdu or bilingual English-Urdu so it's super easy for a student in Pakistan/South Asia to understand!).

You MUST structure your response strictly using these exact 7 section headers with triple hashes (###) so the frontend application can parse them into beautiful interactive panels:

### 1. Short Answer
[Provide a 1-2 sentence direct, simple, and high-level answer to the question.]

### 2. Easy Explanation
[Provide a detailed but easy-to-digest explanation of the scientific principles, broken into short paragraphs.]

### 3. Real-Life Example
[Give a fun, memorable real-life situation, analogy, or experiment the student can see, do, or experience in daily life.]

### 4. Fun Fact
[Provide a cool, mind-blowing scientific trivia or fact related to the topic.]

### 5. Key Points
* [Key takeaway point 1]
* [Key takeaway point 2]
* [Key takeaway point 3]

### 6. Mini Quiz
[Create a simple multiple-choice question related to this topic to test their memory. Provide 3 options (A, B, or C). Include the correct answer at the very end in double-pipes format, exactly like: ||Answer: A||]
Example:
What causes the sky to look blue?
A) Ocean reflection
B) Scattering of blue light
C) Blue dust in air
||Answer: B||

### 7. Related Topics
[Provide 3 related science search terms or topics, separated by commas.]`;

    const chatHistory = (history || []).map((h: any) => ({
      role: h.role === "assistant" ? "model" : "user",
      parts: [{ text: h.text }]
    }));

    // Send content generation request
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: [
        ...chatHistory,
        { text: message }
      ],
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: error.message || "Failed to process AI response." });
  }
});

// 3. API: Image Explainer (Vision)
app.post("/api/gemini/explain-image", async (req, res) => {
  const { image, mimeType = "image/png", grade = "6" } = req.body;

  if (!image) {
    res.status(400).json({ error: "Image data is required." });
    return;
  }

  try {
    const ai = getGeminiClient();
    if (!process.env.GEMINI_API_KEY) {
      res.json({
        text: `### 1. Short Answer\nThis looks like an educational scientific diagram or specimen! Since the Gemini API Key is not set yet, I'm displaying a beautiful preview analysis.\n\n### 2. Easy Explanation\nWhen scientists study diagrams (like cell structures, human organs, electric circuits, or chemical equations), they look for parts that connect to perform functions. Every component plays a critical role.\n\n### 3. Real-Life Example\nThink of a cell like a school or factory: the nucleus is the principal's office (controlling things), and the mitochondria are the power generators!\n\n### 4. Fun Fact\nDid you know your body is made of about 37 trillion cells working in perfect harmony?\n\n### 5. Key Points\n* Diagrams represent real-world structures.\n* Every labeled part has a specific function.\n* Connecting pieces transfer energy, matter, or signals.\n\n### 6. Mini Quiz\nWhich part of a cell acts as the "control center"?\nA) Cell Wall\nB) Nucleus\nC) Cytoplasm\n||Answer: B||\n\n### 7. Related Topics\nCell Anatomy, Mitochondria, Biology Diagrams`
      });
      return;
    }

    const cleanBase64 = image.replace(/^data:image\/\w+;base64,/, "");

    const prompt = `You are a friendly, enthusiastic AI Science Tutor who loves helping kids learn from diagrams and pictures!
Analyze this image. It might be a scientific diagram, laboratory equipment, an animal, a plant, a planet, a map, or a chart.

If the image is not science-related, kindly tell the student what it is, and then ask them to upload a scientific diagram or something related to science!

If it IS science-related:
1. Identify what it is (e.g., "This is a plant cell diagram" or "This is a picture of an igneous rock").
2. Explain the labeled parts, arrows, or components clearly.
3. Keep the language suitable for Grade ${grade} students (simple, encouraging, easy comparisons).

You MUST structure your response strictly using these exact 7 section headers with triple hashes (###):

### 1. Short Answer
[Summarize what this image is and its main scientific meaning in 1-2 friendly sentences.]

### 2. Easy Explanation
[Explain the scientific concepts or labeled parts in the diagram. Use simple bullet points if there are multiple parts.]

### 3. Real-Life Example
[Connect the diagram or concept to a real-life scenario or everyday analogy.]

### 4. Fun Fact
[Add an amazing, cool fact about this item or topic.]

### 5. Key Points
* [Key point 1]
* [Key point 2]
* [Key point 3]

### 6. Mini Quiz
[Create a multiple-choice question testing their observation of this picture or diagram. Give 3 options A, B, C, followed by the correct answer indicated exactly as: ||Answer: A||]

### 7. Related Topics
[Provide 3 related science search terms or topics, separated by commas.]`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: [
        {
          inlineData: {
            mimeType,
            data: cleanBase64
          }
        },
        { text: prompt }
      ]
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Gemini Vision Error:", error);
    res.status(500).json({ error: error.message || "Failed to analyze image." });
  }
});

// 4. Vite Dev Server vs Static Prod Server setup
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Setting up Vite development server middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Serving static files from /dist in production mode...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`AI Science Explorer backend running at http://localhost:${PORT}`);
  });
}

startServer();
