
import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { ValueType, NameType } from 'recharts/types/component/DefaultTooltipContent';

// Define the interface for the tool usage data
interface ToolUsageData {
  name: string;
  freeUsers: number;
  premiumUsers: number;
  [key: string]: any;
}

export const ToolUsageChart: React.FC = () => {
  const [data, setData] = useState<ToolUsageData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchToolUsageData = async () => {
      try {
        setLoading(true);
        
        // Fetch tool usage data from Supabase
        const { data: toolUsageData, error } = await supabase
          .from('tool_usage_stats')
          .select('name, free_users, premium_users')
          .order('name');
        
        if (error) {
          throw error;
        }
        
        if (toolUsageData && toolUsageData.length > 0) {
          // Map database columns to our interface properties
          const mappedData = toolUsageData.map(item => ({
            name: item.name || 'Unknown',
            freeUsers: item.free_users || 0,
            premiumUsers: item.premium_users || 0
          }));
          setData(mappedData);
        } else {
          setData([]);
        }
      } catch (error) {
        console.error('Error fetching tool usage data:', error);
        toast.error('Failed to load tool usage data');
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchToolUsageData();
  }, []);

  if (loading) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading tool usage data...</div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <div className="text-muted-foreground">No tool usage data available</div>
      </div>
    );
  }

  // Custom tooltip formatter that handles different value types
  const customFormatter = (value: ValueType, name: NameType) => {
    // Ensure value is a number before formatting
    if (typeof value === 'number') {
      return new Intl.NumberFormat().format(value);
    }
    return value;
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip formatter={customFormatter} />
        <Legend />
        <Bar name="Free Users" dataKey="freeUsers" fill="#94a3b8" />
        <Bar name="Premium Users" dataKey="premiumUsers" fill="#3b82f6" />
      </BarChart>
    </ResponsiveContainer>
  );
};
