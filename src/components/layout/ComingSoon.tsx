import React from 'react';
import { UM6PLogo } from '../brand/UM6PLogo';

/**
 * Shown to students while no session is open: same look as the course title slide
 * (cream page, logo header, serif title, institutional footer).
 */
export const ComingSoon: React.FC = () => (
  <div className="fixed inset-0 z-[70] flex flex-col justify-between p-6 sm:p-10 lg:p-14 xl:p-16 bg-[#FAF9F6] overflow-hidden">
    <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#E5391C]/5 pointer-events-none blur-3xl" />
    <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-[#1F2421]/5 pointer-events-none blur-3xl" />

    <div className="flex items-center justify-between pb-6 border-b border-[#E8E2D9] flex-shrink-0 relative">
      <UM6PLogo variant="full" theme="color" className="h-10 lg:h-12" />
      <div className="text-right font-mono text-xs sm:text-sm text-[#6E6D70]">
        <span className="font-bold text-[#E5391C]">HCI MASTER COURSE</span>
      </div>
    </div>

    <div className="flex-1 flex flex-col justify-center w-full max-w-6xl xl:max-w-7xl space-y-6 lg:space-y-10 py-6 relative">
      <div className="inline-flex items-center gap-2 text-xs sm:text-sm lg:text-base font-mono uppercase tracking-widest text-[#E5391C] bg-[#FDF5F3] px-4 py-1.5 rounded-full border border-[#FAD6CF] font-bold self-start">
        <span className="w-2.5 h-2.5 rounded-full bg-[#E5391C]" />
        <span>Master Course · Human-Centered Systems</span>
      </div>

      <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-serif-display font-medium text-[#2D2D2E] tracking-tight leading-[1.05] text-balance">
        Coming soon
      </h1>

      <p className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-[#525254] font-light max-w-5xl leading-relaxed text-balance">
        The course content will be available here shortly.
      </p>
    </div>

    <div className="pt-6 border-t border-[#E8E2D9] flex items-center justify-between text-xs sm:text-sm lg:text-base text-[#6E6D70] font-mono flex-shrink-0 relative">
      <div>Mohammed VI Polytechnic University</div>
      <div className="font-semibold text-[#2D2D2E]">Prof. Yassine Ben-Aboud</div>
    </div>
  </div>
);
