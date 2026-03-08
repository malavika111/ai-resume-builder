import { z } from 'zod';

export const personalInfoSchema = z.object({
    fullName: z.string().min(2, 'Full name is required'),
    email: z.string().email('Invalid email address'),
    phone: z.string().optional(),
    location: z.string().optional(),
    linkedin: z.string().url('Must be a valid URL').optional().or(z.literal('')),
    portfolio: z.string().url('Must be a valid URL').optional().or(z.literal('')),
});

export const experienceSchema = z.object({
    company: z.string().min(1, 'Company is required'),
    position: z.string().min(1, 'Position is required'),
    startDate: z.string().min(1, 'Start date is required'),
    endDate: z.string().optional(),
    description: z.string().optional(),
});

export const educationSchema = z.object({
    institution: z.string().min(1, 'Institution is required'),
    degree: z.string().min(1, 'Degree is required'),
    startDate: z.string().min(1, 'Start date is required'),
    endDate: z.string().optional(),
    description: z.string().optional(),
});

export const projectSchema = z.object({
    name: z.string().min(1, 'Project name is required'),
    description: z.string().min(1, 'Description is required'),
    link: z.string().url('Must be a valid URL').optional().or(z.literal('')),
});

export const certificationSchema = z.object({
    name: z.string().min(1, 'Certification name is required'),
    issuer: z.string().min(1, 'Issuer is required'),
    date: z.string().optional(),
});
