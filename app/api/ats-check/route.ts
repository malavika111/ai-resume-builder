import { NextResponse } from "next/server";
import Groq from "groq-sdk";
// eslint-disable-next-line @typescript-eslint/no-require-imports
const pdf = require("pdf-parse");

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get("resume") as File | null;

        if (!file) {
            return NextResponse.json({ error: "No resume uploaded" }, { status: 400 });
        }

        // Convert the File object to an ArrayBuffer, then to a Buffer for pdf-parse
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Extract text from the PDF
        const pdfData = await pdf(buffer);
        const extractedText = pdfData.text;

        if (!extractedText || extractedText.trim() === "") {
            return NextResponse.json({ error: "Could not extract text from the PDF. Please try a different resume." }, { status: 400 });
        }

        const prompt = `Analyze the following resume for ATS compatibility.

Return ONLY valid JSON.

Format:

{
"score": number,
"strengths": ["point1","point2"],
"improvements": ["point1","point2"],
"missing_keywords": ["keyword1","keyword2"]
}

Do not include explanations or text outside JSON.

Resume Text:
${extractedText}`;

        const completion = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [
                {
                    role: "system",
                    content: "You are an expert ATS (Applicant Tracking System) Analyzer. You return precise JSON feedback on resumes."
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

        // Clean up markdown in case the model ignores the instructions
        const jsonText = result.replace(/^```json/gi, '').replace(/^```/g, '').replace(/```$/g, '').trim();

        let parsedData;
        try {
            parsedData = JSON.parse(jsonText);
        } catch (err) {
            console.error("Failed to parse AI ATS JSON", err);
            parsedData = {
                score: 0.65,
                strengths: ["Resume parsed successfully"],
                improvements: ["AI response formatting issue"],
                missing_keywords: []
            };
        }

        return NextResponse.json(parsedData);

    } catch (error) {
        console.error("ATS Check error:", error);
        return NextResponse.json(
            { error: "ATS Analysis failed" },
            { status: 500 }
        );
    }
}
