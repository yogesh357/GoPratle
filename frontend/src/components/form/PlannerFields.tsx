'use client';

import React from 'react';
import {
  Users,
  DollarSign,
  CheckSquare,
  Palette,
  CalendarCheck,
  FileText,
  MapPin,
} from 'lucide-react';
import { PlannerDetails, PlanningType, VenueStatus } from '@/lib/types';

interface PlannerFieldsProps {
  step: 2 | 3;
  plannerDetails?: PlannerDetails;
  updatePlannerDetails: (updates: Partial<PlannerDetails>) => void;
  errors: Record<string, string>;
}

const PLANNING_TYPES: { id: PlanningType; label: string; desc: string }[] = [
  {
    id: 'full_planning',
    label: 'Full Event Planning',
    desc: 'End-to-end concept, budgeting, vendor management, design, and execution.',
  },
  {
    id: 'partial_planning',
    label: 'Partial Planning',
    desc: 'Support for specific tasks like decor, stage, vendors, or catering.',
  },
  {
    id: 'day_of_coordination',
    label: 'Day-of Coordination',
    desc: 'On-site execution, flow management, and vendor coordination on event day.',
  },
];

const AVAILABLE_SERVICES = [
  'Decor & Theme Design',
  'Catering & Menu Planning',
  'Venue Sourcing & Booking',
  'Sound, Light & AV Production',
  'RSVP & Guest Hospitality',
  'Artist & Talent Booking',
  'Photography & Videography',
  'Security & Protocol Management',
  'Permits & Licenses',
];

const VENUE_STATUS_OPTIONS: { id: VenueStatus; label: string; desc: string }[] = [
  { id: 'booked', label: 'Venue Booked', desc: 'Already confirmed venue space' },
  { id: 'shortlisted', label: 'Shortlisted Venues', desc: 'Evaluating a few venue options' },
  { id: 'need_assistance', label: 'Need Assistance', desc: 'Want the planner to source venues' },
];

export default function PlannerFields({
  step,
  plannerDetails,
  updatePlannerDetails,
  errors,
}: PlannerFieldsProps) {
  const currentDetails: PlannerDetails = plannerDetails || {
    planningType: 'full_planning',
    expectedGuestCount: 150,
    estimatedBudget: '$10,000 - $25,000',
    servicesNeeded: ['Decor & Theme Design', 'Catering & Menu Planning', 'Sound, Light & AV Production'],
    eventTheme: '',
    venueStatus: 'need_assistance',
    vendorPreferences: '',
    specialInstructions: '',
    targetMilestoneDate: '',
  };

  const toggleService = (service: string) => {
    const existing = currentDetails.servicesNeeded || [];
    const updated = existing.includes(service)
      ? existing.filter((s) => s !== service)
      : [...existing, service];
    updatePlannerDetails({ servicesNeeded: updated });
  };

  if (step === 2) {
    return (
      <div className="space-y-8 animate-fade-in">
        {/* Step 2 Header */}
        <div className="border-b border-slate-800 pb-5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-2">
            Planner Requirement • Step 2 of 4
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2.5">
            <Users className="w-6 h-6 text-indigo-400" />
            Planning Scope, Scale & Services Needed
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Specify the level of planning coordination required, guest count, and required deliverables.
          </p>
        </div>

        {/* Planning Type Selection */}
        <div className="space-y-3">
          <label className="block text-sm font-bold text-slate-200 uppercase tracking-wider">
            Type of Planning Required <span className="text-rose-500">*</span>
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {PLANNING_TYPES.map((pt) => (
              <div
                key={pt.id}
                onClick={() => updatePlannerDetails({ planningType: pt.id })}
                className={`cursor-pointer rounded-2xl p-4 border transition-all ${
                  currentDetails.planningType === pt.id
                    ? 'bg-indigo-950/70 border-indigo-500 shadow-md shadow-indigo-500/20 ring-1 ring-indigo-500'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <h4 className="text-sm font-bold text-white mb-1">{pt.label}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{pt.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Guest Count & Budget Range */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-200 flex items-center gap-1.5">
              <Users className="w-4 h-4 text-indigo-400" />
              Expected Guest Count <span className="text-rose-500">*</span>
            </label>
            <input
              type="number"
              min={1}
              placeholder="e.g. 250"
              value={currentDetails.expectedGuestCount || ''}
              onChange={(e) =>
                updatePlannerDetails({
                  expectedGuestCount: parseInt(e.target.value, 10) || 0,
                })
              }
              className={`w-full px-4 py-2.5 rounded-xl glass-input text-sm text-white ${
                errors['plannerDetails.expectedGuestCount']
                  ? 'border-rose-500 ring-1 ring-rose-500'
                  : ''
              }`}
            />
            {errors['plannerDetails.expectedGuestCount'] && (
              <p className="text-xs text-rose-400">
                {errors['plannerDetails.expectedGuestCount']}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-200 flex items-center gap-1.5">
              <DollarSign className="w-4 h-4 text-emerald-400" />
              Estimated Budget (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. $10,000 - $25,000 or ₹5 Lakhs - ₹10 Lakhs"
              value={currentDetails.estimatedBudget || ''}
              onChange={(e) => updatePlannerDetails({ estimatedBudget: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl glass-input text-sm text-white placeholder-slate-500"
            />
          </div>
        </div>

        {/* Services Needed Selection */}
        <div className="space-y-3">
          <label className="block text-sm font-bold text-slate-200 uppercase tracking-wider">
            Services & Deliverables Needed <span className="text-rose-500">*</span>
          </label>
          <p className="text-xs text-slate-400">Select all services you expect the planner to handle.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 pt-1">
            {AVAILABLE_SERVICES.map((svc) => {
              const isSelected = currentDetails.servicesNeeded?.includes(svc);
              return (
                <div
                  key={svc}
                  onClick={() => toggleService(svc)}
                  className={`cursor-pointer p-3 rounded-xl border flex items-center space-x-3 transition-all ${
                    isSelected
                      ? 'bg-indigo-600/20 border-indigo-500/60 text-white font-medium'
                      : 'bg-slate-900/50 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded flex items-center justify-center text-[10px] border ${
                      isSelected
                        ? 'bg-indigo-600 border-indigo-500 text-white'
                        : 'border-slate-700 bg-slate-800'
                    }`}
                  >
                    {isSelected && '✓'}
                  </div>
                  <span className="text-xs">{svc}</span>
                </div>
              );
            })}
          </div>
          {errors['plannerDetails.servicesNeeded'] && (
            <p className="text-xs text-rose-400 font-semibold">
              {errors['plannerDetails.servicesNeeded']}
            </p>
          )}
        </div>
      </div>
    );
  }

  // Step 3 (Theme, Venue Status, Milestones, Preferences)
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Step 3 Header */}
      <div className="border-b border-slate-800 pb-5">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-2">
          Planner Requirement • Step 3 of 4
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2.5">
          <Palette className="w-6 h-6 text-indigo-400" />
          Theme, Venue Status & Planning Milestones
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          Add specific creative direction, milestone expectations, and vendor guidelines.
        </p>
      </div>

      {/* Venue Status */}
      <div className="space-y-3">
        <label className="block text-sm font-bold text-slate-200 uppercase tracking-wider">
          Current Venue Booking Status
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {VENUE_STATUS_OPTIONS.map((vs) => (
            <div
              key={vs.id}
              onClick={() => updatePlannerDetails({ venueStatus: vs.id })}
              className={`cursor-pointer rounded-2xl p-4 border transition-all ${
                currentDetails.venueStatus === vs.id
                  ? 'bg-indigo-950/70 border-indigo-500 shadow-md shadow-indigo-500/20 ring-1 ring-indigo-500'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <h4 className="text-sm font-bold text-white mb-1">{vs.label}</h4>
              <p className="text-xs text-slate-400 leading-relaxed">{vs.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Event Theme & Milestone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-slate-200 flex items-center gap-1.5">
            <Palette className="w-4 h-4 text-indigo-400" />
            Event Theme / Visual Mood
          </label>
          <input
            type="text"
            placeholder="e.g. Royal Traditional, Boho Minimalist, Futuristic Tech"
            value={currentDetails.eventTheme || ''}
            onChange={(e) => updatePlannerDetails({ eventTheme: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl glass-input text-sm text-white placeholder-slate-500"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-slate-200 flex items-center gap-1.5">
            <CalendarCheck className="w-4 h-4 text-emerald-400" />
            Target Planning Milestone / Ready By
          </label>
          <input
            type="date"
            value={currentDetails.targetMilestoneDate || ''}
            onChange={(e) => updatePlannerDetails({ targetMilestoneDate: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl glass-input text-sm text-white"
          />
        </div>
      </div>

      {/* Vendor Preferences */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-slate-200">
          Vendor & Catering Preferences
        </label>
        <input
          type="text"
          placeholder="e.g. Pure Vegetarian caterer required, prefer eco-friendly zero-plastic decor"
          value={currentDetails.vendorPreferences || ''}
          onChange={(e) => updatePlannerDetails({ vendorPreferences: e.target.value })}
          className="w-full px-4 py-2.5 rounded-xl glass-input text-sm text-white placeholder-slate-500"
        />
      </div>

      {/* Special Instructions */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-slate-200 flex items-center gap-1.5">
          <FileText className="w-4 h-4 text-indigo-400" />
          Special Coordination Instructions / Protocols
        </label>
        <textarea
          rows={3}
          placeholder="Any specific VIP arrival timings, cultural traditions, surprise elements, or safety protocols..."
          value={currentDetails.specialInstructions || ''}
          onChange={(e) => updatePlannerDetails({ specialInstructions: e.target.value })}
          className="w-full px-4 py-2.5 rounded-xl glass-input text-sm text-white placeholder-slate-500 resize-none"
        />
      </div>
    </div>
  );
}
