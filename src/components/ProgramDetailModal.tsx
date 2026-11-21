import React from 'react';
import { X, CheckCircle2, FileText, Calendar, Users, ShieldAlert, ArrowRight, Clock, AlertCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import {
  evaluateCertificateQualification,
  evaluateResidentForProgram,
  isBarangayServiceApplicationItem
} from '../utils/eligibilityEngine';

export const ProgramDetailModal: React.FC = () => {
  const { 
    currentUser,
    disasterVictims,
    selectedProgramForDetail, 
    setSelectedProgramForDetail, 
    setSelectedProgramForApply 
  } = useApp();

  if (!selectedProgramForDetail) return null;

  const prog = selectedProgramForDetail;
  const isCert = isBarangayServiceApplicationItem(prog);
  const qual = currentUser
    ? isCert
      ? evaluateCertificateQualification(currentUser, prog.id)
      : evaluateResidentForProgram(currentUser, prog.id, prog.title, prog, { disasterVictims })
    : null;

  const handleStartApply = () => {
    setSelectedProgramForApply(prog);
    setSelectedProgramForDetail(null);
  };

  return (
    <div className="fixed inset-0 z-50 bg-gray-900/60 flex items-center justify-center p-4 backdrop-blur-xs overflow-y-auto animate-in fade-in">
      <div className="bg-white border border-gray-200 rounded-2xl shadow-2xl max-w-2xl w-full my-8 overflow-hidden relative">
        {/* Close Button */}
        <button
          onClick={() => setSelectedProgramForDetail(null)}
          className="absolute top-4 right-4 text-white bg-black/40 hover:bg-black/70 p-2 rounded-full transition-colors z-10 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Banner */}
        <div className="h-48 relative overflow-hidden bg-blue-900">
          <img
            src={prog.imageUrl}
            alt={prog.title}
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/assets/services/real_barangay_hall_1788172230992.jpg';
            }}
            className="w-full h-full object-cover opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent flex flex-col justify-end p-6 text-white">
            <p className="text-xs font-semibold text-emerald-300 mb-1">
              {prog.category} · {prog.badgeText || (isCert ? 'Certificate' : 'Assistance')}
            </p>
            <h2 className="text-2xl font-bold leading-tight tracking-tight text-white">
              {prog.title}
            </h2>
            {prog.maxBenefitAmount && (
              <p className="text-xs text-gray-200 mt-1">
                Benefit: <strong className="text-white font-semibold">{prog.maxBenefitAmount}</strong>
              </p>
            )}
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 max-h-[60vh] overflow-y-auto">
          {qual && (
            <div className={`p-3 rounded-xl border flex items-center gap-2 text-xs ${
              qual.isQualified
                ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                : 'bg-rose-50 border-rose-200 text-rose-900'
            }`}>
              {qual.isQualified ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 text-rose-700 shrink-0" />
              )}
              <span>
                <strong>{qual.isQualified ? 'Qualified' : 'Not Qualified'}</strong>
                {qual.shortReason ? ` · ${qual.shortReason}` : ''}
              </span>
            </div>
          )}

          {/* Overview */}
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            {prog.description}
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 bg-gray-50 border border-gray-200 rounded-xl text-xs">
            <div>
              <span className="text-gray-400 block text-[10px] uppercase font-bold">Deadline</span>
              <span className="font-semibold text-gray-800 flex items-center gap-1.5 mt-0.5">
                <Calendar className="w-3.5 h-3.5 text-[#0c532b]" /> {prog.deadline || 'Year-Round'}
              </span>
            </div>
            <div>
              <span className="text-gray-400 block text-[10px] uppercase font-bold">Target Group</span>
              <span className="font-semibold text-gray-800 flex items-center gap-1.5 mt-0.5">
                <Users className="w-3.5 h-3.5 text-[#0c532b]" /> {prog.targetAudience || 'Bugo Residents'}
              </span>
            </div>
            <div>
              <span className="text-gray-400 block text-[10px] uppercase font-bold">Processing</span>
              <span className="font-semibold text-gray-800 flex items-center gap-1.5 mt-0.5">
                <Clock className="w-3.5 h-3.5 text-[#0c532b]" /> {prog.processingTime || '1 - 3 Business Days'}
              </span>
            </div>
          </div>

          {/* Eligibility Criteria */}
          <div>
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-[#0c532b]" />
              <span>Who Qualifies</span>
            </h4>
            <ul className="space-y-1.5 text-xs text-gray-600">
              {prog.eligibilityCriteria.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Qualification Documents */}
          <div>
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-[#0c532b]" />
              <span>Qualification Documents</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {prog.requirements.map((req, idx) => (
                <div key={idx} className="p-2.5 bg-gray-50 border border-gray-200 rounded-lg flex items-start gap-2">
                  <span className="w-4 h-4 rounded bg-emerald-100 text-[#0c532b] flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="text-gray-800 font-medium">{req}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 bg-gray-50 border-t border-gray-200 flex items-center justify-between gap-4">
          <button
            onClick={() => setSelectedProgramForDetail(null)}
            className="px-4 py-2 text-xs font-bold text-gray-600 hover:text-gray-900 hover:bg-gray-200/60 rounded-lg transition-colors cursor-pointer"
          >
            Close
          </button>

          <button
            onClick={handleStartApply}
            className="bg-[#0c532b] hover:bg-[#094222] text-white text-xs font-bold px-5 py-2.5 rounded-lg transition-all flex items-center gap-2 shadow-xs cursor-pointer"
          >
            Apply Now <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
