"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sparkles, Lock, ArrowRight, AlertCircle, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function ResetPasswordPage() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const router = useRouter();

    useEffect(() => {
        // Handle the password reset session
        const handleSession = async () => {
            const { data: { session }, error } = await supabase.auth.getSession();
            if (error) {
                setError("Invalid or expired session. Please request a new reset link.");
            } else if (!session) {
                // If no session is found, check if there's a code in the URL (PKCE)
                const params = new URLSearchParams(window.location.search);
                const code = params.get("code");
                if (code) {
                    const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
                    if (exchangeError) {
                        setError("Failed to exchange code for session. Please try again.");
                    }
                } else {
                    // No session and no code, maybe the hash is still being processed
                    // or the user navigated here directly
                }
            }
        };

        handleSession();
    }, []);

    const handleUpdatePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }

        setLoading(true);
        setError(null);

        const { error } = await supabase.auth.updateUser({
            password: password
        });

        if (error) {
            setError(error.message);
        } else {
            setSuccess(true);
            setTimeout(() => {
                router.push("/login");
            }, 2000);
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-slate-950 px-4">
            {/* Background Decorations */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-purple-900/30 blur-[120px] mix-blend-screen" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-900/40 blur-[120px] mix-blend-screen" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, type: "spring" }}
                className="w-full max-w-md relative z-10"
            >
                <div className="flex flex-col items-center mb-8">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-lg shadow-purple-500/20 mb-4">
                        <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Set New Password</h1>
                    <p className="text-slate-400 text-center">Please enter your new password below.</p>
                </div>

                <div className="glass p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl shadow-purple-900/20">
                    <form className="space-y-5" onSubmit={handleUpdatePassword}>
                        {error && (
                            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2 text-red-400 text-sm">
                                <AlertCircle className="w-4 h-4" />
                                {error}
                            </div>
                        )}
                        {success && (
                            <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg flex items-center gap-2 text-emerald-400 text-sm">
                                <CheckCircle2 className="w-4 h-4" />
                                Password updated successfully! Redirecting...
                            </div>
                        )}
                        
                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-slate-300 ml-1">New Password</Label>
                            <div className="relative group">
                                <Lock className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-purple-400 transition-colors" />
                                <Input
                                    id="password"
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="pl-10 h-12 bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus-visible:ring-purple-500 rounded-xl transition-all"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword" className="text-slate-300 ml-1">Confirm New Password</Label>
                            <div className="relative group">
                                <Lock className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-purple-400 transition-colors" />
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    required
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="pl-10 h-12 bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus-visible:ring-purple-500 rounded-xl transition-all"
                                />
                            </div>
                        </div>

                        <Button disabled={loading || success} type="submit" className="w-full h-12 text-md rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white shadow-lg shadow-purple-900/50 border-0 group relative overflow-hidden transition-all hover:scale-[1.02] disabled:opacity-70 disabled:hover:scale-100">
                            <span className="relative z-10 flex items-center justify-center">
                                {loading ? "Updating..." : "Update Password"} <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </Button>
                    </form>
                </div>
            </motion.div>
        </div>
    );
}
