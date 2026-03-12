-- Create usage_logs table
CREATE TABLE IF NOT EXISTS public.usage_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    tool_name TEXT NOT NULL,
    word_count INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create analysis_history table for 30-day retention
CREATE TABLE IF NOT EXISTS public.analysis_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    tool_name TEXT NOT NULL,
    analyzed_text TEXT NOT NULL,
    word_count INTEGER NOT NULL,
    result_summary JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.usage_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analysis_history ENABLE ROW LEVEL SECURITY;

-- Policies for usage_logs
CREATE POLICY "Users can view their own usage logs" 
    ON public.usage_logs FOR SELECT 
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own usage logs" 
    ON public.usage_logs FOR INSERT 
    WITH CHECK (auth.uid() = user_id);

-- Policies for analysis_history
CREATE POLICY "Users can view their own analysis history" 
    ON public.analysis_history FOR SELECT 
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own analysis history" 
    ON public.analysis_history FOR INSERT 
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own analysis history" 
    ON public.analysis_history FOR DELETE 
    USING (auth.uid() = user_id);
