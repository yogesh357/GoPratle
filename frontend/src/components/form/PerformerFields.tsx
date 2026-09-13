'use client';

import React from 'react';
import {
  Mic2,
  Clock,
  Layers,
  Languages,
  Music,
  Volume2,
  Sparkles,
  Radio,
  DoorOpen,
  CheckSquare,
} from 'lucide-react';
import { PerformerDetails, PerformerType } from '@/lib/types';

interface PerformerFieldsProps {
  step: 2 | 3;
  performerDetails?: PerformerDetails;
  updatePerformerDetails: (updates: Partial<PerformerDetails>) => void;
  errors: Record<string, string>;
}

const PERFORMER_TYPES: { id: PerformerType; label: string; icon: string }[] = [
  { id: 'band_musician', label: 'Band / Live Musician', icon: '🎸' },
  { id: 'dj', label: 'DJ / Electronic Producer', icon: '🎧' },
  { id: 'standup_comedian', label: 'Standup Comedian', icon: '🎙️' },
  { id: 'magician', label: 'Illusionist / Magician', icon: '🎩' },
  { id: 'dancer', label: 'Dance Troupe / Soloist', icon: '💃' },
  { id: 'emcee_host', label: 'Emcee / Event Host', icon: '🎤' },
  { id: 'other', label: 'Other Special Talent', icon: '✨' },
];

const AVAILABLE_LANGUAGES = ['English', 'Hindi', 'Punjabi', 'Tamil', 'Telugu', 'Kannada', 'Bengali', 'Marathi', 'Gujarati', 'Spanish'];

const COMMON_BACKLINE = [
  'Full Drum Kit (Pearl/DW)',
  'Bass Amplifier (Ampeg/Fender)',
  'Guitar Amplifier (Marshall/Vox)',
  'Keyboard Stand & Sustain Pedal',
  'Wireless IEM (In-Ear Monitors)',
  'Cordless Shure SM58 / Beta Microphones',
  'DJ Console (Pioneer CDJ-3000 / DJM-900)',
];

export default function PerformerFields({
  step,
  performerDetails,
  updatePerformerDetails,
  errors,
}: PerformerFieldsProps) {
  const currentDetails: PerformerDetails = performerDetails || {
    performerType: 'band_musician',
    customPerformerType: '',
    performanceDurationMinutes: 60,
    numberOfSets: 1,
    targetAudience: 'All ages (18-45)',
    preferredLanguages: ['English', 'Hindi'],
    performanceGenre: 'Bollywood & Pop Fusion',
    soundAudioRequired: true,
    soundSpecs: '',
    stageDimensions: '24ft x 16ft',
    backlineEquipmentNeeded: ['Full Drum Kit (Pearl/DW)', 'Guitar Amplifier (Marshall/Vox)'],
    greenRoomRequired: true,
    rehearsalRequired: false,
    specificSongsOrRider: '',
  };

  const toggleLanguage = (lang: string) => {
    const existing = currentDetails.preferredLanguages || [];
    const updated = existing.includes(lang)
      ? existing.filter((l) => l !== lang)
      : [...existing, lang];
    updatePerformerDetails({ preferredLanguages: updated });
  };

  const toggleBackline = (item: string) => {
    const existing = currentDetails.backlineEquipmentNeeded || [];
    const updated = existing.includes(item)
      ? existing.filter((i) => i !== item)
      : [...existing, item];
    updatePerformerDetails({ backlineEquipmentNeeded: updated });
  };

  if (step === 2) {
    return (
      <div className="space-y-8 animate-fade-in">
        {/* Step 2 Header */}
        <div className="border-b border-slate-800 pb-5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20 mb-2">
            Performer Requirement • Step 2 of 4
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2.5">
            <Mic2 className="w-6 h-6 text-purple-400" />
            Performance Type, Timing & Genre
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Specify the type of performer you need, set duration, languages, and performance vibes.
          </p>
        </div>

        {/* Performer Type Selection */}
        <div className="space-y-3">
          <label className="block text-sm font-bold text-slate-200 uppercase tracking-wider">
            Performer Category <span className="text-rose-500">*</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {PERFORMER_TYPES.map((pt) => (
              <div
                key={pt.id}
                onClick={() => updatePerformerDetails({ performerType: pt.id })}
                className={`cursor-pointer rounded-2xl p-4 border transition-all text-center ${
                  currentDetails.performerType === pt.id
                    ? 'bg-purple-950/70 border-purple-500 shadow-md shadow-purple-500/20 ring-1 ring-purple-500'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="text-2xl mb-1.5">{pt.icon}</div>
                <h4 className="text-xs font-bold text-white">{pt.label}</h4>
              </div>
            ))}
          </div>
        </div>

        {currentDetails.performerType === 'other' && (
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-200">
              Specify Talent Type <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Fire Artist, Mentalist, Aerial Acrobat, Live Painter"
              value={currentDetails.customPerformerType || ''}
              onChange={(e) => updatePerformerDetails({ customPerformerType: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl glass-input text-sm text-white placeholder-slate-500"
            />
          </div>
        )}

        {/* Duration & Sets */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-200 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-purple-400" />
              Total Performance Duration (Minutes) <span className="text-rose-500">*</span>
            </label>
            <input
              type="number"
              min={15}
              step={15}
              placeholder="e.g. 60, 90, 120"
              value={currentDetails.performanceDurationMinutes || ''}
              onChange={(e) =>
                updatePerformerDetails({
                  performanceDurationMinutes: parseInt(e.target.value, 10) || 0,
                })
              }
              className={`w-full px-4 py-2.5 rounded-xl glass-input text-sm text-white ${
                errors['performerDetails.performanceDurationMinutes']
                  ? 'border-rose-500 ring-1 ring-rose-500'
                  : ''
              }`}
            />
            {errors['performerDetails.performanceDurationMinutes'] && (
              <p className="text-xs text-rose-400">
                {errors['performerDetails.performanceDurationMinutes']}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-200 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-purple-400" />
              Number of Sets / Intervals
            </label>
            <select
              value={currentDetails.numberOfSets || 1}
              onChange={(e) =>
                updatePerformerDetails({
                  numberOfSets: parseInt(e.target.value, 10) || 1,
                })
              }
              className="w-full px-4 py-2.5 rounded-xl glass-input text-sm text-white bg-slate-900"
            >
              <option value={1}>1 Continuous Set</option>
              <option value={2}>2 Sets (with break)</option>
              <option value={3}>3 Sets</option>
              <option value={4}>4+ Sets</option>
            </select>
          </div>
        </div>

        {/* Music Genre & Audience Profile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-200 flex items-center gap-1.5">
              <Music className="w-4 h-4 text-pink-400" />
              Performance Genre / Style
            </label>
            <input
              type="text"
              placeholder="e.g. Pop Rock, Sufi Fusion, Bollywood Hits, Stand-up Clean Comedy"
              value={currentDetails.performanceGenre || ''}
              onChange={(e) => updatePerformerDetails({ performanceGenre: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl glass-input text-sm text-white placeholder-slate-500"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-200">
              Target Audience / Crowd Vibe
            </label>
            <input
              type="text"
              placeholder="e.g. College students, Corporate executives, Family wedding crowd"
              value={currentDetails.targetAudience || ''}
              onChange={(e) => updatePerformerDetails({ targetAudience: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl glass-input text-sm text-white placeholder-slate-500"
            />
          </div>
        </div>

        {/* Preferred Languages */}
        <div className="space-y-3">
          <label className="block text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
            <Languages className="w-4 h-4 text-purple-400" />
            Performance Language(s) <span className="text-rose-500">*</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {AVAILABLE_LANGUAGES.map((lang) => {
              const isSelected = currentDetails.preferredLanguages?.includes(lang);
              return (
                <button
                  key={lang}
                  type="button"
                  onClick={() => toggleLanguage(lang)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                    isSelected
                      ? 'bg-purple-600 text-white border-purple-500 shadow-sm'
                      : 'bg-slate-900/60 text-slate-300 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {isSelected ? `✓ ${lang}` : `+ ${lang}`}
                </button>
              );
            })}
          </div>
          {errors['performerDetails.preferredLanguages'] && (
            <p className="text-xs text-rose-400 font-semibold">
              {errors['performerDetails.preferredLanguages']}
            </p>
          )}
        </div>
      </div>
    );
  }

  // Step 3 (Technical & Hospitality Rider)
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Step 3 Header */}
      <div className="border-b border-slate-800 pb-5">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20 mb-2">
          Performer Requirement • Step 3 of 4
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2.5">
          <Volume2 className="w-6 h-6 text-purple-400" />
          Technical Rider, Stage & Hospitality
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          Specify audio setup, backline requirements, green room, and song/repertoire requests.
        </p>
      </div>

      {/* Audio & Sound System Toggle */}
      <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Radio className="w-4 h-4 text-purple-400" />
              Full PA / Sound System Provided by Organizer
            </h4>
            <p className="text-xs text-slate-400">
              Will you provide the venue PA, line array, and audio engineer?
            </p>
          </div>
          <input
            type="checkbox"
            checked={currentDetails.soundAudioRequired}
            onChange={(e) => updatePerformerDetails({ soundAudioRequired: e.target.checked })}
            className="w-5 h-5 rounded text-purple-600 bg-slate-800 border-slate-700 focus:ring-purple-500"
          />
        </div>

        {currentDetails.soundAudioRequired && (
          <div className="pt-2 border-t border-slate-800 space-y-1">
            <label className="text-xs text-slate-300">Sound / Mixing Console Details (Optional)</label>
            <input
              type="text"
              placeholder="e.g. Behringer X32 digital mixer, 4 monitor sends, wireless mics"
              value={currentDetails.soundSpecs || ''}
              onChange={(e) => updatePerformerDetails({ soundSpecs: e.target.value })}
              className="w-full px-3 py-2 rounded-xl glass-input text-xs text-white placeholder-slate-500"
            />
          </div>
        )}
      </div>

      {/* Backline Instruments Needed */}
      <div className="space-y-3">
        <label className="block text-sm font-bold text-slate-200 uppercase tracking-wider">
          Stage Backline Instruments Provided / Needed
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {COMMON_BACKLINE.map((item) => {
            const isSelected = currentDetails.backlineEquipmentNeeded?.includes(item);
            return (
              <div
                key={item}
                onClick={() => toggleBackline(item)}
                className={`cursor-pointer p-3 rounded-xl border flex items-center space-x-3 transition-all ${
                  isSelected
                    ? 'bg-purple-600/20 border-purple-500/60 text-white font-medium'
                    : 'bg-slate-900/50 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded flex items-center justify-center text-[10px] border ${
                    isSelected
                      ? 'bg-purple-600 border-purple-500 text-white'
                      : 'border-slate-700 bg-slate-800'
                  }`}
                >
                  {isSelected && '✓'}
                </div>
                <span className="text-xs">{item}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Stage Dimensions & Rehearsals */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-slate-200">
            Stage Dimensions / Space (Optional)
          </label>
          <input
            type="text"
            placeholder="e.g. 24ft x 16ft elevated stage"
            value={currentDetails.stageDimensions || ''}
            onChange={(e) => updatePerformerDetails({ stageDimensions: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl glass-input text-sm text-white placeholder-slate-500"
          />
        </div>

        <div className="space-y-3 pt-2">
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="greenRoom"
              checked={currentDetails.greenRoomRequired}
              onChange={(e) => updatePerformerDetails({ greenRoomRequired: e.target.checked })}
              className="w-4 h-4 rounded text-purple-600 bg-slate-800 border-slate-700"
            />
            <label htmlFor="greenRoom" className="text-xs font-semibold text-slate-200 cursor-pointer flex items-center gap-1.5">
              <DoorOpen className="w-3.5 h-3.5 text-purple-400" />
              Private Green Room / Dressing Room Required
            </label>
          </div>

          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="rehearsal"
              checked={currentDetails.rehearsalRequired}
              onChange={(e) => updatePerformerDetails({ rehearsalRequired: e.target.checked })}
              className="w-4 h-4 rounded text-purple-600 bg-slate-800 border-slate-700"
            />
            <label htmlFor="rehearsal" className="text-xs font-semibold text-slate-200 cursor-pointer flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-pink-400" />
              Pre-Event Sound Check / Rehearsal Required
            </label>
          </div>
        </div>
      </div>

      {/* Specific Songs or Rider Notes */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-slate-200">
          Specific Repertoire / Favorite Tracks / Custom Rider Notes
        </label>
        <textarea
          rows={3}
          placeholder="List any requested songs (e.g., bride & groom entrance song, company anthem, specific comedy themes)..."
          value={currentDetails.specificSongsOrRider || ''}
          onChange={(e) => updatePerformerDetails({ specificSongsOrRider: e.target.value })}
          className="w-full px-4 py-2.5 rounded-xl glass-input text-sm text-white placeholder-slate-500 resize-none"
        />
      </div>
    </div>
  );
}
