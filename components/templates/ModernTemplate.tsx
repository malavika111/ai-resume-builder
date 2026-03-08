"use client";

import { useResumeStore } from "@/store/useResumeStore";

export default function ModernTemplate() {
    const { resumeData } = useResumeStore();
    const { personalInfo, summary, experience, education, skills } = resumeData;

    return (
        <div className="font-sans text-gray-800 bg-white flex min-h-[1056px] shadow-sm max-w-4xl mx-auto overflow-hidden">
            {/* Left Sidebar */}
            <aside className="w-1/3 bg-slate-900 text-slate-100 p-8 flex flex-col pt-12">
                <h1 className="text-4xl font-bold mb-2 leading-tight">{personalInfo.fullName || "Your Name"}</h1>
                <div className="w-12 h-1 bg-blue-500 mb-8 mt-4 rounded-full" />

                <div className="space-y-4 text-sm text-slate-300 mb-12">
                    {personalInfo.email && <div className="break-all">{personalInfo.email}</div>}
                    {personalInfo.phone && <div>{personalInfo.phone}</div>}
                    {personalInfo.location && <div>{personalInfo.location}</div>}
                    {personalInfo.linkedin && <div className="truncate">{personalInfo.linkedin}</div>}
                </div>

                {skills.length > 0 && (
                    <div className="mt-8">
                        <h2 className="text-xl font-semibold mb-4 text-white tracking-widest uppercase text-xs">Skills</h2>
                        <div className="flex flex-wrap gap-2">
                            {skills.map(s => (
                                <span key={s} className="bg-slate-800 py-1 px-3 rounded-md text-xs border border-slate-700">
                                    {s}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </aside>

            {/* Main Content */}
            <main className="w-2/3 p-10 pt-12 bg-slate-50">
                {summary && (
                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-slate-800 border-b-2 border-blue-500 pb-2 mb-4 inline-block">Profile</h2>
                        <p className="text-sm leading-relaxed text-slate-600">{summary}</p>
                    </section>
                )}

                {experience.length > 0 && (
                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-slate-800 border-b-2 border-blue-500 pb-2 mb-6 inline-block">Experience</h2>
                        <div className="space-y-8">
                            {experience.map((exp) => (
                                <div key={exp.id} className="relative pl-4 border-l-2 border-slate-200">
                                    <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-blue-500" />
                                    <div className="flex justify-between items-start mb-1">
                                        <h3 className="font-bold text-slate-800 text-lg">{exp.position}</h3>
                                        <span className="text-xs font-semibold bg-blue-100 text-blue-800 px-2 py-1 rounded-full whitespace-nowrap">
                                            {exp.startDate} - {exp.endDate}
                                        </span>
                                    </div>
                                    <div className="text-sm font-medium text-slate-500 mb-2">{exp.company}</div>
                                    <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">{exp.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {education.length > 0 && (
                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-slate-800 border-b-2 border-blue-500 pb-2 mb-6 inline-block">Education</h2>
                        <div className="space-y-6">
                            {education.map((edu) => (
                                <div key={edu.id}>
                                    <div className="flex justify-between items-start">
                                        <h3 className="font-bold text-slate-800">{edu.institution}</h3>
                                        <span className="text-xs text-slate-500 font-medium">{edu.startDate} - {edu.endDate}</span>
                                    </div>
                                    <div className="text-sm text-blue-600 font-medium mb-1">{edu.degree}</div>
                                    {edu.description && <p className="text-sm text-slate-600">{edu.description}</p>}
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </main>
        </div>
    );
}
