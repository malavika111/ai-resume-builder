"use client";

import { PenTool, Loader2, Copy, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export default function CoverLetterPage() {
    const [jobDescription, setJobDescription] = useState("");
    const [resumeContext, setResumeContext] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [coverLetter, setCoverLetter] = useState("");
    const [copied, setCopied] = useState(false);

    const handleGenerate = async () => {
        if (!jobDescription) {
            alert("Please enter a job description.");
            return;
        }

        setIsLoading(true);
        setCoverLetter("");
        setCopied(false);

        try {
            const response = await fetch("/api/generate-cover-letter", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ jobDescription, resumeContext }),
            });

            if (!response.ok) {
                throw new Error("Generation failed");
            }

            const data = await response.json();
            setCoverLetter(data.coverLetter);

        } catch (error) {
            console.error(error);
            alert("Failed to generate cover letter. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(coverLetter);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };
    return (
        <div className="min-h-screen bg-slate-950 text-white flex flex-col pt-10">
            <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 text-center">
                <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mx-auto mb-8">
                    <PenTool className="w-8 h-8 text-blue-400" />
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-br from-white to-slate-400 mb-6">
                    AI Cover Letter Generator
                </h1>
                <p className="text-lg text-slate-400 mb-12">
                    Paste the job description and your resume context to instantly generate a highly tailored cover letter.
                </p>

                <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm flex flex-col max-w-2xl mx-auto space-y-6 hover:border-blue-500/30 transition-colors">
                    <div className="text-left">
                        <label className="block text-sm font-medium text-slate-300 mb-2">Job Description</label>
                        <textarea
                            value={jobDescription}
                            onChange={(e) => setJobDescription(e.target.value)}
                            disabled={isLoading}
                            className="w-full h-40 bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 resize-none transition-all disabled:opacity-50"
                            placeholder="Paste the job requirements and description here..."
                        />
                    </div>
                    <div className="text-left">
                        <label className="block text-sm font-medium text-slate-300 mb-2">Resume Context (Optional)</label>
                        <textarea
                            value={resumeContext}
                            onChange={(e) => setResumeContext(e.target.value)}
                            disabled={isLoading}
                            className="w-full h-24 bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 resize-none transition-all disabled:opacity-50"
                            placeholder="Paste key points from your resume to tailor the cover letter..."
                        />
                    </div>
                    <button
                        onClick={handleGenerate}
                        disabled={isLoading || !jobDescription}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold py-4 px-10 rounded-xl w-full shadow-lg shadow-blue-900/50 hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all hover:scale-[1.02] flex items-center justify-center gap-2 disabled:opacity-70 disabled:hover:scale-100 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Generating Cover Letter...
                            </>
                        ) : (
                            <>
                                <PenTool className="w-5 h-5" />
                                Generate Cover Letter
                            </>
                        )}
                    </button>
                </div>

                {/* Result Section */}
                {coverLetter && (
                    <div className="mt-12 p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm max-w-2xl mx-auto text-left relative group transition-all animate-in fade-in slide-in-from-bottom-4">
                        <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
                            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                <PenTool className="w-5 h-5 text-blue-400" />
                                Your Cover Letter
                            </h2>
                            <button
                                onClick={handleCopy}
                                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-sm text-slate-300 transition-colors"
                            >
                                {copied ? <CheckCircle2 className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                                {copied ? "Copied!" : "Copy Text"}
                            </button>
                        </div>
                        <div className="whitespace-pre-wrap text-slate-300 leading-relaxed font-sans text-[15px]">
                            {coverLetter}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
