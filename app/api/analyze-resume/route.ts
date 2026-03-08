import { NextResponse } from "next/server";
import { groq, MODELS } from "@/lib/groq";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { resumeData, targetRole } = body;

        if (!resumeData) {
            return NextResponse.json({ error: "Resume data is required" }, { status: 400 });
        }

        const prompt = `
      Act as an expert ATS (Applicant Tracking System) parser and recruiter.
      Analyze the provided resume data for a "${targetRole || 'general'}" position.
      
      Resume Data:
      ${JSON.stringify(resumeData)}
      
      Please provide a JSON response with the following structure:
      {
        "score": (a number between 0-100),
        "keywordDensity": (brief evaluation),
        "missingSkills": (array of strings of suggested skills based on the role),
        "improvements": (array of actionable tips to improve ATS compatibility)
      }
      
      Return ONLY valid JSON.
    `;

        const completion = await groq.chat.completions.create({
            messages: [{ role: "user", content: prompt }],
            model: MODELS.LLAMA3_8B,
            temperature: 0.2,
            response_format: { type: "json_object" },
        });

        const result = JSON.parse(completion.choices[0]?.message?.content || "{}");
        return NextResponse.json(result);
    } catch (error: unknown) {
        console.error("ATS Analyzer Error:", error);
        return NextResponse.json(
            { error: "Failed to analyze resume", details: error instanceof Error ? error.message : "Unknown error" },
            { status: 500 }
        );
    }
}
