"use client";

import Link from "next/link";
import { LayoutDashboard, FileText, LayoutTemplate, Zap, Settings, LogOut, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                router.push("/login");
            } else {
                setUser(session.user);
            }
            setLoading(false);
        };
        checkUser();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            if (!session) {
                router.push("/login");
            } else {
                setUser(session.user);
            }
        });

        return () => subscription.unsubscribe();
    }, [router]);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push("/");
    };

    if (loading) {
        return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white"><div className="animate-pulse flex items-center gap-2"><Sparkles className="text-purple-500 w-5 h-5" /> Securely checking session...</div></div>;
    }

    if (!user) {
        return null; // Will redirect via useEffect
    }

    return (
        <div className="min-h-screen bg-slate-950 flex">
            {/* Sidebar */}
            <aside className="w-64 border-r border-white/10 bg-slate-950/50 backdrop-blur-xl hidden md:flex flex-col z-20">
                <div className="h-20 flex items-center px-6 border-b border-white/10">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                            <Sparkles className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-extrabold text-xl text-white">Melova</span>
                    </Link>
                </div>

                <div className="flex-1 overflow-y-auto py-6 flex flex-col gap-2 px-4">
                    <NavItem href="/dashboard" icon={<LayoutDashboard className="w-5 h-5" />} label="Dashboard" active />
                    <NavItem href="/my-resumes" icon={<FileText className="w-5 h-5" />} label="My Resumes" />
                    <NavItem href="/templates" icon={<LayoutTemplate className="w-5 h-5" />} label="Templates" />
                    <NavItem href="/ai-tools" icon={<Zap className="w-5 h-5" />} label="AI Tools" />
                    <div className="mt-auto">
                        <NavItem href="/settings" icon={<Settings className="w-5 h-5" />} label="Settings" />
                    </div>
                </div>

                <div className="p-4 border-t border-white/10">
                    <Button onClick={handleLogout} variant="ghost" className="w-full justify-start text-slate-400 hover:text-white hover:bg-white/5">
                        <LogOut className="w-5 h-5 mr-3" />
                        Log out
                    </Button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col relative h-screen overflow-hidden">
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <div className="absolute top-0 right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-900/10 blur-[100px]" />
                </div>

                <header className="h-20 border-b border-white/10 bg-slate-950/80 backdrop-blur-md flex items-center justify-between px-8 z-10 md:hidden">
                    <span className="font-bold text-white">Melova</span>
                    <Button onClick={handleLogout} variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                        <LogOut className="w-4 h-4 mr-2" />
                        Log out
                    </Button>
                </header>

                <div className="flex-1 overflow-y-auto p-8 z-10">
                    {children}
                </div>
            </main>
        </div>
    );
}

function NavItem({ href, icon, label, active }: { href: string; icon: React.ReactNode; label: string; active?: boolean }) {
    return (
        <Link
            href={href}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${active ? 'bg-purple-500/10 text-purple-400 font-medium border border-purple-500/20' : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'}`}
        >
            {icon}
            {label}
        </Link>
    );
}
