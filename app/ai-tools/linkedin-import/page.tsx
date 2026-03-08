"use client";

import { Linkedin, Loader2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useResumeStore } from "@/store/useResumeStore";

export default function LinkedinImportPage() {
    const [url, setUrl] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const { resumeData, setEntireResume } = useResumeStore();

    const handleExtract = async () => {
        if (!url) {
            alert("Please enter a LinkedIn profile URL.");
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch("/api/linkedin-import", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ linkedinUrl: url }),
            });

            if (!response.ok) {
                throw new Error("Failed to extract data");
            }

            const data = await response.json();
            const extracted = data.result;

            if (extracted) {
                // Merge extracted data into the Zustand store
                const newResumeData = {
                    ...resumeData,
                    personalInfo: {
                        ...resumeData.personalInfo,
                        fullName: extracted.name || resumeData.personalInfo.fullName,
                    },
                    summary: extracted.summary || resumeData.summary,
                    skills: extracted.skills && Array.isArray(extracted.skills)
                        ? [...new Set([...resumeData.skills, ...extracted.skills])]
                        : resumeData.skills,
                };

                // For experience and education, we'll cleanly map them if they exist and are arrays
                if (extracted.experience && Array.isArray(extracted.experience)) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    newResumeData.experience = extracted.experience.map((exp: any, index: number) => ({
                        id: `linkedin-exp-${Date.now()}-${index}`,
                        company: exp.company || "",
                        position: exp.title || exp.position || "",
                        location: exp.location || "",
                        startDate: exp.startDate || exp.start_date || "",
                        endDate: exp.endDate || exp.end_date || "Present",
                        description: exp.description || "",
                    }));
                }

                if (extracted.education && Array.isArray(extracted.education)) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    newResumeData.education = extracted.education.map((edu: any, index: number) => ({
                        id: `linkedin-edu-${Date.now()}-${index}`,
                        school: edu.school || edu.institution || "",
                        degree: edu.degree || "",
                        fieldOfStudy: edu.fieldOfStudy || edu.field_of_study || "",
                        startDate: edu.startDate || edu.start_date || "",
                        endDate: edu.endDate || edu.end_date || "",
                        description: edu.description || "",
                    }));
                }

                setEntireResume(newResumeData);
                router.push("/resume-builder");
            }
        } catch (error) {
            console.error("Extraction error:", error);
            alert("Unable to extract LinkedIn data. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white flex flex-col pt-10">
            <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 text-center">
                <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mx-auto mb-8">
                    <Linkedin className="w-8 h-8 text-indigo-400" />
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-br from-white to-slate-400 mb-6">
                    LinkedIn Resume Import
                </h1>
                <p className="text-lg text-slate-400 mb-12">
                    Enter your public LinkedIn profile URL to automatically extract your experience and generate a drafted resume.
                </p>

                <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm flex flex-col max-w-2xl mx-auto space-y-6 hover:border-indigo-500/30 transition-colors">
                    <div className="text-left">
                        <label className="block text-sm font-medium text-slate-300 mb-2">LinkedIn Profile URL</label>
                        <input
                            type="url"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            disabled={isLoading}
                            className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all disabled:opacity-50"
                            placeholder="https://www.linkedin.com/in/username"
                        />
                    </div>
                    <button
                        onClick={handleExtract}
                        disabled={isLoading || !url}
                        className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-semibold py-4 px-10 rounded-xl w-full shadow-lg shadow-indigo-900/50 hover:shadow-[0_0_20px_rgba(79,70,229,0.4)] transition-all hover:scale-[1.02] flex items-center justify-center gap-2 disabled:opacity-70 disabled:hover:scale-100 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Extracting Profile...
                            </>
                        ) : (
                            <>
                                <Linkedin className="w-5 h-5" />
                                Extract Profile Data
                            </>
                        )}
                    </button>
                    <p className="text-slate-400 text-sm mt-4">We&apos;ll analyze your public profile and pre-fill your resume template automatically.</p>
                </div>
            </main>
        </div>
    );
}
