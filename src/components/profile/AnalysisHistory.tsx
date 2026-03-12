import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { supabase } from '@/integrations/supabase/client';
import { Loader2, Clock } from "lucide-react";
import { AnalysisResult } from '@/types/ai-detector';

interface AnalysisHistoryProps {
    userId?: string;
}

export const AnalysisHistory: React.FC<AnalysisHistoryProps> = ({ userId }) => {
    const [history, setHistory] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchHistory = async () => {
            if (!userId) {
                setIsLoading(false);
                return;
            }
            try {
                setIsLoading(true);
                const { data, error } = await supabase
                    .from('analysis_history')
                    .select('*')
                    .eq('user_id', userId)
                    .order('created_at', { ascending: false })
                    .limit(50);

                if (error) throw error;
                setHistory(data || []);
            } catch (err) {
                console.error("Failed to load analysis history", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchHistory();
    }, [userId]);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
        });
    };

    const truncateText = (text: string, maxLength: number = 80) => {
        if (!text) return "";
        return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center py-12">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
                <span className="ml-2 text-slate-500">Loading history...</span>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex items-center text-xs font-medium text-slate-500 bg-indigo-50/50 px-4 py-3 rounded-xl border border-indigo-100/50 mb-6">
                <Clock className="w-4 h-4 mr-2 text-indigo-500" />
                History is automatically cleared after 30 days to protect your privacy. Only you can view these logs.
            </div>

            <Card className="border-slate-100 shadow-sm">
                <CardHeader className="pb-4">
                    <CardTitle>Recent Verifications</CardTitle>
                    <CardDescription>Review your past AI Content Detector runs over the last 30 days.</CardDescription>
                </CardHeader>
                <CardContent>
                    {history.length === 0 ? (
                        <div className="text-center py-12 text-slate-500 bg-slate-50 rounded-lg border border-dashed border-slate-200">
                            No analysis history found. Run the AI Detector to see your logs here!
                        </div>
                    ) : (
                        <div className="rounded-md border border-slate-100 overflow-hidden">
                            <Table>
                                <TableHeader className="bg-slate-50/80">
                                    <TableRow>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Preview Text</TableHead>
                                        <TableHead className="text-right">Words</TableHead>
                                        <TableHead className="text-center">Result</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {history.map((record) => {
                                        const result = record.result_summary as AnalysisResult;
                                        const isDominantHuman = result?.overallScore <= 40;
                                        const isMixed = result?.overallScore > 40 && result?.overallScore < 70;

                                        return (
                                            <TableRow key={record.id}>
                                                <TableCell className="whitespace-nowrap text-sm text-slate-500">
                                                    {formatDate(record.created_at)}
                                                </TableCell>
                                                <TableCell className="max-w-[200px] md:max-w-[350px]">
                                                    <p className="truncate text-sm text-slate-700" title={record.analyzed_text}>
                                                        {truncateText(record.analyzed_text, 100)}
                                                    </p>
                                                </TableCell>
                                                <TableCell className="text-sm font-medium text-right text-slate-600">
                                                    {record.word_count}
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    <Badge variant={isDominantHuman ? "default" : isMixed ? "secondary" : "destructive"}
                                                        className={`shadow-none border-0 font-medium ${isDominantHuman ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200' : ''
                                                            } ${!isDominantHuman && !isMixed ? 'bg-rose-100 text-rose-700 hover:bg-rose-200' : ''
                                                            } ${isMixed ? 'bg-amber-100 text-amber-700 hover:bg-amber-200' : ''
                                                            }`}
                                                    >
                                                        {isDominantHuman ? 'Human' : isMixed ? 'Mixed' : 'AI Generated'}
                                                    </Badge>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};
