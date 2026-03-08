"use client";

import { useResumeStore } from "@/store/useResumeStore";
import { Terminal } from "lucide-react";

export default function TechTemplate() {
    const { resumeData } = useResumeStore();
    const { personalInfo, summary, experience, education, skills, projects } = resumeData;

    return (
        <div className="font-sans text-slate-300 bg-slate-950 p-10 max-w-4xl mx-auto min-h-[1056px] shadow-sm border-l-4 border-emerald-500 selection:bg-emerald-500/30">
            <header className="mb-8 border-b border-white/10 pb-6">
                <div className="flex items-center gap-3 mb-4">
                    <Terminal className="w-8 h-8 text-emerald-400" />
                    <h1 className="text-4xl font-mono font-bold text-white tracking-tight">{personalInfo.fullName || "user@local:~"}</h1>
                </div>

                <div className="flex flex-wrap gap-4 text-sm font-mono text-emerald-400/80">
                    {personalInfo.email && <span className="flex items-center gap-2"><span className="text-slate-500">{"$"}</span> {personalInfo.email}</span>}
                    {personalInfo.phone && <span className="flex items-center gap-2"><span className="text-slate-500">{"$"}</span> {personalInfo.phone}</span>}
                    {personalInfo.location && <span className="flex items-center gap-2"><span className="text-slate-500">{"$"}</span> {personalInfo.location}</span>}
                    {personalInfo.linkedin && (
                        <span className="flex items-center gap-2"><span className="text-slate-500">{"$"}</span> <a href={personalInfo.linkedin} className="hover:text-emerald-300 underline underline-offset-4">LinkedIn</a></span>
                    )}
                </div>
            </header>

            {summary && (
                <section className="mb-10">
                    <div className="font-mono text-xs text-slate-500 mb-2">{"// EXECUTE: process.summary"}</div>
                    <div className="bg-white/5 border border-white/10 p-5 rounded font-mono text-sm leading-relaxed text-slate-300">
                        {summary}
                    </div>
                </section>
            )}

            {skills.length > 0 && (
                <section className="mb-10">
                    <div className="font-mono text-xs text-slate-500 mb-3">{"// DEPENDENCIES: package.json"}</div>
                    <div className="flex flex-wrap gap-2">
                        {skills.map((skill) => (
                            <span key={skill} className="px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-xs rounded shadow-[0_0_10px_rgba(16,185,129,0.1)]">
                                {skill}
                            </span>
                        ))}
                    </div>
                </section>
            )}

            {experience.length > 0 && (
                <section className="mb-10">
                    <div className="font-mono text-xs text-slate-500 mb-4">{"// THREADS: run_experience.sh"}</div>
                    <div className="space-y-8">
                        {experience.map((exp) => (
                            <div key={exp.id} className="relative pl-6 border-l border-white/10">
                                <div className="absolute w-2 h-2 bg-emerald-500 rounded-full -left-[4px] top-1.5 shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2">
                                    <h3 className="font-bold text-lg text-white">{exp.position}</h3>
                                    <span className="text-xs font-mono text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded">[{exp.startDate} - {exp.endDate}]</span>
                                </div>
                                <div className="text-sm font-mono text-slate-400 mb-3">{`@ ${exp.company}`}</div>
                                <p className="text-sm leading-relaxed text-slate-300 whitespace-pre-line">{exp.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {projects.length > 0 && (
                    <section>
                        <div className="font-mono text-xs text-slate-500 mb-4">{"// REPOSITORIES: github.com/user"}</div>
                        <div className="space-y-6">
                            {projects.map((proj) => (
                                <div key={proj.id} className="bg-white/5 p-4 rounded border border-white/5 hover:border-emerald-500/30 transition-colors">
                                    <div className="font-bold font-mono text-emerald-400 text-sm mb-2">{`${proj.name}.git`}</div>
                                    <p className="text-sm text-slate-400 leading-relaxed">{proj.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {education.length > 0 && (
                    <section>
                        <div className="font-mono text-xs text-slate-500 mb-4">{"// TRAINING: memory_banks"}</div>
                        <div className="space-y-5">
                            {education.map((edu) => (
                                <div key={edu.id} className="relative pl-4 border-l border-white/10">
                                    <h3 className="font-bold text-white text-sm">{edu.degree}</h3>
                                    <div className="text-sm font-mono text-slate-400 mt-1">{edu.institution}</div>
                                    <div className="text-xs font-mono text-slate-500 mt-2">{`[${edu.startDate} - ${edu.endDate}]`}</div>
                                    {edu.description && <p className="text-xs text-slate-400 mt-2">{edu.description}</p>}
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}
