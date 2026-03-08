import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import AnimatedCursor from "@/components/AnimatedCursor";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Melova - AI Career Assistant",
    description: "Create professional ATS-optimized resumes with AI.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="dark scroll-smooth">
            <body className={`${inter.className} min-h-screen flex flex-col antialiased bg-slate-950 text-slate-50 transition-colors duration-300 selection:bg-purple-500/30 overflow-x-hidden`}>
                <AnimatedCursor />
                <Navbar />
                <main className="flex-1 flex flex-col relative z-10 block">
                    {children}
                </main>
            </body>
        </html>
    );
}
