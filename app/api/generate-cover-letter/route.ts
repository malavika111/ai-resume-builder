import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { jobDescription, resumeContext } = body;

        if (!jobDescription) {
            return NextResponse.json({ error: "Job description is required" }, { status: 400 });
        }

        const prompt = `Write a professional cover letter based on the following job description and resume context.\n\nJob Description:\n${jobDescription}\n\nResume Context/Experience:\n${resumeContext || 'Not provided. Make it general but professional.'}\n\nRequirements:\n1. It should have a professional tone.\n2. Do NOT include markdown blocks or conversational fluff.`;

        const completion = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [
                {
                    role: "system",
                    content: "You are an expert cover letter writer. Your output should only be the cover letter itself. No intro or outro text."
                },
                {
                    role: "user",
                    content: prompt
                }
            ],
            temperature: 0.7,
            max_tokens: 1500,
        });

        const generatedText = completion.choices[0].message.content || "";

        return NextResponse.json({ coverLetter: generatedText });

    } catch (error) {
        console.error("Groq AI error:", error);
        return NextResponse.json(
            { error: "AI generation failed" },
            { status: 500 }
        );
    }
}
