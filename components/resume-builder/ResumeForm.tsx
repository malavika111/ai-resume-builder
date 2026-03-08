"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useResumeStore } from "@/store/useResumeStore";

import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import PersonalInfoForm from "./PersonalInfoForm";
import TargetJobForm from "./TargetJobForm";
import SummaryForm from "./SummaryForm";
import ExperienceForm from "./ExperienceForm";
import EducationForm from "./EducationForm";
import SkillsForm from "./SkillsForm";

const steps = [
    { id: "targetJob", title: "Target Job" },
    { id: "personal", title: "Personal Info" },
    { id: "summary", title: "Summary" },
    { id: "experience", title: "Experience" },
    { id: "education", title: "Education" },
    { id: "skills", title: "Skills & Projects" },
];

export default function ResumeForm() {
    const searchParams = useSearchParams();
    const existingId = searchParams?.get("id");
    const [currentStep, setCurrentStep] = useState(0);
    const [isSaving, setIsSaving] = useState(false);
    const router = useRouter();
    const { resumeData, setEntireResume } = useResumeStore();

    useEffect(() => {
        const fetchResume = async () => {
            if (existingId) {
                const { data, error } = await supabase
                    .from('resumes')
                    .select('*')
                    .eq('id', existingId)
                    .single();

                if (data && !error) {
                    setEntireResume(data.content);
                }
            }
        };
        fetchResume();
    }, [existingId, setEntireResume]);

    const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

    const handleFinish = async () => {
        setIsSaving(true);
        try {
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) {
                alert("You must be logged in");
                return;
            }

            const title = resumeData.personalInfo.fullName ? `${resumeData.personalInfo.fullName} Resume` : 'My Resume';

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const payload: any = {
                user_id: user.id,
                title: title,
                content: resumeData
            };
            if (existingId) {
                payload.id = existingId;
            }

            const { error } = await supabase
                .from("resumes")
                .upsert(payload);

            if (error) {
                console.error("Supabase save error:", error);
                alert("Save failed");
                return;
            }

            alert("Resume saved successfully");
            router.push("/dashboard");

        } catch (error) {
            console.error("Supabase save error:", error);
            alert("Save failed");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto p-6 glass rounded-2xl shadow-xl space-y-8">
            {/* Progress Indicator */}
            <div className="flex items-center justify-between mb-8 relative">
                <div className="absolute left-0 top-1/2 w-full h-1 bg-muted -z-10 -translate-y-1/2 rounded-full" />
                <div
                    className="absolute left-0 top-1/2 h-1 bg-primary -z-10 -translate-y-1/2 rounded-full transition-all duration-300"
                    style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
                />
                {steps.map((step, index) => (
                    <div key={step.id} className="flex flex-col items-center gap-2 relative z-10">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors duration-300 ${index <= currentStep ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                            }`}>
                            {index + 1}
                        </div>
                        <span className={`text-xs font-medium hidden sm:block ${index <= currentStep ? "text-primary" : "text-muted-foreground"}`}>
                            {step.title}
                        </span>
                    </div>
                ))}
            </div>

            {/* Form Content */}
            <div className="min-h-[400px] relative overflow-hidden">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                        className="w-full"
                    >
                        {currentStep === 0 && <TargetJobForm />}
                        {currentStep === 1 && <PersonalInfoForm />}
                        {currentStep === 2 && <SummaryForm />}
                        {currentStep === 3 && <ExperienceForm />}
                        {currentStep === 4 && <EducationForm />}
                        {currentStep === 5 && <SkillsForm />}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center pt-6 border-t border-border/50">
                <Button
                    variant="outline"
                    onClick={prevStep}
                    disabled={currentStep === 0}
                >
                    Previous
                </Button>
                <Button
                    onClick={currentStep === steps.length - 1 ? handleFinish : nextStep}
                    disabled={isSaving}
                >
                    {isSaving ? "Saving..." : currentStep === steps.length - 1 ? "Finish" : "Next"}
                </Button>
            </div>
        </div>
    );
}
