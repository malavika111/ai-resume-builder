"use client";

import { Button } from "@/components/ui/button";
import { Plus, FileText, CheckCircle2, Trash2, Edit2, Loader2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useResumeStore } from "@/store/useResumeStore";
import { formatDistanceToNow } from "date-fns";

export default function DashboardPage() {
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

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <div className="flex flex-col sm:flex-row items-baseline justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight mb-1">Dashboard</h1>
                    <p className="text-slate-400">Welcome back. Here&apos;s an overview of your career assets.</p>
                </div>
                <Link href="/resume-builder">
                    <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-xl shadow-lg shadow-purple-900/40 border-0">
                        <Plus className="w-5 h-5 mr-2" />
                        Create Resume
                    </Button>
                </Link>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 max-w-2xl mx-auto gap-4">
                <StatCard title="Total Resumes" value={loading ? "..." : resumes.length.toString()} icon={<FileText className="text-blue-400" />} />
                <StatCard title="Avg. ATS Score" value="84%" icon={<CheckCircle2 className="text-emerald-400" />} />
            </div>

            {/* Resumes Grid */}
            <div>
                <h2 className="text-xl font-bold text-white mb-4">Recent Resumes</h2>

                {loading ? (
                    <div className="flex items-center justify-center p-12 w-full border border-white/10 rounded-2xl bg-white/5">
                        <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                        {resumes.map((resume) => (
                            <div key={resume.id} onClick={() => handleEdit(resume)} className="group rounded-2xl bg-white/5 border border-white/10 overflow-hidden hover:border-purple-500/30 transition-all hover:bg-white/10 cursor-pointer">
                                <div className="aspect-[1/1.2] bg-slate-900 relative p-4 flex flex-col gap-2">
                                    {/* Card Content Skeleton to represent generic layout */}
                                    <div className="w-1/2 h-4 bg-purple-500/20 rounded"></div>
                                    <div className="w-1/3 h-2 bg-white/10 rounded"></div>
                                    <div className="w-full h-px bg-white/5 my-2"></div>
                                    <div className="w-3/4 h-2 bg-white/10 rounded"></div>
                                    <div className="w-full h-2 bg-white/10 rounded"></div>
                                    <div className="w-2/3 h-2 bg-white/10 rounded mt-2"></div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />

                                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-10 w-full pr-8">
                                        <div className="min-w-0 pr-2">
                                            <h3 className="font-semibold text-white truncate max-w-[180px]">{resume.title || "Untitled Resume"}</h3>
                                            <p className="text-xs text-slate-400 truncate">Updated {formatDistanceToNow(new Date(resume.created_at), { addSuffix: true })}</p>
                                        </div>
                                    </div>

                                    {/* Hover Overlay */}
                                    <div className="absolute inset-0 bg-purple-900/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3">
                                        <Link href={`/resume/${resume.id}`} onClick={(e) => e.stopPropagation()}>
                                            <Button size="sm" className="bg-purple-600 text-white hover:bg-purple-700 w-32 shadow-xl">
                                                <FileText className="w-4 h-4 mr-2" /> View Public
                                            </Button>
                                        </Link>
                                        <Button size="sm" onClick={(e) => { e.stopPropagation(); handleEdit(resume); }} className="bg-white text-slate-900 hover:bg-slate-200 w-32 shadow-xl">
                                            <Edit2 className="w-4 h-4 mr-2" /> Edit
                                        </Button>
                                        <Button size="sm" variant="outline" onClick={(e) => handleDelete(resume.id, e)} className="text-red-400 border-red-500/20 bg-black/40 hover:bg-red-500/20 hover:text-red-300 w-32">
                                            <Trash2 className="w-4 h-4 mr-2" /> Delete
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* New Card Trigger */}
                        <Link href="/resume-builder" className="group rounded-2xl border-2 border-dashed border-white/10 hover:border-purple-500/50 hover:bg-purple-500/5 transition-all flex items-center justify-center min-h-[300px]">
                            <div className="text-center p-6">
                                <div className="w-12 h-12 rounded-full bg-white/5 group-hover:bg-purple-500/20 flex items-center justify-center mx-auto mb-3 transition-colors">
                                    <Plus className="w-6 h-6 text-slate-400 group-hover:text-purple-400" />
                                </div>
                                <h3 className="font-semibold text-slate-300 group-hover:text-white">Create New Resume</h3>
                                {resumes.length === 0 && <p className="text-sm text-slate-500 mt-2">You haven&apos;t created any resumes yet.</p>}
                            </div>
                        </Link>

                    </div>
                )}
            </div>
        </div>
    );
}

function StatCard({ title, value, icon }: { title: string, value: string, icon: React.ReactNode }) {
    return (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 shadow-inner">
                {icon}
            </div>
            <div>
                <p className="text-sm text-slate-400 font-medium">{title}</p>
                <p className="text-2xl font-bold text-white">{value}</p>
            </div>
        </div>
    );
}
