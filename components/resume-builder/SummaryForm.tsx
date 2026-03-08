"use client";

import { useResumeStore } from "@/store/useResumeStore";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, Loader2 } from "lucide-react";
import { useState } from "react";

export default function SummaryForm() {
    const { resumeData, setSummary } = useResumeStore();
    const [isGenerating, setIsGenerating] = useState(false);

    const handleGenerateSummary = async () => {
        setIsGenerating(true);
        try {
            const response = await fetch('/api/generate-resume', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: 'generate_summary',
                    data: resumeData,
                    jobDescription: resumeData.targetJobDescription
                })
            });

            if (!response.ok) throw new Error("Failed to generate summary");

            const { result } = await response.json();
            if (result) {
                setSummary(result);
            }
        } catch (error) {
            console.error("AI Generation failed:", error);
            alert("Failed to generate summary with AI. Please try again.");
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="text-center mb-6">
                <h2 className="text-2xl font-bold">Professional Summary</h2>
                <p className="text-sm text-muted-foreground mt-1">A brief overview of your professional background.</p>
            </div>

            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <Label>Summary</Label>
                    <Button
                        onClick={handleGenerateSummary}
                        disabled={isGenerating}
                        variant="outline"
                        size="sm"
                        className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/30 text-purple-600 hover:bg-purple-500/20 hover:text-purple-700 transition-all font-semibold gap-2 shadow-sm shadow-purple-500/10"
                    >
                        {isGenerating ? (
                            <Loader2 className="w-3 h-3 animate-spin text-purple-500" />
                        ) : (
                            <Sparkles className="w-3 h-3 text-purple-500" />
                        )}
                        {isGenerating ? "Generating summary..." : "✨ Generate Summary"}
                    </Button>
                </div>
                <Textarea
                    value={resumeData.summary}
                    onChange={(e) => setSummary(e.target.value)}
                    placeholder="Results-driven professional with experience in..."
                    className="h-40"
                />
            </div>
        </div>
    );
}

