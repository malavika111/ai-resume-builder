"use client";

import { Button } from "@/components/ui/button";
import { Plus, Download, Trash2, Edit2, Loader2, Target } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useResumeStore } from "@/store/useResumeStore";
import { formatDistanceToNow } from "date-fns";

export default function MyResumesPage() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [resumes, setResumes] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const { setEntireResume } = useResumeStore();

    useEffect(() => {
        fetchResumes();
    }, []);

    const fetchResumes = async () => {
        try {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) return;

            const { data, error } = await supabase
                .from('resumes')
                .select('*')
                .eq('user_id', session.user.id)
                .order('created_at', { ascending: false });

            if (error) throw error;
            setResumes(data || []);
        } catch (error) {
            console.error("Error fetching resumes:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        if (!confirm("Are you sure you want to delete this resume? This action cannot be undone.")) return;
        try {
            const { error } = await supabase.from('resumes').delete().eq('id', id);
            if (error) throw error;
            setResumes(resumes.filter(r => r.id !== id));
        } catch (error) {
            console.error("Error deleting resume:", error);
            alert("Failed to delete resume.");
        }
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleEdit = (resume: any) => {
        setEntireResume(resume.content);
        router.push(`/resume-builder?id=${resume.id}`);
    };

    const handleDownload = (e: React.MouseEvent) => {
        e.stopPropagation();
        alert("Downloading PDF... (Functionality to be implemented)");
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white flex flex-col pt-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl w-full mx-auto space-y-8">
                <div className="flex flex-col sm:flex-row items-baseline justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-white tracking-tight mb-1">My Resumes</h1>
                        <p className="text-slate-400">Manage and update all your created resumes here.</p>
                    </div>
                    <Link href="/resume-builder">
                        <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-xl shadow-lg shadow-purple-900/40 border-0 py-6 px-6">
                            <Plus className="w-5 h-5 mr-2" />
                            Create New Resume
                        </Button>
                    </Link>
                </div>

                {loading ? (
                    <div className="flex items-center justify-center p-20 w-full border border-white/10 rounded-2xl bg-white/5">
                        <Loader2 className="w-10 h-10 text-purple-500 animate-spin" />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {resumes.map((resume) => (
                            <div key={resume.id} onClick={() => handleEdit(resume)} className="group rounded-2xl bg-white/5 border border-white/10 overflow-hidden hover:border-purple-500/30 transition-all hover:bg-white/10 cursor-pointer flex flex-col h-full">
                                <div className="p-6 flex-grow flex flex-col gap-4">
                                    <div className="flex justify-between items-start">
                                        <div className="w-full">
                                            <h3 className="font-bold text-xl text-white truncate w-full" title={resume.title || "Untitled Resume"}>{resume.title || "Untitled Resume"}</h3>
                                            <p className="text-sm text-slate-400 mt-1 flex items-center gap-1">
                                                Created {formatDistanceToNow(new Date(resume.created_at), { addSuffix: true })}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 mt-auto p-3 rounded-xl bg-slate-900/80 border border-white/5 w-fit">
                                        <Target className="w-4 h-4 text-emerald-400" />
                                        <span className="text-sm font-medium text-emerald-400">ATS Score: {resume.content?.ats_score || '85'}/100</span>
                                    </div>
                                </div>

                                <div className="p-4 border-t border-white/5 bg-black/20 flex items-center justify-between gap-2">
                                    <Button size="sm" variant="ghost" onClick={(e) => { e.stopPropagation(); handleEdit(resume); }} className="text-slate-300 hover:text-white hover:bg-white/10 flex-1">
                                        <Edit2 className="w-4 h-4 mr-2" /> Edit
                                    </Button>
                                    <Button size="sm" variant="ghost" onClick={handleDownload} className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 flex-1">
                                        <Download className="w-4 h-4 mr-2" /> Download
                                    </Button>
                                    <Button size="sm" variant="ghost" onClick={(e) => handleDelete(resume.id, e)} className="text-red-400 hover:text-red-300 hover:bg-red-500/10 flex-1">
                                        <Trash2 className="w-4 h-4 mr-2" /> Delete
                                    </Button>
                                </div>
                            </div>
                        ))}

                        {/* New Card Trigger */}
                        <Link href="/resume-builder" className="group rounded-2xl border-2 border-dashed border-white/10 hover:border-purple-500/50 hover:bg-purple-500/5 transition-all flex flex-col items-center justify-center min-h-[250px] p-6 text-center">
                            <div className="w-16 h-16 rounded-full bg-white/5 group-hover:bg-purple-500/20 flex items-center justify-center mx-auto mb-4 transition-colors">
                                <Plus className="w-8 h-8 text-slate-400 group-hover:text-purple-400" />
                            </div>
                            <h3 className="font-semibold text-lg text-slate-300 group-hover:text-white">Create New Resume</h3>
                            <p className="text-sm text-slate-500 mt-2">Start building from scratch or use AI templates.</p>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
