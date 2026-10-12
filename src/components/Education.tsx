import React from 'react';
import { GraduationCap, BookOpen, Award, CheckCircle } from 'lucide-react';
import { EDUCATION_DATA } from '../data/portfolioData';

export const Education: React.FC = () => {
  return (
    <section id="education" className="relative py-20 border-b border-[#2C363B] overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#57DCC1] mb-2">
            <span>Academic Background</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Education & Academic Credentials
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-2xl font-normal">
            Formal undergraduate degree, academic standing, and foundational computer science coursework.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Education Card */}
          <div className="lg:col-span-7 bg-gradient-to-b from-[#202629] via-[#1c2428] to-[#182024] rounded-2xl border border-[#2C363B] p-6 sm:p-8 shadow-xl">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-[#15191C] text-[#57DCC1] border border-[#2C363B] shrink-0">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-lg sm:text-xl font-bold text-[#F5F7F8]">
                    {EDUCATION_DATA.degree}
                  </h3>
                  <span className="text-xs font-mono bg-[#15191C] text-[#57DCC1] px-2.5 py-1 rounded border border-[#57DCC1]/30">
                    {EDUCATION_DATA.duration}
                  </span>
                </div>

                <p className="text-sm font-medium text-[#57DCC1] mt-1">
                  {EDUCATION_DATA.major}
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-[#C2CBCE]">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[#F5F7F8]">Status:</span>
                    <span>{EDUCATION_DATA.currentStatus}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[#F5F7F8]">Location:</span>
                    <span>{EDUCATION_DATA.location}</span>
                  </div>
                </div>

                {/* CGPA Highlight Box with Colorful Accent */}
                <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-[#15191C] via-[#142322] to-[#15191C] border border-[#57DCC1]/40 flex items-center justify-between shadow-inner">
                  <div>
                    <span className="text-xs text-[#C2CBCE] block">Cumulative Grade Point Average</span>
                    <span className="text-2xl font-bold font-mono text-[#57DCC1]">{EDUCATION_DATA.cgpa}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] text-[#C2CBCE]/70 block">Academic Standing</span>
                    <span className="text-xs font-semibold text-[#F5F7F8]">Consistently Good Track Record</span>
                  </div>
                </div>

                {/* Relevant Coursework */}
                <div className="mt-6 pt-6 border-t border-[#2C363B]">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#F5F7F8] mb-3">
                    <BookOpen className="w-3.5 h-3.5 text-[#57DCC1]" />
                    <span>Core Academic Coursework</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {EDUCATION_DATA.relevantCoursework.map((course) => (
                      <div key={course} className="flex items-center gap-2 text-xs text-[#C2CBCE]">
                        <CheckCircle className="w-3.5 h-3.5 text-[#57DCC1] shrink-0" />
                        <span>{course}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Certifications Verification Notice Card */}
          <div className="lg:col-span-5 bg-[#202629] rounded-2xl border border-[#2C363B] p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-xl bg-[#15191C] text-[#57DCC1] border border-[#2C363B]">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#F5F7F8]">
                    Certifications & Verification Policy
                  </h3>
                  <span className="text-xs text-[#C2CBCE]">Integrity & Verification</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#C2CBCE] leading-relaxed mb-4">
                In adherence to transparent recruiting standards, no hypothetical, unverified, or uncompleted credentials are shown on this portfolio.
              </p>

              <div className="space-y-3 text-xs text-[#C2CBCE] bg-[#15191C] p-4 rounded-xl border border-[#2C363B]">
                <div className="flex items-start gap-2">
                  <span className="text-[#57DCC1] font-bold">✓</span>
                  <span>B.Tech in CSE-AI enrollment & verified CGPA (7.79)</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#57DCC1] font-bold">✓</span>
                  <span>Five genuine public GitHub repositories with runnable code</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#57DCC1] font-bold">✓</span>
                  <span>Additional external certificates will be appended strictly following graduation or formal program completion</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#2C363B]">
              <span className="text-[11px] text-[#C2CBCE]/70 block">
                Academic transcripts and verification documents available upon recruiter request during formal interview stages.
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
