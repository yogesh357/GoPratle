'use client';

import React from 'react';
import {
  Send,
  User,
  Mail,
  Phone,
  Building,
  Flame,
  FileCheck,
  Calendar,
  MapPin,
  Sparkles,
  Users2,
  Mic2,
  Wrench,
  Info,
} from 'lucide-react';
import { RequirementFormData } from '@/lib/types';

interface Step4ReviewSubmitProps {
  formData: RequirementFormData;
  updateFormData: (updates: Partial<RequirementFormData>) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
  errors: Record<string, string>;
  onEditStep: (step: number) => void;
}

export default function Step4ReviewSubmit({
  formData,
  updateFormData,
  onSubmit,
  isSubmitting,
  errors,
  onEditStep,
}: Step4ReviewSubmitProps) {
  const getCategoryInfo = () => {
    switch (formData.category) {
      case 'planner':
        return {
          title: 'Event Planner Requirement',
          icon: Users2,
          color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
          badge: 'bg-indigo-600',
        };
      case 'performer':
        return {
          title: 'Performer / Talent Requirement',
          icon: Mic2,
          color: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
          badge: 'bg-purple-600',
        };
      case 'crew':
        return {
          title: 'Crew & Staffing Requirement',
          icon: Wrench,
          color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
          badge: 'bg-emerald-600',
        };
    }
  };

  const catInfo = getCategoryInfo();
  const CategoryIcon = catInfo.icon;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Step 4 Header */}
      <div className="border-b border-slate-800 pb-5">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-2">
          Final Step • Step 4 of 4
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2.5">
          <FileCheck className="w-6 h-6 text-indigo-400" />
          Review Requirement & Contact Information
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          Review all the details you’ve configured, enter your contact information, and publish to database.
        </p>
      </div>

      {/* 1. Interactive Review Summary Box */}
      <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 space-y-6 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${catInfo.color} border`}>
              <CategoryIcon className="w-5 h-5" />
            </div>
            <div>
              <span className={`text-[11px] font-bold text-white px-2 py-0.5 rounded-full ${catInfo.badge} uppercase tracking-wider`}>
                {formData.category}
              </span>
              <h3 className="text-lg font-bold text-white mt-1">{formData.eventName || 'Untitled Event'}</h3>
              <p className="text-xs text-slate-400">{formData.eventType}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onEditStep(1)}
            className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 underline underline-offset-4"
          >
            Edit Basics
          </button>
        </div>

        {/* Basics Breakdown Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
            <span className="text-slate-400 block mb-1">Schedule & Dates</span>
            <span className="font-semibold text-white flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-indigo-400" />
              {formData.dateType === 'single'
                ? formData.eventDate || 'Date not set'
                : `${formData.startDate || 'Start'} → ${formData.endDate || 'End'}`}
            </span>
          </div>

          <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
            <span className="text-slate-400 block mb-1">Location</span>
            <span className="font-semibold text-white flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-rose-400" />
              {formData.location.city}, {formData.location.state}
            </span>
          </div>

          <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
            <span className="text-slate-400 block mb-1">Venue Type</span>
            <span className="font-semibold text-white capitalize">
              {formData.venue?.name ? `${formData.venue.name} (${formData.venue.venueType})` : formData.venue?.venueType || 'TBD'}
            </span>
          </div>
        </div>

        {/* Dynamic Category Details Review */}
        <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800/80 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              {formData.category === 'planner'
                ? 'Planner Scope & Requirements'
                : formData.category === 'performer'
                ? 'Performance & Rider Requirements'
                : 'Crew Staffing & Shift Logistics'}
            </h4>
            <button
              type="button"
              onClick={() => onEditStep(2)}
              className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 underline underline-offset-4"
            >
              Edit Specs
            </button>
          </div>

          {/* Planner summary */}
          {formData.category === 'planner' && formData.plannerDetails && (
            <div className="space-y-2 text-xs">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-slate-300">
                <div>
                  <span className="text-slate-500 block">Planning Model:</span>
                  <span className="font-semibold capitalize text-white">
                    {formData.plannerDetails.planningType.replace('_', ' ')}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block">Guest Count:</span>
                  <span className="font-semibold text-white">{formData.plannerDetails.expectedGuestCount} Guests</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Venue Status:</span>
                  <span className="font-semibold capitalize text-white">
                    {formData.plannerDetails.venueStatus.replace('_', ' ')}
                  </span>
                </div>
              </div>

              {formData.plannerDetails.servicesNeeded && formData.plannerDetails.servicesNeeded.length > 0 && (
                <div className="pt-2">
                  <span className="text-slate-500 block mb-1">Services Needed:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {formData.plannerDetails.servicesNeeded.map((s) => (
                      <span key={s} className="px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-300 text-[11px] border border-indigo-500/20">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {formData.plannerDetails.eventTheme && (
                <div className="pt-1 text-slate-400">
                  <span className="text-slate-500">Theme:</span> {formData.plannerDetails.eventTheme}
                </div>
              )}
            </div>
          )}

          {/* Performer summary */}
          {formData.category === 'performer' && formData.performerDetails && (
            <div className="space-y-2 text-xs">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-slate-300">
                <div>
                  <span className="text-slate-500 block">Talent Type:</span>
                  <span className="font-semibold capitalize text-white">
                    {formData.performerDetails.performerType.replace('_', ' ')}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block">Duration:</span>
                  <span className="font-semibold text-white">{formData.performerDetails.performanceDurationMinutes} Mins ({formData.performerDetails.numberOfSets} sets)</span>
                </div>
                <div>
                  <span className="text-slate-500 block">PA Audio System:</span>
                  <span className="font-semibold text-white">
                    {formData.performerDetails.soundAudioRequired ? 'Provided by Host' : 'Self-Arranged'}
                  </span>
                </div>
              </div>

              {formData.performerDetails.preferredLanguages && (
                <div className="pt-1">
                  <span className="text-slate-500 block mb-1">Languages:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {formData.performerDetails.preferredLanguages.map((l) => (
                      <span key={l} className="px-2 py-0.5 rounded-md bg-purple-500/10 text-purple-300 text-[11px] border border-purple-500/20">
                        {l}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Crew summary */}
          {formData.category === 'crew' && formData.crewDetails && (
            <div className="space-y-2 text-xs">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-slate-300">
                <div>
                  <span className="text-slate-500 block">Total Staff:</span>
                  <span className="font-semibold text-emerald-400 text-sm">
                    {formData.crewDetails.totalCrewCount} Crew Members
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block">Shift Timing:</span>
                  <span className="font-semibold text-white">
                    {formData.crewDetails.callTime || 'TBD'} → {formData.crewDetails.wrapTime || 'TBD'}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block">Dress Code:</span>
                  <span className="font-semibold capitalize text-white">
                    {formData.crewDetails.dressCode.replace('_', ' ')}
                  </span>
                </div>
              </div>

              {formData.crewDetails.roles && (
                <div className="pt-1">
                  <span className="text-slate-500 block mb-1">Roles Breakdown:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {formData.crewDetails.roles.map((r, i) => (
                      <span key={i} className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-300 text-[11px] border border-emerald-500/20">
                        {r.roleName} (x{r.count}, {r.skillLevel})
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 2. Contact Information Form */}
      <div className="space-y-4 pt-2">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <User className="w-5 h-5 text-indigo-400" />
          Organizer Contact Information <span className="text-rose-500">*</span>
        </h3>
        <p className="text-xs text-slate-400">
          Interested professionals will contact you through these details.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-indigo-400" />
              Full Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Alex Henderson"
              value={formData.contactInfo.name}
              onChange={(e) =>
                updateFormData({
                  contactInfo: { ...formData.contactInfo, name: e.target.value },
                })
              }
              className={`w-full px-4 py-2.5 rounded-xl glass-input text-sm text-white placeholder-slate-500 ${
                errors['contactInfo.name'] ? 'border-rose-500 ring-1 ring-rose-500' : ''
              }`}
            />
            {errors['contactInfo.name'] && (
              <p className="text-xs text-rose-400">{errors['contactInfo.name']}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-indigo-400" />
              Email Address <span className="text-rose-500">*</span>
            </label>
            <input
              type="email"
              placeholder="e.g. alex@eventscompany.com"
              value={formData.contactInfo.email}
              onChange={(e) =>
                updateFormData({
                  contactInfo: { ...formData.contactInfo, email: e.target.value },
                })
              }
              className={`w-full px-4 py-2.5 rounded-xl glass-input text-sm text-white placeholder-slate-500 ${
                errors['contactInfo.email'] ? 'border-rose-500 ring-1 ring-rose-500' : ''
              }`}
            />
            {errors['contactInfo.email'] && (
              <p className="text-xs text-rose-400">{errors['contactInfo.email']}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-indigo-400" />
              Phone / WhatsApp Number <span className="text-rose-500">*</span>
            </label>
            <input
              type="tel"
              placeholder="e.g. +91 98765 43210"
              value={formData.contactInfo.phone}
              onChange={(e) =>
                updateFormData({
                  contactInfo: { ...formData.contactInfo, phone: e.target.value },
                })
              }
              className={`w-full px-4 py-2.5 rounded-xl glass-input text-sm text-white placeholder-slate-500 ${
                errors['contactInfo.phone'] ? 'border-rose-500 ring-1 ring-rose-500' : ''
              }`}
            />
            {errors['contactInfo.phone'] && (
              <p className="text-xs text-rose-400">{errors['contactInfo.phone']}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5 text-indigo-400" />
              Company / Organizing Agency (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Apex Live Experiences Pvt Ltd"
              value={formData.contactInfo.organization || ''}
              onChange={(e) =>
                updateFormData({
                  contactInfo: { ...formData.contactInfo, organization: e.target.value },
                })
              }
              className="w-full px-4 py-2.5 rounded-xl glass-input text-sm text-white placeholder-slate-500"
            />
          </div>
        </div>
      </div>

      {/* 3. Additional Notes & Urgent Flag */}
      <div className="space-y-4 pt-2">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-200">
            Additional Notes / NDA / Special Terms (Optional)
          </label>
          <textarea
            rows={3}
            placeholder="Any additional terms, payment milestones, security requirements, or vendor guidelines..."
            value={formData.additionalNotes || ''}
            onChange={(e) => updateFormData({ additionalNotes: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl glass-input text-sm text-white placeholder-slate-500 resize-none"
          />
        </div>

        {/* Urgent hiring banner toggle */}
        <div
          onClick={() => updateFormData({ isUrgent: !formData.isUrgent })}
          className={`cursor-pointer p-4 rounded-2xl border transition-all flex items-center justify-between ${
            formData.isUrgent
              ? 'bg-rose-950/40 border-rose-500/80 text-rose-200'
              : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center space-x-3">
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                formData.isUrgent ? 'bg-rose-600 text-white' : 'bg-slate-800 text-slate-400'
              }`}
            >
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Mark as Urgent Hiring Requirement</h4>
              <p className="text-xs text-slate-400">Highlights your requirement with an Urgent badge in the explorer feed</p>
            </div>
          </div>

          <input
            type="checkbox"
            checked={formData.isUrgent}
            onChange={() => {}} // Handled by div click
            className="w-5 h-5 rounded text-rose-600 bg-slate-800 border-slate-700 pointer-events-none"
          />
        </div>
      </div>

      {/* Global Form Error Display */}
      {errors.submit && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-sm flex items-start space-x-2">
          <Info className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">Submission Error</p>
            <p className="text-xs text-rose-300 mt-0.5">{errors.submit}</p>
          </div>
        </div>
      )}

      {/* Submit Action */}
      <div className="pt-4">
        <button
          type="button"
          onClick={onSubmit}
          disabled={isSubmitting}
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white font-bold text-base shadow-xl shadow-indigo-600/30 hover:shadow-indigo-500/50 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center space-x-2 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Validating & Storing...</span>
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              <span>Submit & Publish Requirement</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
