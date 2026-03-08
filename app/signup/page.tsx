"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sparkles, Mail, Lock, User, ArrowRight, AlertCircle, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function SignupPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const router = useRouter();

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session) router.push('/dashboard');
        });
    }, [router]);

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: { full_name: name }
            }
        });

        if (error) {
            setError(error.message);
        } else {
            setSuccess(true);
            setTimeout(() => router.push('/login'), 3000);
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-slate-950 px-4 py-12">

            {/* Background Decorations */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-pink-900/30 blur-[120px] mix-blend-screen" />
                <div className="absolute bottom-[-20%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-900/40 blur-[120px] mix-blend-screen" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, type: "spring" }}
                className="w-full max-w-md relative z-10"
            >
                <div className="flex flex-col items-center mb-8">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-600 to-purple-600 flex items-center justify-center shadow-lg shadow-pink-500/20 mb-4">
                        <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Create an account</h1>
                    <p className="text-slate-400">Join thousands of users landing their dream jobs</p>
                </div>

                <div className="glass p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl shadow-purple-900/20">
                    <form className="space-y-5" onSubmit={handleSignup}>
                        {error && (
                            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2 text-red-400 text-sm">
                                <AlertCircle className="w-4 h-4" />
                                {error}
                            </div>
                        )}
                        {success && (
                            <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg flex items-center gap-2 text-emerald-400 text-sm opacity-100 transition-opacity">
                                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                                Account created successfully! Redirecting to login...
                            </div>
                        )}
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-slate-300 ml-1">Full Name</Label>
                            <div className="relative group">
                                <User className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-pink-400 transition-colors" />
                                <Input
                                    id="name"
                                    type="text"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="John Doe"
                                    className="pl-10 h-12 bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus-visible:ring-pink-500 rounded-xl transition-all"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-slate-300 ml-1">Email</Label>
                            <div className="relative group">
                                <Mail className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-pink-400 transition-colors" />
                                <Input
                                    id="email"
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="name@example.com"
                                    className="pl-10 h-12 bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus-visible:ring-pink-500 rounded-xl transition-all"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-slate-300 ml-1">Password</Label>
                            <div className="relative group">
                                <Lock className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-pink-400 transition-colors" />
                                <Input
                                    id="password"
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="pl-10 h-12 bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus-visible:ring-pink-500 rounded-xl transition-all"
                                />
                            </div>
                        </div>

                        <Button disabled={loading || success} type="submit" className="w-full h-12 text-md rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white shadow-lg shadow-pink-900/50 border-0 group relative overflow-hidden transition-all hover:scale-[1.02] disabled:opacity-70 disabled:hover:scale-100">
                            <span className="relative z-10 flex items-center justify-center">
                                {loading ? "Signing up..." : "Sign up"} <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </Button>
                    </form>

                    <div className="mt-6 flex items-center gap-4">
                        <div className="h-px bg-white/10 flex-1"></div>
                        <span className="text-slate-500 text-sm">Or sign up with</span>
                        <div className="h-px bg-white/10 flex-1"></div>
                    </div>

                    <div className="mt-6">
                        <Button variant="outline" className="w-full h-12 rounded-xl bg-white/5 border-white/10 text-white hover:bg-white/10 hover:text-white transition-colors flex items-center justify-center gap-3">
                            <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true"><path d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z" fill="#EA4335"></path><path d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z" fill="#4285F4"></path><path d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z" fill="#FBBC05"></path><path d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.26538 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z" fill="#34A853"></path></svg>
                            Google
                        </Button>
                    </div>

                    <p className="mt-8 text-center text-sm text-slate-400">
                        Already have an account?{" "}
                        <Link href="/login" className="text-pink-400 hover:text-pink-300 font-medium transition-colors">
                            Log in
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
