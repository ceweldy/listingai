'use client';

import Link from 'next/link';
import { CheckCircle, Sparkles, ArrowRight } from 'lucide-react';

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 flex items-center justify-center">
      <div className="max-w-md mx-auto px-4 text-center">
        <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-12 h-12 text-emerald-400" />
        </div>
        
        <h1 className="text-3xl font-bold text-white mb-4">
          Payment Successful!
        </h1>
        
        <p className="text-slate-400 mb-8">
          Thank you for your purchase. Your credits have been added to your account.
        </p>
        
        <Link
          href="/generate"
          className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl transition-colors"
        >
          <Sparkles className="w-5 h-5" />
          Start Generating Listings
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
}
