import OpenAI from "openai";
import sampleResponse from "../lib/sampleAiTriviaResponse.json";

const client = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
});

export default async function fetchTrivials({cca3}) {
  // prepare the question prompt for AI
  const prompt = `Generate 15 distinct trivial facts on the country with cca3 code ${cca3} and ensure they are in JSON format containing an id and the fact string. Some extra requirement are:
    - Don't make the fact too obvious and lengthy.
    - Ensure the facts are unique and not repetitive.
    - The fact should not be too simple but intermediate level.
    - Return only the JSON object containing the questions.
    You can use this as a sample response: ${JSON.stringify(sampleResponse)}
  `;

  // generate question in the required format
  const completion = await client.chat.completions.create({
    messages: [{role: 'user', content: prompt}],
    model: 'gpt-3.5-turbo',
  });

  // process the response from AI
  const res = completion.choices[0].message.content;
  const trivials = JSON.parse(res);

  // error catching
  if (trivials.length < 15) {
    // to do
  }

  // return the responsed trivials
  return trivials;
}