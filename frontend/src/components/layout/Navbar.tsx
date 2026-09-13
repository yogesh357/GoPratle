'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sparkles, PlusCircle, LayoutGrid, CheckCircle2, AlertCircle } from 'lucide-react';
import { checkBackendHealth } from '@/lib/api';

export default function Navbar() {
  const pathname = usePathname();
  const [apiOnline, setApiOnline] = useState<boolean | null>(null);

  useEffect(() => {
    const testConnection = async () => {
      try {
        await checkBackendHealth();
        setApiOnline(true);
      } catch (err) {
        setApiOnline(false);
      }
    };
    testConnection();
    const interval = setInterval(testConnection, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full glass-panel border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform duration-200">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="text-xl font-black tracking-tight text-white group-hover:text-indigo-400 transition-colors">
                  GoPratle
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  Events
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium hidden sm:block">
                Event Requirement Platform
              </p>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="flex items-center space-x-2 sm:space-x-4">
            {/* Live API Status Indicator */}
            <div className="hidden md:flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-medium bg-slate-900 border border-slate-800">
              {apiOnline === true ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-emerald-400 flex items-center gap-1">
                    API Connected <CheckCircle2 className="w-3 h-3" />
                  </span>
                </>
              ) : apiOnline === false ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                  <span className="text-amber-400 flex items-center gap-1">
                    API Offline <AlertCircle className="w-3 h-3" />
                  </span>
                </>
              ) : (
                <>
                  <span className="w-2 h-2 rounded-full bg-slate-500 animate-ping"></span>
                  <span className="text-slate-400">Checking API...</span>
                </>
              )}
            </div>

            <Link
              href="/requirements"
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                pathname === '/requirements'
                  ? 'bg-slate-800 text-white border border-slate-700 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
              }`}
            >
              <LayoutGrid className="w-4 h-4 text-indigo-400" />
              <span>Browse Feed</span>
            </Link>

            <Link
              href="/post-requirement"
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                pathname === '/post-requirement'
                  ? 'bg-gradient-to-r from-indigo-500 to-indigo-600 text-white shadow-lg shadow-indigo-500/30'
                  : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/20 hover:shadow-indigo-500/40 hover:scale-[1.02]'
              }`}
            >
              <PlusCircle className="w-4 h-4" />
              <span>Post Requirement</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
