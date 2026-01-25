'use client';

import Link from 'next/link';
import { Sparkles, Zap, DollarSign, Clock, ShoppingBag, Star, ArrowRight, Check } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800">
      {/* Header */}
      <header className="border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">ListingAI</span>
          </div>
          <Link
            href="/generate"
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-lg transition-colors"
          >
            Try Free
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 py-20 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-sm font-medium mb-6">
          <Zap className="w-4 h-4" />
          AI-Powered Listing Generator
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
          Write Product Listings<br />
          <span className="text-emerald-400">10x Faster</span>
        </h1>
        
        <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
          Stop spending hours writing listings. Let AI generate optimized titles, 
          descriptions, and keywords for eBay, Amazon, Etsy, and more.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link
            href="/generate"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl transition-colors text-lg"
          >
            Generate Your First Listing Free
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Social Proof */}
        <div className="flex items-center justify-center gap-1 text-amber-400 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-5 h-5 fill-current" />
          ))}
        </div>
        <p className="text-slate-400 text-sm">Trusted by 500+ sellers</p>
      </section>

      {/* How It Works */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-white text-center mb-12">
          How It Works
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              step: '1',
              title: 'Enter Product Details',
              desc: 'Tell us about your product — name, condition, key features, and target platform.',
              icon: ShoppingBag,
            },
            {
              step: '2',
              title: 'AI Generates Listing',
              desc: 'Our AI creates an optimized title, description, bullet points, and keywords.',
              icon: Sparkles,
            },
            {
              step: '3',
              title: 'Copy & Sell',
              desc: 'Paste into your listing and start selling. Takes less than 60 seconds.',
              icon: Zap,
            },
          ].map((item) => (
            <div key={item.step} className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 text-center">
              <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <item.icon className="w-6 h-6 text-emerald-400" />
              </div>
              <div className="text-sm text-emerald-400 font-medium mb-2">Step {item.step}</div>
              <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-slate-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-white text-center mb-4">
          Simple Pricing
        </h2>
        <p className="text-slate-400 text-center mb-12">
          Start free. Pay only when you need more.
        </p>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {/* Free */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-2">Free</h3>
            <div className="text-3xl font-bold text-white mb-4">$0</div>
            <p className="text-slate-400 text-sm mb-6">Try it out</p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center gap-2 text-slate-300">
                <Check className="w-5 h-5 text-emerald-400" />
                3 free listings
              </li>
              <li className="flex items-center gap-2 text-slate-300">
                <Check className="w-5 h-5 text-emerald-400" />
                All platforms
              </li>
            </ul>
            <Link
              href="/generate"
              className="block w-full py-3 text-center border border-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors"
            >
              Get Started
            </Link>
          </div>

          {/* Pay Per Listing */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-2">Pay Per Listing</h3>
            <div className="text-3xl font-bold text-white mb-4">$0.50<span className="text-lg text-slate-400">/listing</span></div>
            <p className="text-slate-400 text-sm mb-6">For casual sellers</p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center gap-2 text-slate-300">
                <Check className="w-5 h-5 text-emerald-400" />
                No subscription
              </li>
              <li className="flex items-center gap-2 text-slate-300">
                <Check className="w-5 h-5 text-emerald-400" />
                Buy credits anytime
              </li>
              <li className="flex items-center gap-2 text-slate-300">
                <Check className="w-5 h-5 text-emerald-400" />
                Never expires
              </li>
            </ul>
            <Link
              href="/generate"
              className="block w-full py-3 text-center border border-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors"
            >
              Buy Credits
            </Link>
          </div>

          {/* Unlimited */}
          <div className="bg-gradient-to-b from-emerald-500/20 to-slate-800/50 border border-emerald-500/30 rounded-2xl p-6 relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-emerald-500 text-white text-xs font-medium rounded-full">
              Best Value
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Unlimited</h3>
            <div className="text-3xl font-bold text-white mb-4">$19<span className="text-lg text-slate-400">/month</span></div>
            <p className="text-slate-400 text-sm mb-6">For power sellers</p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center gap-2 text-slate-300">
                <Check className="w-5 h-5 text-emerald-400" />
                Unlimited listings
              </li>
              <li className="flex items-center gap-2 text-slate-300">
                <Check className="w-5 h-5 text-emerald-400" />
                Priority generation
              </li>
              <li className="flex items-center gap-2 text-slate-300">
                <Check className="w-5 h-5 text-emerald-400" />
                Cancel anytime
              </li>
            </ul>
            <Link
              href="/generate?plan=unlimited"
              className="block w-full py-3 text-center bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-lg transition-colors"
            >
              Start Unlimited
            </Link>
          </div>
        </div>
      </section>

      {/* Platforms */}
      <section className="max-w-6xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-white mb-8">
          Works With All Major Platforms
        </h2>
        <div className="flex flex-wrap justify-center gap-8 text-slate-400">
          {['eBay', 'Amazon', 'Etsy', 'Poshmark', 'Mercari', 'Facebook Marketplace', 'Depop'].map((platform) => (
            <div key={platform} className="px-6 py-3 bg-slate-800/50 border border-slate-700 rounded-lg">
              {platform}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-4 py-20 text-center">
        <div className="bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 border border-emerald-500/30 rounded-3xl p-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Save Hours Every Week?
          </h2>
          <p className="text-slate-300 mb-8 max-w-xl mx-auto">
            Join hundreds of sellers who've already made listing products effortless.
          </p>
          <Link
            href="/generate"
            className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl transition-colors text-lg"
          >
            Generate Your First Listing Free
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center text-slate-500 text-sm">
          © {new Date().getFullYear()} ListingAI. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
