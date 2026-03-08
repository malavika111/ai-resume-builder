"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { personalInfoSchema } from "@/lib/schemas";
import { useResumeStore } from "@/store/useResumeStore";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect } from "react";

type PersonalInfoValues = {
    fullName: string;
    email: string;
    phone?: string;
    location?: string;
    linkedin?: string;
    portfolio?: string;
};

export default function PersonalInfoForm() {
    const { resumeData, setPersonalInfo } = useResumeStore();
    const {
        register,
        formState: { errors },
        watch,
    } = useForm<PersonalInfoValues>({
        resolver: zodResolver(personalInfoSchema),
        defaultValues: resumeData.personalInfo,
    });

    // Watch for changes and update global store
    const formData = watch();

    useEffect(() => {
        // Basic debounce to not overload store (could be optimized)
        const timeout = setTimeout(() => {
            setPersonalInfo(formData);
        }, 300);
        return () => clearTimeout(timeout);
    }, [formData, setPersonalInfo]);

    return (
        <div className="space-y-6">
            <div className="text-center mb-6">
                <h2 className="text-2xl font-bold">Personal Information</h2>
                <p className="text-sm text-muted-foreground mt-1">Let&apos;s start with the basics.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="fullName" className={errors.fullName ? "text-destructive" : ""}>
                        Full Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                        id="fullName"
                        placeholder="John Doe"
                        {...register("fullName")}
                        className={errors.fullName ? "border-destructive focus-visible:ring-destructive" : ""}
                    />
                    {errors.fullName && <p className="text-xs text-destructive">{errors.fullName.message}</p>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="email" className={errors.email ? "text-destructive" : ""}>
                        Email <span className="text-destructive">*</span>
                    </Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        {...register("email")}
                        className={errors.email ? "border-destructive focus-visible:ring-destructive" : ""}
                    />
                    {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" placeholder="+1 (555) 000-0000" {...register("phone")} />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" placeholder="New York, NY" {...register("location")} />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="linkedin" className={errors.linkedin ? "text-destructive" : ""}>LinkedIn URL</Label>
                    <Input
                        id="linkedin"
                        placeholder="https://linkedin.com/in/johndoe"
                        {...register("linkedin")}
                        className={errors.linkedin ? "border-destructive focus-visible:ring-destructive" : ""}
                    />
                    {errors.linkedin && <p className="text-xs text-destructive">{errors.linkedin.message}</p>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="portfolio" className={errors.portfolio ? "text-destructive" : ""}>Portfolio URL</Label>
                    <Input
                        id="portfolio"
                        placeholder="https://johndoe.com"
                        {...register("portfolio")}
                        className={errors.portfolio ? "border-destructive focus-visible:ring-destructive" : ""}
                    />
                    {errors.portfolio && <p className="text-xs text-destructive">{errors.portfolio.message}</p>}
                </div>
            </div>
        </div>
    );
}
