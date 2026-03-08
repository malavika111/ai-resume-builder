"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { ResumeData } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Download, LayoutTemplate, Edit2, Loader2, ArrowLeft } from "lucide-react";
import { useResumeStore } from "@/store/useResumeStore";
import Link from "next/link";
import MinimalTemplate from "@/components/templates/MinimalTemplate";
import ModernTemplate from "@/components/templates/ModernTemplate";
import ProfessionalTemplate from "@/components/templates/ProfessionalTemplate";
import CreativeTemplate from "@/components/templates/CreativeTemplate";
import { useRef } from "react";

export default function ResumeViewPage() {
    const params = useParams();
    const router = useRouter();
    const [resumeData, setResumeData] = useState<ResumeData | null>(null);
    const [loading, setLoading] = useState(true);
    const [template, setTemplate] = useState<"minimal" | "modern" | "professional" | "creative">("modern");
    const [isExporting, setIsExporting] = useState(false);
    const [isOwner, setIsOwner] = useState(false);

    const printRef = useRef<HTMLDivElement>(null);
    const { setEntireResume } = useResumeStore();

    useEffect(() => {
        const fetchResume = async () => {
            if (!params.id) return;
            try {
                // 1. Fetch Resume Data
                const { data, error } = await supabase
                    .from('resumes')
                    .select('*')
                    .eq('id', params.id)
                    .single();

                if (error) throw error;
                if (data) {
                    setResumeData(data.content as ResumeData);

                    // 2. Check if current user is the owner
                    const { data: { session } } = await supabase.auth.getSession();
                    if (session?.user?.id === data.user_id) {
                        setIsOwner(true);
                    }
                }
            } catch (error) {
                console.error("Error fetching resume:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchResume();
    }, [params.id]);

    const handleExportPDF = async () => {
        if (!printRef.current) return;
        setIsExporting(true);

        try {
            const element = printRef.current;
            const opt = {
                margin: 0,
                filename: `${resumeData?.personalInfo?.fullName || 'Resume'}.pdf`,
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

    const handleEdit = () => {
        if (resumeData && params.id) {
            setEntireResume(resumeData);
            router.push(`/resume-builder?id=${params.id}`);
        }
    };

    const renderTemplate = () => {
        if (!resumeData) return null;

        // We temporarily inject the fetched data into context or we could pass as props.
        // Since templates use standard "useResumeStore", we can just hydrate it for view
        // But doing so mutates global state. Better to render it with data context if possible, 
        // however since this is a public view, mutating global state for this tab is acceptable.

        // Safest approach without rewriting templates to accept props: 
        // Sync local fetched data to the global store for rendering.
        setEntireResume(resumeData);

        switch (template) {
            case "minimal": return <MinimalTemplate />;
            case "modern": return <ModernTemplate />;
            case "professional": return <ProfessionalTemplate />;
            case "creative": return <CreativeTemplate />;
            default: return <ModernTemplate />;
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-100 flex items-center justify-center flex-col gap-4">
                <Loader2 className="w-8 h-8 text-purple-600 animate-spin" />
                <p className="text-slate-500 font-medium animate-pulse">Loading Resume...</p>
            </div>
        );
    }

    if (!resumeData) {
        return (
            <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                    <LayoutTemplate className="w-8 h-8 text-red-500" />
                </div>
                <h1 className="text-2xl font-bold text-slate-800 mb-2">Resume Not Found</h1>
                <p className="text-slate-500 mb-6 max-w-sm">The resume you are looking for does not exist or you do not have permission to view it.</p>
                <Link href="/">
                    <Button>Return Home</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            {/* Top Navigation Bar */}
            <div className="h-16 bg-white border-b border-slate-200 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-50 shadow-sm">
                <div className="flex items-center gap-4">
                    <Link href="/dashboard" className="text-slate-500 hover:text-slate-900 transition-colors hidden sm:flex items-center gap-1 font-medium text-sm">
                        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
                    </Link>
                    <div className="h-6 w-px bg-slate-200 hidden sm:block"></div>
                    <div className="flex items-center gap-2">
                        <LayoutTemplate className="w-4 h-4 text-slate-400" />
                        <select
                            value={template}
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            onChange={(e) => setTemplate(e.target.value as any)}
                            className="bg-slate-100 border-none text-sm font-medium outline-none cursor-pointer rounded-md px-2 py-1 hover:bg-slate-200 transition-colors"
                        >
                            <option value="minimal">Minimal</option>
                            <option value="modern">Modern</option>
                            <option value="professional">Professional</option>
                            <option value="creative">Creative</option>
                        </select>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    {isOwner && (
                        <Button variant="outline" size="sm" onClick={handleEdit} className="bg-white hover:bg-slate-100 text-slate-700">
                            <Edit2 className="w-4 h-4 mr-2" />
                            <span className="hidden sm:inline">Edit Resume</span>
                        </Button>
                    )}
                    <Button size="sm" onClick={handleExportPDF} disabled={isExporting} className="bg-purple-600 hover:bg-purple-700 text-white">
                        {isExporting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Download className="w-4 h-4 mr-2" />}
                        <span className="hidden sm:inline">{isExporting ? "Preparing PDF..." : "Download PDF"}</span>
                        <span className="inline sm:hidden">PDF</span>
                    </Button>
                </div>
            </div>

            {/* Document Viewer */}
            <div className="flex-1 overflow-auto p-4 sm:p-8 flex justify-center pb-20 border-t border-slate-200">
                <div className="w-full max-w-4xl shadow-2xl bg-white border border-slate-200 rounded-sm">
                    <div ref={printRef}>
                        {renderTemplate()}
                    </div>
                </div>
            </div>
        </div>
    );
}
