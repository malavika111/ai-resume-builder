"use client";

import { useResumeStore } from "@/store/useResumeStore";

export default function CompactTemplate() {
    const { resumeData } = useResumeStore();
    const { personalInfo, summary, experience, education, skills, projects } = resumeData;

    return (
        <div className="font-sans text-slate-800 bg-white p-6 max-w-4xl mx-auto min-h-[1056px] shadow-sm leading-snug">
            <header className="mb-4 pb-3 border-b-2 border-slate-800">
                <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-2">
                    <div>
                        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight uppercase mb-1">{personalInfo.fullName || "Your Name"}</h1>
                        {(personalInfo.email || personalInfo.phone || personalInfo.location || personalInfo.linkedin) && (
                            <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs font-semibold text-slate-600">
                                {personalInfo.email && <span>{personalInfo.email}</span>}
                                {personalInfo.phone && <span>• {personalInfo.phone}</span>}
                                {personalInfo.location && <span>• {personalInfo.location}</span>}
                                {personalInfo.linkedin && (
                                    <span>• <a href={personalInfo.linkedin} className="hover:text-slate-900 transition-colors">LinkedIn</a></span>
                                )}
                            </div>
                        )}
                    </div>
                    {summary && (
                        <div className="md:w-1/2 text-xs text-slate-700 font-medium text-justify">
                            {summary}
                        </div>
                    )}
                </div>
            </header>

            <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-2/3 space-y-5">
                    {experience.length > 0 && (
                        <section>
                            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-900 bg-slate-100 px-2 py-1 mb-3">Experience</h2>
                            <div className="space-y-3">
                                {experience.map((exp) => (
                                    <div key={exp.id}>
                                        <div className="flex justify-between items-baseline mb-0.5">
                                            <h3 className="font-bold text-sm text-slate-900">{exp.position}</h3>
                                            <span className="text-xs font-bold text-slate-500">{exp.startDate} - {exp.endDate}</span>
                                        </div>
                                        <div className="text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">{exp.company}</div>
                                        <p className="text-xs text-slate-600 whitespace-pre-line pl-2 border-l-2 border-slate-200">{exp.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {projects.length > 0 && (
                        <section>
                            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-900 bg-slate-100 px-2 py-1 mb-3">Projects</h2>
                            <div className="space-y-3">
                                {projects.map((proj) => (
                                    <div key={proj.id}>
                                        <div className="font-bold text-slate-900 text-sm mb-0.5">{proj.name}</div>
                                        <p className="text-xs text-slate-600 pl-2 border-l-2 border-slate-200 whitespace-pre-line">{proj.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                <div className="md:w-1/3 space-y-5">
                    {education.length > 0 && (
                        <section>
                            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-900 bg-slate-100 px-2 py-1 mb-3">Education</h2>
                            <div className="space-y-3">
                                {education.map((edu) => (
                                    <div key={edu.id}>
                                        <h3 className="font-bold text-xs text-slate-900">{edu.degree}</h3>
                                        <div className="text-xs font-semibold text-slate-700">{edu.institution}</div>
                                        <div className="text-xs font-bold text-slate-400 mb-1">{edu.startDate} - {edu.endDate}</div>
                                        {edu.description && <p className="text-[11px] text-slate-500 leading-tight">{edu.description}</p>}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {skills.length > 0 && (
                        <section>
                            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-900 bg-slate-100 px-2 py-1 mb-3">Skills</h2>
                            <div className="flex flex-wrap gap-1.5">
                                {skills.map((skill) => (
                                    <span key={skill} className="px-2 py-0.5 border border-slate-200 text-slate-700 text-[11px] font-bold rounded-sm">
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
