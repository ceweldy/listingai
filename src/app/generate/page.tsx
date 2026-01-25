'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Sparkles, Loader2, Copy, Check, ArrowLeft, ChevronDown } from 'lucide-react';

const PLATFORMS = [
  'eBay',
  'Amazon',
  'Etsy',
  'Poshmark',
  'Mercari',
  'Facebook Marketplace',
  'Depop',
  'Other',
];

const CONDITIONS = [
  'New with tags',
  'New without tags',
  'New',
  'Like new',
  'Good',
  'Fair',
  'For parts/not working',
];

interface GeneratedListing {
  title: string;
  description: string;
  bulletPoints: string[];
  keywords: string[];
}

export default function GeneratePage() {
  const [productName, setProductName] = useState('');
  const [platform, setPlatform] = useState('eBay');
  const [condition, setCondition] = useState('New');
  const [features, setFeatures] = useState('');
  const [category, setCategory] = useState('');
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<GeneratedListing | null>(null);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState<string | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productName,
          platform,
          condition,
          features,
          category,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate listing');
      }

      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = async (text: string, field: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(field);
    setTimeout(() => setCopied(null), 2000);
  };

  const copyAll = async () => {
    if (!result) return;
    const fullListing = `${result.title}\n\n${result.description}\n\n${result.bulletPoints.map(b => `• ${b}`).join('\n')}\n\nKeywords: ${result.keywords.join(', ')}`;
    await copyToClipboard(fullListing, 'all');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800">
      {/* Header */}
      <header className="border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">ListingAI</span>
          </Link>
          <Link
            href="/"
            className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Generate Your Listing</h1>
          <p className="text-slate-400">Fill in the details and let AI do the rest</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
            <form onSubmit={handleGenerate} className="space-y-5">
              {/* Product Name */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Product Name *
                </label>
                <input
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="e.g., Nike Air Max 90 Sneakers"
                  required
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                />
              </div>

              {/* Platform */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Platform *
                </label>
                <div className="relative">
                  <select
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white appearance-none cursor-pointer focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                  >
                    {PLATFORMS.map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                </div>
              </div>

              {/* Condition */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Condition *
                </label>
                <div className="relative">
                  <select
                    value={condition}
                    onChange={(e) => setCondition(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white appearance-none cursor-pointer focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                  >
                    {CONDITIONS.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Category (optional)
                </label>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="e.g., Men's Athletic Shoes"
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                />
              </div>

              {/* Features */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Key Features & Details
                </label>
                <textarea
                  value={features}
                  onChange={(e) => setFeatures(e.target.value)}
                  placeholder="Size, color, brand, materials, any defects, measurements, etc."
                  rows={4}
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none resize-none"
                />
              </div>

              {/* Error */}
              {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
                  {error}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={isGenerating || !productName}
                className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Generate Listing
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Result */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
            {!result && !isGenerating && (
              <div className="h-full flex items-center justify-center text-center text-slate-500">
                <div>
                  <Sparkles className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Your generated listing will appear here</p>
                </div>
              </div>
            )}

            {isGenerating && (
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <Loader2 className="w-12 h-12 mx-auto mb-4 text-emerald-400 animate-spin" />
                  <p className="text-slate-400">Creating your optimized listing...</p>
                </div>
              </div>
            )}

            {result && (
              <div className="space-y-6">
                <div className="flex justify-end">
                  <button
                    onClick={copyAll}
                    className="flex items-center gap-2 px-4 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 rounded-lg transition-colors text-sm"
                  >
                    {copied === 'all' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copied === 'all' ? 'Copied!' : 'Copy All'}
                  </button>
                </div>

                {/* Title */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-slate-400">Title</label>
                    <button
                      onClick={() => copyToClipboard(result.title, 'title')}
                      className="text-slate-500 hover:text-white"
                    >
                      {copied === 'title' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                  <div className="p-4 bg-slate-900/50 border border-slate-600 rounded-lg text-white">
                    {result.title}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-slate-400">Description</label>
                    <button
                      onClick={() => copyToClipboard(result.description, 'desc')}
                      className="text-slate-500 hover:text-white"
                    >
                      {copied === 'desc' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                  <div className="p-4 bg-slate-900/50 border border-slate-600 rounded-lg text-white whitespace-pre-wrap">
                    {result.description}
                  </div>
                </div>

                {/* Bullet Points */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-slate-400">Key Features</label>
                    <button
                      onClick={() => copyToClipboard(result.bulletPoints.map(b => `• ${b}`).join('\n'), 'bullets')}
                      className="text-slate-500 hover:text-white"
                    >
                      {copied === 'bullets' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                  <div className="p-4 bg-slate-900/50 border border-slate-600 rounded-lg text-white">
                    <ul className="space-y-2">
                      {result.bulletPoints.map((point, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-emerald-400">•</span>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Keywords */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-slate-400">Keywords</label>
                    <button
                      onClick={() => copyToClipboard(result.keywords.join(', '), 'keywords')}
                      className="text-slate-500 hover:text-white"
                    >
                      {copied === 'keywords' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                  <div className="p-4 bg-slate-900/50 border border-slate-600 rounded-lg">
                    <div className="flex flex-wrap gap-2">
                      {result.keywords.map((keyword, i) => (
                        <span key={i} className="px-3 py-1 bg-slate-700 text-slate-300 rounded-full text-sm">
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
