
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Users, FileText, DollarSign } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface DashboardStatsData {
  totalUsers: number;
  wordsAnalyzed: number;
  premiumUsers: number;
  monthlyRevenue: number;
}

export const DashboardStats: React.FC = () => {
  const [stats, setStats] = useState([
    {
      title: 'Total Users',
      value: '0',
      icon: Users,
      change: '0%',
      positive: true,
      tooltip: 'Unique registered users'
    },
    {
      title: 'Words Analyzed',
      value: '0',
      icon: FileText,
      change: '0%',
      positive: true,
      tooltip: 'Total words processed across all tools'
    },
    {
      title: 'Premium Users',
      value: '0',
      icon: Users,
      change: '0%',
      positive: true,
      tooltip: 'Current active premium subscribers'
    },
    {
      title: 'Monthly Revenue',
      value: '$0',
      icon: DollarSign,
      change: '0%',
      positive: true,
      tooltip: 'Total revenue for the current month'
    },
  ]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        
        // Fetch users count using auth.admin API
        // Note: This will only work with service role key, not with anon key
        const { data: userResponse, error: userError } = await supabase.auth.admin.listUsers();
        
        let totalUsers = 0;
        if (userError) {
          console.error('Error fetching user count:', userError);
        } else if (userResponse) {
          totalUsers = userResponse.users.length;
        }
        
        // We'll use placeholder values for other stats since we don't have the fields
        // In a real app, these would come from database tables
        const statsData = [
          {
            title: 'Total Users',
            value: new Intl.NumberFormat().format(totalUsers),
            icon: Users,
            change: '0%',
            positive: true,
            tooltip: 'Unique registered users'
          },
          {
            title: 'Words Analyzed',
            value: '0',
            icon: FileText,
            change: '0%',
            positive: true,
            tooltip: 'Total words processed across all tools'
          },
          {
            title: 'Premium Users',
            value: '0',
            icon: Users,
            change: '0%',
            positive: true,
            tooltip: 'Current active premium subscribers'
          },
          {
            title: 'Monthly Revenue',
            value: '$0',
            icon: DollarSign,
            change: '0%',
            positive: true,
            tooltip: 'Total revenue for the current month'
          },
        ];
        
        setStats(statsData);
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        toast.error('Failed to load dashboard statistics');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  // Helper to format large word counts (e.g., 1,200,000 -> 1.2M)
  const formatWordCount = (count: number): string => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className={loading ? "animate-pulse" : ""}>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">{stat.title}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
              <div className="bg-primary/10 p-2 rounded-full">
                <stat.icon className="h-5 w-5 text-primary" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span className={`text-xs font-medium ${stat.positive ? 'text-green-600' : 'text-red-600'}`}>
                {stat.change}
              </span>
              <span className="text-xs text-muted-foreground ml-1.5">since last month</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
