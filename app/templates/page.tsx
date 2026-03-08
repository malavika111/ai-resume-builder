"use client";

import { Button } from "@/components/ui/button";
import { LayoutTemplate, Sparkles, Briefcase, FileText, Brush } from "lucide-react";
import Link from "next/link";
import TemplatePreview from "@/components/TemplatePreview";

const TEMPLATES = [
    {
        id: "minimal",
        name: "Minimal",
        description: "Clean ATS friendly layout",
        icon: <FileText className="w-6 h-6 text-slate-300" />,
        route: "/resume-builder?template=minimal",
        color: "slate",
        popular: true
    },
    {
        id: "modern",
        name: "Modern",
        description: "Bold typography and structured sections for a contemporary feel.",
        icon: <Sparkles className="w-6 h-6 text-pink-400" />,
        route: "/resume-builder?template=modern",
        color: "pink",
        popular: false
    },
    {
        id: "professional",
        name: "Professional",
        description: "Classic, battle-tested design perfect for corporate roles.",
        icon: <Briefcase className="w-6 h-6 text-blue-400" />,
        route: "/resume-builder?template=professional",
        color: "blue",
        popular: false
    },
    {
        id: "creative",
        name: "Creative",
        description: "Stand out with a unique, visually striking resume layout for design-focused roles.",
        icon: <Brush className="w-6 h-6 text-indigo-400" />,
        route: "/resume-builder?template=creative",
        color: "indigo",
        popular: false
    },
    {
        id: "executive",
        name: "Executive",
        description: "Premium corporate layout for senior roles",
        icon: <Briefcase className="w-6 h-6 text-yellow-400" />,
        route: "/resume-builder?template=executive",
        color: "yellow",
        popular: false
    },
    {
        id: "elegant",
        name: "Elegant",
        description: "Sophisticated serif based resume style",
        icon: <Sparkles className="w-6 h-6 text-teal-400" />,
        route: "/resume-builder?template=elegant",
        color: "teal",
        popular: false
    },
    {
        id: "compact",
        name: "Compact",
        description: "Dense resume optimized for one page",
        icon: <FileText className="w-6 h-6 text-orange-400" />,
        route: "/resume-builder?template=compact",
        color: "orange",
        popular: false
    },
    {
        id: "tech",
        name: "Tech",
        description: "Modern developer focused resume layout",
        icon: <LayoutTemplate className="w-6 h-6 text-emerald-400" />,
        route: "/resume-builder?template=tech",
        color: "emerald",
        popular: false
    }
];

export default function TemplatesPage() {
    return (
        <div className="min-h-screen bg-slate-950 text-white flex flex-col pt-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl w-full mx-auto space-y-12">
                <div className="text-center max-w-2xl mx-auto mb-10">
                    <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <LayoutTemplate className="w-8 h-8 text-purple-400" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-br from-white to-slate-400 mb-4">
                        Resume Templates
                    </h1>
                    <p className="text-lg text-slate-400">
                        Choose from our collection of ATS-optimized designs to build your career identity.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pb-20">
                    {TEMPLATES.map((template) => (
                        <div key={template.id} className="group rounded-xl bg-slate-900 border border-white/10 overflow-hidden hover:border-purple-500/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_40px_-10px_rgba(168,85,247,0.3)] flex flex-col items-center shadow-lg">

                            {/* Preview Frame */}
                            <div className="w-full h-[320px] p-6 bg-slate-900/50 relative overflow-hidden flex items-center justify-center border-b border-white/5">
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-950/90 z-10" />

                                {template.popular && (
                                    <div className="absolute top-4 right-4 z-20 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                                        Most Popular
                                    </div>
                                )}

                                {/* Local Rendered Component Card */}
                                <div className="w-[85%] bg-white rounded-lg shadow-2xl overflow-hidden relative transform-gpu group-hover:scale-[1.05] transition-transform duration-500 border border-slate-700/50 group-hover:border-purple-500/30">
                                    <TemplatePreview template={template.id} />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                </div>
                            </div>

                            {/* Details */}
                            <div className="p-8 w-full flex flex-col flex-1">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className={`p-2 rounded-lg bg-${template.color}-500/10 border border-${template.color}-500/20`}>
                                        {template.icon}
                                    </div>
                                    <h3 className="text-2xl font-bold text-white tracking-tight">{template.name}</h3>
                                </div>

                                <p className="text-slate-400 text-sm mb-8 leading-relaxed flex-grow">
                                    {template.description}
                                </p>

                                <Link href={template.route} className="w-full mt-auto">
                                    <Button className="w-full bg-white/10 hover:bg-white text-white hover:text-slate-950 font-semibold py-6 rounded-xl border border-white/20 transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                                        Use {template.name} Template
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
