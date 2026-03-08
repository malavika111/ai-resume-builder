"use client";

import MinimalTemplate from "../templates/MinimalTemplate";
import ModernTemplate from "../templates/ModernTemplate";
import ProfessionalTemplate from "../templates/ProfessionalTemplate";
import CreativeTemplate from "../templates/CreativeTemplate";
import ExecutiveTemplate from "../templates/ExecutiveTemplate";
import ElegantTemplate from "../templates/ElegantTemplate";
import CompactTemplate from "../templates/CompactTemplate";
import TechTemplate from "../templates/TechTemplate";
import { Button } from "@/components/ui/button";
import { Download, LayoutTemplate, Save } from "lucide-react";
import { useState, useRef } from "react";
import { supabase } from "@/lib/supabase";
import { useResumeStore } from "@/store/useResumeStore";
import { useSearchParams, useRouter } from "next/navigation";
import { templates } from "@/lib/templates";

export type TemplateType = "minimal" | "modern" | "professional" | "creative" | "executive" | "elegant" | "compact" | "tech";

export default function ResumePreview() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const initialTemplate = (searchParams?.get("template") as TemplateType) || "minimal";
    const existingId = searchParams?.get("id");
    const [template, setTemplate] = useState<TemplateType>(initialTemplate);
    const [isExporting, setIsExporting] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [saveMessage, setSaveMessage] = useState("");
    const printRef = useRef<HTMLDivElement>(null);
    const { resumeData } = useResumeStore();

    const handleSaveResume = async () => {
        setIsSaving(true);
        setSaveMessage("");
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

            const { data, error } = await supabase
                .from("resumes")
                .upsert(payload)
                .select()
                .single();

            if (error) {
                console.error("Supabase save error:", error);
                alert("Save failed");
                return;
            }

            if (data && !existingId) {
                router.replace(`/resume-builder?id=${data.id}`);
            }

            alert("Resume saved successfully");
            setSaveMessage("Saved securely!");
            setTimeout(() => setSaveMessage(""), 3000);
        } catch (error) {
            console.error("Supabase save error:", error);
            alert("Save failed");
            setSaveMessage("Save failed.");
            setTimeout(() => setSaveMessage(""), 3000);
        } finally {
            setIsSaving(false);
        }
    };

    const handleExportPDF = async () => {
        if (!printRef.current) return;
        setIsExporting(true);

        try {
            const element = printRef.current;
            const opt = {
                margin: 0,
                filename: "my-resume.pdf",
                image: { type: "jpeg" as const, quality: 0.98 },
                html2canvas: { scale: 2, useCORS: true },
                jsPDF: { unit: "in", format: "letter", orientation: "portrait" as const },
            };

            const html2pdfModule = (await import("html2pdf.js")).default;
            await html2pdfModule().set(opt).from(element).save();
        } catch (error) {
            console.error("PDF generation failed", error);
        } finally {
            setIsExporting(false);
        }
    };

    const renderTemplate = () => {
        switch (template) {
            case "minimal": return <MinimalTemplate />;
            case "modern": return <ModernTemplate />;
            case "professional": return <ProfessionalTemplate />;
            case "creative": return <CreativeTemplate />;
            case "executive": return <ExecutiveTemplate />;
            case "elegant": return <ElegantTemplate />;
            case "compact": return <CompactTemplate />;
            case "tech": return <TechTemplate />;
            default: return <ModernTemplate />;
        }
    };

    return (
        <div className="w-full max-w-4xl h-full flex flex-col bg-transparent relative">
            {/* Control Bar */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-slate-900/80 backdrop-blur-xl border border-white/20 px-6 py-3 rounded-full shadow-[0_10px_30px_-10px_rgba(168,85,247,0.3)] flex items-center gap-6 w-max max-w-full justify-between overflow-x-auto text-white">
                <div className="flex items-center gap-3 border-r border-white/20 pr-6">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider hidden sm:block">Template</span>
                    <LayoutTemplate className="w-4 h-4 text-purple-400" />
                    <select
                        value={template}
                        onChange={(e) => setTemplate(e.target.value as TemplateType)}
                        className="bg-transparent text-sm font-bold outline-none cursor-pointer text-white appearance-none pr-4 focus:ring-0"
                    >
                        {templates.map(t => (
                            <option key={t.id} className="bg-slate-900" value={t.id}>{t.name}</option>
                        ))}
                    </select>
                </div>

                <div className="flex items-center gap-3">
                    {saveMessage && <span className={`text-xs font-medium ${saveMessage.includes('failed') || saveMessage.includes('log in') ? 'text-red-400' : 'text-emerald-400'} mr-2 truncate max-w-[120px] transition-all`}>{saveMessage}</span>}
                    <Button size="sm" onClick={handleSaveResume} disabled={isSaving} className="gap-2 bg-white/10 text-white hover:bg-white/20 border-white/10 backdrop-blur-sm transition-all shadow-none">
                        <Save className="w-4 h-4" />
                        <span className="hidden sm:inline">{isSaving ? "Saving..." : "Save"}</span>
                    </Button>
                    <Button size="sm" onClick={handleExportPDF} disabled={isExporting} className="gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white border-transparent hover:shadow-[0_0_15px_rgba(168,85,247,0.5)] transition-all">
                        <Download className="w-4 h-4" />
                        <span className="hidden sm:inline">{isExporting ? "Exporting..." : "Download"}</span>
                    </Button>
                </div>
            </div>

            {/* Preview Document Scale Wrapper */}
            <div className="flex-1 w-full overflow-y-auto px-4 pt-28 pb-12 flex justify-center custom-scrollbar">
                <div
                    ref={printRef}
                    className="w-full transform shadow-2xl transition-all duration-300 bg-white"
                >
                    {renderTemplate()}
                </div>
            </div>
        </div>
    );
}
