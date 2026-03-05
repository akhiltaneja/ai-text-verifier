
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DashboardStats } from '@/components/admin/DashboardStats';
import { UsersList } from '@/components/admin/UsersList';
import { ContentEditor } from '@/components/admin/ContentEditor';
import { ActivityChart } from '@/components/admin/ActivityChart';
import { SubscriptionStats } from '@/components/admin/SubscriptionStats';
import { ToolUsageChart } from '@/components/admin/ToolUsageChart';
import { CouponManager } from '@/components/admin/CouponManager'; // Import new component
import { AdminLogin } from '@/components/admin/AdminLogin';

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('adminAuth') === 'true';
  });

  // If not authenticated, show login screen
  if (!isAuthenticated) {
    return <AdminLogin onLoginSuccess={() => {
      sessionStorage.setItem('adminAuth', 'true');
      setIsAuthenticated(true);
    }} />;
  }

  const handleLogout = () => {
    sessionStorage.removeItem('adminAuth');
    setIsAuthenticated(false);
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="flex flex-col">
        <header className="sticky top-0 z-10 bg-white dark:bg-slate-950 border-b px-4 py-3">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <button 
              onClick={handleLogout}
              className="px-4 py-2 text-sm bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-md transition-colors"
            >
              Logout
            </button>
          </div>
        </header>

        <main className="flex-1 container mx-auto py-6 px-4">
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid grid-cols-5 max-w-3xl">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="coupons">Coupons</TabsTrigger>
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="statistics">Statistics</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <h2 className="text-2xl font-bold">Dashboard Overview</h2>
              <DashboardStats />
              
              {/* Fix the layout to prevent overlap */}
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>Activity Over Time</CardTitle>
                    <CardDescription>
                      Usage trends for the last 30 days
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ActivityChart />
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Subscription Stats</CardTitle>
                    <CardDescription>
                      Breakdown of free vs premium users
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <SubscriptionStats />
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Tool Usage</CardTitle>
                    <CardDescription>
                      Most popular tools and features
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    <ToolUsageChart />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="users">
              <UsersList />
            </TabsContent>
            
            <TabsContent value="coupons">
              <CouponManager />
            </TabsContent>
            
            <TabsContent value="content">
              <ContentEditor />
            </TabsContent>
            
            <TabsContent value="statistics">
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">Detailed Statistics</h2>
                <Card>
                  <CardHeader>
                    <CardTitle>Words Analyzed</CardTitle>
                    <CardDescription>
                      Total number of words processed per tool
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="h-[400px]">
                    <div className="flex items-center justify-center h-full">
                      <div className="text-muted-foreground">No data available</div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Revenue Metrics</CardTitle>
                    <CardDescription>
                      Monthly revenue and subscription trends
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="h-[400px]">
                    <div className="flex items-center justify-center h-full">
                      <div className="text-muted-foreground">No data available</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
