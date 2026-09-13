'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  ArrowRight,
  PlusCircle,
  LayoutGrid,
  Calendar,
  Layers,
  FileCheck,
  Send,
  Users2,
  Mic2,
  Wrench,
  CheckCircle2,
  Database,
  Server,
  Code2,
} from 'lucide-react';
import { getRequirementStats } from '@/lib/api';
import { RequirementStats } from '@/lib/types';

export default function HomePage() {
  const [stats, setStats] = useState<RequirementStats | null>(null);

  useEffect(() => {
    getRequirementStats()
      .then((res) => {
        if (res.success) setStats(res.data);
      })
      .catch(() => { });
  }, []);

  return (
    <div className="relative overflow-hidden">
      {/* Background Glow Blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-pink-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 sm:pt-20 sm:pb-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">

          {/* Main Hero Headline */}
          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.1] max-w-4xl mx-auto">
            Dynamic Event Requirement Posting Flow
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            A 4-step interactive wizard designed to capture tailored event specifications for{' '}
            <span className="text-indigo-400 font-semibold">Event Planners</span>,{' '}
            <span className="text-purple-400 font-semibold">Performers</span>, and{' '}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/post-requirement"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white font-bold text-sm sm:text-base shadow-xl shadow-indigo-600/30 hover:shadow-indigo-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center space-x-2"
            >
              <PlusCircle className="w-5 h-5" />
              <span>Launch Requirement Wizard</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/requirements"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white font-semibold text-sm sm:text-base border border-slate-800 hover:border-slate-700 transition-all flex items-center justify-center space-x-2 shadow-lg shadow-black/40"
            >
              Explore Requirements
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Live MongoDB Stats Bar */}
          {stats && (
            <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto text-left">
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Postings</span>
                <p className="text-2xl font-black text-white mt-0.5">{stats.total}</p>
              </div>
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-400">Planners</span>
                <p className="text-2xl font-black text-white mt-0.5">{stats.plannerCount}</p>
              </div>
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-purple-400">Performers</span>
                <p className="text-2xl font-black text-white mt-0.5">{stats.performerCount}</p>
              </div>
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">Crew Staff</span>
                <p className="text-2xl font-black text-white mt-0.5">{stats.crewCount}</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 4-Step Process Section */}
      <section className="py-16 border-t border-slate-900 bg-slate-950/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
              Step-by-Step Flow Architecture
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              How the Requirement Posting Flow Works
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Each step dynamically adapts fields based on your selected category.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: 'Event Basics',
                desc: 'Capture event name, type, single or date-range schedule, venue setting, and choose between Planner, Performer, or Crew.',
                icon: Calendar,
                color: 'text-indigo-400',
                border: 'border-indigo-500/30',
              },
              {
                step: '02',
                title: 'Dynamic Scope (Step 2)',
                desc: 'Dynamically adapts: guest count & planning tier for Planners; performance genre & timing for Performers; roles & headcount for Crew.',
                icon: Layers,
                color: 'text-purple-400',
                border: 'border-purple-500/30',
              },
              {
                step: '03',
                title: 'Logistics & Rider (Step 3)',
                desc: 'Deep category requirements: theme & milestone dates; sound system & backline rider; gear provision & uniform dress code.',
                icon: FileCheck,
                color: 'text-emerald-400',
                border: 'border-emerald-500/30',
              },
              {
                step: '04',
                title: 'Validation & Submission',
                desc: 'Comprehensive interactive summary preview, contact person inputs, urgent flag, Zod schema validation, and storage.',
                icon: Send,
                color: 'text-pink-400',
                border: 'border-pink-500/30',
              },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="rounded-2xl glass-card p-6 border border-slate-800 hover:border-slate-700 transition-all duration-300 relative group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className={`text-xs font-black font-mono ${item.color}`}>
                        STEP {item.step}
                      </span>
                      <div className={`w-8 h-8 rounded-lg bg-slate-900 border ${item.border} flex items-center justify-center ${item.color}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>
                    <h3 className="text-base font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Category Showcase Section */}
      <section className="py-16 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
              Tailored Categories
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Three Distinct Event Requirement Modalities
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Planner */}
            <div className="rounded-3xl glass-card p-6 sm:p-8 border border-slate-800 space-y-4 relative overflow-hidden">
              <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center">
                <Users2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Event Planner</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Tailored for event management agencies and coordinators needing full concept planning, guest hospitality, theme styling, and vendor management.
              </p>
              <ul className="space-y-2 text-xs text-slate-300 pt-2 border-t border-slate-800/80">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
                  Full / Partial / Day-of Coordination
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
                  Guest Count & Estimated Budget Range
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
                  Theme Moodboard & Target Milestones
                </li>
              </ul>
            </div>

            {/* Performer */}
            <div className="rounded-3xl glass-card p-6 sm:p-8 border border-slate-800 space-y-4 relative overflow-hidden">
              <div className="w-12 h-12 rounded-2xl bg-purple-600/20 text-purple-400 border border-purple-500/30 flex items-center justify-center">
                <Mic2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Performer & Talent</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Designed for hiring live bands, DJs, comedians, magicians, and hosts with detailed sound riders, sets duration, and performance specs.
              </p>
              <ul className="space-y-2 text-xs text-slate-300 pt-2 border-t border-slate-800/80">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
                  Set Durations, Languages & Genre
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
                  PA System & Stage Dimensions
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
                  Backline Instruments & Green Room
                </li>
              </ul>
            </div>

            {/* Crew */}
            <div className="rounded-3xl glass-card p-6 sm:p-8 border border-slate-800 space-y-4 relative overflow-hidden">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
                <Wrench className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Event Crew & Staff</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Built for technical production and on-ground staffing: AV technicians, riggers, ushers, camera crew, shift call times, and gear policies.
              </p>
              <ul className="space-y-2 text-xs text-slate-300 pt-2 border-t border-slate-800/80">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Dynamic Multi-Role Headcount & Skill
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Shift Call Times & Wrap Schedule
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Gear Provision & Uniform Dress Code
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
}
