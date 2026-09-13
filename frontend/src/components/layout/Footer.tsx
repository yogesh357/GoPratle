import React from 'react';
import Link from 'next/link';
import { Sparkles, Heart, Server, Database, Code2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-900 bg-slate-950/90 text-slate-400 text-sm mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">GoPratle</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Full-Stack Developer Intern Technical Assignment. A 4-step dynamic Requirement Posting Flow connecting event organizers with Planners, Performers, and Crew.
            </p>

          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-3">Categories</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/post-requirement" className="hover:text-indigo-400 transition-colors">
                  🎯 Event Planner Requirements
                </Link>
              </li>
              <li>
                <Link href="/post-requirement" className="hover:text-indigo-400 transition-colors">
                  🎸 Performer & Talent Requirements
                </Link>
              </li>
              <li>
                <Link href="/post-requirement" className="hover:text-indigo-400 transition-colors">
                  🛠️ Event Crew & Staffing
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-3">Quick Links</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="hover:text-indigo-400 transition-colors">
                  Home Overview
                </Link>
              </li>
              <li>
                <Link href="/post-requirement" className="hover:text-indigo-400 transition-colors">
                  Post New Requirement
                </Link>
              </li>
              <li>
                <Link href="/requirements" className="hover:text-indigo-400 transition-colors">
                  Explore Live Postings
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 GoPratle Assignment. All rights reserved.</p>

        </div>
      </div>
    </footer>
  );
}
