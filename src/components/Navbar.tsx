import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, FileText, Download } from 'lucide-react';
import { PROFILE } from '../data/portfolioData';

interface NavbarProps {
  onOpenResumeManager: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenResumeManager }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['home', 'about', 'skills', 'projects', 'education', 'contact'];
      const scrollPos = window.scrollY + 120;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home', id: 'home' },
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Skills', href: '#skills', id: 'skills' },
    { label: 'Projects', href: '#projects', id: 'projects' },
    { label: 'Education', href: '#education', id: 'education' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled
          ? 'bg-[#15191C]/95 backdrop-blur-md border-b border-[#2C363B] shadow-md'
          : 'bg-[#15191C]/80 backdrop-blur-sm border-b border-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-8">
          {/* Zone 1: Wordmark / Brand */}
          <a
            href="#home"
            className="text-base sm:text-lg font-bold tracking-tight text-[#F5F7F8] hover:text-[#57DCC1] transition-colors whitespace-nowrap shrink-0 flex items-center gap-2"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#57DCC1]" aria-hidden="true" />
            <span>{PROFILE.name}</span>
          </a>

          {/* Zone 2: Desktop Nav Links */}
          <nav
            className="hidden md:flex items-center gap-6 text-sm font-medium"
            aria-label="Main Navigation"
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  className={`transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 text-sm ${
                    isActive
                      ? 'text-[#57DCC1] border-[#57DCC1] font-semibold'
                      : 'text-[#C2CBCE] border-transparent hover:text-[#F5F7F8] hover:border-[#57DCC1]/40'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Primary Action & Mobile Menu Toggle */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <a
              href="/bandela_saibabu_portfolio.zip"
              download="bandela_saibabu_portfolio.zip"
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#57DCC1] bg-[#202629] border border-[#57DCC1]/40 rounded-md hover:bg-[#57DCC1]/10 hover:border-[#57DCC1] transition-colors whitespace-nowrap shadow-sm"
              title="Download entire project source code as a ZIP archive"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Project .ZIP</span>
            </a>

            <button
              onClick={onOpenResumeManager}
              type="button"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-[#15191C] bg-[#57DCC1] rounded-md hover:bg-[#48c9ae] active:bg-[#3dbda3] transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#57DCC1] focus-visible:ring-offset-2 focus-visible:ring-offset-[#15191C]"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Resume</span>
            </button>

            <a
              href="#contact"
              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-[#F5F7F8] border border-[#2C363B] rounded-md hover:border-[#57DCC1] hover:text-[#57DCC1] transition-colors whitespace-nowrap"
            >
              <span>Get in Touch</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            {/* Mobile hamburger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#C2CBCE] hover:text-[#F5F7F8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#57DCC1] rounded-md"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5 text-[#F5F7F8]" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#202629] border-b border-[#2C363B] px-4 pt-2 pb-6 space-y-1 shadow-xl">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-[#15191C] text-[#57DCC1] font-semibold'
                    : 'text-[#C2CBCE] hover:bg-[#15191C]/60 hover:text-[#F5F7F8]'
                }`}
              >
                {link.label}
              </a>
            );
          })}
          <div className="pt-3 border-t border-[#2C363B] flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResumeManager();
              }}
              type="button"
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-medium text-[#15191C] bg-[#57DCC1] rounded-md hover:bg-[#48c9ae] transition-colors"
            >
              <FileText className="w-4 h-4" />
              <span>Resume Options (Upload / Download)</span>
            </button>

            <a
              href="/bandela_saibabu_portfolio.zip"
              download="bandela_saibabu_portfolio.zip"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-[#57DCC1] bg-[#15191C] border border-[#57DCC1]/40 rounded-md hover:bg-[#57DCC1]/10 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Download Full Project (.ZIP)</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
