'use client';

import React from 'react';
import {
  Calendar,
  MapPin,
  Building2,
  Users2,
  Mic2,
  Wrench,
  Sparkles,
  Check,
  CalendarRange,
} from 'lucide-react';
import { RequirementFormData, CategoryType, DateType } from '@/lib/types';

interface Step1BasicsProps {
  formData: RequirementFormData;
  updateFormData: (updates: Partial<RequirementFormData>) => void;
  errors: Record<string, string>;
}

const EVENT_TYPES = [
  'Corporate Conference',
  'Wedding & Reception',
  'Music Concert / Festival',
  'College / Cultural Fest',
  'Birthday & Private Party',
  'Product Launch / Expo',
  'Award Ceremony & Gala',
  'Charity Fundraiser',
  'Other Event',
];

export default function Step1Basics({ formData, updateFormData, errors }: Step1BasicsProps) {
  const handleCategorySelect = (category: CategoryType) => {
    updateFormData({
      category,
      // Initialize default structures if missing
      plannerDetails: category === 'planner' ? formData.plannerDetails || {
        planningType: 'full_planning',
        expectedGuestCount: 150,
        estimatedBudget: '$5,000 - $15,000',
        servicesNeeded: ['Decor & Design', 'Catering Management', 'Timeline & Logistics'],
        venueStatus: 'need_assistance',
        eventTheme: '',
        vendorPreferences: '',
        specialInstructions: '',
      } : formData.plannerDetails,
      performerDetails: category === 'performer' ? formData.performerDetails || {
        performerType: 'band_musician',
        customPerformerType: '',
        performanceDurationMinutes: 60,
        numberOfSets: 1,
        targetAudience: 'All age groups',
        preferredLanguages: ['English', 'Hindi'],
        performanceGenre: 'Bollywood & Pop Fusion',
        soundAudioRequired: true,
        soundSpecs: '',
        stageDimensions: '20ft x 15ft',
        backlineEquipmentNeeded: ['Drum Kit', 'Guitar Amp'],
        greenRoomRequired: true,
        rehearsalRequired: false,
        specificSongsOrRider: '',
      } : formData.performerDetails,
      crewDetails: category === 'crew' ? formData.crewDetails || {
        roles: [
          { roleName: 'Stagehand / Rigging', count: 4, skillLevel: 'intermediate' },
          { roleName: 'Audio/Visual Assistant', count: 2, skillLevel: 'intermediate' },
        ],
        callTime: '08:00 AM',
        wrapTime: '06:00 PM',
        totalCrewCount: 6,
        gearProvision: 'provided_on_site',
        dressCode: 'all_black',
        physicalRequirements: ['Ability to carry 15kg equipment'],
        mealsProvided: true,
        transportProvided: false,
        onSiteLeadContact: '',
      } : formData.crewDetails,
    });
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Section Header */}
      <div className="border-b border-slate-800 pb-5">
        <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2.5">
          <Calendar className="w-6 h-6 text-indigo-400" />
          Step 1: Event Basics & Requirement Category
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          Tell us about the event context and select whether you need a Planner, Performer, or Crew.
        </p>
      </div>

      {/* 1. Category Selection Cards */}
      <div className="space-y-3">
        <label className="block text-sm font-bold text-slate-200 uppercase tracking-wider">
          Select What You Are Hiring For <span className="text-rose-500">*</span>
        </label>
        <p className="text-xs text-slate-400">
          Steps 2 and 3 will dynamically customize according to your chosen category.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {/* Planner Card */}
          <div
            onClick={() => handleCategorySelect('planner')}
            className={`cursor-pointer rounded-2xl p-5 border-2 transition-all duration-200 relative group ${
              formData.category === 'planner'
                ? 'bg-gradient-to-b from-indigo-950/70 to-slate-900 border-indigo-500 shadow-xl shadow-indigo-500/20 ring-1 ring-indigo-500'
                : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                  formData.category === 'planner'
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                    : 'bg-slate-800 text-indigo-400 group-hover:bg-slate-700'
                }`}
              >
                <Users2 className="w-6 h-6" />
              </div>
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center border transition-all ${
                  formData.category === 'planner'
                    ? 'bg-indigo-600 border-indigo-500 text-white'
                    : 'border-slate-700 bg-slate-800/50'
                }`}
              >
                {formData.category === 'planner' && <Check className="w-3.5 h-3.5" />}
              </div>
            </div>

            <h3 className="text-base font-bold text-white mb-1">Event Planner</h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              Full planning, design, budgeting, vendor sourcing, timeline & day-of coordination.
            </p>
            <span className="inline-flex items-center text-[11px] font-semibold text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-0.5 rounded-full">
              Coordination & Management
            </span>
          </div>

          {/* Performer Card */}
          <div
            onClick={() => handleCategorySelect('performer')}
            className={`cursor-pointer rounded-2xl p-5 border-2 transition-all duration-200 relative group ${
              formData.category === 'performer'
                ? 'bg-gradient-to-b from-purple-950/70 to-slate-900 border-purple-500 shadow-xl shadow-purple-500/20 ring-1 ring-purple-500'
                : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                  formData.category === 'performer'
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                    : 'bg-slate-800 text-purple-400 group-hover:bg-slate-700'
                }`}
              >
                <Mic2 className="w-6 h-6" />
              </div>
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center border transition-all ${
                  formData.category === 'performer'
                    ? 'bg-purple-600 border-purple-500 text-white'
                    : 'border-slate-700 bg-slate-800/50'
                }`}
              >
                {formData.category === 'performer' && <Check className="w-3.5 h-3.5" />}
              </div>
            </div>

            <h3 className="text-base font-bold text-white mb-1">Performer / Talent</h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              Live musicians, DJs, standup comedians, magicians, dance troupes & emcees.
            </p>
            <span className="inline-flex items-center text-[11px] font-semibold text-purple-300 bg-purple-500/10 border border-purple-500/20 px-2.5 py-0.5 rounded-full">
              Live Stage & Entertainment
            </span>
          </div>

          {/* Crew Card */}
          <div
            onClick={() => handleCategorySelect('crew')}
            className={`cursor-pointer rounded-2xl p-5 border-2 transition-all duration-200 relative group ${
              formData.category === 'crew'
                ? 'bg-gradient-to-b from-emerald-950/70 to-slate-900 border-emerald-500 shadow-xl shadow-emerald-500/20 ring-1 ring-emerald-500'
                : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                  formData.category === 'crew'
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                    : 'bg-slate-800 text-emerald-400 group-hover:bg-slate-700'
                }`}
              >
                <Wrench className="w-6 h-6" />
              </div>
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center border transition-all ${
                  formData.category === 'crew'
                    ? 'bg-emerald-600 border-emerald-500 text-white'
                    : 'border-slate-700 bg-slate-800/50'
                }`}
              >
                {formData.category === 'crew' && <Check className="w-3.5 h-3.5" />}
              </div>
            </div>

            <h3 className="text-base font-bold text-white mb-1">Event Crew & Staff</h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              AV tech, stagehands, sound engineers, ushers, registration desk & venue staff.
            </p>
            <span className="inline-flex items-center text-[11px] font-semibold text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
              Operations & Technical Staff
            </span>
          </div>
        </div>
        {errors.category && <p className="text-xs text-rose-400 font-semibold">{errors.category}</p>}
      </div>

      {/* 2. Event Basics Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
        {/* Event Name */}
        <div className="md:col-span-2 space-y-2">
          <label className="block text-sm font-semibold text-slate-200">
            Event Name <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Annual Tech Leadership Summit 2026, Summer Music Fest"
            value={formData.eventName}
            onChange={(e) => updateFormData({ eventName: e.target.value })}
            className={`w-full px-4 py-3 rounded-xl glass-input text-sm text-white placeholder-slate-500 ${
              errors.eventName ? 'border-rose-500 ring-1 ring-rose-500' : ''
            }`}
          />
          {errors.eventName && <p className="text-xs text-rose-400">{errors.eventName}</p>}
        </div>

        {/* Event Type */}
        <div className="md:col-span-2 space-y-2">
          <label className="block text-sm font-semibold text-slate-200">
            Event Type <span className="text-rose-500">*</span>
          </label>
          <div className="flex flex-wrap gap-2 mb-2">
            {EVENT_TYPES.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => updateFormData({ eventType: type })}
                className={`text-xs px-3 py-1.5 rounded-xl border transition-all ${
                  formData.eventType === type
                    ? 'bg-indigo-600 text-white border-indigo-500 font-semibold shadow-sm'
                    : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-slate-700 hover:bg-slate-800'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
          <input
            type="text"
            placeholder="Or type custom event type..."
            value={formData.eventType}
            onChange={(e) => updateFormData({ eventType: e.target.value })}
            className={`w-full px-4 py-2.5 rounded-xl glass-input text-sm text-white placeholder-slate-500 ${
              errors.eventType ? 'border-rose-500 ring-1 ring-rose-500' : ''
            }`}
          />
          {errors.eventType && <p className="text-xs text-rose-400">{errors.eventType}</p>}
        </div>

        {/* Date Selection Mode & Inputs */}
        <div className="md:col-span-2 space-y-3 bg-slate-900/40 p-4 rounded-2xl border border-slate-800/80">
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-slate-200 flex items-center gap-2">
              <CalendarRange className="w-4 h-4 text-indigo-400" />
              Event Date / Schedule <span className="text-rose-500">*</span>
            </label>

            {/* Date Type Toggle */}
            <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
              <button
                type="button"
                onClick={() => updateFormData({ dateType: 'single' })}
                className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                  formData.dateType === 'single'
                    ? 'bg-indigo-600 text-white font-semibold shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Single Day
              </button>
              <button
                type="button"
                onClick={() => updateFormData({ dateType: 'range' })}
                className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                  formData.dateType === 'range'
                    ? 'bg-indigo-600 text-white font-semibold shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Multi-Day Range
              </button>
            </div>
          </div>

          {formData.dateType === 'single' ? (
            <div className="space-y-1">
              <label className="text-xs text-slate-400">Event Date</label>
              <input
                type="date"
                value={formData.eventDate || ''}
                onChange={(e) => updateFormData({ eventDate: e.target.value })}
                className={`w-full px-4 py-2.5 rounded-xl glass-input text-sm text-white ${
                  errors.eventDate ? 'border-rose-500 ring-1 ring-rose-500' : ''
                }`}
              />
              {errors.eventDate && <p className="text-xs text-rose-400">{errors.eventDate}</p>}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs text-slate-400">Start Date</label>
                <input
                  type="date"
                  value={formData.startDate || ''}
                  onChange={(e) => updateFormData({ startDate: e.target.value })}
                  className={`w-full px-4 py-2.5 rounded-xl glass-input text-sm text-white ${
                    errors.startDate ? 'border-rose-500 ring-1 ring-rose-500' : ''
                  }`}
                />
                {errors.startDate && <p className="text-xs text-rose-400">{errors.startDate}</p>}
              </div>
              <div className="space-y-1">
                <label className="text-xs text-slate-400">End Date</label>
                <input
                  type="date"
                  value={formData.endDate || ''}
                  onChange={(e) => updateFormData({ endDate: e.target.value })}
                  className={`w-full px-4 py-2.5 rounded-xl glass-input text-sm text-white ${
                    errors.endDate ? 'border-rose-500 ring-1 ring-rose-500' : ''
                  }`}
                />
                {errors.endDate && <p className="text-xs text-rose-400">{errors.endDate}</p>}
              </div>
            </div>
          )}
        </div>

        {/* Location Information */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-slate-200 flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-indigo-400" />
            City <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Mumbai, Bengaluru, New Delhi"
            value={formData.location.city}
            onChange={(e) =>
              updateFormData({
                location: { ...formData.location, city: e.target.value },
              })
            }
            className={`w-full px-4 py-2.5 rounded-xl glass-input text-sm text-white placeholder-slate-500 ${
              errors['location.city'] ? 'border-rose-500 ring-1 ring-rose-500' : ''
            }`}
          />
          {errors['location.city'] && <p className="text-xs text-rose-400">{errors['location.city']}</p>}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-slate-200">
            State / Region <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Maharashtra, Karnataka, Delhi NCR"
            value={formData.location.state}
            onChange={(e) =>
              updateFormData({
                location: { ...formData.location, state: e.target.value },
              })
            }
            className={`w-full px-4 py-2.5 rounded-xl glass-input text-sm text-white placeholder-slate-500 ${
              errors['location.state'] ? 'border-rose-500 ring-1 ring-rose-500' : ''
            }`}
          />
          {errors['location.state'] && <p className="text-xs text-rose-400">{errors['location.state']}</p>}
        </div>

        {/* Venue Information (Optional) */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-slate-200 flex items-center gap-1.5">
            <Building2 className="w-4 h-4 text-indigo-400" />
            Venue Name (Optional)
          </label>
          <input
            type="text"
            placeholder="e.g. Grand Hyatt Ballroom, HITEX Hall 3, Palace Grounds"
            value={formData.venue.name || ''}
            onChange={(e) =>
              updateFormData({
                venue: { ...formData.venue, name: e.target.value },
              })
            }
            className="w-full px-4 py-2.5 rounded-xl glass-input text-sm text-white placeholder-slate-500"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-slate-200">
            Venue Setting
          </label>
          <select
            value={formData.venue.venueType || 'tbd'}
            onChange={(e) =>
              updateFormData({
                venue: { ...formData.venue, venueType: e.target.value as any },
              })
            }
            className="w-full px-4 py-2.5 rounded-xl glass-input text-sm text-white bg-slate-900"
          >
            <option value="indoor">Indoor (Banquet, Auditorium, Hotel)</option>
            <option value="outdoor">Outdoor (Grounds, Lawn, Open Stage)</option>
            <option value="hybrid">Hybrid (Indoor + Outdoor)</option>
            <option value="tbd">To Be Decided / Need Assistance</option>
          </select>
        </div>
      </div>
    </div>
  );
}
