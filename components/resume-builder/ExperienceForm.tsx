"use client";

import { useResumeStore } from "@/store/useResumeStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, Sparkles, Loader2 } from "lucide-react";
import { useState } from "react";

export default function ExperienceForm() {
    const { resumeData, addExperience, updateExperience, removeExperience } = useResumeStore();
    const experience = resumeData.experience;
    const [enhancingId, setEnhancingId] = useState<string | null>(null);

    const handleAdd = () => {
        addExperience({ company: "", position: "", startDate: "", endDate: "", description: "" });
    };

    const handleEnhance = async (id: string, text: string, position: string) => {
        if (!text || !position) {
            alert("Please provide both a position and description to enhance.");
            return;
        }

        setEnhancingId(id);
        try {
            const response = await fetch('/api/generate-resume', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: 'enhance_experience',
                    text,
                    position,
                    jobDescription: resumeData.targetJobDescription
                })
            });

            if (!response.ok) throw new Error("Failed to enhance");

            const { result } = await response.json();
            if (result) {
                updateExperience(id, { description: result });
            }
        } catch (error) {
            console.error("AI Enhance failed:", error);
            alert("Failed to enhance experience with AI. Please try again.");
        } finally {
            setEnhancingId(null);
        }
    };

    return (
        <div className="space-y-6">
            <div className="text-center mb-6">
                <h2 className="text-2xl font-bold">Work Experience</h2>
                <p className="text-sm text-muted-foreground mt-1">Detail your professional history.</p>
            </div>

            <div className="space-y-6">
                {experience.map((exp) => (
                    <div key={exp.id} className="relative p-4 glass rounded-lg border border-border/50 group">
                        <Button
                            variant="destructive"
                            size="icon"
                            className="absolute -top-3 -right-3 h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => removeExperience(exp.id)}
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Company</Label>
                                <Input
                                    value={exp.company}
                                    onChange={(e) => updateExperience(exp.id, { company: e.target.value })}
                                    placeholder="Acme Corp"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Position</Label>
                                <Input
                                    value={exp.position}
                                    onChange={(e) => updateExperience(exp.id, { position: e.target.value })}
                                    placeholder="Software Engineer"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Start Date</Label>
                                <Input
                                    value={exp.startDate}
                                    onChange={(e) => updateExperience(exp.id, { startDate: e.target.value })}
                                    placeholder="Jan 2020"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>End Date</Label>
                                <Input
                                    value={exp.endDate}
                                    onChange={(e) => updateExperience(exp.id, { endDate: e.target.value })}
                                    placeholder="Present"
                                />
                            </div>

                            <div className="space-y-2 md:col-span-2">
                                <div className="flex justify-between items-center">
                                    <Label>Description</Label>
                                    <Button
                                        onClick={() => handleEnhance(exp.id, exp.description, exp.position)}
                                        disabled={enhancingId === exp.id}
                                        variant="outline"
                                        size="sm"
                                        className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/30 text-purple-600 hover:bg-purple-500/20 hover:text-purple-700 transition-all font-semibold gap-2 shadow-sm shadow-purple-500/10"
                                    >
                                        {enhancingId === exp.id ? (
                                            <Loader2 className="w-3 h-3 animate-spin text-purple-500" />
                                        ) : (
                                            <Sparkles className="w-3 h-3 text-purple-500" />
                                        )}
                                        {enhancingId === exp.id ? "Enhancing description..." : "✨ Enhance with AI"}
                                    </Button>
                                </div>
                                <Textarea
                                    value={exp.description}
                                    onChange={(e) => updateExperience(exp.id, { description: e.target.value })}
                                    placeholder="Describe your responsibilities and achievements..."
                                    className="h-24"
                                />
                            </div>
                        </div>
                    </div>
                ))}

                {experience.length === 0 && (
                    <div className="text-center p-8 border-2 border-dashed border-border rounded-lg text-muted-foreground">
                        No experience added yet.
                    </div>
                )}

                <Button onClick={handleAdd} variant="outline" className="w-full border-dashed">
                    <Plus className="mr-2 h-4 w-4" /> Add Experience
                </Button>
            </div>
        </div>
    );
}
