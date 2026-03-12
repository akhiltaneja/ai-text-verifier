import React, { useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Code2, Zap, ShieldCheck, Database, KeyRound, Terminal, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';

const DeveloperAPI = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "Developer API - NexusCore Engine Processing";

        let metaDescription = document.querySelector('meta[name="description"]');
        if (!metaDescription) {
            metaDescription = document.createElement('meta');
            metaDescription.setAttribute('name', 'description');
            document.head.appendChild(metaDescription);
        }
        metaDescription.setAttribute('content', 'Integrate industry-leading AI detection directly into your applications with the NexusCore API.');
    }, []);

    const handleApply = (e: React.FormEvent) => {
        e.preventDefault();
        toast.success("Application received! We'll email your API key shortly.");
    };

    return (
        <Layout>
            <div className="bg-slate-50 min-h-screen pb-24">
                {/* API Hero */}
                <div className="bg-slate-900 border-b border-slate-800 text-white pt-24 pb-32 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-32 opacity-10 blur-3xl rounded-full bg-blue-500 pointer-events-none" />
                    <div className="absolute bottom-0 left-0 p-32 opacity-10 blur-3xl rounded-full bg-indigo-500 pointer-events-none" />

                    <div className="container mx-auto px-4 relative z-10 max-w-5xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-sm font-medium mb-8">
                            <Code2 className="w-4 h-4 text-primary" />
                            NexusCore AI Developer Portal
                        </div>
                        <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-6 leading-tight">
                            Build with the most accurate <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">AI Detection API</span>
                        </h1>
                        <p className="text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed">
                            Integrate our proprietary 6-layer heuristic engine directly into your CMS, LMS, or custom application with a simple REST endpoint.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button size="lg" className="bg-primary hover:bg-blue-600 text-white rounded-full px-8 h-14 text-base font-semibold" onClick={() => document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth' })}>
                                Get API Keys
                            </Button>
                            <Button size="lg" variant="outline" className="rounded-full px-8 h-14 text-base font-semibold border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white">
                                Read Documentation
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Feature Grid */}
                <div className="container mx-auto px-4 max-w-6xl -mt-16 relative z-20 mb-24">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-xl shadow-slate-200/50">
                            <div className="w-12 h-12 bg-blue-50 hover:bg-blue-100 transition-colors rounded-xl flex items-center justify-center mb-6">
                                <Zap className="w-6 h-6 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Sub-second Latency</h3>
                            <p className="text-slate-500 leading-relaxed">Global edge network ensures your detection requests are processed in under 200ms anywhere in the world.</p>
                        </div>
                        <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-xl shadow-slate-200/50">
                            <div className="w-12 h-12 bg-emerald-50 hover:bg-emerald-100 transition-colors rounded-xl flex items-center justify-center mb-6">
                                <ShieldCheck className="w-6 h-6 text-emerald-600" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Enterprise Security</h3>
                            <p className="text-slate-500 leading-relaxed">SOC2 compliant. Zero data retention policy available for enterprise tiers. We never train on your API payloads.</p>
                        </div>
                        <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-xl shadow-slate-200/50">
                            <div className="w-12 h-12 bg-indigo-50 hover:bg-indigo-100 transition-colors rounded-xl flex items-center justify-center mb-6">
                                <Database className="w-6 h-6 text-indigo-600" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Pay-per-word</h3>
                            <p className="text-slate-500 leading-relaxed">No rigid monthly commitments. Volume-based pricing that scales elastically with your exact infrastructure needs.</p>
                        </div>
                    </div>
                </div>

                {/* Code Example Section */}
                <div className="container mx-auto px-4 max-w-5xl mb-24">
                    <div className="bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl flex flex-col md:flex-row">
                        <div className="p-10 md:w-1/2 flex flex-col justify-center">
                            <Terminal className="w-8 h-8 text-primary mb-6" />
                            <h2 className="text-3xl font-bold text-white mb-4">Simple Integration</h2>
                            <p className="text-slate-400 mb-8 leading-relaxed">
                                Send a raw text payload and receive our proprietary Heuristic Breakdown, Overall Probability Score, and Human vs AI classifications instantly.
                            </p>
                            <ul className="space-y-4">
                                {['JSON REST API', 'SDKs for Node, Python & Go', 'Webhooks for bulk jobs'].map((feature, i) => (
                                    <li key={i} className="flex items-center text-slate-300">
                                        <ChevronRight className="w-5 h-5 text-primary mr-2" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="md:w-1/2 bg-[#0d1117] p-8 border-l border-slate-800">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-3 h-3 rounded-full bg-rose-500" />
                                <div className="w-3 h-3 rounded-full bg-amber-500" />
                                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                                <span className="text-slate-500 text-xs ml-2 font-mono">request.curl</span>
                            </div>
                            <pre className="text-sm font-mono text-slate-300 overflow-x-auto">
                                <code className="language-bash">
                                    {`curl -X POST https://api.aitextverifier.com/v1/detect \\
  -H "Authorization: Bearer nx_your_api_key_here" \\
  -H "Content-Type: application/json" \\
  -d '{
    "text": "Artificial Intelligence is...",
    "include_heuristics": true
  }'`}
                                </code>
                            </pre>
                            <div className="mt-6 border-t border-slate-800 pt-6">
                                <span className="text-slate-500 text-xs font-mono mb-2 block">response.json</span>
                                <pre className="text-sm font-mono text-emerald-400 overflow-x-auto">
                                    <code className="language-json">
                                        {`{
  "status": "success",
  "data": {
    "is_human": false,
    "ai_probability": 0.98,
    "word_count": 842,
    "heuristics": {
      "entropy": 0.88,
      "burstiness": 0.12
    }
  }
}`}
                                    </code>
                                </pre>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Pricing / Apply Section */}
                <div id="apply" className="container mx-auto px-4 max-w-3xl text-center">
                    <KeyRound className="w-12 h-12 text-primary mx-auto mb-6" />
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">Start Building Today</h2>
                    <p className="text-slate-600 mb-10 text-lg">
                        API access is currently available via application. Rates start at <strong>$0.50 per 10,000 words</strong> analyzed.
                    </p>

                    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl max-w-xl mx-auto text-left">
                        <form onSubmit={handleApply} className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Work Email</label>
                                <Input required type="email" placeholder="developer@company.com" className="h-12 bg-slate-50" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Company Website</label>
                                <Input required type="url" placeholder="https://example.com" className="h-12 bg-slate-50" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Estimated Monthly Volume</label>
                                <select required className="w-full h-12 bg-slate-50 border border-slate-200 rounded-lg px-3 text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary">
                                    <option value="" disabled selected>Select volume...</option>
                                    <option value="low">Under 100k words</option>
                                    <option value="med">100k - 1M words</option>
                                    <option value="high">1M+ words (Enterprise)</option>
                                </select>
                            </div>
                            <Button type="submit" className="w-full h-14 rounded-xl font-bold bg-primary hover:bg-blue-600 text-lg mt-4 shadow-lg shadow-primary/25">
                                Apply for API Key
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default DeveloperAPI;
