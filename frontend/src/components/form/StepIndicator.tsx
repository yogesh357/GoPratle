import React from 'react';
import { Check, Calendar, Settings, FileSpreadsheet, Send } from 'lucide-react';
import { CategoryType } from '@/lib/types';

interface StepIndicatorProps {
  currentStep: number;
  category: CategoryType;
  onStepClick?: (step: number) => void;
}

export default function StepIndicator({ currentStep, category, onStepClick }: StepIndicatorProps) {
  const getCategoryLabel = () => {
    switch (category) {
      case 'planner':
        return 'Planner Scope';
      case 'performer':
        return 'Talent & Rider';
      case 'crew':
        return 'Crew & Logistics';
      default:
        return 'Category Details';
    }
  };

  const steps = [
    {
      number: 1,
      title: 'Event Basics',
      subtitle: 'Name, Dates & Category',
      icon: Calendar,
    },
    {
      number: 2,
      title: 'Scope & Specs',
      subtitle: category === 'planner' ? 'Services & Guests' : category === 'performer' ? 'Performance & Genre' : 'Roles & Headcount',
      icon: Settings,
    },
    {
      number: 3,
      title: 'Logistics & Rider',
      subtitle: category === 'planner' ? 'Themes & Milestones' : category === 'performer' ? 'Audio & Stage Rider' : 'Gear & Dress Code',
      icon: FileSpreadsheet,
    },
    {
      number: 4,
      title: 'Review & Submit',
      subtitle: 'Contact Info & Publish',
      icon: Send,
    },
  ];

  return (
    <div className="w-full py-6">
      {/* Mobile Stepper Header */}
      <div className="sm:hidden mb-4 bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex items-center justify-between shadow-md">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center font-bold text-sm">
            {currentStep} / 4
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">{steps[currentStep - 1].title}</h3>
            <p className="text-xs text-slate-400">{steps[currentStep - 1].subtitle}</p>
          </div>
        </div>
        <div className="text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 capitalize">
          {category}
        </div>
      </div>

      {/* Desktop Stepper */}
      <div className="hidden sm:grid grid-cols-4 gap-4 relative">
        {steps.map((step, idx) => {
          const isCompleted = currentStep > step.number;
          const isCurrent = currentStep === step.number;
          const isAccessible = isCompleted || isCurrent;
          const StepIcon = step.icon;

          return (
            <div
              key={step.number}
              onClick={() => isAccessible && onStepClick && onStepClick(step.number)}
              className={`relative rounded-2xl p-4 transition-all duration-200 ${
                isAccessible ? 'cursor-pointer' : 'cursor-not-allowed opacity-60'
              } ${
                isCurrent
                  ? 'bg-gradient-to-b from-indigo-950/80 to-slate-900 border-2 border-indigo-500/80 shadow-lg shadow-indigo-500/15'
                  : isCompleted
                  ? 'bg-slate-900/60 border border-emerald-500/40 hover:bg-slate-900'
                  : 'bg-slate-900/30 border border-slate-800/80'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <span
                  className={`text-[11px] font-bold uppercase tracking-wider ${
                    isCurrent
                      ? 'text-indigo-400'
                      : isCompleted
                      ? 'text-emerald-400'
                      : 'text-slate-500'
                  }`}
                >
                  Step 0{step.number}
                </span>

                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold transition-all ${
                    isCompleted
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : isCurrent
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 ring-2 ring-indigo-400/30'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {isCompleted ? <Check className="w-4 h-4 text-emerald-400" /> : <StepIcon className="w-3.5 h-3.5" />}
                </div>
              </div>

              <h4 className="text-sm font-semibold text-white truncate">{step.title}</h4>
              <p className="text-xs text-slate-400 truncate mt-0.5">{step.subtitle}</p>

              {/* Step indicator bar */}
              <div className="mt-3 h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${
                    isCompleted
                      ? 'bg-emerald-500 w-full'
                      : isCurrent
                      ? 'bg-indigo-500 w-2/3'
                      : 'w-0'
                  }`}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
