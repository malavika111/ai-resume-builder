import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { type, data, text, position, jobDescription } = body;

        if (!type) {
            return NextResponse.json({ error: "Type is required" }, { status: 400 });
        }

        let prompt = "";
        let max_tokens = 1000;

        if (type === "generate_summary" && data) {
            prompt = `Write a professional resume summary (3-4 sentences) based on this candidate information.`;
            if (jobDescription) {
                prompt = `Write a professional resume summary tailored to the following job description. Use the candidate's background information.\n\nTarget Job Description:\n${jobDescription}`;
            }
            prompt += `\n\nCandidate Data:\nName: ${data.personalInfo.fullName}\nExperience: ${JSON.stringify(data.experience.map((e: { position: string, description: string }) => ({ pos: e.position, desc: e.description })))}\nEducation: ${JSON.stringify(data.education.map((e: { degree: string }) => ({ degree: e.degree })))}\nSkills: ${data.skills.join(", ")}\n\nReturn ONLY the summary text, with no introductory or concluding marks.`;
            max_tokens = 300;
        } else if (type === "enhance_experience" && text && position) {
            prompt = `Rewrite this job description to be ATS optimized using strong action verbs and professional bullet points.`;
            if (jobDescription) {
                prompt = `Rewrite this job description to better match the target job description using ATS-friendly bullet points and strong action verbs.\n\nTarget Job Description:\n${jobDescription}`;
            }
            prompt += `\n\nCandidate Role: ${position}\n\nOriginal Job Description:\n${text}\n\nReturn ONLY the improved bullet points formatted as a markdown list.`;
            max_tokens = 500;
        } else if (type === "generate_skills" && data) {
            prompt = `Generate a list of 10-15 professional skills based on the candidate's experience and education.`;
            if (jobDescription) {
                prompt = `Generate 10-15 relevant professional skills for this candidate based on their experience and the target job description.\n\nTarget Job Description:\n${jobDescription}`;
            }
            prompt += `\n\nCandidate Data:\nExperience: ${JSON.stringify(data.experience.map((e: { position: string, description: string }) => ({ pos: e.position, desc: e.description })))}\nEducation: ${JSON.stringify(data.education.map((e: { degree: string }) => ({ degree: e.degree })))}\nProjects: ${JSON.stringify(data.projects.map((p: { name: string, description: string }) => ({ name: p.name, desc: p.description })))}\n\nREQUIREMENTS:\n1. Output MUST be a valid JSON array of strings.\n2. Example format: ["React", "TypeScript", "Project Management", "Agile Methodology"]\n3. Provide ONLY raw JSON output. Do not include markdown formatting or code blocks.`;
            max_tokens = 500;
        } else {
            return NextResponse.json({ error: "Invalid type or missing parameters" }, { status: 400 });
        }

        const completion = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [
                {
                    role: "system",
                    content: "You are an expert resume writer who writes ATS optimized resumes."
                },
                {
                    role: "user",
                    content: prompt
                }
            ],
            temperature: 0.7,
            max_tokens: max_tokens,
        });

        let result = completion.choices[0].message.content || "";
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let finalOutput: any = result;

        if (type === "generate_skills") {
            // Clean up potential markdown blocks if the model ignores the instruction
            result = result.replace(/^```json/g, '').replace(/^```/g, '').replace(/```$/g, '').trim();
            try {
                const parsed = JSON.parse(result);
                finalOutput = Array.isArray(parsed) ? parsed : [];
            } catch (err) {
                console.error("Failed to parse AI Skills JSON", err);
                finalOutput = [];
            }
        }

        return NextResponse.json({ result: finalOutput });

    } catch (error) {
        console.error("Groq AI error:", error);
        return NextResponse.json(
            { error: "AI generation failed" },
            { status: 500 }
        );
    }
}
