'use client';

import React from 'react';
import {
  Calendar,
  MapPin,
  Flame,
  Users2,
  Mic2,
  Wrench,
  ArrowRight,
  Clock,
  Building2,
} from 'lucide-react';
import { IRequirement, CategoryType } from '@/lib/types';

interface RequirementCardProps {
  requirement: IRequirement;
  onViewDetails: (requirement: IRequirement) => void;
  onDelete?: (id: string) => void;
}

export default function RequirementCard({ requirement, onViewDetails }: RequirementCardProps) {
  const getCategoryTheme = (category: CategoryType) => {
    switch (category) {
      case 'planner':
        return {
          icon: Users2,
          color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
          badge: 'bg-indigo-600',
          label: 'Event Planner',
        };
      case 'performer':
        return {
          icon: Mic2,
          color: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
          badge: 'bg-purple-600',
          label: 'Performer',
        };
      case 'crew':
        return {
          icon: Wrench,
          color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
          badge: 'bg-emerald-600',
          label: 'Crew & Staff',
        };
    }
  };

  const theme = getCategoryTheme(requirement.category);
  const Icon = theme.icon;

  const formatDate = () => {
    if (requirement.dateType === 'single' && requirement.eventDate) {
      return new Date(requirement.eventDate).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    }
    if (requirement.startDate && requirement.endDate) {
      const start = new Date(requirement.startDate).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      });
      const end = new Date(requirement.endDate).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
      return `${start} - ${end}`;
    }
    return 'Date TBD';
  };

  return (
    <div className="rounded-2xl glass-card p-5 sm:p-6 border border-slate-800/90 hover:border-slate-700 transition-all duration-300 flex flex-col justify-between group hover:shadow-xl hover:shadow-indigo-500/5 hover:-translate-y-1">
      <div>
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center space-x-2">
            <span className={`text-[10px] font-bold text-white px-2.5 py-0.5 rounded-full ${theme.badge} uppercase tracking-wider`}>
              {theme.label}
            </span>
            {requirement.isUrgent && (
              <span className="flex items-center gap-1 text-[10px] font-bold text-rose-300 bg-rose-500/10 border border-rose-500/20 px-2 py-0.5 rounded-full">
                <Flame className="w-3 h-3 text-rose-500 fill-rose-500 animate-pulse" />
                Urgent
              </span>
            )}
          </div>
          <span className="text-[11px] text-slate-400 font-mono">
            {new Date(requirement.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </span>
        </div>

        {/* Title & Type */}
        <h3 className="text-base font-bold text-white group-hover:text-indigo-400 transition-colors line-clamp-1 mb-1">
          {requirement.eventName}
        </h3>
        <p className="text-xs text-slate-400 mb-4">{requirement.eventType}</p>

        {/* Key Attributes */}
        <div className="space-y-2 text-xs text-slate-300 py-3 border-y border-slate-800/80 mb-4">
          <div className="flex items-center space-x-2">
            <Calendar className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0" />
            <span className="truncate">{formatDate()}</span>
          </div>

          <div className="flex items-center space-x-2">
            <MapPin className="w-3.5 h-3.5 text-rose-400 flex-shrink-0" />
            <span className="truncate">
              {requirement.location.city}, {requirement.location.state}
            </span>
          </div>

          {requirement.venue?.name && (
            <div className="flex items-center space-x-2">
              <Building2 className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
              <span className="truncate">{requirement.venue.name}</span>
            </div>
          )}
        </div>

        {/* Category Highlights */}
        <div className="text-xs mb-4">
          {requirement.category === 'planner' && requirement.plannerDetails && (
            <div className="text-slate-400 space-y-1">
              <p>
                <span className="text-slate-300 font-medium">Guests:</span> {requirement.plannerDetails.expectedGuestCount} • <span className="capitalize">{requirement.plannerDetails.planningType.replace('_', ' ')}</span>
              </p>
              {requirement.plannerDetails.servicesNeeded && requirement.plannerDetails.servicesNeeded.length > 0 && (
                <div className="flex flex-wrap gap-1 pt-1">
                  {requirement.plannerDetails.servicesNeeded.slice(0, 2).map((s) => (
                    <span key={s} className="px-1.5 py-0.5 rounded text-[10px] bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                      {s}
                    </span>
                  ))}
                  {requirement.plannerDetails.servicesNeeded.length > 2 && (
                    <span className="text-[10px] text-slate-400 self-center">
                      +{requirement.plannerDetails.servicesNeeded.length - 2} more
                    </span>
                  )}
                </div>
              )}
            </div>
          )}

          {requirement.category === 'performer' && requirement.performerDetails && (
            <div className="text-slate-400 space-y-1">
              <p>
                <span className="text-slate-300 font-medium">Talent:</span> <span className="capitalize">{requirement.performerDetails.performerType.replace('_', ' ')}</span>
              </p>
              <p className="text-[11px] text-slate-400 truncate">
                Duration: {requirement.performerDetails.performanceDurationMinutes} mins • {requirement.performerDetails.performanceGenre || 'Multi-genre'}
              </p>
            </div>
          )}

          {requirement.category === 'crew' && requirement.crewDetails && (
            <div className="text-slate-400 space-y-1">
              <p>
                <span className="text-slate-300 font-medium">Crew Required:</span> <span className="text-emerald-400 font-bold">{requirement.crewDetails.totalCrewCount} Staff</span>
              </p>
              <p className="text-[11px] text-slate-400 truncate">
                Call: {requirement.crewDetails.callTime || 'TBD'} • Dress: {requirement.crewDetails.dressCode.replace('_', ' ')}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Action Footer */}
      <button
        type="button"
        onClick={() => onViewDetails(requirement)}
        className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-indigo-600/20 hover:text-indigo-300 text-slate-200 font-semibold text-xs border border-slate-800 hover:border-indigo-500/40 flex items-center justify-center space-x-1.5 transition-all"
      >
        <span>View Full Specifications</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
