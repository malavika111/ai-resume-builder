"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sparkles, Mail, ArrowRight, AlertCircle, CheckCircle2, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/reset-password`,
        });

        if (error) {
            setError(error.message);
        } else {
            setSuccess(true);
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
                    <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Forgot Password</h1>
                    <p className="text-slate-400 text-center">Enter your email and we&apos;ll send you a link to reset your password.</p>
                </div>

                <div className="glass p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl shadow-purple-900/20">
                    <form className="space-y-5" onSubmit={handleReset}>
                        {error && (
                            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2 text-red-400 text-sm">
                                <AlertCircle className="w-4 h-4" />
                                {error}
                            </div>
                        )}
                        {success && (
                            <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg flex items-center gap-2 text-emerald-400 text-sm">
                                <CheckCircle2 className="w-4 h-4" />
                                Reset link sent! Check your email.
                            </div>
                        )}
                        
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-slate-300 ml-1">Email</Label>
                            <div className="relative group">
                                <Mail className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-purple-400 transition-colors" />
                                <Input
                                    id="email"
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="name@example.com"
                                    className="pl-10 h-12 bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus-visible:ring-purple-500 rounded-xl transition-all"
                                />
                            </div>
                        </div>

                        <Button disabled={loading || success} type="submit" className="w-full h-12 text-md rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white shadow-lg shadow-purple-900/50 border-0 group relative overflow-hidden transition-all hover:scale-[1.02] disabled:opacity-70 disabled:hover:scale-100">
                            <span className="relative z-10 flex items-center justify-center">
                                {loading ? "Sending..." : "Send Reset Link"} <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </Button>
                    </form>

                    <p className="mt-8 text-center text-sm text-slate-400">
                        Remember your password?{" "}
                        <Link href="/login" className="text-purple-400 hover:text-purple-300 font-medium transition-colors flex items-center justify-center gap-1 mt-2">
                            <ArrowLeft className="w-4 h-4" /> Back to login
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
