import ResumeForm from "@/components/resume-builder/ResumeForm";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const ResumePreview = dynamic(() => import("@/components/resume-builder/ResumePreview"), {
    ssr: false,
    loading: () => <div className="w-full h-full flex items-center justify-center bg-slate-100 rounded-xl animate-pulse text-slate-400">Loading Preview Engine...</div>
});

export default function ResumeBuilderPage() {
    return (
        <div className="flex flex-col lg:flex-row h-screen bg-slate-950 overflow-hidden relative">
            {/* Background elements to match landing page */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-slate-950 to-slate-950 -z-10" />
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/10 blur-[100px] rounded-full -z-10" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 blur-[100px] rounded-full -z-10" />

            {/* Left panel: Form input */}
            <div className="w-full lg:w-1/2 h-full overflow-y-auto p-4 md:p-6 custom-scrollbar relative z-10 border-r border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl">
                <Suspense fallback={<div className="text-white p-4">Loading form...</div>}>
                    <ResumeForm />
                </Suspense>
            </div>

            {/* Right panel: Live Preview */}
            <div className="w-full lg:w-1/2 h-full p-4 md:p-6 relative custom-scrollbar overflow-y-auto flex justify-center bg-black/20">
                <ResumePreview />
            </div>
        </div>
    );
}
