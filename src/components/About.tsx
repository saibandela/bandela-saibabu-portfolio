import React from 'react';
import { GraduationCap, Code2, Database, ShieldCheck, Terminal, Compass } from 'lucide-react';
import { PROFILE, EDUCATION_DATA } from '../data/portfolioData';

export const About: React.FC = () => {
  const careerInterests = [
    { title: 'Python Development', icon: Code2, color: 'text-cyan-400', border: 'border-cyan-500/20 hover:border-cyan-400/50', desc: 'Writing clean, object-oriented code and backend services with Python.' },
    { title: 'Software Development', icon: Terminal, color: 'text-violet-400', border: 'border-violet-500/20 hover:border-violet-400/50', desc: 'Designing RESTful APIs, modular components, and maintainable services.' },
    { title: 'Data Analytics & Pipelines', icon: Database, color: 'text-emerald-400', border: 'border-emerald-500/20 hover:border-emerald-400/50', desc: 'Transforming datasets with Pandas, NumPy, SQL, and Power BI dashboards.' },
    { title: 'Quality Assurance (QA)', icon: ShieldCheck, color: 'text-amber-400', border: 'border-amber-500/20 hover:border-amber-400/50', desc: 'API endpoint validation, structured test cases, regression testing, and error diagnosis.' },
    { title: 'Technical Support', icon: Compass, color: 'text-sky-400', border: 'border-sky-500/20 hover:border-sky-400/50', desc: 'System troubleshooting, runtime debugging, and systematic problem solving.' }
  ];

  return (
    <section id="about" className="relative py-20 border-b border-[#2C363B] overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#57DCC1] mb-2">
            <span>Profile Overview</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            About Me
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-2xl font-normal">
            A grounded overview of my technical education, practical development focus, and engineering interests.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Main Narrative Paragraphs */}
          <div className="lg:col-span-7 space-y-5 text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
            {PROFILE.aboutText.map((paragraph, index) => (
              <p key={index} className="text-slate-200">
                {paragraph}
              </p>
            ))}

            <div className="pt-4 p-4 rounded-xl bg-gradient-to-r from-[#202629] via-[#1a2528] to-[#172228] border border-[#57DCC1]/30 shadow-md">
              <div className="flex items-start gap-3">
                <GraduationCap className="w-5 h-5 text-[#57DCC1] shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-bold text-white">
                    Academic Status & Degree
                  </h3>
                  <p className="text-xs text-slate-300 mt-1">
                    {EDUCATION_DATA.degree} in {EDUCATION_DATA.major} · Expected Graduation: {EDUCATION_DATA.duration} · Cumulative CGPA: <span className="font-mono text-[#57DCC1] font-bold">{EDUCATION_DATA.cgpa}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Career Focus & Verified Areas with Colorful Styling */}
          <div className="lg:col-span-5 bg-gradient-to-b from-[#202629] to-[#181e22] rounded-2xl border border-[#2C363B] p-6 shadow-md">
            <h3 className="text-base font-semibold text-[#F5F7F8] mb-1">
              Target Career Pathways
            </h3>
            <p className="text-xs text-[#C2CBCE] mb-5">
              Disciplines where I apply my current hands-on project experience and coursework.
            </p>

            <div className="space-y-3.5">
              {careerInterests.map((interest) => {
                const IconComponent = interest.icon;
                return (
                  <div
                    key={interest.title}
                    className={`flex items-start gap-3.5 p-3 rounded-lg bg-[#15191C] border ${interest.border} transition-all shadow-sm group`}
                  >
                    <div className={`p-2 rounded-md bg-[#202629] ${interest.color} shrink-0 border border-[#2C363B] group-hover:scale-105 transition-transform`}>
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-[#F5F7F8]">
                        {interest.title}
                      </h4>
                      <p className="text-xs text-[#C2CBCE] mt-0.5 leading-snug">
                        {interest.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 pt-4 border-t border-[#2C363B] flex items-center justify-between text-xs text-[#C2CBCE]">
              <span>Location:</span>
              <span className="text-[#57DCC1] font-semibold">{PROFILE.location}</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
