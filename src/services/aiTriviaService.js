import OpenAI from "openai";
import sampleResponse from "../lib/sampleAiTriviaResponse.json";
import { toast } from "react-toastify";

const client = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
});

export default async function fetchTrivials(cca3) {
  // prepare the question prompt for AI
  const prompt = `Generate 15 distinct trivial facts on the country with cca3 code ${cca3} and ensure they are in JSON format containing an id and the fact string. Some extra requirements are:
    - Don't make the fact too obvious and lengthy.
    - Ensure the facts are unique and not repetitive.
    - The fact should not be too simple but intermediate level.
    - Return only the JSON object containing the questions.
    You can use this as a sample response: ${JSON.stringify(sampleResponse)}
  `;

  try {
    // generate question in the required format
    const completion = await client.chat.completions.create({
      messages: [{role: 'user', content: prompt}],
      model: 'gpt-3.5-turbo',
    });

  // process the response from AI
    const res = completion?.choices?.[0]?.message?.content;

    // errors handling
    if (!res) {
      console.log("Error", completion);
      throw new Error("No response from OpenAI");
    }

    try {
    const trivials = JSON.parse(res);
    } catch (parseError) {
      console.log('Error parsing AI response', parseError.message);
      throw new Error("Failed to process OpenAI response");
    }

    if (!Array.isArray(trivials) || trivials.length < 15) {
      console.log(`Error: expected 15 facts, recieved ${trivials.length}`);
      throw new Error("AI failed to provive a response");
    }

    // return the trivia facts
    return trivials;

  } catch (error) {
    toast.error(error.message);
  }
}
