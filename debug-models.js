import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function listModels() {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  try {
    // For some reason listModels is not directly exposed on genAI instance in some versions or requires different access
    // Actually it is on the GoogleGenerativeAI class usually via a manager or similar, but the SDK simplifies it.
    // Let's try to just use a model that definitely exists or check the error.
    // The SDK doesn't have a simple listModels method on the client instance in the documentation I recall immediately.
    // It's usually a REST call.
    
    // Let's try a simple generation with a very basic model name to see if it works without system instructions.
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent("Hello");
    console.log("gemini-1.5-flash works:", result.response.text());
  } catch (error) {
    console.error("gemini-1.5-flash failed:", error.message);
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent("Hello");
    console.log("gemini-pro works:", result.response.text());
  } catch (error) {
    console.error("gemini-pro failed:", error.message);
  }
}

listModels();
