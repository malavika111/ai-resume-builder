"use client";

import { useResumeStore } from "@/store/useResumeStore";

export default function ElegantTemplate() {
    const { resumeData } = useResumeStore();
    const { personalInfo, summary, experience, education, skills, projects } = resumeData;

    return (
        <div className="font-serif text-slate-800 bg-[#FAFAFA] p-12 max-w-4xl mx-auto min-h-[1056px] shadow-sm">
            <header className="mb-10 text-center">
                <h1 className="text-4xl text-teal-900 tracking-widest uppercase mb-4 font-light">{personalInfo.fullName || "Your Name"}</h1>
                <div className="flex items-center justify-center gap-3 mb-4">
                    <div className="h-[1px] w-12 bg-teal-200" />
                    <div className="h-1.5 w-1.5 rounded-full bg-teal-400" />
                    <div className="h-[1px] w-12 bg-teal-200" />
                </div>
                <div className="flex flex-wrap justify-center gap-2 text-sm text-slate-500 tracking-wide font-sans">
                    {personalInfo.email && <span>{personalInfo.email}</span>}
                    {personalInfo.phone && <><span className="text-teal-300">|</span><span>{personalInfo.phone}</span></>}
                    {personalInfo.location && <><span className="text-teal-300">|</span><span>{personalInfo.location}</span></>}
                    {personalInfo.linkedin && (
                        <><span className="text-teal-300">|</span><a href={personalInfo.linkedin} className="hover:text-teal-700 transition-colors">LinkedIn</a></>
                    )}
                </div>
            </header>

            {summary && (
                <section className="mb-10 max-w-2xl mx-auto text-center">
                    <p className="text-base leading-loose text-slate-600 italic">&quot;{summary}&quot;</p>
                </section>
            )}

            {experience.length > 0 && (
                <section className="mb-10">
                    <div className="flex items-center gap-4 mb-6">
                        <h2 className="text-xl text-teal-800 tracking-widest uppercase font-medium whitespace-nowrap">Experience</h2>
                        <div className="h-[1px] w-full bg-slate-200" />
                    </div>
                    <div className="space-y-8">
                        {experience.map((exp) => (
                            <div key={exp.id}>
                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1">
                                    <h3 className="font-medium text-xl text-slate-800">{exp.position}</h3>
                                    <span className="text-sm text-teal-600 font-sans tracking-wide uppercase">{exp.startDate} — {exp.endDate}</span>
                                </div>
                                <div className="text-sm font-sans font-semibold text-slate-500 uppercase tracking-widest mb-3">{exp.company}</div>
                                <p className="text-sm leading-relaxed text-slate-600 whitespace-pre-line font-sans">{exp.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {education.length > 0 && (
                <section className="mb-10">
                    <div className="flex items-center gap-4 mb-6">
                        <h2 className="text-xl text-teal-800 tracking-widest uppercase font-medium whitespace-nowrap">Education</h2>
                        <div className="h-[1px] w-full bg-slate-200" />
                    </div>
                    <div className="space-y-6">
                        {education.map((edu) => (
                            <div key={edu.id}>
                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1">
                                    <h3 className="font-medium text-lg text-slate-800">{edu.degree}</h3>
                                    <span className="text-sm text-teal-600 font-sans tracking-wide uppercase">{edu.startDate} — {edu.endDate}</span>
                                </div>
                                <div className="text-sm font-sans font-medium text-slate-500">{edu.institution}</div>
                                {edu.description && <p className="text-sm text-slate-600 mt-2 font-sans">{edu.description}</p>}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {(skills.length > 0 || projects.length > 0) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {projects.length > 0 && (
                        <section>
                            <div className="flex items-center gap-4 mb-5">
                                <h2 className="text-xl text-teal-800 tracking-widest uppercase font-medium whitespace-nowrap">Projects</h2>
                                <div className="h-[1px] w-full bg-slate-200" />
                            </div>
                            <div className="space-y-5">
                                {projects.map((proj) => (
                                    <div key={proj.id}>
                                        <div className="font-medium text-slate-800 text-base mb-1">{proj.name}</div>
                                        <p className="text-sm text-slate-600 leading-relaxed font-sans">{proj.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {skills.length > 0 && (
                        <section>
                            <div className="flex items-center gap-4 mb-5">
                                <h2 className="text-xl text-teal-800 tracking-widest uppercase font-medium whitespace-nowrap">Skills</h2>
                                <div className="h-[1px] w-full bg-slate-200" />
                            </div>
                            <div className="flex flex-wrap gap-x-6 gap-y-2">
                                {skills.map((skill) => (
                                    <div key={skill} className="flex items-center gap-2">
                                        <span className="w-1 h-1 bg-teal-400 rounded-full" />
                                        <span className="text-sm text-slate-700 font-sans tracking-wide">{skill}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            )}
        </div>
    );
}
