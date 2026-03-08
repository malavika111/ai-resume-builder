"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkles, LayoutDashboard, LogOut } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

export default function Navbar() {
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session) setUser(session.user);
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            if (session) setUser(session.user);
            else setUser(null);
        });

        return () => subscription.unsubscribe();
    }, []);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push("/");
    };

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="w-full h-20 border-b border-white/10 bg-slate-950/50 backdrop-blur-xl sticky top-0 z-50 transition-all"
        >
            <div className="container mx-auto h-full px-4 flex items-center justify-between">

                {/* Logo Section */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-lg shadow-purple-500/20 group-hover:scale-105 transition-transform">
                        <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-extrabold text-2xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 group-hover:to-white transition-colors">
                        Melova
                    </span>
                </Link>

                {/* Center Links (Desktop) */}
                <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
                    <Link href="/templates" className="hover:text-white transition-colors">Templates</Link>
                    <Link href="/ai-tools" className="hover:text-white transition-colors flex items-center gap-1">
                        AI Tools <span className="px-1.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-[10px] border border-purple-500/30 uppercase tracking-widest">New</span>
                    </Link>
                </div>

                {/* Right Constraints (Auth/Dashboard) */}
                <div className="flex items-center gap-4">
                    {!user ? (
                        <>
                            <Link href="/login" className="hidden sm:block">
                                <Button variant="ghost" className="text-slate-300 hover:text-white hover:bg-white/10 font-medium">
                                    Log in
                                </Button>
                            </Link>
                            <Link href="/signup">
                                <Button className="bg-white text-slate-900 hover:bg-slate-200 font-semibold rounded-lg shadow-lg shadow-white/10 transition-transform hover:scale-105">
                                    Sign up
                                </Button>
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link href="/dashboard" className="hidden sm:block">
                                <Button variant="outline" className="bg-transparent border-white/20 text-white hover:bg-white/10">
                                    <LayoutDashboard className="w-4 h-4 mr-2" />
                                    Dashboard
                                </Button>
                            </Link>
                            <div className="hidden lg:block ml-2 border-l border-white/10 pl-4">
                                <Button onClick={handleLogout} variant="ghost" className="text-slate-300 hover:text-white hover:bg-white/10">
                                    <LogOut className="w-4 h-4 mr-2" />
                                    Log out
                                </Button>
                            </div>
                        </>
                    )}
                </div>

            </div>
        </motion.nav>
    );
}
