import Groq from "groq-sdk";

export const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

export const MODELS = {
    LLAMA3_8B: "llama-3.1-70b-versatile",
    LLAMA3_70B: "llama3-70b-8192",
};
