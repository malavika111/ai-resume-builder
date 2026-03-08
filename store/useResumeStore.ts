import { create } from 'zustand';
import { ResumeData, initialResumeData, Experience, Education, Project, Certification } from '@/lib/types';
import { v4 as uuidv4 } from 'uuid';

interface ResumeStore {
    resumeData: ResumeData;
    setPersonalInfo: (info: Partial<ResumeData['personalInfo']>) => void;
    setSummary: (summary: string) => void;
    addExperience: (exp: Omit<Experience, 'id'>) => void;
    updateExperience: (id: string, exp: Partial<Experience>) => void;
    removeExperience: (id: string) => void;
    addEducation: (edu: Omit<Education, 'id'>) => void;
    updateEducation: (id: string, edu: Partial<Education>) => void;
    removeEducation: (id: string) => void;
    addSkill: (skill: string) => void;
    removeSkill: (skill: string) => void;
    setSkills: (skills: string[]) => void;
    addProject: (proj: Omit<Project, 'id'>) => void;
    updateProject: (id: string, proj: Partial<Project>) => void;
    removeProject: (id: string) => void;
    addCertification: (cert: Omit<Certification, 'id'>) => void;
    updateCertification: (id: string, cert: Partial<Certification>) => void;
    removeCertification: (id: string) => void;
    setEntireResume: (data: ResumeData) => void;
    setTargetJobDescription: (desc: string) => void;
}

export const useResumeStore = create<ResumeStore>((set) => ({
    resumeData: initialResumeData,

    setPersonalInfo: (info) =>
        set((state) => ({
            resumeData: {
                ...state.resumeData,
                personalInfo: { ...state.resumeData.personalInfo, ...info },
            },
        })),

    setSummary: (summary) =>
        set((state) => ({
            resumeData: { ...state.resumeData, summary },
        })),

    addExperience: (exp) =>
        set((state) => ({
            resumeData: {
                ...state.resumeData,
                experience: [...state.resumeData.experience, { ...exp, id: uuidv4() }],
            },
        })),

    updateExperience: (id, updatedExp) =>
        set((state) => ({
            resumeData: {
                ...state.resumeData,
                experience: state.resumeData.experience.map((exp) =>
                    exp.id === id ? { ...exp, ...updatedExp } : exp
                ),
            },
        })),

    removeExperience: (id) =>
        set((state) => ({
            resumeData: {
                ...state.resumeData,
                experience: state.resumeData.experience.filter((exp) => exp.id !== id),
            },
        })),

    addEducation: (edu) =>
        set((state) => ({
            resumeData: {
                ...state.resumeData,
                education: [...state.resumeData.education, { ...edu, id: uuidv4() }],
            },
        })),

    updateEducation: (id, updatedEdu) =>
        set((state) => ({
            resumeData: {
                ...state.resumeData,
                education: state.resumeData.education.map((edu) =>
                    edu.id === id ? { ...edu, ...updatedEdu } : edu
                ),
            },
        })),

    removeEducation: (id) =>
        set((state) => ({
            resumeData: {
                ...state.resumeData,
                education: state.resumeData.education.filter((edu) => edu.id !== id),
            },
        })),

    addSkill: (skill) =>
        set((state) => ({
            resumeData: {
                ...state.resumeData,
                skills: [...new Set([...state.resumeData.skills, skill])],
            },
        })),

    removeSkill: (skill) =>
        set((state) => ({
            resumeData: {
                ...state.resumeData,
                skills: state.resumeData.skills.filter((s) => s !== skill),
            },
        })),

    setSkills: (skills) =>
        set((state) => ({
            resumeData: {
                ...state.resumeData,
                skills,
            },
        })),

    addProject: (proj) =>
        set((state) => ({
            resumeData: {
                ...state.resumeData,
                projects: [...state.resumeData.projects, { ...proj, id: uuidv4() }],
            },
        })),

    updateProject: (id, updatedProj) =>
        set((state) => ({
            resumeData: {
                ...state.resumeData,
                projects: state.resumeData.projects.map((proj) =>
                    proj.id === id ? { ...proj, ...updatedProj } : proj
                ),
            },
        })),

    removeProject: (id) =>
        set((state) => ({
            resumeData: {
                ...state.resumeData,
                projects: state.resumeData.projects.filter((proj) => proj.id !== id),
            },
        })),

    addCertification: (cert) =>
        set((state) => ({
            resumeData: {
                ...state.resumeData,
                certifications: [...state.resumeData.certifications, { ...cert, id: uuidv4() }],
            },
        })),

    updateCertification: (id, updatedCert) =>
        set((state) => ({
            resumeData: {
                ...state.resumeData,
                certifications: state.resumeData.certifications.map((cert) =>
                    cert.id === id ? { ...cert, ...updatedCert } : cert
                ),
            },
        })),

    removeCertification: (id) =>
        set((state) => ({
            resumeData: {
                ...state.resumeData,
                certifications: state.resumeData.certifications.filter((cert) => cert.id !== id),
            },
        })),

    setEntireResume: (data) =>
        set(() => ({
            resumeData: data,
        })),

    setTargetJobDescription: (desc) =>
        set((state) => ({
            resumeData: { ...state.resumeData, targetJobDescription: desc },
        })),
}));
