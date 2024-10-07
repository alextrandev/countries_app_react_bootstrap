import OpenAI from "openai";
import sampleResponse from "../lib/sampleAiTrivialsResponse.json";
import express, { Router } from 'express';
import serverless from 'serverless-http';
import dotenv from 'dotenv';
import testResponse from "../lib/testResponse";

// Load environment variables from .env file during local development
if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}
const api = express();
const router = Router();
const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});

// express route
router.get("/fetch-trivials", async (req, res) => {
  const {cca3} = req.query;

  if (!cca3) {
    return res.status(400).json({ error: "cca3 code is required" });
  }
  
  // prepare the question prompt for AI
  const prompt = `Generate 15 distinct trivial facts on the country with cca3 code ${cca3} and ensure they are in JSON format containing an id and the fact string. Some extra requirements are:
    - Don't make the fact too obvious and lengthy.
    - Ensure the facts are unique and not repetitive.
    - The fact should not be too simple but intermediate level.
    - Return only the JSON object containing the questions.
    You can use this as a sample response: ${JSON.stringify(sampleResponse)}
  `;

  try {
    // this is just test response to save api token
    // return res.status(200).json(testResponse);

    // generate question in the required format
    const completion = await openai.chat.completions.create({
      messages: [{role: 'user', content: prompt}],
      model: 'gpt-3.5-turbo',
    });

    // process the response from AI
    const aiResponse = completion?.choices?.[0]?.message?.content;

    // errors handling
    if (!aiResponse) {
      console.error("Error: No response from OpenAI", completion);
      return res.status(500).json({ error: "No response from OpenAI" });
    }

    let trivials;
    try {
    trivials = JSON.parse(aiResponse);
    } catch (parseError) {
      console.log('Error parsing AI response', parseError.message);
      return res.status(500).json({ error: "Failed to process OpenAI response" });
    }

    if (!Array.isArray(trivials) || trivials.length < 15) {
      console.log(`Error: expected 15 facts, recieved ${trivials.length}`);
      return res.status(500).json({ error: "AI failed to provide expected response" });
    }

    // return the trivia facts
    return res.status(200).json(trivials);

  } catch (error) {
    console.error("Error:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// middleware for express to parse JSON body
api.use(express.json());
api.use("/api/", router);

export const handler = serverless(api);