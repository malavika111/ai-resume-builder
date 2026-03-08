"use client";

import { useResumeStore } from "@/store/useResumeStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, X, Trash2, Sparkles, Loader2 } from "lucide-react";
import { useState } from "react";

export default function SkillsForm() {
    const { resumeData, addSkill, removeSkill, setSkills, addProject, updateProject, removeProject } = useResumeStore();
    const [skillInput, setSkillInput] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);

    const handleAddSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && skillInput.trim()) {
            e.preventDefault();
            addSkill(skillInput.trim());
            setSkillInput("");
        }
    };

    const handleGenerateSkills = async () => {
        setIsGenerating(true);
        try {
            const response = await fetch('/api/generate-resume', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: 'generate_skills',
                    data: resumeData,
                    jobDescription: resumeData.targetJobDescription
                })
            });

            if (!response.ok) throw new Error("Failed to generate skills");

            const { result } = await response.json();
            if (result && Array.isArray(result)) {
                setSkills(result);
            }
        } catch (error) {
            console.error("AI Generation failed:", error);
            alert("Failed to generate skills with AI. Please try again.");
        } finally {
            setIsGenerating(false);
        }
    };

    const handleAddProject = () => {
        addProject({ name: "", description: "", link: "" });
    };

    return (
        <div className="space-y-8">
            <div className="text-center mb-6">
                <h2 className="text-2xl font-bold">Skills & Projects</h2>
                <p className="text-sm text-muted-foreground mt-1">Highlight your technical abilities and key projects.</p>
            </div>

            {/* Skills Section */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Skills</h3>
                    <Button
                        onClick={handleGenerateSkills}
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
                        {isGenerating ? "Generating skills..." : "✨ Suggest Skills"}
                    </Button>
                </div>
                <div className="space-y-2">
                    <Label>Add a skill (Press Enter)</Label>
                    <Input
                        value={skillInput}
                        onChange={(e) => setSkillInput(e.target.value)}
                        onKeyDown={handleAddSkill}
                        placeholder="e.g. JavaScript, React, System Design"
                    />
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                    {resumeData.skills.map((skill) => (
                        <div key={skill} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm flex items-center gap-2 animate-in">
                            {skill}
                            <button
                                onClick={() => removeSkill(skill)}
                                className="hover:text-destructive transition-colors focus:outline-none"
                            >
                                <X className="h-3 w-3" />
                            </button>
                        </div>
                    ))}
                    {resumeData.skills.length === 0 && (
                        <span className="text-sm text-muted-foreground italic">No skills added yet</span>
                    )}
                </div>
            </div>

            <hr className="border-border/50" />

            {/* Projects Section */}
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">Projects</h3>
                    <Button onClick={handleAddProject} variant="outline" size="sm">
                        <Plus className="mr-2 h-4 w-4" /> Add Project
                    </Button>
                </div>

                <div className="space-y-4">
                    {resumeData.projects.map((proj) => (
                        <div key={proj.id} className="relative p-4 glass rounded-lg border border-border/50 group">
                            <Button
                                variant="destructive"
                                size="icon"
                                className="absolute -top-3 -right-3 h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={() => removeProject(proj.id)}
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Project Name</Label>
                                    <Input
                                        value={proj.name}
                                        onChange={(e) => updateProject(proj.id, { name: e.target.value })}
                                        placeholder="E-commerce App"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label>Project Link</Label>
                                    <Input
                                        value={proj.link}
                                        onChange={(e) => updateProject(proj.id, { link: e.target.value })}
                                        placeholder="https://github.com/..."
                                    />
                                </div>

                                <div className="space-y-2 md:col-span-2">
                                    <Label>Description</Label>
                                    <Input
                                        value={proj.description}
                                        onChange={(e) => updateProject(proj.id, { description: e.target.value })}
                                        placeholder="A full stack application built with..."
                                    />
                                </div>
                            </div>
                        </div>
                    ))}

                    {resumeData.projects.length === 0 && (
                        <div className="text-center p-6 border-2 border-dashed border-border rounded-lg text-muted-foreground text-sm">
                            Add your significant projects here.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
