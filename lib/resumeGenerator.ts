import { groq } from "./groq";
import { ResumeData } from "./types";
import { v4 as uuidv4 } from 'uuid';

export async function generateResumeSummary(data: ResumeData): Promise<string> {
  const prompt = `
    Based on the following resume data, generate a professional, ATS-optimized career summary.
    Keep it concise (3-4 sentences), impactful, and focused on achievements and core competencies.
    
    Data:
    Name: ${data.personalInfo.fullName}
    Title/Role Target: (Infer from experience and skills)
    Experience: ${JSON.stringify(data.experience.map(e => ({ pos: e.position, desc: e.description })))}
    Skills: ${data.skills.join(", ")}
    
    Return ONLY the summary text, with no introductory or concluding marks.
  `;

  const completion = await groq.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "llama-3.1-70b-versatile",
    temperature: 0.7,
    max_tokens: 300,
  });

  return completion.choices[0]?.message?.content || "";
}

export async function enhanceBulletPoints(description: string, position: string): Promise<string> {
  const prompt = `
    You are an expert resume writer. Enhance the following bullet points for a ${position} role.
    Make them ATS-friendly, start with strong action verbs, and quantify achievements where possible.
    Format as a bulleted markdown list.
    
    Original Description:
    ${description}
    
    Return ONLY the improved bullet points.
  `;

  const completion = await groq.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "llama-3.1-70b-versatile",
    temperature: 0.6,
    max_tokens: 500,
  });

  return completion.choices[0]?.message?.content || "";
}

export async function generateFullResume(data: Partial<ResumeData>): Promise<ResumeData> {
  const prompt = `
    You are an expert ATS resume writer. I am providing you with rough, unstructured user data.
    Your task is to organize, expand, and format this data into a highly professional, ATS-optimized resume structure.
    
    USER PROVIDED DATA:
    ${JSON.stringify(data, null, 2)}
    
    REQUIREMENTS:
    1. Output MUST be valid JSON, strictly matching the ResumeData typescript interface:
    {
      "personalInfo": { "fullName": "", "email": "", "phone": "", "location": "", "linkedin": "", "portfolio": "" },
      "summary": "3-4 sentence powerful professional summary.",
      "experience": [ { "id": "uuid", "company": "", "position": "", "startDate": "", "endDate": "", "description": "Bullet points using action words and metrics" } ],
      "education": [ { "id": "uuid", "institution": "", "degree": "", "startDate": "", "endDate": "", "description": "" } ],
      "skills": ["skill1", "skill2"],
      "projects": [ { "id": "uuid", "name": "", "description": "", "link": "" } ],
      "certifications": [ { "id": "uuid", "name": "", "issuer": "", "date": "" } ]
    }
    
    2. Be creative and infer appropriate professional phrasing. If data is sparse, expand it logically to match standard industry expectations for the given roles. 
    3. Ensure descriptions are bulleted strings prefixed with "• ".
    4. Provide ONLY raw JSON output. Do not include markdown formatting or code blocks.
    `;

  const completion = await groq.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "llama-3.1-70b-versatile",
    temperature: 0.7,
    max_tokens: 2000,
  });

  let resultText = completion.choices[0]?.message?.content || "{}";

  // Clean up potential markdown blocks if the model ignores the instruction
  resultText = resultText.replace(/^```json/g, '').replace(/^```/g, '').replace(/```$/g, '').trim();

  try {
    const parsed: ResumeData = JSON.parse(resultText);

    // Ensure UUIDs are set
    parsed.experience?.forEach(e => e.id = e.id || uuidv4());
    parsed.education?.forEach(e => e.id = e.id || uuidv4());
    parsed.projects?.forEach(e => e.id = e.id || uuidv4());
    parsed.certifications?.forEach(e => e.id = e.id || uuidv4());

    return parsed;
  } catch (err) {
    console.error("Failed to parse AI Resume JSON", err);
    throw new Error("AI returned invalid JSON structure");
  }
}

export async function generateSkills(data: Partial<ResumeData>): Promise<string[]> {
  const prompt = `
    You are an expert ATS resume writer and recruiter. Based on the following candidate's experience, education, and projects, generate a list of 10-15 professional skills.
    
    Data:
    Experience: ${JSON.stringify(data.experience?.map(e => ({ pos: e.position, desc: e.description })))}
    Education: ${JSON.stringify(data.education?.map(e => ({ degree: e.degree, desc: e.description })))}
    Projects: ${JSON.stringify(data.projects?.map(p => ({ name: p.name, desc: p.description })))}
    
    REQUIREMENTS:
    1. Output MUST be a valid JSON array of strings.
    2. Example format: ["React", "TypeScript", "Project Management", "Agile Methodology"]
    3. Provide ONLY raw JSON output. Do not include markdown formatting or code blocks.
  `;

  const completion = await groq.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "llama-3.1-70b-versatile",
    temperature: 0.3, // Lower temp for structured JSON output
    max_tokens: 500,
  });

  let resultText = completion.choices[0]?.message?.content || "[]";

  // Clean up potential markdown blocks if the model ignores the instruction
  resultText = resultText.replace(/^```json/g, '').replace(/^```/g, '').replace(/```$/g, '').trim();

  try {
    const parsed: string[] = JSON.parse(resultText);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error("Failed to parse AI Skills JSON", err);
    throw new Error("AI returned invalid JSON structure for skills");
  }
}
