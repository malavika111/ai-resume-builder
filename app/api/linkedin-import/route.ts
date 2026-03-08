import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { linkedinUrl } = body;

        if (!linkedinUrl) {
            return NextResponse.json({ error: "LinkedIn URL is required" }, { status: 400 });
        }

        const prompt = `Extract resume information from this LinkedIn profile URL and return JSON with name, headline, experience, education, skills, summary.\n\nURL: ${linkedinUrl}\n\nREQUIREMENTS:\n1. Output MUST be a valid JSON object matching the requested schema.\n2. Do NOT include markdown formatting, code blocks, or conversational text. Provide ONLY the raw JSON output.`;

        const completion = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [
                {
                    role: "system",
                    content: "You are an expert resume data extractor. You return precise JSON objects."
                },
                {
                    role: "user",
                    content: prompt
                }
            ],
            temperature: 0.1,
            max_tokens: 2000,
        });

        const result = completion.choices[0].message.content || "";

        // Clean up markdown in case the model ignores the instruction
        const jsonText = result.replace(/^```json/gi, '').replace(/^```/g, '').replace(/```$/g, '').trim();

        let parsedData;
        try {
            parsedData = JSON.parse(jsonText);
        } catch (err) {
            console.error("Failed to parse AI LinkedIn JSON", err);
            return NextResponse.json({ error: "Failed to parse profile data." }, { status: 500 });
        }

        return NextResponse.json({ result: parsedData });

    } catch (error) {
        console.error("Groq AI error:", error);
        return NextResponse.json(
            { error: "AI generation failed" },
            { status: 500 }
        );
    }
}
