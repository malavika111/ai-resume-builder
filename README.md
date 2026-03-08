# AI Resume Builder

A production-ready Full Stack AI Resume Builder platform built with Next.js App Router, Supabase, and the Groq API (LLaMA).

## Features
- **Modern Multi-Step Form**: Highly responsive and beautiful UI built with React Hook Form and Zod validation, styled with Tailwind CSS & glassmorphism.
- **AI-Powered Content Generation**: Fast bullet point enhancement and resume summary generation utilizing Groq's LLaMA 3 models.
- **ATS Resume Analyzer**: Instantly grade your resume data against standard ATS scanning procedures to get actionable feedback.
- **Live Preview & Styling**: Real-time live resume preview featuring Minimal, Modern, Professional, and Creative themes.
- **PDF Export**: Generate perfectly scaled 1-click PDF exports using `html2pdf.js`.

## Architecture / Tech Stack
- **Framework:** Next.js 14
- **Styling:** Tailwind CSS + Framer Motion
- **State Management:** Zustand
- **Database + Auth:** Supabase
- **Forms:** React Hook Form + Zod
- **AI Infrastructure:** Groq SDK

## Running the Application Locally

1. **Clone & Install Dependencies**
   ```bash
   cd ai-resume-builder
   npm install
   ```

2. **Environment Configuration**
   Create a `.env.local` file supplying your platform keys:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   GROQ_API_KEY=your-groq-api-key
   ```

3. **Database Configuration (Supabase)**
   Ensure your Supabase project contains the base schema outlined in our design instructions (the `users` and `resumes` table).

4. **Start the Development Server**
   ```bash
   npm run dev
   ```
   Access the app at `http://localhost:3000`.

## Vercel Deployment

Deploying the application via Vercel is streamlined for Next.js App Router architectures:
1. Push your code to a GitHub repository.
2. Sign in to [Vercel](https://vercel.com/) and create a "New Project".
3. Bind your repository. Add your `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and `GROQ_API_KEY` to the **Environment Variables** section.
4. Click Deploy. Vercel will automatically configure build settings (`npm run build`).

## Usage Guidance
1. First head to **"Build Resume"** from the Homepage or Dashboard.
2. Complete your details sequentially through the animated flow, updating components like Experience and Education dynamically.
3. Access the **Template Control** at the top of the Live Preview segment to flip between professional layouts.
4. Click the **"Download PDF"** button directly over the preview to render to disk.

---
*Built with ❤️ utilizing cutting-edge Next.js and Generative AI patterns.*
