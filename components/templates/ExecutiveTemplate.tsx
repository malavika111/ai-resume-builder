"use client";

import { useResumeStore } from "@/store/useResumeStore";

export default function ExecutiveTemplate() {
    const { resumeData } = useResumeStore();
    const { personalInfo, summary, experience, education, skills, projects } = resumeData;

    return (
        <div className="font-sans text-slate-900 bg-white p-10 max-w-4xl mx-auto min-h-[1056px] shadow-sm border-t-8 border-slate-900">
            <header className="mb-8 flex flex-col items-center text-center">
                <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 uppercase mb-3">{personalInfo.fullName || "Your Name"}</h1>
                <div className="w-16 h-1 bg-slate-900 mb-4" />
                <div className="flex flex-wrap justify-center gap-4 text-sm font-medium text-slate-600">
                    {personalInfo.email && <span>{personalInfo.email}</span>}
                    {personalInfo.phone && <span>• {personalInfo.phone}</span>}
                    {personalInfo.location && <span>• {personalInfo.location}</span>}
                    {personalInfo.linkedin && (
                        <span>• <a href={personalInfo.linkedin} className="hover:text-slate-900 transition-colors">LinkedIn</a></span>
                    )}
                </div>
            </header>

            {summary && (
                <section className="mb-8 bg-slate-50 p-6 border-l-4 border-slate-900">
                    <p className="text-sm leading-relaxed text-slate-700 font-medium">{summary}</p>
                </section>
            )}

            {experience.length > 0 && (
                <section className="mb-8">
                    <h2 className="text-xl font-bold uppercase tracking-widest text-slate-900 mb-4 border-b-2 border-slate-200 pb-2 flex items-center gap-2">
                        Professional Experience
                    </h2>
                    <div className="space-y-6">
                        {experience.map((exp) => (
                            <div key={exp.id} className="relative pl-4 border-l-2 border-slate-200">
                                <div className="absolute w-2 h-2 bg-slate-900 rounded-full -left-[5px] top-2" />
                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1">
                                    <h3 className="font-bold text-lg text-slate-900">{exp.position}</h3>
                                    <span className="text-sm font-semibold text-slate-500 whitespace-nowrap bg-slate-100 px-3 py-1 rounded-full">{exp.startDate} - {exp.endDate}</span>
                                </div>
                                <div className="text-sm font-bold text-slate-700 uppercase tracking-wide mb-2">{exp.company}</div>
                                <p className="text-sm leading-relaxed text-slate-600 whitespace-pre-line">{exp.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-8">
                    {projects.length > 0 && (
                        <section>
                            <h2 className="text-xl font-bold uppercase tracking-widest text-slate-900 mb-4 border-b-2 border-slate-200 pb-2">Selected Projects</h2>
                            <div className="space-y-5">
                                {projects.map((proj) => (
                                    <div key={proj.id}>
                                        <div className="font-bold text-slate-900 text-base mb-1">{proj.name}</div>
                                        <p className="text-sm text-slate-600 leading-relaxed">{proj.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                <div className="space-y-8">
                    {education.length > 0 && (
                        <section>
                            <h2 className="text-xl font-bold uppercase tracking-widest text-slate-900 mb-4 border-b-2 border-slate-200 pb-2">Education</h2>
                            <div className="space-y-4">
                                {education.map((edu) => (
                                    <div key={edu.id}>
                                        <h3 className="font-bold text-slate-900">{edu.degree}</h3>
                                        <div className="text-sm font-medium text-slate-700">{edu.institution}</div>
                                        <div className="text-xs text-slate-500 mt-1">{edu.startDate} - {edu.endDate}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {skills.length > 0 && (
                        <section>
                            <h2 className="text-xl font-bold uppercase tracking-widest text-slate-900 mb-4 border-b-2 border-slate-200 pb-2">Core Competencies</h2>
                            <div className="flex flex-wrap gap-2">
                                {skills.map((skill) => (
                                    <span key={skill} className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-bold rounded">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </div>
    );
}
