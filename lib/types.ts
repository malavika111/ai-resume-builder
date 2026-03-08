export interface Experience {
    id: string;
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
}

export interface Education {
    id: string;
    institution: string;
    degree: string;
    startDate: string;
    endDate: string;
    description: string;
}

export interface Project {
    id: string;
    name: string;
    description: string;
    link: string;
}

export interface Certification {
    id: string;
    name: string;
    issuer: string;
    date: string;
}

export interface ResumeData {
    personalInfo: {
        fullName: string;
        email: string;
        phone: string;
        location: string;
        linkedin: string;
        portfolio: string;
    };
    summary: string;
    experience: Experience[];
    education: Education[];
    skills: string[];
    projects: Project[];
    certifications: Certification[];
    targetJobDescription: string;
}

export const initialResumeData: ResumeData = {
    personalInfo: {
        fullName: '',
        email: '',
        phone: '',
        location: '',
        linkedin: '',
        portfolio: '',
    },
    summary: '',
    experience: [],
    education: [],
    skills: [],
    projects: [],
    certifications: [],
    targetJobDescription: '',
};
