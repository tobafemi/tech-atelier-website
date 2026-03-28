import { GoogleGenAI } from "@google/genai";

export class GeminiService {
  async getAdvisoryAdvice(problem: string) {
    try {
      // Create a new GoogleGenAI instance right before making an API call
      // Always use the named parameter apiKey and access process.env.API_KEY directly
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `As a technical advisor from Tech Atelier, provide a brief, professional, and strategic 2-sentence response to this business problem: "${problem}". Focus on how software or automation could solve it.`,
        config: {
          systemInstruction: "You are a senior technical product advisor at Tech Atelier. Your tone is clean, confident, premium, and solution-focused. Avoid jargon and hype.",
          temperature: 0.7,
        },
      });

      // The response.text property directly returns the generated string
      return response.text;
    } catch (error) {
      console.error("Gemini Error:", error);
      return "That sounds like a challenge we can tackle. Software strategy is key to solving operational bottlenecks. Let's discuss this on a call.";
    }
  }
}

export const geminiService = new GeminiService();