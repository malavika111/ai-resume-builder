export default function TemplatePreview({ template }: { template: string }) {
    switch (template) {
        case "minimal":
            return (
                <div className="bg-white rounded-lg shadow-sm p-3 h-[260px] overflow-hidden w-full flex flex-col gap-2 pointer-events-none">
                    <div className="w-1/2 h-4 bg-slate-300 rounded mb-1" />
                    <div className="w-1/3 h-2 bg-slate-200 rounded mb-3" />
                    <div className="w-full h-[1px] bg-slate-200 mb-2" />
                    <div className="w-1/4 h-3 bg-slate-300 rounded mb-2" />
                    <div className="w-full h-2 bg-slate-200 rounded mb-1" />
                    <div className="w-3/4 h-2 bg-slate-200 rounded mb-1" />
                    <div className="w-5/6 h-2 bg-slate-200 rounded mb-3" />
                    <div className="w-1/4 h-3 bg-slate-300 rounded mb-2" />
                    <div className="w-full h-2 bg-slate-200 rounded mb-1" />
                    <div className="w-2/3 h-2 bg-slate-200 rounded mb-1" />
                </div>
            );
        case "modern":
            return (
                <div className="bg-white rounded-lg shadow-sm h-[260px] overflow-hidden w-full flex pointer-events-none">
                    <div className="w-1/3 h-full bg-slate-100 p-2 flex flex-col gap-2 border-r border-slate-200">
                        <div className="w-full h-10 bg-slate-300 rounded-full mb-2 aspect-square self-center" />
                        <div className="w-full h-2 bg-slate-300 rounded mb-1" />
                        <div className="w-4/5 h-2 bg-slate-200 rounded mb-2" />
                        <div className="w-full h-[1px] bg-slate-300 mb-1" />
                        <div className="w-full h-2 bg-slate-200 rounded mb-1" />
                        <div className="w-5/6 h-2 bg-slate-200 rounded mb-1" />
                    </div>
                    <div className="w-2/3 h-full p-3 flex flex-col gap-2">
                        <div className="w-2/3 h-4 bg-slate-300 rounded mb-1" />
                        <div className="w-1/2 h-2 bg-pink-200 rounded mb-3" />
                        <div className="w-1/3 h-3 bg-slate-300 rounded mb-2" />
                        <div className="w-full h-2 bg-slate-200 rounded mb-1" />
                        <div className="w-5/6 h-2 bg-slate-200 rounded mb-1" />
                        <div className="w-full h-2 bg-slate-200 rounded mb-2" />
                    </div>
                </div>
            );
        case "professional":
            return (
                <div className="bg-white rounded-lg shadow-sm p-3 h-[260px] overflow-hidden w-full flex flex-col gap-2 pointer-events-none border-t-8 border-blue-600">
                    <div className="w-full flex justify-between items-end mb-2">
                        <div className="w-1/2">
                            <div className="w-4/5 h-4 bg-slate-800 rounded mb-1" />
                            <div className="w-1/2 h-2 bg-slate-400 rounded" />
                        </div>
                        <div className="w-1/3 items-end flex flex-col gap-1">
                            <div className="w-full h-2 bg-slate-200 rounded" />
                            <div className="w-5/6 h-2 bg-slate-200 rounded" />
                        </div>
                    </div>
                    <div className="w-full h-3 bg-slate-300 rounded mb-1" />
                    <div className="w-full h-[1px] bg-slate-300 mb-2" />
                    <div className="w-full flex justify-between mb-1">
                        <div className="w-1/3 h-2 bg-slate-400 rounded" />
                        <div className="w-1/4 h-2 bg-slate-300 rounded" />
                    </div>
                    <div className="w-full h-2 bg-slate-200 rounded mb-1" />
                    <div className="w-5/6 h-2 bg-slate-200 rounded mb-2" />
                    <div className="w-full flex justify-between mb-1">
                        <div className="w-1/3 h-2 bg-slate-400 rounded" />
                        <div className="w-1/4 h-2 bg-slate-300 rounded" />
                    </div>
                    <div className="w-full h-2 bg-slate-200 rounded mb-1" />
                </div>
            );
        case "creative":
            return (
                <div className="bg-white rounded-lg shadow-sm h-[260px] overflow-hidden w-full flex flex-col pointer-events-none">
                    <div className="w-full h-16 bg-indigo-500 p-3 flex flex-col justify-end">
                        <div className="w-1/2 h-4 bg-white rounded mb-1 opacity-90" />
                        <div className="w-1/3 h-2 bg-white rounded opacity-70" />
                    </div>
                    <div className="p-3 flex flex-col gap-2">
                        <div className="w-1/3 h-3 bg-indigo-200 rounded mb-1" />
                        <div className="w-full h-2 bg-slate-200 rounded mb-1" />
                        <div className="w-3/4 h-2 bg-slate-200 rounded mb-3" />
                        <div className="w-1/3 h-3 bg-indigo-200 rounded mb-1" />
                        <div className="w-full h-2 bg-slate-200 rounded mb-1" />
                        <div className="w-5/6 h-2 bg-slate-200 rounded mb-1" />
                    </div>
                </div>
            );
        case "executive":
            return (
                <div className="bg-white rounded-lg shadow-sm p-4 h-[260px] overflow-hidden w-full flex flex-col gap-2 pointer-events-none">
                    <div className="text-center flex flex-col items-center mb-3">
                        <div className="w-2/3 h-5 bg-slate-800 rounded mb-2" />
                        <div className="w-1/2 h-2 bg-slate-400 rounded mb-1" />
                        <div className="w-1/3 h-2 bg-slate-300 rounded" />
                    </div>
                    <div className="w-full h-[2px] bg-slate-200 mb-2" />
                    <div className="w-1/4 h-3 bg-slate-700 rounded mb-2" />
                    <div className="w-full flex justify-between mb-1">
                        <div className="w-1/2 h-2 bg-slate-500 rounded" />
                        <div className="w-1/4 h-2 bg-slate-300 rounded text-right" />
                    </div>
                    <div className="w-full h-2 bg-slate-200 rounded mb-1" />
                    <div className="w-11/12 h-2 bg-slate-200 rounded mb-1" />
                </div>
            );
        case "elegant":
            return (
                <div className="bg-white rounded-lg shadow-sm p-4 h-[260px] overflow-hidden w-full flex flex-col gap-3 pointer-events-none">
                    <div className="w-full flex flex-col items-center mb-2">
                        <div className="w-3/4 h-4 bg-teal-800 rounded mb-2" />
                        <div className="flex gap-2 w-full justify-center">
                            <div className="w-1/6 h-1 bg-teal-200 rounded" />
                            <div className="w-1/6 h-1 bg-teal-200 rounded" />
                            <div className="w-1/6 h-1 bg-teal-200 rounded" />
                        </div>
                    </div>
                    <div className="w-full text-center flex flex-col items-center gap-1 mb-2">
                        <div className="w-1/3 h-3 bg-teal-600 rounded mb-1" />
                        <div className="w-full h-2 bg-slate-200 rounded" />
                        <div className="w-5/6 h-2 bg-slate-200 rounded" />
                    </div>
                    <div className="w-full text-center flex flex-col items-center gap-1">
                        <div className="w-1/3 h-3 bg-teal-600 rounded mb-1" />
                        <div className="w-full h-2 bg-slate-200 rounded" />
                    </div>
                </div>
            );
        case "compact":
            return (
                <div className="bg-white rounded-lg shadow-sm p-2 h-[260px] overflow-hidden w-full flex flex-col gap-1 pointer-events-none text-xs">
                    <div className="flex justify-between items-center mb-1">
                        <div className="w-1/3 h-3 bg-slate-700 rounded" />
                        <div className="w-1/3 h-1 bg-slate-300 rounded" />
                    </div>
                    <div className="w-full h-[1px] bg-slate-200 mb-1" />
                    <div className="w-1/4 h-2 bg-slate-600 rounded mb-1" />
                    <div className="w-full h-1 bg-slate-200 rounded mb-0.5" />
                    <div className="w-full h-1 bg-slate-200 rounded mb-0.5" />
                    <div className="w-3/4 h-1 bg-slate-200 rounded mb-1" />
                    <div className="w-full h-[1px] bg-slate-100 mb-1" />
                    <div className="w-1/4 h-2 bg-slate-600 rounded mb-1" />
                    <div className="w-full h-1 bg-slate-200 rounded mb-0.5" />
                    <div className="w-5/6 h-1 bg-slate-200 rounded mb-1" />
                    <div className="w-full h-[1px] bg-slate-100 mb-1" />
                    <div className="flex gap-1">
                        <div className="w-1/4 h-1 bg-slate-300 rounded" />
                        <div className="w-1/4 h-1 bg-slate-300 rounded" />
                        <div className="w-1/4 h-1 bg-slate-300 rounded" />
                    </div>
                </div>
            );
        case "tech":
            return (
                <div className="bg-white rounded-lg shadow-sm p-3 h-[260px] overflow-hidden w-full flex flex-col gap-2 pointer-events-none border-l-4 border-emerald-500">
                    <div className="w-1/2 h-5 bg-slate-800 rounded mb-1 font-mono flex items-center px-1">
                        <div className="w-2 h-2 bg-emerald-400 rounded-full mr-1" />
                    </div>
                    <div className="w-1/3 h-2 bg-emerald-600 rounded mb-3" />
                    <div className="flex gap-2 mb-2">
                        <div className="w-1/4 h-4 bg-slate-100 rounded border border-slate-200" />
                        <div className="w-1/4 h-4 bg-slate-100 rounded border border-slate-200" />
                        <div className="w-1/4 h-4 bg-slate-100 rounded border border-slate-200" />
                    </div>
                    <div className="w-1/3 h-3 bg-slate-700 rounded mb-1" />
                    <div className="w-full h-2 bg-slate-200 rounded mb-1" />
                    <div className="w-full h-2 bg-slate-200 rounded mb-1" />
                    <div className="w-4/5 h-2 bg-slate-200 rounded" />
                </div>
            );
        default:
            return (
                <div className="bg-white rounded-lg shadow-sm p-3 h-[260px] overflow-hidden w-full flex flex-col gap-2 pointer-events-none">
                    <div className="w-1/2 h-4 bg-slate-300 rounded mb-1" />
                    <div className="w-full h-2 bg-slate-200 rounded mb-1" />
                </div>
            );
    }
}
