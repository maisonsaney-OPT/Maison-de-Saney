import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";

let ai: GoogleGenAI | null = null;
let chatSession: Chat | null = null;

const initializeAI = () => {
  if (!process.env.API_KEY) {
    console.warn("API_KEY is missing from environment variables.");
    return null;
  }
  if (!ai) {
    ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
  return ai;
};

export const getChatSession = () => {
  const aiInstance = initializeAI();
  if (!aiInstance) return null;

  if (!chatSession) {
    chatSession = aiInstance.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });
  }
  return chatSession;
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  const chat = getChatSession();
  if (!chat) {
    return "Je suis désolé, le service d'assistance est temporairement indisponible (Clé API manquante). Veuillez nous appeler directement.";
  }

  try {
    const response: GenerateContentResponse = await chat.sendMessage({ message });
    return response.text || "Je n'ai pas compris, pouvez-vous reformuler ?";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Une erreur est survenue. Veuillez nous contacter par téléphone.";
  }
};