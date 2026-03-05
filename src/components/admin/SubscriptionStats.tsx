
import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface UserStatsData {
  free_users: number;
  premium_users: number;
}

export const SubscriptionStats: React.FC = () => {
  const [data, setData] = useState([
    { name: 'Free Users', value: 0 },
    { name: 'Premium Users', value: 0 },
  ]);
  
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchSubscriptionData = async () => {
      try {
        setLoading(true);
        
        // Query for user counts from Supabase
        const { data: userStats, error } = await supabase
          .from('user_stats')
          .select('free_users, premium_users')
          .maybeSingle();
        
        if (error) {
          throw error;
        }
        
        if (userStats && userStats.free_users !== null && userStats.premium_users !== null) {
          setData([
            { name: 'Free Users', value: userStats.free_users },
            { name: 'Premium Users', value: userStats.premium_users },
          ]);
        } else {
          setData([
            { name: 'Free Users', value: 0 },
            { name: 'Premium Users', value: 0 },
          ]);
        }
      } catch (error) {
        console.error('Error fetching subscription data:', error);
        toast.error('Failed to load subscription data');
        setData([
          { name: 'Free Users', value: 0 },
          { name: 'Premium Users', value: 0 },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptionData();
  }, []);
  
  const COLORS = ['#94a3b8', '#3b82f6'];
  
  if (loading) {
    return (
      <div className="h-[300px] w-full flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading subscription data...</div>
      </div>
    );
  }
  
  if (data[0].value === 0 && data[1].value === 0) {
    return (
      <div className="h-[300px] w-full flex items-center justify-center">
        <div className="text-muted-foreground">No subscription data available</div>
      </div>
    );
  }
  
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={90}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => new Intl.NumberFormat().format(value as number)} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
