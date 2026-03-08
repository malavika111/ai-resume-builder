"use client";

import { useResumeStore } from "@/store/useResumeStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2 } from "lucide-react";

export default function EducationForm() {
    const { resumeData: { education }, addEducation, updateEducation, removeEducation } = useResumeStore();

    const handleAdd = () => {
        addEducation({ institution: "", degree: "", startDate: "", endDate: "", description: "" });
    };

    return (
        <div className="space-y-6">
            <div className="text-center mb-6">
                <h2 className="text-2xl font-bold">Education</h2>
                <p className="text-sm text-muted-foreground mt-1">Add your academic background.</p>
            </div>

            <div className="space-y-6">
                {education.map((edu) => (
                    <div key={edu.id} className="relative p-4 glass rounded-lg border border-border/50 group">
                        <Button
                            variant="destructive"
                            size="icon"
                            className="absolute -top-3 -right-3 h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => removeEducation(edu.id)}
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Institution</Label>
                                <Input
                                    value={edu.institution}
                                    onChange={(e) => updateEducation(edu.id, { institution: e.target.value })}
                                    placeholder="University of Technology"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Degree / Certificate</Label>
                                <Input
                                    value={edu.degree}
                                    onChange={(e) => updateEducation(edu.id, { degree: e.target.value })}
                                    placeholder="B.S. Computer Science"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Start Date</Label>
                                <Input
                                    value={edu.startDate}
                                    onChange={(e) => updateEducation(edu.id, { startDate: e.target.value })}
                                    placeholder="Sep 2018"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>End Date</Label>
                                <Input
                                    value={edu.endDate}
                                    onChange={(e) => updateEducation(edu.id, { endDate: e.target.value })}
                                    placeholder="May 2022"
                                />
                            </div>

                            <div className="space-y-2 md:col-span-2">
                                <Label>Description (Optional)</Label>
                                <Textarea
                                    value={edu.description}
                                    onChange={(e) => updateEducation(edu.id, { description: e.target.value })}
                                    placeholder="Relevant coursework, honors, GPA..."
                                    className="h-24"
                                />
                            </div>
                        </div>
                    </div>
                ))}

                {education.length === 0 && (
                    <div className="text-center p-8 border-2 border-dashed border-border rounded-lg text-muted-foreground">
                        No education added yet.
                    </div>
                )}

                <Button onClick={handleAdd} variant="outline" className="w-full border-dashed">
                    <Plus className="mr-2 h-4 w-4" /> Add Education
                </Button>
            </div>
        </div>
    );
}
