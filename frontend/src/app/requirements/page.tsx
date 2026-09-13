'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  LayoutGrid,
  Search,
  PlusCircle,
  RefreshCw,
  Users2,
  Mic2,
  Wrench,
  Flame,
  AlertCircle,
  Filter,
} from 'lucide-react';
import RequirementCard from '@/components/requirements/RequirementCard';
import RequirementDetailModal from '@/components/requirements/RequirementDetailModal';
import { IRequirement, CategoryType, RequirementStats } from '@/lib/types';
import { getRequirements, deleteRequirement, getRequirementStats } from '@/lib/api';

export default function RequirementsFeedPage() {
  const [requirements, setRequirements] = useState<IRequirement[]>([]);
  const [stats, setStats] = useState<RequirementStats | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRequirement, setSelectedRequirement] = useState<IRequirement | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const fetchFeedData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [feedRes, statsRes] = await Promise.all([
        getRequirements({
          category: categoryFilter,
          search: searchQuery,
        }),
        getRequirementStats().catch(() => null),
      ]);

      if (feedRes.success) {
        setRequirements(feedRes.data || []);
      }
      if (statsRes?.success) {
        setStats(statsRes.data);
      }
    } catch (err: any) {
      setError(err.message || 'Could not connect to backend server. Make sure MongoDB & backend are running.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedData();
  }, [categoryFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchFeedData();
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteRequirement(id);
      setRequirements((prev) => prev.filter((r) => r._id !== id));
      if (stats) {
        setStats({ ...stats, total: Math.max(0, stats.total - 1) });
      }
    } catch (err: any) {
      alert(`Delete error: ${err.message}`);
    }
  };

  const handleOpenDetails = (requirement: IRequirement) => {
    setSelectedRequirement(requirement);
    setIsModalOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight mt-1">
            Event Requirements Explorer
          </h1>

        </div>

        <div className="flex items-center space-x-3">
          <button
            type="button"
            onClick={fetchFeedData}
            disabled={isLoading}
            className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors"
            title="Refresh Feed"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-indigo-400' : ''}`} />
          </button>

          <Link
            href="/post-requirement"
            className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-indigo-600/30 transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Post New Requirement</span>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8">
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4">
            <span className="text-xs text-slate-400">Total Requirements</span>
            <div className="text-2xl font-black text-white mt-0.5">{stats.total}</div>
          </div>
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4">
            <span className="text-xs text-indigo-400 flex items-center gap-1">
              <Users2 className="w-3.5 h-3.5" /> Event Planners
            </span>
            <div className="text-2xl font-black text-white mt-0.5">{stats.plannerCount}</div>
          </div>
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4">
            <span className="text-xs text-purple-400 flex items-center gap-1">
              <Mic2 className="w-3.5 h-3.5" /> Performers
            </span>
            <div className="text-2xl font-black text-white mt-0.5">{stats.performerCount}</div>
          </div>
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4">
            <span className="text-xs text-emerald-400 flex items-center gap-1">
              <Wrench className="w-3.5 h-3.5" /> Event Crew
            </span>
            <div className="text-2xl font-black text-white mt-0.5">{stats.crewCount}</div>
          </div>
        </div>
      )}

      {/* Filter & Search Bar */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex items-center flex-wrap gap-2 w-full md:w-auto">
          {[
            { id: 'all', label: 'All Postings', icon: LayoutGrid },
            { id: 'planner', label: 'Planners', icon: Users2 },
            { id: 'performer', label: 'Performers', icon: Mic2 },
            { id: 'crew', label: 'Crew & Staff', icon: Wrench },
          ].map((tab) => {
            const TabIcon = tab.icon;
            const isActive = categoryFilter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setCategoryFilter(tab.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-all ${isActive
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'bg-slate-950 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
                  }`}
              >
                <TabIcon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <form onSubmit={handleSearchSubmit} className="flex items-center space-x-2 w-full md:w-72">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search event, city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-xl glass-input text-xs text-white placeholder-slate-500"
            />
          </div>
          <button
            type="submit"
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white border border-slate-700 transition-colors"
          >
            Search
          </button>
        </form>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs mb-8 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />
            <span>{error}</span>
          </div>
          <button
            type="button"
            onClick={fetchFeedData}
            className="px-3 py-1 bg-rose-500/20 hover:bg-rose-500/30 rounded-lg font-semibold"
          >
            Retry
          </button>
        </div>
      )}

      {/* Grid of Requirement Cards */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div key={n} className="rounded-2xl glass-card p-6 border border-slate-800 animate-pulse space-y-4">
              <div className="h-5 bg-slate-800 rounded w-1/3" />
              <div className="h-6 bg-slate-800 rounded w-3/4" />
              <div className="h-4 bg-slate-800 rounded w-1/2" />
              <div className="h-16 bg-slate-800/60 rounded" />
              <div className="h-10 bg-slate-800 rounded" />
            </div>
          ))}
        </div>
      ) : requirements.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {requirements.map((req) => (
            <RequirementCard
              key={req._id}
              requirement={req}
              onViewDetails={handleOpenDetails}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-3xl glass-panel p-12 text-center border border-slate-800/80 space-y-4 my-8">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-slate-800 flex items-center justify-center text-slate-400">
            <LayoutGrid className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-white">No requirements found</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            {categoryFilter !== 'all' || searchQuery
              ? 'Try changing your search keywords or switching category filters.'
              : 'Be the first to create an event requirement! Use our 4-step wizard to post now.'}
          </p>
          <Link
            href="/post-requirement"
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/20 transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Post Requirement Now</span>
          </Link>
        </div>
      )}

      {/* Requirement Details Modal */}
      <RequirementDetailModal
        requirement={selectedRequirement}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onDelete={handleDelete}
      />
    </div>
  );
}
