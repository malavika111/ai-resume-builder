"use client";

import { useResumeStore } from "@/store/useResumeStore";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function TargetJobForm() {
    const { resumeData, setTargetJobDescription } = useResumeStore();

    return (
        <div className="space-y-6">
            <div className="text-center mb-6">
                <h2 className="text-2xl font-bold">Target Job Description</h2>
                <p className="text-sm text-muted-foreground mt-1">Provide context for the AI to tailor your resume.</p>
            </div>

            <div className="space-y-2">
                <Label className="flex justify-between items-center text-sm font-medium text-foreground">
                    Job Description
                    <span className="text-xs text-muted-foreground italic font-normal">
                        Tip: Adding a job description allows the AI to tailor your resume to the role.
                    </span>
                </Label>
                <Textarea
                    value={resumeData.targetJobDescription || ""}
                    onChange={(e) => setTargetJobDescription(e.target.value)}
                    placeholder="Paste the job description for the role you are applying to."
                    className="h-64"
                />
            </div>
        </div>
    );
}
