"use client";

import { useResumeStore } from "@/store/useResumeStore";

export default function MinimalTemplate() {
    const { resumeData } = useResumeStore();
    const { personalInfo, summary, experience, education, skills, projects } = resumeData;

    return (
        <div className="font-sans text-gray-900 bg-white p-8 max-w-4xl mx-auto min-h-[1056px] shadow-sm">
            <header className="border-b border-gray-300 pb-4 mb-4">
                <h1 className="text-3xl font-light mb-2">{personalInfo.fullName || "Your Name"}</h1>
                <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                    {personalInfo.email && <span>{personalInfo.email}</span>}
                    {personalInfo.phone && <span>• {personalInfo.phone}</span>}
                    {personalInfo.location && <span>• {personalInfo.location}</span>}
                    {personalInfo.linkedin && (
                        <span>• <a href={personalInfo.linkedin} className="hover:underline">LinkedIn</a></span>
                    )}
                </div>
            </header>

            {summary && (
                <section className="mb-6">
                    <p className="text-sm leading-relaxed">{summary}</p>
                </section>
            )}

            {experience.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-lg font-semibold uppercase tracking-wider mb-3 border-b border-gray-200 pb-1">Experience</h2>
                    <div className="space-y-4">
                        {experience.map((exp) => (
                            <div key={exp.id}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="font-medium text-gray-800">{exp.position}</h3>
                                    <span className="text-sm text-gray-500">{exp.startDate} - {exp.endDate}</span>
                                </div>
                                <div className="text-sm font-medium text-gray-600 mb-2">{exp.company}</div>
                                <p className="text-sm whitespace-pre-line text-gray-700">{exp.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {education.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-lg font-semibold uppercase tracking-wider mb-3 border-b border-gray-200 pb-1">Education</h2>
                    <div className="space-y-3">
                        {education.map((edu) => (
                            <div key={edu.id}>
                                <div className="flex justify-between items-baseline">
                                    <h3 className="font-medium text-gray-800">{edu.institution}</h3>
                                    <span className="text-sm text-gray-500">{edu.startDate} - {edu.endDate}</span>
                                </div>
                                <div className="text-sm text-gray-700">{edu.degree}</div>
                                {edu.description && <p className="text-sm text-gray-600 mt-1">{edu.description}</p>}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {(skills.length > 0 || projects.length > 0) && (
                <div className="grid grid-cols-2 gap-6">
                    {skills.length > 0 && (
                        <section>
                            <h2 className="text-lg font-semibold uppercase tracking-wider mb-3 border-b border-gray-200 pb-1">Skills</h2>
                            <ul className="list-disc pl-5 text-sm space-y-1 text-gray-700">
                                {skills.map((skill) => (
                                    <li key={skill}>{skill}</li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {projects.length > 0 && (
                        <section>
                            <h2 className="text-lg font-semibold uppercase tracking-wider mb-3 border-b border-gray-200 pb-1">Projects</h2>
                            <div className="space-y-3">
                                {projects.map((proj) => (
                                    <div key={proj.id}>
                                        <div className="font-medium text-gray-800 text-sm">{proj.name}</div>
                                        <p className="text-sm text-gray-600 mt-1">{proj.description}</p>
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
