import React from 'react';
import { Terminal, Database, Wrench, BarChart3, CheckSquare, LifeBuoy } from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/portfolioData';

export const Skills: React.FC = () => {
  const categoryStyles: Record<string, { icon: React.ElementType; color: string; borderHover: string; gradient: string }> = {
    'Programming': {
      icon: Terminal,
      color: 'text-cyan-400',
      borderHover: 'hover:border-cyan-400/50',
      gradient: 'from-[#202629] to-[#172228]'
    },
    'Databases': {
      icon: Database,
      color: 'text-[#57DCC1]',
      borderHover: 'hover:border-[#57DCC1]/50',
      gradient: 'from-[#202629] to-[#152523]'
    },
    'Development & Tools': {
      icon: Wrench,
      color: 'text-violet-400',
      borderHover: 'hover:border-violet-400/50',
      gradient: 'from-[#202629] to-[#221c29]'
    },
    'Data Analytics': {
      icon: BarChart3,
      color: 'text-amber-400',
      borderHover: 'hover:border-amber-400/50',
      gradient: 'from-[#202629] to-[#272118]'
    },
    'Quality Assurance': {
      icon: CheckSquare,
      color: 'text-emerald-400',
      borderHover: 'hover:border-emerald-400/50',
      gradient: 'from-[#202629] to-[#16251f]'
    },
    'Technical Support': {
      icon: LifeBuoy,
      color: 'text-sky-400',
      borderHover: 'hover:border-sky-400/50',
      gradient: 'from-[#202629] to-[#172129]'
    }
  };

  return (
    <section id="skills" className="relative py-20 border-b border-[#2C363B] overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#57DCC1] mb-2">
            <span>Core Competencies</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Technical Skills
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-2xl font-normal">
            Verified skills backed by practical projects, university coursework, and repository implementations. No arbitrary percentages or artificial ratings.
          </p>
        </div>

        {/* 6 Category Grid with Colorful Ambient Styling */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILL_CATEGORIES.map((category) => {
            const style = categoryStyles[category.title] || {
              icon: Terminal,
              color: 'text-[#57DCC1]',
              borderHover: 'hover:border-[#57DCC1]/40',
              gradient: 'from-[#202629] to-[#15191C]'
            };
            const IconComponent = style.icon;

            return (
              <div
                key={category.title}
                className={`bg-gradient-to-b ${style.gradient} rounded-xl border border-[#2C363B] p-5 flex flex-col justify-between ${style.borderHover} transition-all shadow-md group`}
              >
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`p-2.5 rounded-lg bg-[#15191C] ${style.color} border border-[#2C363B] group-hover:scale-105 transition-transform`}>
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-[#F5F7F8]">
                        {category.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-xs text-[#C2CBCE] mb-4 leading-relaxed">
                    {category.description}
                  </p>

                  <div className="space-y-3 pt-2 border-t border-[#2C363B]">
                    {category.skills.map((skill) => (
                      <div key={skill.name} className="text-xs">
                        <div className="flex items-center justify-between text-[#F5F7F8] font-medium mb-1">
                          <span className={`font-mono ${style.color}`}>{skill.name}</span>
                        </div>
                        <p className="text-[#C2CBCE] text-[11px] leading-snug">
                          {skill.context}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Recruiter Note */}
        <div className="mt-10 p-4 rounded-xl bg-[#202629]/60 border border-[#2C363B] flex items-center justify-between flex-wrap gap-3 text-xs text-[#C2CBCE]">
          <div>
            <span className="text-[#F5F7F8] font-semibold">Recruiter Note:</span> Every listed skill reflects practical hands-on application in code or university coursework rather than passive theoretical familiarity.
          </div>
          <a
            href="https://github.com/saibandela"
            target="_blank"
            rel="noreferrer"
            className="text-[#57DCC1] hover:underline font-medium shrink-0"
          >
            Review GitHub Commits →
          </a>
        </div>

      </div>
    </section>
  );
};
