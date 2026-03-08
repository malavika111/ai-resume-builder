"use client";

import { useResumeStore } from "@/store/useResumeStore";

export default function ProfessionalTemplate() {
    const { resumeData } = useResumeStore();
    const { personalInfo, summary, experience, education, skills } = resumeData;

    return (
        <div className="font-serif text-slate-900 bg-white p-10 max-w-4xl mx-auto min-h-[1056px] border shadow-sm">
            <header className="text-center mb-8 border-b-2 border-slate-800 pb-6">
                <h1 className="text-4xl font-bold uppercase tracking-widest mb-3">{personalInfo.fullName || "Your Name"}</h1>
                <div className="flex flex-wrap justify-center gap-4 text-sm font-sans text-slate-600">
                    {personalInfo.location && <span>{personalInfo.location}</span>}
                    {personalInfo.phone && <span>| {personalInfo.phone}</span>}
                    {personalInfo.email && <span>| {personalInfo.email}</span>}
                    {personalInfo.linkedin && (
                        <span>| <a href={personalInfo.linkedin} className="hover:text-slate-900">{personalInfo.linkedin}</a></span>
                    )}
                </div>
            </header>

            {summary && (
                <section className="mb-8">
                    <p className="text-sm leading-relaxed text-justify">{summary}</p>
                </section>
            )}

            {experience.length > 0 && (
                <section className="mb-8">
                    <h2 className="text-xl font-bold uppercase tracking-wider mb-4 text-slate-800 border-b border-slate-300 pb-2">Professional Experience</h2>
                    <div className="space-y-6">
                        {experience.map((exp) => (
                            <div key={exp.id}>
                                <div className="flex justify-between items-end mb-1">
                                    <h3 className="font-bold text-lg">{exp.position}</h3>
                                    <span className="text-sm font-sans font-medium text-slate-600 italic">
                                        {exp.startDate} – {exp.endDate}
                                    </span>
                                </div>
                                <div className="text-sm font-bold text-slate-700 italic mb-2">{exp.company}</div>
                                <p className="text-sm text-slate-800 leading-relaxed whitespace-pre-line text-justify pl-4 border-l-2 border-slate-200">{exp.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {education.length > 0 && (
                <section className="mb-8">
                    <h2 className="text-xl font-bold uppercase tracking-wider mb-4 text-slate-800 border-b border-slate-300 pb-2">Education</h2>
                    <div className="space-y-4">
                        {education.map((edu) => (
                            <div key={edu.id}>
                                <div className="flex justify-between items-end">
                                    <h3 className="font-bold text-lg">{edu.institution}</h3>
                                    <span className="text-sm font-sans font-medium text-slate-600 italic">
                                        {edu.startDate} – {edu.endDate}
                                    </span>
                                </div>
                                <div className="text-sm font-bold text-slate-700 italic">{edu.degree}</div>
                                {edu.description && <p className="text-sm text-slate-700 mt-2 pl-4 border-l-2 border-slate-200">{edu.description}</p>}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {skills.length > 0 && (
                <section className="mb-8">
                    <h2 className="text-xl font-bold uppercase tracking-wider mb-4 text-slate-800 border-b border-slate-300 pb-2">Core Competencies</h2>
                    <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-sans font-medium text-slate-800">
                        {skills.map((skill) => (
                            <div key={skill} className="flex items-center">
                                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full mr-2"></span>
                                {skill}
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}
