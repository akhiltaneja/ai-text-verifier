
import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCredits } from '@/context/CreditContext';
import { BarChart, LineChart, PieChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Line, Pie } from 'recharts';
import { Loader2 } from "lucide-react";

interface UsageStatsSectionProps {
  userId?: string;
}

interface UsageData {
  date: string;
  aiDetector: number;
  grammarChecker: number;
  translation: number;
  paraphrasing: number;
  summarization: number;
  total: number;
}

export const UsageStatsSection: React.FC<UsageStatsSectionProps> = ({ userId }) => {
  const { availableCredits } = useCredits();
  const [usageData, setUsageData] = useState<UsageData[]>([]);
  const [toolUsageData, setToolUsageData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Function to generate random realistic usage data
  const generateMockData = () => {
    const dates = [];
    const today = new Date();
    
    // Generate the past 30 days
    for (let i = 29; i >= 0; i--) {
      const date = new Date();
      date.setDate(today.getDate() - i);
      dates.push(date.toISOString().split('T')[0]);
    }
    
    // Generate random usage data for each date
    const data: UsageData[] = dates.map(date => {
      // Decrease usage for weekends slightly
      const dateObj = new Date(date);
      const isWeekend = dateObj.getDay() === 0 || dateObj.getDay() === 6;
      const multiplier = isWeekend ? 0.6 : 1;
      
      const aiDetector = Math.floor(Math.random() * 150 * multiplier);
      const grammarChecker = Math.floor(Math.random() * 200 * multiplier);
      const translation = Math.floor(Math.random() * 120 * multiplier);
      const paraphrasing = Math.floor(Math.random() * 100 * multiplier);
      const summarization = Math.floor(Math.random() * 80 * multiplier);
      
      return {
        date,
        aiDetector,
        grammarChecker,
        translation,
        paraphrasing,
        summarization,
        total: aiDetector + grammarChecker + translation + paraphrasing + summarization
      };
    });
    
    // Calculate totals for each tool
    const totalAiDetector = data.reduce((sum, item) => sum + item.aiDetector, 0);
    const totalGrammarChecker = data.reduce((sum, item) => sum + item.grammarChecker, 0);
    const totalTranslation = data.reduce((sum, item) => sum + item.translation, 0);
    const totalParaphrasing = data.reduce((sum, item) => sum + item.paraphrasing, 0);
    const totalSummarization = data.reduce((sum, item) => sum + item.summarization, 0);
    
    const toolUsageData = [
      { name: 'AI Detector', value: totalAiDetector },
      { name: 'Grammar Checker', value: totalGrammarChecker },
      { name: 'Translation', value: totalTranslation },
      { name: 'Paraphrasing', value: totalParaphrasing },
      { name: 'Summarization', value: totalSummarization },
    ];
    
    setUsageData(data);
    setToolUsageData(toolUsageData);
    setIsLoading(false);
  };

  useEffect(() => {
    // In a real app, we'd fetch from API/database
    // For now, generate mock data
    setTimeout(() => {
      generateMockData();
    }, 1000); // Simulate loading
  }, [userId]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  // Calculate total words analyzed
  const totalWords = usageData.reduce((sum, item) => sum + item.total, 0);
  
  // Calculate current available credits
  const currentCredits = Object.values(availableCredits).reduce((sum, val) => sum + val, 0);

  // Colors for the pie chart
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#a855f7'];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
        <span className="ml-2">Loading usage statistics...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Usage overview cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="py-4">
            <CardTitle className="text-sm font-medium">Total Words Analyzed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalWords.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">All time usage</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="py-4">
            <CardTitle className="text-sm font-medium">Available Credits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentCredits}</div>
            <p className="text-xs text-muted-foreground mt-1">Credits remaining today</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="py-4">
            <CardTitle className="text-sm font-medium">Most Used Tool</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Grammar Checker</div>
            <p className="text-xs text-muted-foreground mt-1">Based on your activity</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="py-4">
            <CardTitle className="text-sm font-medium">Last 7 Days</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {usageData.slice(-7).reduce((sum, item) => sum + item.total, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Words analyzed</p>
          </CardContent>
        </Card>
      </div>
      
      {/* Charts and detailed usage */}
      <Tabs defaultValue="usage-chart">
        <TabsList>
          <TabsTrigger value="usage-chart">Usage Over Time</TabsTrigger>
          <TabsTrigger value="tool-breakdown">Tool Breakdown</TabsTrigger>
          <TabsTrigger value="daily-log">Daily Log</TabsTrigger>
        </TabsList>
        
        <TabsContent value="usage-chart">
          <Card>
            <CardHeader>
              <CardTitle>Words Analyzed Over Time</CardTitle>
              <CardDescription>
                Daily usage breakdown across all tools
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={usageData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" tickFormatter={formatDate} />
                    <YAxis />
                    <Tooltip 
                      formatter={(value: number) => [value.toLocaleString(), 'Words']}
                      labelFormatter={(label) => formatDate(label)}
                    />
                    <Legend />
                    <Bar dataKey="aiDetector" name="AI Detector" stackId="a" fill="#0088FE" />
                    <Bar dataKey="grammarChecker" name="Grammar Checker" stackId="a" fill="#00C49F" />
                    <Bar dataKey="translation" name="Translation" stackId="a" fill="#FFBB28" />
                    <Bar dataKey="paraphrasing" name="Paraphrasing" stackId="a" fill="#FF8042" />
                    <Bar dataKey="summarization" name="Summarization" stackId="a" fill="#a855f7" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="tool-breakdown">
          <Card>
            <CardHeader>
              <CardTitle>Tool Usage Distribution</CardTitle>
              <CardDescription>
                Breakdown of your usage by tool
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col lg:flex-row items-center justify-center h-[350px]">
                <div className="w-full lg:w-1/2 h-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={toolUsageData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {toolUsageData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value: number) => value.toLocaleString()} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="w-full lg:w-1/2 px-4 mt-4 lg:mt-0">
                  <h4 className="text-sm font-medium mb-2">Tool Usage Ranking</h4>
                  <div className="space-y-3">
                    {toolUsageData
                      .sort((a, b) => b.value - a.value)
                      .map((item, index) => (
                        <div key={index} className="flex items-center">
                          <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS[toolUsageData.findIndex(d => d.name === item.name) % COLORS.length] }} />
                          <div className="flex-1">
                            <div className="flex justify-between items-center">
                              <span className="text-sm">{item.name}</span>
                              <span className="text-sm font-medium">{item.value.toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="daily-log">
          <Card>
            <CardHeader>
              <CardTitle>Daily Usage Log</CardTitle>
              <CardDescription>
                Detailed breakdown of your daily tool usage
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>AI Detector</TableHead>
                      <TableHead>Grammar Checker</TableHead>
                      <TableHead>Translation</TableHead>
                      <TableHead>Paraphrasing</TableHead>
                      <TableHead>Summarization</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {usageData.slice(-10).reverse().map((day, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{formatDate(day.date)}</TableCell>
                        <TableCell>{day.aiDetector}</TableCell>
                        <TableCell>{day.grammarChecker}</TableCell>
                        <TableCell>{day.translation}</TableCell>
                        <TableCell>{day.paraphrasing}</TableCell>
                        <TableCell>{day.summarization}</TableCell>
                        <TableCell className="text-right font-medium">{day.total}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                  <TableCaption>Showing the last 10 days of usage</TableCaption>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
