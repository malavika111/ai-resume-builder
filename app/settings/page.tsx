"use client";

import { Button } from "@/components/ui/button";
import { User, Mail, Lock, Save, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [userEmail, setUserEmail] = useState("");
    const [userName, setUserName] = useState("");



    const [pwdLoading, setPwdLoading] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session?.user) {
                setUserEmail(session.user.email || "");
                setUserName(session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || "User");

                // Enforce permanent dark theme
                document.documentElement.classList.add('dark');
                localStorage.setItem('theme', 'dark');
            } else {
                router.push('/login');
            }
        };
        fetchUser();
    }, [router]);



    const handleSaveProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { error: profileError } = await supabase.auth.updateUser({
                data: { full_name: userName }
            });
            if (profileError) throw profileError;
            alert("Profile updated successfully");
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            alert(error.message || "Failed to update profile.");
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordReset = async () => {
        if (!userEmail) return;
        setPwdLoading(true);
        try {
            const { error } = await supabase.auth.resetPasswordForEmail(userEmail, {
                redirectTo: window.location.origin + "/reset-password"
            });
            if (error) throw error;
            alert("Password reset link sent to your email");
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            alert(error.message || "Failed to send reset link.");
        } finally {
            setPwdLoading(false);
        }
    };



    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.push('/');
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white flex flex-col pt-10 px-4 sm:px-6 lg:px-8 pb-20">
            <div className="max-w-4xl w-full mx-auto space-y-12">
                <div className="flex flex-col sm:flex-row items-baseline justify-between gap-4 border-b border-white/10 pb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-white tracking-tight mb-2 flex items-center gap-3">
                            <User className="w-8 h-8 text-blue-400 p-1.5 bg-blue-500/10 rounded-lg border border-blue-500/20" />
                            Account Settings
                        </h1>
                        <p className="text-slate-400">Manage your profile information, security, and preferences.</p>
                    </div>
                    <Button onClick={handleSignOut} variant="outline" className="text-slate-300 border-white/10 hover:bg-white/5">
                        <LogOut className="w-4 h-4 mr-2" /> Sign Out
                    </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                    {/* Navigation Sidebar-style layout on large screens */}
                    <div className="lg:col-span-1 space-y-2">
                        <div className="p-1 rounded-xl bg-white/5 border border-white/10 flex flex-col">
                            <button className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg bg-white/10 text-white text-left transition-colors">
                                <User className="w-4 h-4 text-blue-400" />
                                Profile Information
                            </button>
                            <button className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg hover:bg-white/5 text-slate-400 hover:text-white text-left transition-colors">
                                <Lock className="w-4 h-4 text-slate-400" />
                                Password
                            </button>

                        </div>
                    </div>

                    {/* Content Body */}
                    <div className="lg:col-span-2 space-y-10">

                        {/* Profile Section */}
                        <section className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8">
                            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                <User className="w-5 h-5 text-blue-400" /> Profile Information
                            </h2>
                            <form onSubmit={handleSaveProfile} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                                        <User className="w-4 h-4 text-slate-400" /> Full Name
                                    </label>
                                    <input
                                        type="text"
                                        value={userName}
                                        onChange={(e) => setUserName(e.target.value)}
                                        placeholder="Jane Doe"
                                        className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                                        <Mail className="w-4 h-4 text-slate-400" /> Email Address
                                    </label>
                                    <input
                                        type="email"
                                        value={userEmail}
                                        onChange={(e) => setUserEmail(e.target.value)}
                                        placeholder="jane.doe@example.com"
                                        className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                                    />
                                </div>
                                <div className="pt-2">
                                    <Button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-500 text-white px-6">
                                        {loading ? "Saving..." : <><Save className="w-4 h-4 mr-2" /> Save Changes</>}
                                    </Button>
                                </div>
                            </form>
                        </section>

                        {/* Password Section */}
                        <section className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8">
                            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                <Lock className="w-5 h-5 text-slate-300" /> Password Security
                            </h2>
                            <p className="text-slate-400 text-sm mb-6">Receive an email with a secure link to update your password.</p>
                            <Button onClick={handlePasswordReset} disabled={pwdLoading || !userEmail} variant="outline" className="border-white/20 text-white hover:bg-white/10">
                                {pwdLoading ? "Sending..." : "Send Password Reset Link"}
                            </Button>
                        </section>


                    </div>
                </div>
            </div>
        </div>
    );
}
