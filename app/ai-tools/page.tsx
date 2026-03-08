"use client";

import Link from "next/link";
import { FileText, Target, PenTool, Linkedin } from "lucide-react";
import { motion } from "framer-motion";

export default function AIToolsPage() {
    return (
        <div className="min-h-screen bg-slate-950 text-white flex flex-col pt-10">
            <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-br from-white to-slate-400 mb-6">
                        AI Career Tools
                    </h1>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                        Supercharge your job search with our suite of AI-powered assistants.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <ToolCard
                        href="/resume-builder"
                        icon={<FileText className="w-8 h-8 text-purple-400" />}
                        title="AI Resume Generator"
                        description="Generate highly optimized resume content instantly using AI."
                    />
                    <ToolCard
                        href="/ai-tools/ats-check"
                        icon={<Target className="w-8 h-8 text-pink-400" />}
                        title="ATS Resume Checker"
                        description="Score and optimize your resume against Applicant Tracking Systems."
                    />
                    <ToolCard
                        href="/ai-tools/cover-letter"
                        icon={<PenTool className="w-8 h-8 text-blue-400" />}
                        title="Cover Letter Generator"
                        description="Generate context-aware cover letters that match the job description."
                    />
                    <ToolCard
                        href="/ai-tools/linkedin-import"
                        icon={<Linkedin className="w-8 h-8 text-indigo-400" />}
                        title="LinkedIn Resume Import"
                        description="Transform your LinkedIn profile directly into a professional resume format."
                    />
                </div>
            </main>
        </div>
    );
}

function ToolCard({ icon, title, description, href }: { icon: React.ReactNode, title: string, description: string, href: string }) {
    return (
        <Link href={href} className="block w-full h-full cursor-pointer">
            <motion.div
                whileHover={{ y: -5, scale: 1.02 }}
                className="p-8 h-full rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-purple-500/50 hover:shadow-[0_0_30px_-5px_var(--tw-shadow-color)] shadow-purple-500/30 transition-all group relative overflow-hidden"
            >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-6">
                    <div className="w-16 h-16 shrink-0 rounded-2xl bg-white/5 flex items-center justify-center">
                        {icon}
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">{title}</h3>
                        <p className="text-slate-400 leading-relaxed text-sm sm:text-base">{description}</p>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
}
