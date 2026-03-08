"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Target, Zap, CheckCircle2, FileText, Linkedin, PenTool, MessageSquare, Star } from "lucide-react";
import { motion, useMotionValue, Variants } from "framer-motion";
import { MouseEvent } from "react";

export default function Home() {
    // 3D Tilt Effect on Hero Card
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
        const { left, top, width, height } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left - width / 2);
        mouseY.set(clientY - top - height / 2);
    }

    // Shared Animations
    const container: Variants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const item: Variants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
    };

    return (
        <div className="min-h-screen bg-slate-950 selection:bg-purple-500/30 selection:text-white">

            {/* Background Effects */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-900/30 blur-[120px] mix-blend-screen" />
                <div className="absolute top-[20%] right-[-10%] w-[30%] h-[50%] rounded-full bg-indigo-900/20 blur-[130px] mix-blend-screen" />
                <div className="absolute bottom-[-20%] left-[20%] w-[50%] h-[50%] rounded-full bg-pink-900/20 blur-[150px] mix-blend-screen" />
                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.015] mix-blend-overlay" />
            </div>

            <main className="relative z-10 pt-24 pb-20 overflow-hidden">

                {/* 1. HERO SECTION */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 lg:mt-24 mb-32">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
                        {/* Hero Text Content */}
                        <motion.div variants={container} initial="hidden" animate="show" className="text-center lg:text-left">
                            <motion.div variants={item} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-purple-300 text-sm font-medium mb-6">
                                <Sparkles className="w-4 h-4" />
                                <span>Your AI Career Assistant</span>
                            </motion.div>

                            <motion.h1 variants={item} className="text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6 leading-[1.1]">
                                Build an <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">ATS-Optimized</span> Resume with AI in Seconds
                            </motion.h1>

                            <motion.p variants={item} className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
                                Our AI transforms your experience into recruiter-ready resumes instantly. Don&apos;t let algorithms screen you out—win your dream job today.
                            </motion.p>

                            <motion.div variants={item} className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                                <Link href="/signup">
                                    <Button size="lg" className="h-14 px-8 text-lg rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white shadow-lg shadow-purple-900/50 border-0 group relative overflow-hidden transition-all hover:scale-105">
                                        <span className="relative z-10 flex items-center">
                                            Create Resume <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </span>
                                    </Button>
                                </Link>
                                <Link href="/dashboard">
                                    <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-xl bg-white/5 border-white/10 text-white hover:bg-white/10 hover:text-white transition-all hover:scale-105">
                                        View Dashboard
                                    </Button>
                                </Link>
                            </motion.div>
                        </motion.div>

                        {/* Hero 3D Card */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
                            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="relative hidden lg:block perspective-1000"
                            onMouseMove={handleMouseMove}
                        >
                            <motion.div
                                className="w-full max-w-md mx-auto aspect-[1/1.4] rounded-2xl p-6 glass border border-white/20 bg-white/10 backdrop-blur-md shadow-2xl relative overflow-hidden group"
                                style={{ transformStyle: "preserve-3d" }}
                            >
                                {/* Card Internal UI Mock */}
                                <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-purple-500 to-pink-500" />
                                <div className="flex items-center gap-4 mb-8 translate-z-10">
                                    <div className="w-16 h-16 rounded-full bg-slate-800 border-2 border-slate-700" />
                                    <div>
                                        <div className="w-32 h-4 bg-slate-700 rounded mb-2" />
                                        <div className="w-24 h-3 bg-slate-800 rounded" />
                                    </div>
                                </div>
                                <div className="space-y-4 translate-z-20">
                                    <div className="w-full h-2 bg-slate-800 rounded" />
                                    <div className="w-5/6 h-2 bg-slate-800 rounded" />
                                    <div className="w-4/6 h-2 bg-slate-800 rounded mb-8" />
                                </div>
                                <div className="space-y-4 translate-z-30">
                                    <div className="w-1/3 h-3 bg-slate-700 rounded mb-4" />
                                    <div className="w-full h-12 bg-purple-500/10 border border-purple-500/20 rounded-lg p-3">
                                        <div className="w-1/2 h-2 bg-purple-400 rounded mb-2" />
                                        <div className="w-3/4 h-2 bg-purple-400/50 rounded" />
                                    </div>
                                    <div className="w-full h-12 bg-pink-500/10 border border-pink-500/20 rounded-lg p-3">
                                        <div className="w-1/2 h-2 bg-pink-400 rounded mb-2" />
                                        <div className="w-3/4 h-2 bg-pink-400/50 rounded" />
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>

                {/* 2. FEATURES SECTION */}
                <section id="features" className="py-24 relative z-10">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center max-w-2xl mx-auto mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Complete Career Arsenal</h2>
                            <p className="text-slate-400 text-lg">Everything you need to craft the perfect application and stand out from the crowd.</p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <FeatureCard
                                icon={<FileText className="w-6 h-6 text-purple-400" />}
                                title="AI Resume Builder"
                                description="Generate tailored bullet points and professional summaries customized to your industry instantly."
                                href="/resume-builder"
                            />
                            <FeatureCard
                                icon={<Target className="w-6 h-6 text-pink-400" />}
                                title="ATS Optimization"
                                description="Ensure your resume passes Applicant Tracking Systems with our intelligent keyword scanner."
                                href="/ai-tools/ats-check"
                            />
                            <FeatureCard
                                icon={<PenTool className="w-6 h-6 text-blue-400" />}
                                title="AI Cover Letter Generator"
                                description="Create personalized, highly persuasive cover letters to perfectly match the job description."
                                href="/ai-tools/cover-letter"
                            />
                            <FeatureCard
                                icon={<Linkedin className="w-6 h-6 text-indigo-400" />}
                                title="LinkedIn Profile → Resume"
                                description="Import your LinkedIn profile and let our AI draft your resume layout in just one click."
                                href="/ai-tools/linkedin-import"
                            />
                        </div>
                    </div>
                </section>

                {/* 5. PRODUCT DEMO SECTION */}
                <section className="py-24 relative overflow-hidden bg-slate-900/50 border-y border-white/5">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Built for speed and precision.</h2>
                                <p className="text-lg text-slate-400 mb-8 leading-relaxed">
                                    Watch how our AI analyzes your basic inputs and transforms them into impact-driven, metric-rich bullet points. No more staring at a blank page.
                                </p>
                                <ul className="space-y-4 mb-8">
                                    <li className="flex items-center gap-3 text-slate-300">
                                        <CheckCircle2 className="w-5 h-5 text-purple-500" /> Instant content generation
                                    </li>
                                    <li className="flex items-center gap-3 text-slate-300">
                                        <CheckCircle2 className="w-5 h-5 text-purple-500" /> Context-aware grammar fixing
                                    </li>
                                    <li className="flex items-center gap-3 text-slate-300">
                                        <CheckCircle2 className="w-5 h-5 text-purple-500" /> Action verb enrichment
                                    </li>
                                </ul>
                            </div>

                            {/* Animated Demo Window */}
                            <div className="relative rounded-2xl bg-black/50 border border-white/10 shadow-2xl p-4 md:p-6 overflow-hidden">
                                <div className="flex gap-2 mb-4 px-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                                </div>
                                <div className="space-y-4 font-mono text-sm leading-relaxed text-slate-300 min-h-[250px]">
                                    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-slate-500">
                                        {`> Analyzing user experience...`}
                                    </motion.div>
                                    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 1 }} className="text-purple-400">
                                        {`> "built website for company"`}
                                    </motion.div>
                                    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 2.5 }} className="pl-4 border-l-2 border-pink-500">
                                        <p className="text-white"><span className="text-pink-400 font-bold">Generated:</span> Architected and developed a responsive full-stack web application serving 10,000+ monthly active users, reducing load times by 40%.</p>
                                    </motion.div>
                                    <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 3.5 }} className="mt-6 flex items-center gap-2 text-emerald-400">
                                        <CheckCircle2 className="w-4 h-4" /> Added to resume seamlessly.
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 3. RESUME TEMPLATE SHOWCASE */}
                <section className="py-24">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                            <div>
                                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Professional Resume Templates</h2>
                                <p className="text-slate-400 text-lg max-w-2xl">Start with a foundation tested and proven by top industry recruiters.</p>
                            </div>
                            <Link href="/templates" className="text-purple-400 hover:text-purple-300 font-medium flex items-center transition-colors">
                                View all templates <ArrowRight className="ml-2 w-4 h-4" />
                            </Link>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <TemplateCard name="Minimal" color="blue" />
                            <TemplateCard name="Professional" color="slate" />
                            <TemplateCard name="Modern" color="purple" />
                            <TemplateCard name="Creative" color="pink" />
                        </div>
                    </div>
                </section>

                {/* 4. AI CAREER TOOLS */}
                <section className="py-24 relative">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">AI Career Tools</h2>
                            <p className="text-slate-400 text-lg">Beyond just resumes, an entire suite tailored for your success.</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                            <ToolCard icon={<Zap className="w-6 h-6" />} title="AI Resume Optimizer" desc="Refine bullet points and phrasing automatically." />
                            <ToolCard icon={<Target className="w-6 h-6" />} title="AI Resume Score (ATS Checker)" desc="Score against real job descriptions to identify missing keywords." />
                            <ToolCard icon={<FileText className="w-6 h-6" />} title="AI Cover Letter Generator" desc="Perfectly aligned cover letters in seconds." />
                            <ToolCard icon={<MessageSquare className="w-6 h-6" />} title="AI Interview Question Generator" desc="Practice with custom generated technical and behavioral questions." />
                        </div>
                    </div>
                </section>

                {/* 6. TESTIMONIALS SECTION */}
                <section className="py-24 bg-slate-900/30">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-16">Loved by ambitious job seekers</h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            <TestimonialCard
                                name="Sarah J."
                                role="Product Manager"
                                review="I spent hours tweaking my resume before. The ATS optimization feature highlighted exactly why I wasn't getting callbacks. I landed a role at a top tech firm 3 weeks later."
                            />
                            <TestimonialCard
                                name="Michael T."
                                role="Software Engineer"
                                review="The AI bullet point generator is terrifyingly good. It phrased my backend development experience better than I ever could have. Worth every penny."
                            />
                            <TestimonialCard
                                name="Emily R."
                                role="Marketing Director"
                                review="The modern template combined with the tailored cover letter tool makes applying for jobs a breeze. I used to dread the process, now it takes me 5 minutes per job."
                            />
                        </div>
                    </div>
                </section>

                {/* 7. CALL TO ACTION SECTION */}
                <section className="py-32 relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent pointer-events-none" />
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                        <h2 className="text-5xl font-extrabold text-white mb-6">Build Your Resume in Minutes with AI</h2>
                        <p className="text-xl text-slate-400 mb-10">Join thousands of professionals landing their dream careers using our intelligent career platform.</p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link href="/signup">
                                <Button size="lg" className="h-14 px-10 text-lg rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white shadow-lg shadow-purple-900/50 border-0 hover:scale-105 transition-all">
                                    Create Resume
                                </Button>
                            </Link>
                            <Link href="/templates">
                                <Button size="lg" variant="outline" className="h-14 px-10 text-lg rounded-xl bg-white/5 border-white/10 text-white hover:bg-white/10 transition-all">
                                    View Templates
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>

            </main>
        </div>
    );
}

// Sub-components

function FeatureCard({ icon, title, description, href }: { icon: React.ReactNode, title: string, description: string, href: string }) {
    return (
        <Link href={href} className="block w-full h-full cursor-pointer">
            <motion.div
                whileHover={{ y: -5, scale: 1.02 }}
                className="p-6 h-full rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-purple-500/50 hover:shadow-[0_0_30px_-5px_rgba(168,85,247,0.3)] transition-all group relative overflow-hidden"
            >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6">
                        {icon}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">{title}</h3>
                    <p className="text-slate-400 leading-relaxed">{description}</p>
                </div>
            </motion.div>
        </Link>
    );
}

function TemplateCard({ name, color }: { name: string, color: string }) {
    return (
        <motion.div whileHover={{ y: -8 }} className="group relative">
            <div className={`aspect-[1/1.3] rounded-xl bg-white/5 border border-white/10 mb-4 overflow-hidden relative`}>
                {/* Template Layout Skeleton Mockup */}
                <div className="absolute inset-0 p-6 flex flex-col gap-3">
                    <div className={`h-8 w-3/4 rounded bg-${color}-500/20`} />
                    <div className="h-4 w-1/2 rounded bg-slate-700/50 mb-4" />
                    <div className={`h-1 w-full rounded bg-${color}-500/20 mb-2`} />
                    <div className="h-16 w-full rounded bg-white/5" />
                    <div className="h-16 w-full rounded bg-white/5" />
                </div>

                <div className="absolute inset-0 bg-purple-900/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                    <Button variant="secondary" className="bg-white text-purple-900 hover:bg-slate-200 shadow-xl">Use Template</Button>
                </div>
            </div>
            <h3 className="text-lg font-semibold text-white ml-1">{name}</h3>
        </motion.div>
    );
}

function ToolCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
    return (
        <motion.div whileHover={{ scale: 1.02 }} className="p-6 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-4 hover:border-pink-500/30 transition-colors cursor-pointer group">
            <div className="p-3 rounded-lg bg-pink-500/10 text-pink-400 group-hover:bg-pink-500/20 transition-colors">
                {icon}
            </div>
            <div>
                <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
                <p className="text-slate-400 text-sm">{desc}</p>
            </div>
        </motion.div>
    );
}

function TestimonialCard({ name, role, review }: { name: string, role: string, review: string }) {
    return (
        <motion.div whileHover={{ y: -5 }} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/20 transition-all">
            <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                ))}
            </div>
            <p className="text-slate-300 italic mb-6 leading-relaxed">&quot;{review}&quot;</p>
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center font-bold text-white">
                    {name.charAt(0)}
                </div>
                <div>
                    <h4 className="text-white font-medium text-sm">{name}</h4>
                    <p className="text-slate-400 text-xs">{role}</p>
                </div>
            </div>
        </motion.div>
    );
}
