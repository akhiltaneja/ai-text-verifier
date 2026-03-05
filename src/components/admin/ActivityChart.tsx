
import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

// Define the interface for activity data
interface ActivityData {
  date: string;
  aiDetector: number;
  grammarChecker: number;
  paraphrasing: number;
  summary: number;
  [key: string]: any;
}

export const ActivityChart: React.FC = () => {
  const [data, setData] = useState<ActivityData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivityData = async () => {
      try {
        setLoading(true);
        
        // Fetch activity data from Supabase
        const { data: activityData, error } = await supabase
          .from('activity_stats')
          .select('date, ai_detector, grammar_checker, paraphrasing, summary')
          .order('date');
        
        if (error) {
          throw error;
        }
        
        if (activityData && activityData.length > 0) {
          // Map database columns to our interface properties
          const mappedData = activityData.map(item => ({
            date: item.date || '',
            aiDetector: item.ai_detector || 0,
            grammarChecker: item.grammar_checker || 0,
            paraphrasing: item.paraphrasing || 0,
            summary: item.summary || 0
          }));
          setData(mappedData);
        } else {
          setData([]);
        }
      } catch (error) {
        console.error('Error fetching activity data:', error);
        toast.error('Failed to load activity chart data');
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchActivityData();
  }, []);

  const chartConfig = {
    aiDetector: {
      label: "AI Detector",
      color: "#3b82f6"
    },
    grammarChecker: {
      label: "Grammar Checker",
      color: "#22c55e"
    },
    paraphrasing: {
      label: "Paraphrasing",
      color: "#f59e0b"
    },
    summary: {
      label: "AI Summary",
      color: "#6366f1"
    }
  };

  if (loading) {
    return (
      <div className="h-[350px] w-full flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading activity data...</div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="h-[350px] w-full flex items-center justify-center">
        <div className="text-muted-foreground">No activity data available</div>
      </div>
    );
  }

  return (
    <div className="h-[350px] w-full">
      <ChartContainer config={chartConfig}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip content={<ChartTooltipContent />} />
          <Legend />
          <Line type="monotone" dataKey="aiDetector" stroke="var(--color-aiDetector)" strokeWidth={2} dot={{ r: 2 }} />
          <Line type="monotone" dataKey="grammarChecker" stroke="var(--color-grammarChecker)" strokeWidth={2} dot={{ r: 2 }} />
          <Line type="monotone" dataKey="paraphrasing" stroke="var(--color-paraphrasing)" strokeWidth={2} dot={{ r: 2 }} />
          <Line type="monotone" dataKey="summary" stroke="var(--color-summary)" strokeWidth={2} dot={{ r: 2 }} />
        </LineChart>
      </ChartContainer>
    </div>
  );
};
