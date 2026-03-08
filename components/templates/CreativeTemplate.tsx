"use client";

import { useResumeStore } from "@/store/useResumeStore";

export default function CreativeTemplate() {
    const { resumeData } = useResumeStore();
    const { personalInfo, summary, experience, education, skills } = resumeData;

    return (
        <div className="font-sans text-stone-800 bg-[#FAF9F6] p-0 max-w-4xl mx-auto min-h-[1056px] shadow-lg overflow-hidden flex flex-col">
            <header className="bg-emerald-800 text-emerald-50 px-10 py-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-700 rounded-full opacity-50 transform translate-x-32 -translate-y-32"></div>
                <div className="absolute bottom-0 right-20 w-32 h-32 bg-emerald-600 rounded-full opacity-50 transform translate-y-16"></div>

                <div className="relative z-10">
                    <h1 className="text-5xl font-black tracking-tighter mb-4">{personalInfo.fullName || "Your Name"}</h1>
                    <div className="flex flex-wrap gap-6 text-sm font-medium text-emerald-100/80">
                        {personalInfo.email && <span className="flex items-center gap-2">✉ {personalInfo.email}</span>}
                        {personalInfo.phone && <span className="flex items-center gap-2">☎ {personalInfo.phone}</span>}
                        {personalInfo.location && <span className="flex items-center gap-2">⚲ {personalInfo.location}</span>}
                    </div>
                </div>
            </header>

            <div className="flex flex-1">
                <aside className="w-[30%] bg-[#f0eee9] p-8 border-r border-[#e2dfd8]">
                    {skills.length > 0 && (
                        <div className="mb-10">
                            <h2 className="text-lg font-bold text-emerald-900 mb-4 flex items-center gap-2">
                                <span className="w-6 h-1 bg-emerald-500 rounded-full"></span>
                                SKILLS
                            </h2>
                            <ul className="space-y-3">
                                {skills.map((skill) => (
                                    <li key={skill} className="text-sm font-medium border-b border-emerald-900/10 pb-2">
                                        {skill}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {education.length > 0 && (
                        <div>
                            <h2 className="text-lg font-bold text-emerald-900 mb-4 flex items-center gap-2">
                                <span className="w-6 h-1 bg-emerald-500 rounded-full"></span>
                                EDUCATION
                            </h2>
                            <div className="space-y-6">
                                {education.map((edu) => (
                                    <div key={edu.id}>
                                        <div className="text-xs font-bold text-emerald-600 mb-1">{edu.startDate} - {edu.endDate}</div>
                                        <div className="font-bold text-sm leading-tight mb-1">{edu.degree}</div>
                                        <div className="text-xs text-stone-600">{edu.institution}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </aside>

                <main className="w-[70%] p-10 bg-white">
                    {summary && (
                        <section className="mb-10 relative">
                            <div className="text-6xl text-emerald-100 absolute -top-4 -left-2 font-serif">&quot;</div>
                            <p className="text-sm leading-loose text-stone-600 relative z-10 font-medium italic pl-4 border-l-4 border-emerald-500">
                                {summary}
                            </p>
                        </section>
                    )}

                    {experience.length > 0 && (
                        <section className="mb-10">
                            <h2 className="text-2xl font-black text-stone-900 mb-8 flex items-center gap-4">
                                EXPERIENCE
                                <div className="h-px bg-emerald-200 flex-1"></div>
                            </h2>
                            <div className="space-y-8">
                                {experience.map((exp) => (
                                    <div key={exp.id} className="relative">
                                        <div className="flex flex-col mb-3">
                                            <h3 className="font-bold text-lg text-emerald-800">{exp.position}</h3>
                                            <div className="flex items-center gap-2 text-sm">
                                                <span className="font-bold text-stone-700">{exp.company}</span>
                                                <span className="text-stone-300">•</span>
                                                <span className="text-stone-500 font-medium">{exp.startDate} - {exp.endDate}</span>
                                            </div>
                                        </div>
                                        <p className="text-sm text-stone-600 leading-relaxed whitespace-pre-line">
                                            {exp.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </main>
            </div>
        </div>
    );
}
