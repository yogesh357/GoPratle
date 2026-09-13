'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { CheckCircle, Copy, Check, ArrowRight, PlusCircle, LayoutGrid } from 'lucide-react';
import confetti from 'canvas-confetti';
import { IRequirement } from '@/lib/types';

interface SuccessModalProps {
  requirement: IRequirement | null;
  isOpen: boolean;
  onClose: () => void;
  onResetForm: () => void;
}

export default function SuccessModal({
  requirement,
  isOpen,
  onClose,
  onResetForm,
}: SuccessModalProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Trigger celebratory confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#6366f1', '#a855f7', '#ec4899', '#10b981'],
      });
    }
  }, [isOpen]);

  if (!isOpen || !requirement) return null;

  const handleCopyId = () => {
    navigator.clipboard.writeText(requirement._id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg rounded-3xl bg-gradient-to-b from-slate-900 to-slate-950 border border-indigo-500/40 p-6 sm:p-8 shadow-2xl shadow-indigo-500/20 text-center space-y-6">
        {/* Animated Check Icon */}
        <div className="mx-auto w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shadow-lg shadow-emerald-500/20">
          <CheckCircle className="w-9 h-9 text-emerald-400" />
        </div>

        <div>
          <span className="inline-block text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full uppercase tracking-wider mb-2">
            Successfully Saved
          </span>
          <h3 className="text-2xl font-black text-white tracking-tight">Requirement Published!</h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Your requirement for <span className="text-white font-semibold">{requirement.eventName}</span> is live.
          </p>
        </div>

        {/* Info Card */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 text-left space-y-3 text-xs">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <span className="text-slate-400">Category</span>
            <span className="font-bold text-white capitalize bg-indigo-500/20 text-indigo-300 px-2.5 py-0.5 rounded-full border border-indigo-500/30">
              {requirement.category}
            </span>
          </div>

          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <span className="text-slate-400">Location</span>
            <span className="font-semibold text-white">
              {requirement.location.city}, {requirement.location.state}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-400">Document ID</span>
            <div className="flex items-center space-x-2">
              <code className="font-mono text-indigo-300 bg-indigo-950/80 px-2 py-0.5 rounded border border-indigo-500/30 text-[11px]">
                {requirement._id}
              </code>
              <button
                type="button"
                onClick={handleCopyId}
                className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                title="Copy ID"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <Link
            href="/requirements"
            onClick={onClose}
            className="w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center space-x-2 transition-all shadow-md shadow-indigo-600/30"
          >
            <LayoutGrid className="w-4 h-4" />
            <span>View All Requirements</span>
          </Link>

          <button
            type="button"
            onClick={() => {
              onResetForm();
              onClose();
            }}
            className="w-full py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs flex items-center justify-center space-x-2 transition-all border border-slate-700"
          >
            <PlusCircle className="w-4 h-4 text-indigo-400" />
            <span>Post Another Requirement</span>
          </button>
        </div>
      </div>
    </div>
  );
}
