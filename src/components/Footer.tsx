import React from 'react';
import { ArrowUp, Github, Linkedin, Mail, Download } from 'lucide-react';
import { PROFILE } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-[#15191C] border-t border-[#2C363B] py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Identity & Copyright */}
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#57DCC1]" aria-hidden="true" />
              <span className="text-base font-bold text-[#F5F7F8]">{PROFILE.name}</span>
            </div>
            <p className="text-xs text-[#C2CBCE] mt-1">
              Python Developer · Software Engineering & QA · Hyderabad, India
            </p>
            <p className="text-[11px] text-[#C2CBCE]/60 mt-1">
              © {new Date().getFullYear()} {PROFILE.name}. All rights reserved.
            </p>
          </div>

          {/* Social Links & Back to Top */}
          <div className="flex items-center gap-6 text-xs text-[#C2CBCE]">
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-[#57DCC1] transition-colors"
              aria-label="GitHub Profile"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>

            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-[#57DCC1] transition-colors"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
              <span>LinkedIn</span>
            </a>

            <a
              href={`mailto:${PROFILE.email}`}
              className="inline-flex items-center gap-1.5 hover:text-[#57DCC1] transition-colors"
              aria-label="Send Email"
            >
              <Mail className="w-4 h-4" />
              <span>Email</span>
            </a>

            <a
              href="/bandela_saibabu_portfolio.zip"
              download="bandela_saibabu_portfolio.zip"
              className="inline-flex items-center gap-1.5 text-[#57DCC1] hover:underline transition-colors"
              title="Download complete project archive (.ZIP)"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Source .ZIP</span>
            </a>

            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#202629] text-[#F5F7F8] hover:text-[#57DCC1] border border-[#2C363B] hover:border-[#57DCC1]/40 transition-colors ml-2"
              aria-label="Scroll back to top of page"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </div>
    </footer>
  );
};
