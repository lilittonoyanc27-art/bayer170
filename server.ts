import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

import { STUDY_QUESTIONS } from "./src/data.ts";

async function startServer() {
  const app = express();
  app.use(express.json());

  const PORT = 3000;

  let aiInstance: GoogleGenAI | null = null;
  function getGeminiClient(): GoogleGenAI {
    if (!aiInstance) {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("GEMINI_API_KEY environment variable is not defined");
      }
      aiInstance = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });
    }
    return aiInstance;
  }

  // --- API Routes ---
  app.get("/api/questions", (req, res) => {
    res.json(STUDY_QUESTIONS);
  });

  app.post("/api/verify-answer", async (req, res) => {
    try {
      const { questionId, userAnswer } = req.body;
      
      if (questionId === undefined || !userAnswer || typeof userAnswer !== "string") {
        return res.status(400).json({ error: "Invalid questionId or userAnswer" });
      }

      const question = STUDY_QUESTIONS.find(q => q.id === Number(questionId));
      if (!question) {
        return res.status(404).json({ error: "Question not found" });
      }

      let ai;
      try {
        ai = getGeminiClient();
      } catch (err) {
        return res.json({
          correct: false,
          score: 0,
          explanationAm: "⚠️ GEMINI_API_KEY-ը (Google Gemini-ի բանալին) բացակայում է: Խնդրում ենք ավելացնել այն ձեր Settings -> Secrets բաժնում, որպեսզի AI-ը կարողանա ստուգել ձեր պատասխանները և տալ բացատրություններ:",
          suggestedCorrections: "GEMINI_API_KEY is missing."
        });
      }

      const systemInstruction = `You are an expert Spanish language tutor who speaks fluent Armenian.
Your task is to evaluate a student's Spanish answer to a specific conversational Spanish question.
Compare the student's answer to the reference answer.
Be encouraging but grammatically precise. The answer does not need to be an exact match of the reference answer, as long as it is grammatically correct and semantically answers the question in Spanish.

When generating the evaluation, your Armenian explanation ("explanationAm") must be EXTREMELY detailed and structured. Provide a comprehensive breakdown:
1. Ճիշտ ձևակերպված հատվածներ (What is correct in their answer): Identify exactly which words, forms, or phrases are correct.
2. Քերականական Կառուցվածք (Sentence Construction): Explain the grammatical construction used, like verb conjugations (e.g., "ir + a + infinitive", use of "ser" vs "estar", prepositional phrases, genders, plural forms), to help them learn Spanish syntax.
3. Ինչը կարելի է բարելավել (What can be improved): Suggest stylistic enhancements, natural phrasing, or alternative vocabulary.
4. Սխալներ կամ վրիպակներ (What is incorrect): Explain any grammatical errors, spelling typos, missing accents (tilde), or inappropriate word choice. If there are no errors, explicitly congratulate them and state that everything is correct.

Always write this explanation in Armenian.

You must respond with raw JSON matching this schema:
{
  "correct": boolean, // true if the answer is grammatically correct in Spanish and makes sense contextually, false if there are major spelling/grammar/vocabulary mistakes
  "score": number, // an integer from 0 to 100 indicating quality/correctness
  "explanationAm": string, // extremely detailed structured breakdown in Armenian as listed above
  "suggestedCorrections": string // grammatically corrected Spanish answer if the student made a mistake, or an optimized version if correct.
}`;

      const prompt = `
Question (Spanish): ${question.questionEs}
Question (Armenian context): ${question.questionAm}

Reference Correct Answer (Spanish): ${question.answerEs}
Reference Correct Answer (Armenian context): ${question.answerAm}

Student's Submitted Answer: "${userAnswer}"

Evaluate this answer. Generate JSON only.
`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          systemInstruction: systemInstruction,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              correct: { type: Type.BOOLEAN },
              score: { type: Type.INTEGER },
              explanationAm: { type: Type.STRING },
              suggestedCorrections: { type: Type.STRING }
            },
            required: ["correct", "score", "explanationAm", "suggestedCorrections"]
          }
        }
      });

      const textResult = response.text?.trim() || "{}";
      const parsed = JSON.parse(textResult);
      return res.json(parsed);

    } catch (error: any) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }
  });

  // --- Vite Middleware or Static files ---
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
