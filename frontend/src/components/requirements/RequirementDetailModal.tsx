'use client';

import React from 'react';
import {
  X,
  Calendar,
  MapPin,
  Building2,
  Users2,
  Mic2,
  Wrench,
  Flame,
  Mail,
  Phone,
  Building,
  CheckCircle2,
  Trash2,
} from 'lucide-react';
import { IRequirement } from '@/lib/types';

interface RequirementDetailModalProps {
  requirement: IRequirement | null;
  isOpen: boolean;
  onClose: () => void;
  onDelete?: (id: string) => void;
}

export default function RequirementDetailModal({
  requirement,
  isOpen,
  onClose,
  onDelete,
}: RequirementDetailModalProps) {
  if (!isOpen || !requirement) return null;

  const formatDate = () => {
    if (requirement.dateType === 'single' && requirement.eventDate) {
      return new Date(requirement.eventDate).toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'long',
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
      return `${start} — ${end}`;
    }
    return 'Date TBD';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 shadow-2xl space-y-6 my-8 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="border-b border-slate-800 pb-4 pr-10">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-xs font-bold text-white uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-600">
              {requirement.category}
            </span>
            {requirement.isUrgent && (
              <span className="flex items-center gap-1 text-xs font-bold text-rose-300 bg-rose-500/20 border border-rose-500/30 px-2.5 py-0.5 rounded-full">
                <Flame className="w-3 h-3 text-rose-500 fill-rose-500 animate-pulse" />
                Urgent Hiring
              </span>
            )}
            <span className="text-xs text-slate-500 font-mono">
              ID: {requirement._id}
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-white">{requirement.eventName}</h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">{requirement.eventType}</p>
        </div>

        {/* Event Basics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
            <span className="text-slate-400 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-indigo-400" /> Event Schedule
            </span>
            <p className="text-sm font-semibold text-white">{formatDate()}</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
            <span className="text-slate-400 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-rose-400" /> Location & Venue
            </span>
            <p className="text-sm font-semibold text-white">
              {requirement.location.city}, {requirement.location.state}
            </p>
            {requirement.venue?.name && (
              <p className="text-xs text-slate-400">Venue: {requirement.venue.name} ({requirement.venue.venueType})</p>
            )}
          </div>
        </div>

        {/* Dynamic Category Details */}
        <div className="space-y-4 pt-1">
          <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-400">
            {requirement.category === 'planner'
              ? '🎯 Planner Specifications'
              : requirement.category === 'performer'
              ? '🎸 Performer & Technical Rider'
              : '🛠️ Crew Roles & Working Terms'}
          </h3>

          {/* Planner Details */}
          {requirement.category === 'planner' && requirement.plannerDetails && (
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 text-xs">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div>
                  <span className="text-slate-500 block">Planning Model</span>
                  <span className="font-semibold text-white capitalize">{requirement.plannerDetails.planningType.replace('_', ' ')}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Guest Count</span>
                  <span className="font-semibold text-white">{requirement.plannerDetails.expectedGuestCount} Guests</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Estimated Budget</span>
                  <span className="font-semibold text-emerald-400">{requirement.plannerDetails.estimatedBudget || 'Flexible'}</span>
                </div>
              </div>

              {requirement.plannerDetails.servicesNeeded && requirement.plannerDetails.servicesNeeded.length > 0 && (
                <div>
                  <span className="text-slate-500 block mb-1">Services Needed:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {requirement.plannerDetails.servicesNeeded.map((s) => (
                      <span key={s} className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-[11px]">
                        ✓ {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {requirement.plannerDetails.eventTheme && (
                <div>
                  <span className="text-slate-500 block">Event Theme:</span>
                  <p className="text-slate-300">{requirement.plannerDetails.eventTheme}</p>
                </div>
              )}

              {requirement.plannerDetails.specialInstructions && (
                <div>
                  <span className="text-slate-500 block">Special Instructions:</span>
                  <p className="text-slate-300">{requirement.plannerDetails.specialInstructions}</p>
                </div>
              )}
            </div>
          )}

          {/* Performer Details */}
          {requirement.category === 'performer' && requirement.performerDetails && (
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 text-xs">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div>
                  <span className="text-slate-500 block">Performer Type</span>
                  <span className="font-semibold text-white capitalize">{requirement.performerDetails.performerType.replace('_', ' ')}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Duration & Sets</span>
                  <span className="font-semibold text-white">{requirement.performerDetails.performanceDurationMinutes} mins ({requirement.performerDetails.numberOfSets} sets)</span>
                </div>
                <div>
                  <span className="text-slate-500 block">PA Audio Rider</span>
                  <span className="font-semibold text-purple-400">{requirement.performerDetails.soundAudioRequired ? 'Provided by Host' : 'Artist Self-Provided'}</span>
                </div>
              </div>

              {requirement.performerDetails.preferredLanguages && (
                <div>
                  <span className="text-slate-500 block mb-1">Languages:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {requirement.performerDetails.preferredLanguages.map((l) => (
                      <span key={l} className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20 text-[11px]">
                        {l}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {requirement.performerDetails.backlineEquipmentNeeded && requirement.performerDetails.backlineEquipmentNeeded.length > 0 && (
                <div>
                  <span className="text-slate-500 block mb-1">Backline Equipment:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {requirement.performerDetails.backlineEquipmentNeeded.map((b) => (
                      <span key={b} className="px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800 text-[11px]">
                        {b}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {requirement.performerDetails.specificSongsOrRider && (
                <div>
                  <span className="text-slate-500 block">Specific Songs / Rider:</span>
                  <p className="text-slate-300">{requirement.performerDetails.specificSongsOrRider}</p>
                </div>
              )}
            </div>
          )}

          {/* Crew Details */}
          {requirement.category === 'crew' && requirement.crewDetails && (
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 text-xs">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div>
                  <span className="text-slate-500 block">Total Staff Needed</span>
                  <span className="font-bold text-emerald-400 text-sm">{requirement.crewDetails.totalCrewCount} Crew Members</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Shift Timing</span>
                  <span className="font-semibold text-white">{requirement.crewDetails.callTime || 'TBD'} → {requirement.crewDetails.wrapTime || 'TBD'}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Dress Code</span>
                  <span className="font-semibold text-white capitalize">{requirement.crewDetails.dressCode.replace('_', ' ')}</span>
                </div>
              </div>

              {requirement.crewDetails.roles && (
                <div>
                  <span className="text-slate-500 block mb-1">Role Allocation:</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {requirement.crewDetails.roles.map((r, i) => (
                      <div key={i} className="p-2 rounded-lg bg-slate-900 border border-slate-800 flex justify-between">
                        <span className="text-white font-medium">{r.roleName}</span>
                        <span className="text-emerald-400 font-bold">{r.count} staff ({r.skillLevel})</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center gap-4 text-slate-300 pt-1">
                <span>🍽️ Meals: {requirement.crewDetails.mealsProvided ? 'Yes' : 'No'}</span>
                <span>🚌 Transport: {requirement.crewDetails.transportProvided ? 'Yes' : 'No'}</span>
              </div>
            </div>
          )}
        </div>

        {/* Contact Information */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
          <h4 className="font-bold text-slate-200 uppercase tracking-wider">Contact Person Details</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-300">
            <div className="flex items-center space-x-2">
              <span className="text-slate-500">Name:</span>
              <span className="font-semibold text-white">{requirement.contactInfo.name}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="w-3.5 h-3.5 text-indigo-400" />
              <a href={`mailto:${requirement.contactInfo.email}`} className="text-indigo-400 hover:underline">
                {requirement.contactInfo.email}
              </a>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <a href={`tel:${requirement.contactInfo.phone}`} className="text-emerald-400 hover:underline">
                {requirement.contactInfo.phone}
              </a>
            </div>
            {requirement.contactInfo.organization && (
              <div className="flex items-center space-x-2">
                <Building className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-slate-300">{requirement.contactInfo.organization}</span>
              </div>
            )}
          </div>
        </div>

        {/* Additional Notes */}
        {requirement.additionalNotes && (
          <div className="text-xs text-slate-400 bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
            <span className="text-slate-500 block font-semibold mb-0.5">Additional Notes:</span>
            {requirement.additionalNotes}
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-800">
          {onDelete && (
            <button
              type="button"
              onClick={() => {
                if (confirm('Are you sure you want to delete this requirement from MongoDB?')) {
                  onDelete(requirement._id);
                  onClose();
                }
              }}
              className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1 py-2 px-3 rounded-lg hover:bg-rose-500/10 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete Post</span>
            </button>
          )}

          <button
            type="button"
            onClick={onClose}
            className="ml-auto py-2.5 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
