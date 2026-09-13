'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  RotateCcw,
  Check,
  AlertCircle,
  Wand2,
} from 'lucide-react';
import StepIndicator from '@/components/form/StepIndicator';
import Step1Basics from '@/components/form/Step1Basics';
import Step2CategorySpecific from '@/components/form/Step2CategorySpecific';
import Step3CategorySpecific from '@/components/form/Step3CategorySpecific';
import Step4ReviewSubmit from '@/components/form/Step4ReviewSubmit';
import SuccessModal from '@/components/form/SuccessModal';
import { RequirementFormData, IRequirement, CategoryType } from '@/lib/types';
import { createRequirement } from '@/lib/api';

const INITIAL_FORM_DATA: RequirementFormData = {
  eventName: '',
  eventType: 'Corporate Conference',
  dateType: 'single',
  eventDate: '',
  startDate: '',
  endDate: '',
  location: {
    city: '',
    state: '',
    address: '',
    pincode: '',
  },
  venue: {
    name: '',
    venueType: 'indoor',
  },
  category: 'planner',
  plannerDetails: {
    planningType: 'full_planning',
    expectedGuestCount: 200,
    estimatedBudget: '$15,000 - $30,000',
    servicesNeeded: ['Decor & Theme Design', 'Catering & Menu Planning', 'Sound, Light & AV Production'],
    eventTheme: 'Modern Minimalist',
    venueStatus: 'need_assistance',
    vendorPreferences: 'Eco-friendly, local catering',
    specialInstructions: 'VIP guest protocol required',
  },
  performerDetails: {
    performerType: 'band_musician',
    customPerformerType: '',
    performanceDurationMinutes: 90,
    numberOfSets: 2,
    targetAudience: 'Young professionals (21-40)',
    preferredLanguages: ['English', 'Hindi'],
    performanceGenre: 'Indie Pop / Acoustic Rock',
    soundAudioRequired: true,
    soundSpecs: 'Digital mixer & 4 monitor mixes',
    stageDimensions: '24ft x 16ft',
    backlineEquipmentNeeded: ['Full Drum Kit (Pearl/DW)', 'Bass Amplifier (Ampeg/Fender)'],
    greenRoomRequired: true,
    rehearsalRequired: true,
    specificSongsOrRider: 'Original songs with 2 cover hits',
  },
  crewDetails: {
    roles: [
      { roleName: 'Audio / Sound Engineer', count: 2, skillLevel: 'lead' },
      { roleName: 'Stagehand & Rigging Tech', count: 4, skillLevel: 'intermediate' },
    ],
    callTime: '08:00 AM',
    wrapTime: '10:00 PM',
    totalCrewCount: 6,
    gearProvision: 'provided_on_site',
    dressCode: 'all_black',
    physicalRequirements: ['Heavy lifting (up to 20kg / 45lbs)', 'Comfortable standing for 6+ hours'],
    mealsProvided: true,
    transportProvided: true,
    onSiteLeadContact: 'Vikram (Production Head)',
  },
  contactInfo: {
    name: '',
    email: '',
    phone: '',
    organization: '',
  },
  additionalNotes: '',
  isUrgent: false,
};

const STORAGE_KEY = 'gopratle_requirement_draft_v1';

export default function PostRequirementPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<RequirementFormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [createdRequirement, setCreatedRequirement] = useState<IRequirement | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);

  // Restore draft from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setFormData((prev) => ({ ...prev, ...parsed }));
      }
    } catch (e) {
      console.warn('Failed to parse saved draft:', e);
    }
  }, []);

  // Save draft to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    } catch (e) {
      // ignore
    }
  }, [formData]);

  const updateFormData = (updates: Partial<RequirementFormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
    setErrors({});
  };

  // Step Validation Logic
  const validateStep = (stepNumber: number): boolean => {
    const errs: Record<string, string> = {};

    if (stepNumber === 1) {
      if (!formData.eventName || formData.eventName.trim().length < 2) {
        errs.eventName = 'Please enter an event name (minimum 2 characters)';
      }
      if (!formData.eventType || formData.eventType.trim().length < 1) {
        errs.eventType = 'Please select or specify an event type';
      }
      if (formData.dateType === 'single') {
        if (!formData.eventDate) {
          errs.eventDate = 'Please select the event date';
        }
      } else {
        if (!formData.startDate) errs.startDate = 'Please select start date';
        if (!formData.endDate) errs.endDate = 'Please select end date';
      }
      if (!formData.location.city || formData.location.city.trim().length < 1) {
        errs['location.city'] = 'City is required';
      }
      if (!formData.location.state || formData.location.state.trim().length < 1) {
        errs['location.state'] = 'State is required';
      }
      if (!formData.category) {
        errs.category = 'Please select a hiring category';
      }
    } else if (stepNumber === 2) {
      if (formData.category === 'planner') {
        if (!formData.plannerDetails?.expectedGuestCount || formData.plannerDetails.expectedGuestCount < 1) {
          errs['plannerDetails.expectedGuestCount'] = 'Expected guest count must be at least 1';
        }
        if (!formData.plannerDetails?.servicesNeeded || formData.plannerDetails.servicesNeeded.length === 0) {
          errs['plannerDetails.servicesNeeded'] = 'Select at least one planning service';
        }
      } else if (formData.category === 'performer') {
        if (!formData.performerDetails?.performanceDurationMinutes || formData.performerDetails.performanceDurationMinutes < 1) {
          errs['performerDetails.performanceDurationMinutes'] = 'Please enter valid performance duration';
        }
        if (!formData.performerDetails?.preferredLanguages || formData.performerDetails.preferredLanguages.length === 0) {
          errs['performerDetails.preferredLanguages'] = 'Select at least one preferred language';
        }
      } else if (formData.category === 'crew') {
        if (!formData.crewDetails?.roles || formData.crewDetails.roles.length === 0) {
          errs['crewDetails.roles'] = 'Specify at least one crew role';
        }
      }
    } else if (stepNumber === 4) {
      if (!formData.contactInfo.name || formData.contactInfo.name.trim().length < 2) {
        errs['contactInfo.name'] = 'Please enter your full name';
      }
      if (!formData.contactInfo.email || !formData.contactInfo.email.includes('@')) {
        errs['contactInfo.email'] = 'Please enter a valid email address';
      }
      if (!formData.contactInfo.phone || formData.contactInfo.phone.trim().length < 7) {
        errs['contactInfo.phone'] = 'Please enter a valid phone number';
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 4));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async () => {
    if (!validateStep(4)) return;

    setIsSubmitting(true);
    setErrors({});

    try {
      const result = await createRequirement(formData);
      if (result.success && result.data) {
        setCreatedRequirement(result.data);
        setShowSuccessModal(true);
        // Clear saved draft on success
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch (error: any) {
      setErrors({ submit: error.message || 'Failed to submit requirement to backend' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setFormData(INITIAL_FORM_DATA);
    setCurrentStep(1);
    setErrors({});
    localStorage.removeItem(STORAGE_KEY);
  };

  // Demo Presets to auto-fill realistic requirements instantly
  const loadPreset = (category: CategoryType) => {
    if (category === 'planner') {
      setFormData({
        eventName: 'Royal Heritage Wedding & Sangeet',
        eventType: 'Wedding & Reception',
        dateType: 'range',
        startDate: '2026-11-20',
        endDate: '2026-11-22',
        location: {
          city: 'Jaipur',
          state: 'Rajasthan',
          address: 'Amer Palace Road',
          pincode: '302001',
        },
        venue: {
          name: 'Fairmont Palace Hotel',
          venueType: 'hybrid',
        },
        category: 'planner',
        plannerDetails: {
          planningType: 'full_planning',
          expectedGuestCount: 450,
          estimatedBudget: '$30,000 - $60,000',
          servicesNeeded: [
            'Decor & Theme Design',
            'Catering & Menu Planning',
            'Venue Sourcing & Booking',
            'Artist & Talent Booking',
            'RSVP & Guest Hospitality',
          ],
          eventTheme: 'Royal Rajputana Floral Grandeur',
          venueStatus: 'booked',
          vendorPreferences: 'Premium luxury floral decor and bespoke Rajasthani hospitality',
          specialInstructions: 'VIP protocol and elephant entry permission needed',
          targetMilestoneDate: '2026-10-15',
        },
        contactInfo: {
          name: 'Meera Singhania',
          email: 'meera.s@singhaniagroup.com',
          phone: '+91 98111 22334',
          organization: 'Singhania Family Office',
        },
        additionalNotes: 'Require dedicated lead planner available for weekly check-ins.',
        isUrgent: true,
      });
    } else if (category === 'performer') {
      setFormData({
        eventName: 'Sunwaves Electronic Indie Music Fest',
        eventType: 'Music Concert / Festival',
        dateType: 'single',
        eventDate: '2026-10-12',
        location: {
          city: 'Goa',
          state: 'Goa',
          address: 'Vagator Beachfront',
          pincode: '403509',
        },
        venue: {
          name: 'HillTop Vagator Amphitheatre',
          venueType: 'outdoor',
        },
        category: 'performer',
        performerDetails: {
          performerType: 'dj',
          customPerformerType: 'Electronic Live Synth DJ',
          performanceDurationMinutes: 120,
          numberOfSets: 2,
          targetAudience: 'Music festival enthusiasts & young travelers (18-35)',
          preferredLanguages: ['English', 'Hindi'],
          performanceGenre: 'Deep House & Melodic Techno Fusion',
          soundAudioRequired: true,
          soundSpecs: 'Funktion-One Sound System with 4x stage wedges & DJM-A9 mixer',
          stageDimensions: '32ft x 20ft with visual LED wall',
          backlineEquipmentNeeded: ['DJ Console (Pioneer CDJ-3000 / DJM-900)', 'Wireless IEM (In-Ear Monitors)'],
          greenRoomRequired: true,
          rehearsalRequired: true,
          specificSongsOrRider: 'Sundown progressive set transitioning to high-energy peak time techno',
        },
        contactInfo: {
          name: 'Kabir Alvares',
          email: 'kabir@sunwavesfest.com',
          phone: '+91 99200 44556',
          organization: 'Sunwaves Festivals India',
        },
        additionalNotes: 'Artist hospitality rider includes airport pickup and beachfront stay.',
        isUrgent: false,
      });
    } else if (category === 'crew') {
      setFormData({
        eventName: 'Global AI Summit & Developer Expo 2026',
        eventType: 'Corporate Conference',
        dateType: 'range',
        startDate: '2026-12-05',
        endDate: '2026-12-07',
        location: {
          city: 'Bengaluru',
          state: 'Karnataka',
          address: 'BIEC Convention Grounds, Tumkur Road',
          pincode: '562123',
        },
        venue: {
          name: 'BIEC Exhibition Hall 4',
          venueType: 'indoor',
        },
        category: 'crew',
        crewDetails: {
          roles: [
            { roleName: 'Audio / Sound Engineer', count: 4, skillLevel: 'lead' },
            { roleName: 'Lighting & Visual Operator', count: 4, skillLevel: 'lead' },
            { roleName: 'Camera & Livestream Crew', count: 6, skillLevel: 'intermediate' },
            { roleName: 'Stagehand & Rigging Tech', count: 8, skillLevel: 'intermediate' },
            { roleName: 'Guest Registration & Ushers', count: 12, skillLevel: 'entry' },
          ],
          callTime: '06:30 AM',
          wrapTime: '09:30 PM',
          totalCrewCount: 34,
          gearProvision: 'provided_on_site',
          dressCode: 'all_black',
          physicalRequirements: ['Comfortable standing for 6+ hours', 'Heavy lifting (up to 20kg / 45lbs)'],
          mealsProvided: true,
          transportProvided: true,
          onSiteLeadContact: 'Rohan Deshmukh (+91 98450 11223) - Technical Ops Director',
        },
        contactInfo: {
          name: 'Priya Nambiar',
          email: 'priya.n@techsummit.io',
          phone: '+91 98450 11223',
          organization: 'Global Tech Summits Inc',
        },
        additionalNotes: 'All crew members must attend Day 0 briefing and complete badge verification.',
        isUrgent: true,
      });
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Top Bar with Demo Presets */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> 4-Step Requirement Posting Flow
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
            Post an Event Requirement
          </h1>
        </div>

        {/* Demo Preset Quick-Fill Buttons */}
        <div className="flex flex-wrap items-center gap-2 bg-slate-900/80 p-1.5 rounded-2xl border border-slate-800 text-xs">
          <span className="text-slate-400 text-[11px] font-semibold px-2 flex items-center gap-1">
            <Wand2 className="w-3 h-3 text-amber-400" /> Fill Demo:
          </span>
          <button
            type="button"
            onClick={() => loadPreset('planner')}
            className="px-2.5 py-1 rounded-xl bg-slate-800 hover:bg-indigo-600 hover:text-white text-slate-300 font-medium transition-colors"
          >
            💍 Planner
          </button>
          <button
            type="button"
            onClick={() => loadPreset('performer')}
            className="px-2.5 py-1 rounded-xl bg-slate-800 hover:bg-purple-600 hover:text-white text-slate-300 font-medium transition-colors"
          >
            🎧 Performer
          </button>
          <button
            type="button"
            onClick={() => loadPreset('crew')}
            className="px-2.5 py-1 rounded-xl bg-slate-800 hover:bg-emerald-600 hover:text-white text-slate-300 font-medium transition-colors"
          >
            🛠️ Crew
          </button>
          <button
            type="button"
            onClick={handleResetForm}
            className="p-1 rounded-xl hover:bg-slate-800 text-slate-500 hover:text-rose-400 transition-colors"
            title="Reset Form"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Stepper Progress Indicator */}
      <StepIndicator
        currentStep={currentStep}
        category={formData.category}
        onStepClick={(step) => {
          if (step < currentStep || validateStep(currentStep)) {
            setCurrentStep(step);
          }
        }}
      />

      {/* Form Container */}
      <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-slate-800/80 shadow-2xl mt-4">
        {currentStep === 1 && (
          <Step1Basics
            formData={formData}
            updateFormData={updateFormData}
            errors={errors}
          />
        )}

        {currentStep === 2 && (
          <Step2CategorySpecific
            formData={formData}
            updateFormData={updateFormData}
            errors={errors}
          />
        )}

        {currentStep === 3 && (
          <Step3CategorySpecific
            formData={formData}
            updateFormData={updateFormData}
            errors={errors}
          />
        )}

        {currentStep === 4 && (
          <Step4ReviewSubmit
            formData={formData}
            updateFormData={updateFormData}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            errors={errors}
            onEditStep={(step) => setCurrentStep(step)}
          />
        )}

        {/* Step Navigation Controls */}
        {currentStep < 4 && (
          <div className="flex items-center justify-between pt-8 mt-8 border-t border-slate-800">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={handlePrevStep}
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white font-semibold text-xs sm:text-sm border border-slate-800 flex items-center space-x-2 transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous Step</span>
              </button>
            ) : (
              <div />
            )}

            <button
              type="button"
              onClick={handleNextStep}
              className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm flex items-center space-x-2 shadow-lg shadow-indigo-600/30 hover:shadow-indigo-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all ml-auto"
            >
              <span>Continue to Step 0{currentStep + 1}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Success Modal */}
      <SuccessModal
        requirement={createdRequirement}
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        onResetForm={handleResetForm}
      />
    </div>
  );
}
