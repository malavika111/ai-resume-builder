"use client";

import { Target, UploadCloud, File as FileIcon, X } from "lucide-react";
import { useState, useRef, ChangeEvent } from "react";

export default function ATSCheckPage() {
    const [file, setFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<{
        score: number;
        strengths: string[];
        improvements: string[];
        missing_keywords: string[];
    } | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
        const selected = e.target.files?.[0];
        if (selected && selected.type === "application/pdf") {
            setFile(selected);
        } else if (selected) {
            alert("Please upload a valid PDF file.");
        }
    };

    const clearFile = (e: React.MouseEvent) => {
        e.stopPropagation();
        setFile(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleAnalyze = async () => {
        if (!file) {
            alert("Please upload a resume first.");
            return;
        }

        setIsLoading(true);
        setResult(null);

        try {
            const formData = new FormData();
            formData.append("resume", file);

            const response = await fetch("/api/ats-check", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("ATS Analysis failed");
            }

            const data = await response.json();
            setResult(data);

        } catch (error: Error | unknown) {
            console.error("ATS Check Error:", error);
            alert(error instanceof Error ? error.message : "An error occurred during analysis. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white flex flex-col pt-10">
            <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 text-center">
                <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mx-auto mb-8">
                    <Target className="w-8 h-8 text-pink-400" />
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-br from-white to-slate-400 mb-6">
                    ATS Resume Checker
                </h1>
                <p className="text-lg text-slate-400 mb-12">
                    Upload your resume to see how well it scores against Applicant Tracking Systems based on industry-standard keywords.
                </p>

                <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm flex flex-col items-center justify-center max-w-2xl mx-auto hover:border-pink-500/30 transition-colors">
                    <input
                        type="file"
                        accept="application/pdf"
                        hidden
                        ref={fileInputRef}
                        onChange={handleFileSelect}
                    />

                    <div className="w-full mb-6">
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            className="w-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium py-4 px-6 rounded-xl flex items-center justify-center gap-2 transition-all"
                        >
                            <UploadCloud className="w-5 h-5 text-pink-400" />
                            Upload Resume (PDF)
                        </button>

                        {file && (
                            <div className="mt-4 p-4 rounded-xl bg-green-500/10 border border-green-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                                <div className="flex items-center gap-3 w-full">
                                    <FileIcon className="w-6 h-6 text-green-400 shrink-0" />
                                    <span className="text-green-400 font-medium truncate shrink">Resume Uploaded: {file.name}</span>
                                </div>
                                <button
                                    onClick={clearFile}
                                    className="p-2 rounded-full hover:bg-red-500/20 transition-colors shrink-0"
                                >
                                    <X className="w-5 h-5 text-red-400" />
                                </button>
                            </div>
                        )}
                    </div>

                    <button
                        onClick={handleAnalyze}
                        disabled={!file || isLoading}
                        className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-semibold py-4 px-10 rounded-xl w-full shadow-lg shadow-pink-900/50 hover:shadow-[0_0_20px_rgba(236,72,153,0.4)] transition-all hover:scale-[1.02] disabled:opacity-70 disabled:hover:scale-100 disabled:cursor-not-allowed"
                    >
                        {isLoading ? "Analyzing Resume..." : "Analyze Resume Score"}
                    </button>

                    {result && (() => {
                        const score = Math.round(result.score <= 1 && result.score > 0 ? result.score * 100 : result.score);
                        let colorClass = "text-purple-400";
                        if (score < 40) colorClass = "text-red-400";
                        else if (score < 70) colorClass = "text-yellow-400";
                        else if (score < 90) colorClass = "text-green-400";

                        return (
                            <div className="mt-8 w-full p-6 rounded-xl bg-slate-900/50 border border-white/5 animate-in fade-in slide-in-from-bottom-4 text-left">
                                <h3 className="text-2xl font-bold text-white mb-2 pb-4 border-b border-white/10">ATS Score: <span className={colorClass}>{score}/100</span></h3>

                                <div className="mt-6 space-y-6">
                                    <div>
                                        <h4 className="text-green-400 font-semibold mb-2 flex items-center gap-2">Strengths</h4>
                                        <ul className="list-disc pl-5 text-slate-300 text-sm space-y-1">
                                            {result.strengths.map((s: string, i: number) => <li key={i}>{s}</li>)}
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 className="text-yellow-400 font-semibold mb-2 flex items-center gap-2">Areas for Improvement</h4>
                                        <ul className="list-disc pl-5 text-slate-300 text-sm space-y-1">
                                            {result.improvements.map((s: string, i: number) => <li key={i}>{s}</li>)}
                                        </ul>
                                    </div>
                                    {result.missing_keywords && result.missing_keywords.length > 0 && (
                                        <div>
                                            <h4 className="text-red-400 font-semibold mb-2 flex items-center gap-2">Missing Keywords</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {result.missing_keywords.map((kw: string, i: number) => (
                                                    <span key={i} className="px-2 py-1 rounded bg-red-500/10 text-red-400 text-xs border border-red-500/20">{kw}</span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })()}
                </div>
            </main>
        </div>
    );
}
