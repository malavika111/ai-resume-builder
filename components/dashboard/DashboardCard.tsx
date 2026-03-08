import Link from "next/link";
import { FileText, Edit2, Copy, Trash } from "lucide-react";

interface DashboardCardProps {
    id: string;
    name: string;
    template: string;
    lastUpdated: string;
}

export default function DashboardCard({ id, name, template, lastUpdated }: DashboardCardProps) {
    return (
        <div className="relative group p-5 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:border-primary/30 overflow-hidden flex flex-col">
            <div className="flex-1 mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4">
                    <FileText className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-lg text-slate-900 group-hover:text-primary transition-colors line-clamp-1">{name}</h3>
                <p className="text-sm text-slate-500 mt-1 uppercase tracking-wider text-xs font-semibold">{template} Template</p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <span className="text-xs text-slate-400">Updated {lastUpdated}</span>

                <div className="flex gap-2">
                    <Link href={`/resume-builder?id=${id}`} className="text-slate-400 hover:text-primary transition-colors p-1">
                        <Edit2 className="w-4 h-4" />
                    </Link>
                    <button className="text-slate-400 hover:text-primary transition-colors p-1">
                        <Copy className="w-4 h-4" />
                    </button>
                    <button className="text-slate-400 hover:text-destructive transition-colors p-1">
                        <Trash className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <div className="absolute inset-0 border-2 border-primary rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        </div>
    );
}
