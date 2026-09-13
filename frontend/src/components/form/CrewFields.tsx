'use client';

import React from 'react';
import {
  Wrench,
  Users,
  Clock,
  Plus,
  Trash2,
  Shirt,
  ShieldCheck,
  Utensils,
  Truck,
  PhoneCall,
} from 'lucide-react';
import { CrewDetails, CrewRoleItem } from '@/lib/types';

interface CrewFieldsProps {
  step: 2 | 3;
  crewDetails?: CrewDetails;
  updateCrewDetails: (updates: Partial<CrewDetails>) => void;
  errors: Record<string, string>;
}

const COMMON_ROLES = [
  'Stagehand & Rigging Tech',
  'Audio / Sound Engineer',
  'Lighting & Visual Operator',
  'Camera & Livestream Crew',
  'Guest Registration & Ushers',
  'Event Security & Bouncers',
  'Backstage Coordinator',
  'Catering & Hospitality Staff',
];

const DRESS_CODES = [
  { id: 'all_black', label: 'All Black Production', desc: 'Standard black shirt & pants for invisible crew' },
  { id: 'formal', label: 'Formal / Suit & Tie', desc: 'Corporate gala and luxury weddings' },
  { id: 'branded_tshirt', label: 'Branded T-Shirts Provided', desc: 'Event branded crew uniforms' },
  { id: 'casual', label: 'Casual / Comfortable', desc: 'Setup days and load-in shifts' },
];

const PHYSICAL_REQUIREMENTS = [
  'Heavy lifting (up to 20kg / 45lbs)',
  'Comfortable standing for 6+ hours',
  'Working at heights (truss / scaffolding)',
  'Night shift / overnight load-out',
  'Driver license / vehicle operation',
];

export default function CrewFields({
  step,
  crewDetails,
  updateCrewDetails,
  errors,
}: CrewFieldsProps) {
  const currentDetails: CrewDetails = crewDetails || {
    roles: [
      { roleName: 'Stagehand & Rigging Tech', count: 4, skillLevel: 'intermediate' },
      { roleName: 'Audio / Sound Engineer', count: 2, skillLevel: 'lead' },
    ],
    callTime: '08:00 AM',
    wrapTime: '06:00 PM',
    totalCrewCount: 6,
    gearProvision: 'provided_on_site',
    dressCode: 'all_black',
    physicalRequirements: ['Heavy lifting (up to 20kg / 45lbs)', 'Comfortable standing for 6+ hours'],
    mealsProvided: true,
    transportProvided: false,
    onSiteLeadContact: '',
  };

  const calculateTotalCount = (roles: CrewRoleItem[]) => {
    return roles.reduce((acc, r) => acc + (Number(r.count) || 0), 0);
  };

  const handleAddRole = (roleName = 'General Crew Staff') => {
    const updatedRoles: CrewRoleItem[] = [
      ...(currentDetails.roles || []),
      { roleName, count: 2, skillLevel: 'intermediate' },
    ];
    updateCrewDetails({
      roles: updatedRoles,
      totalCrewCount: calculateTotalCount(updatedRoles),
    });
  };

  const handleRemoveRole = (index: number) => {
    const updatedRoles = currentDetails.roles.filter((_, i) => i !== index);
    updateCrewDetails({
      roles: updatedRoles,
      totalCrewCount: calculateTotalCount(updatedRoles),
    });
  };

  const handleRoleChange = (index: number, updates: Partial<CrewRoleItem>) => {
    const updatedRoles = [...currentDetails.roles];
    updatedRoles[index] = { ...updatedRoles[index], ...updates };
    updateCrewDetails({
      roles: updatedRoles,
      totalCrewCount: calculateTotalCount(updatedRoles),
    });
  };

  const togglePhysicalRequirement = (req: string) => {
    const existing = currentDetails.physicalRequirements || [];
    const updated = existing.includes(req)
      ? existing.filter((r) => r !== req)
      : [...existing, req];
    updateCrewDetails({ physicalRequirements: updated });
  };

  if (step === 2) {
    return (
      <div className="space-y-8 animate-fade-in">
        {/* Step 2 Header */}
        <div className="border-b border-slate-800 pb-5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-2">
            Crew Requirement • Step 2 of 4
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2.5">
            <Wrench className="w-6 h-6 text-emerald-400" />
            Crew Roles, Headcounts & Shift Timings
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Build your staffing roster. Specify the required crew roles, number of people per role, and call times.
          </p>
        </div>

        {/* Roles List */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-bold text-slate-200 uppercase tracking-wider">
              Required Crew Roles & Headcount <span className="text-rose-500">*</span>
            </label>
            <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              Total Crew: {currentDetails.totalCrewCount || 0} Staff
            </span>
          </div>

          {/* Quick preset chips */}
          <div className="flex flex-wrap gap-1.5 pb-2">
            <span className="text-xs text-slate-500 self-center mr-1">Add Preset:</span>
            {COMMON_ROLES.map((role) => (
              <button
                key={role}
                type="button"
                onClick={() => handleAddRole(role)}
                className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-emerald-300 hover:border-emerald-500/40 transition-colors flex items-center gap-1"
              >
                <Plus className="w-3 h-3" />
                {role}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {currentDetails.roles?.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center gap-3 justify-between"
              >
                <div className="flex-1 w-full sm:w-auto">
                  <input
                    type="text"
                    value={item.roleName}
                    onChange={(e) => handleRoleChange(idx, { roleName: e.target.value })}
                    placeholder="Role Title"
                    className="w-full px-3 py-1.5 rounded-lg glass-input text-xs font-semibold text-white"
                  />
                </div>

                <div className="flex items-center space-x-3 w-full sm:w-auto justify-between sm:justify-end">
                  <div className="flex items-center space-x-1.5">
                    <span className="text-xs text-slate-400">Headcount:</span>
                    <input
                      type="number"
                      min={1}
                      value={item.count}
                      onChange={(e) =>
                        handleRoleChange(idx, {
                          count: parseInt(e.target.value, 10) || 1,
                        })
                      }
                      className="w-16 px-2 py-1.5 rounded-lg glass-input text-xs text-center text-white"
                    />
                  </div>

                  <div className="flex items-center space-x-1.5">
                    <span className="text-xs text-slate-400">Skill:</span>
                    <select
                      value={item.skillLevel}
                      onChange={(e) =>
                        handleRoleChange(idx, {
                          skillLevel: e.target.value as any,
                        })
                      }
                      className="px-2 py-1.5 rounded-lg glass-input text-xs text-white bg-slate-900"
                    >
                      <option value="entry">Entry Level</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="lead">Lead / Specialist</option>
                    </select>
                  </div>

                  {currentDetails.roles.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveRole(idx)}
                      className="p-1.5 text-slate-500 hover:text-rose-400 transition-colors"
                      title="Remove Role"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => handleAddRole()}
            className="w-full py-2.5 rounded-xl border border-dashed border-slate-700 hover:border-emerald-500/50 text-xs font-semibold text-slate-300 hover:text-emerald-400 flex items-center justify-center gap-1.5 transition-colors"
          >
            <Plus className="w-4 h-4" /> Add Another Crew Role
          </button>
          {errors['crewDetails.roles'] && (
            <p className="text-xs text-rose-400 font-semibold">{errors['crewDetails.roles']}</p>
          )}
        </div>

        {/* Shift Timings */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-200 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-emerald-400" />
              Call Time (Reporting Time)
            </label>
            <input
              type="text"
              placeholder="e.g. 07:00 AM or 14:00"
              value={currentDetails.callTime || ''}
              onChange={(e) => updateCrewDetails({ callTime: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl glass-input text-sm text-white placeholder-slate-500"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-200 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-emerald-400" />
              Estimated Wrap / Load-Out Time
            </label>
            <input
              type="text"
              placeholder="e.g. 11:00 PM or 02:00 AM next day"
              value={currentDetails.wrapTime || ''}
              onChange={(e) => updateCrewDetails({ wrapTime: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl glass-input text-sm text-white placeholder-slate-500"
            />
          </div>
        </div>
      </div>
    );
  }

  // Step 3 (Gear, Uniform, Physical Requirements, Meals & Transport)
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Step 3 Header */}
      <div className="border-b border-slate-800 pb-5">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-2">
          Crew Requirement • Step 3 of 4
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2.5">
          <ShieldCheck className="w-6 h-6 text-emerald-400" />
          Gear Policy, Uniform & Working Conditions
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          Specify equipment responsibilities, dress code, meal/transport provisions, and on-site contact.
        </p>
      </div>

      {/* Gear Provision */}
      <div className="space-y-3">
        <label className="block text-sm font-bold text-slate-200 uppercase tracking-wider">
          Equipment & Tools Provision
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            { id: 'provided_on_site', label: 'Provided on Site', desc: 'All tools, rigging gear, and radios provided' },
            { id: 'bring_own', label: 'Crew Brings Own Gear', desc: 'Must bring personal tools, multimeters, harnesses' },
            { id: 'mixed', label: 'Mixed / Shared Tools', desc: 'Basic safety gear provided, bring personal toolsets' },
          ].map((gp) => (
            <div
              key={gp.id}
              onClick={() => updateCrewDetails({ gearProvision: gp.id as any })}
              className={`cursor-pointer rounded-2xl p-4 border transition-all ${
                currentDetails.gearProvision === gp.id
                  ? 'bg-emerald-950/70 border-emerald-500 shadow-md shadow-emerald-500/20 ring-1 ring-emerald-500'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <h4 className="text-sm font-bold text-white mb-1">{gp.label}</h4>
              <p className="text-xs text-slate-400 leading-relaxed">{gp.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Dress Code Selection */}
      <div className="space-y-3">
        <label className="block text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
          <Shirt className="w-4 h-4 text-emerald-400" />
          Uniform & Dress Code
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {DRESS_CODES.map((dc) => (
            <div
              key={dc.id}
              onClick={() => updateCrewDetails({ dressCode: dc.id as any })}
              className={`cursor-pointer rounded-2xl p-3.5 border transition-all ${
                currentDetails.dressCode === dc.id
                  ? 'bg-emerald-950/70 border-emerald-500 shadow-md shadow-emerald-500/20 ring-1 ring-emerald-500'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <h4 className="text-xs font-bold text-white mb-1">{dc.label}</h4>
              <p className="text-[11px] text-slate-400 leading-tight">{dc.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Physical Requirements */}
      <div className="space-y-3">
        <label className="block text-sm font-bold text-slate-200 uppercase tracking-wider">
          Physical & Safety Requirements
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {PHYSICAL_REQUIREMENTS.map((req) => {
            const isSelected = currentDetails.physicalRequirements?.includes(req);
            return (
              <div
                key={req}
                onClick={() => togglePhysicalRequirement(req)}
                className={`cursor-pointer p-3 rounded-xl border flex items-center space-x-3 transition-all ${
                  isSelected
                    ? 'bg-emerald-600/20 border-emerald-500/60 text-white font-medium'
                    : 'bg-slate-900/50 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded flex items-center justify-center text-[10px] border ${
                    isSelected
                      ? 'bg-emerald-600 border-emerald-500 text-white'
                      : 'border-slate-700 bg-slate-800'
                  }`}
                >
                  {isSelected && '✓'}
                </div>
                <span className="text-xs">{req}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Meals & Transport Provisions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
          <div>
            <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
              <Utensils className="w-4 h-4 text-amber-400" />
              Meals / Refreshments Provided
            </h4>
            <p className="text-xs text-slate-400">Crew meals & water bottles available on-site</p>
          </div>
          <input
            type="checkbox"
            checked={currentDetails.mealsProvided}
            onChange={(e) => updateCrewDetails({ mealsProvided: e.target.checked })}
            className="w-5 h-5 rounded text-emerald-600 bg-slate-800 border-slate-700"
          />
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
          <div>
            <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-indigo-400" />
              Local Travel / Transport Covered
            </h4>
            <p className="text-xs text-slate-400">Shuttle or travel reimbursement provided</p>
          </div>
          <input
            type="checkbox"
            checked={currentDetails.transportProvided}
            onChange={(e) => updateCrewDetails({ transportProvided: e.target.checked })}
            className="w-5 h-5 rounded text-emerald-600 bg-slate-800 border-slate-700"
          />
        </div>
      </div>

      {/* On-Site Lead / Supervisor Contact */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-slate-200 flex items-center gap-1.5">
          <PhoneCall className="w-4 h-4 text-emerald-400" />
          On-Site Production Supervisor / Reporting Lead
        </label>
        <input
          type="text"
          placeholder="e.g. Rahul Verma (+91 98765 00000) - Technical Director"
          value={currentDetails.onSiteLeadContact || ''}
          onChange={(e) => updateCrewDetails({ onSiteLeadContact: e.target.value })}
          className="w-full px-4 py-2.5 rounded-xl glass-input text-sm text-white placeholder-slate-500"
        />
      </div>
    </div>
  );
}
