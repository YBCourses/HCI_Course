import React from 'react';
import { X, CheckCircle2, Lock } from 'lucide-react';
import { COURSE_SESSIONS, SessionInfo } from '../../data/sessions';
import { UM6PLogo } from '../brand/UM6PLogo';

interface CurriculumModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentSessionId: number;
  onSelectSession?: (sessionId: number) => void;
  /** Is this session open to the viewer? */
  canOpen?: (sessionId: number) => boolean;
  teacher?: boolean;
}

export const CurriculumModal: React.FC<CurriculumModalProps> = ({
  isOpen,
  onClose,
  currentSessionId,
  onSelectSession,
  canOpen = (id) => id === 1 || id === 2,
  teacher = false,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
      <div className="bg-white border border-[#E8E2D9] rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#E8E2D9] flex items-center justify-between bg-[#FAF9F6]">
          <div className="flex items-center gap-3">
            <UM6PLogo variant="compact" theme="color" className="h-6" />
            <div className="h-4 w-[1px] bg-[#E8E2D9]" />
            <div>
              <h3 className="font-serif-display font-medium text-[#2D2D2E] text-lg">
                UM6P Human-Computer Interaction Curriculum
              </h3>
              <p className="text-xs text-[#6E6D70] font-mono">
                12 Sessions · Modular Academic Presentations
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#6E6D70] hover:text-[#2D2D2E] hover:bg-[#F5F2ED] rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sessions List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-3 bg-[#FAF9F6]/50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {COURSE_SESSIONS.map((session) => {
              const isActive = session.id === currentSessionId;
              const open = canOpen(session.id);
              return (
                <div
                  key={session.id}
                  onClick={() => {
                    if (open && onSelectSession) {
                      onSelectSession(session.id);
                      onClose();
                    }
                  }}
                  className={`p-5 rounded-xl border transition-all text-left ${
                    open ? 'cursor-pointer' : ''
                  } ${
                    isActive
                      ? 'bg-white border-2 border-[#E5391C] shadow-md ring-2 ring-[#E5391C]/10'
                      : open
                      ? 'bg-white border-[#E8E2D9] hover:border-[#E5391C] shadow-xs'
                      : 'bg-white border-[#E8E2D9] opacity-75 shadow-xs'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-bold text-[#E5391C] bg-[#FDF5F2] px-2 py-0.5 rounded border border-[#F0D5CB]">
                      {session.sessionNumber}
                    </span>

                    {isActive ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3" />
                        Active Presentation
                      </span>
                    ) : open ? (
                      <span className="text-[11px] font-mono text-[#6E6D70]">Open</span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-mono text-[#6E6D70]">
                        <Lock className="w-3 h-3" /> Not open yet
                      </span>
                    )}
                  </div>

                  <h4 className="font-serif-display font-bold text-[#2D2D2E] text-base leading-snug">
                    {session.title}
                  </h4>
                  <p className="text-xs text-[#E5391C] font-medium mt-0.5 mb-2">
                    {session.subtitle}
                  </p>
                  {(open || teacher) && (
                    <p className="text-xs text-[#525254] leading-relaxed">
                      {session.description}
                    </p>
                  )}

                  <div className="mt-3 pt-3 border-t border-[#F0EBE3] flex items-center justify-between text-[11px] font-mono text-[#6E6D70]">
                    <span>{session.durationHours} Hours</span>
                    <span>{session.actCount} Acts</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer info about GitHub Pages & Modular Pipeline */}
        <div className="px-6 py-4 border-t border-[#E8E2D9] bg-white flex items-center justify-between text-xs font-mono text-[#6E6D70]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>GitHub Pages Ready: Automated `.github/workflows/deploy.yml` configured</span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#E5391C] hover:bg-[#C92B10] text-white text-xs font-bold rounded-lg transition-colors shadow-xs cursor-pointer"
          >
            Continue Session 1 Presentation
          </button>
        </div>
      </div>
    </div>
  );
};
