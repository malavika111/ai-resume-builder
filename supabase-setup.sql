-- Supabase Setup Script for Resumes Table

-- Create the resumes table
CREATE TABLE resumes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Enable Row Level Security
ALTER TABLE resumes ENABLE ROW LEVEL SECURITY;

-- Create Policies to ensure users can only access their own data
CREATE POLICY "Users can insert their own resumes" ON resumes
FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can select their own resumes" ON resumes
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own resumes" ON resumes
FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own resumes" ON resumes
FOR DELETE USING (auth.uid() = user_id);
