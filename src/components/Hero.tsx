import React, { useState, useEffect, useRef } from 'react';
import { ArrowDown, Download, Github, Linkedin, Upload, Trash2, Camera, ExternalLink, Check, RefreshCw } from 'lucide-react';
import { PROFILE } from '../data/portfolioData';
import { getStoredPhoto, saveStoredPhoto, deleteStoredPhoto, downloadResumeFile } from '../utils/resumeStorage';

interface HeroProps {
  onOpenResumeManager: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResumeManager }) => {
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const saved = getStoredPhoto();
    if (saved) {
      setPhotoUrl(saved);
    }
  }, []);

  const showNotification = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      showNotification('Please select a valid image file (PNG, JPG, WEBP).');
      return;
    }

    // Limit size to 5MB
    if (file.size > 5 * 1024 * 1024) {
      showNotification('Image size exceeds 5MB limit. Please choose a smaller file.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        saveStoredPhoto(result);
        setPhotoUrl(result);
        showNotification('Profile photo updated successfully!');
      }
    };
    reader.readAsDataURL(file);

    // Reset input so re-selecting same file works
    e.target.value = '';
  };

  const handleRemovePhoto = () => {
    deleteStoredPhoto();
    setPhotoUrl(null);
    showNotification('Custom photo removed. Placeholder restored.');
  };

  return (
    <section id="home" className="relative pt-28 pb-16 md:pt-36 md:pb-24 border-b border-[#2C363B] overflow-hidden">
      {/* Colorful Tech Illustration Backdrop (Strictly behind all content with z-0) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0" aria-hidden="true">
        <img
          src="/src/assets/images/hero_abstract_backdrop_1791797900867.jpg"
          alt=""
          className="w-full h-full object-cover object-right-top opacity-30 mix-blend-screen scale-105"
        />
        {/* Soft background scrims strictly behind content */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#121619]/90 via-[#121619]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121619] via-transparent to-[#121619]/60" />
        
        {/* Radiant colorful blur blooms */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full ambient-glow-teal opacity-70 blur-3xl" />
        <div className="absolute -top-12 left-1/3 w-80 h-80 rounded-full ambient-glow-purple opacity-65 blur-3xl" />
      </div>

      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#202629] text-white border border-[#57DCC1] px-4 py-2.5 rounded-lg shadow-2xl text-xs sm:text-sm flex items-center gap-2 animate-fade-in">
          <Check className="w-4 h-4 text-[#57DCC1]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Hidden file input for photo upload */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handlePhotoSelect}
        accept="image/png,image/jpeg,image/webp,image/jpg"
        className="hidden"
        aria-label="Upload personal photo"
      />

      {/* Hero Content Container - Explicitly elevated with relative z-10 */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Introduction & CTAs */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Context kicker */}
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#57DCC1] font-bold mb-4">
              <span>Hyderabad, India</span>
              <span aria-hidden="true" className="text-slate-400">·</span>
              <span>Class of 2026 (CGPA 7.79)</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-[1.15] mb-4 text-balance drop-shadow-sm">
              {PROFILE.headline}
            </h1>

            {/* Sub-headline / Identity */}
            <p className="text-lg sm:text-xl font-bold text-[#57DCC1] mb-4">
              {PROFILE.name} — {PROFILE.role}
            </p>

            {/* Supporting Text */}
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed mb-8 max-w-2xl font-normal">
              {PROFILE.heroSummary}
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 mb-8">
              <a
                href="#projects"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-bold text-[#121619] bg-[#57DCC1] rounded-lg hover:bg-[#48c9ae] active:bg-[#3dbda3] transition-all shadow-lg shadow-[#57DCC1]/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#57DCC1]"
              >
                <span>Explore Projects</span>
                <ArrowDown className="w-4 h-4" />
              </a>

              <button
                type="button"
                onClick={downloadResumeFile}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-[#202629] border border-[#57DCC1]/50 rounded-lg hover:border-[#57DCC1] hover:text-[#57DCC1] transition-all shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#57DCC1]"
              >
                <Download className="w-4 h-4 text-[#57DCC1]" />
                <span>Download Resume</span>
              </button>

              <button
                type="button"
                onClick={onOpenResumeManager}
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-300 hover:text-[#57DCC1] hover:bg-[#202629] rounded-lg transition-colors border border-dashed border-slate-600"
                title="Upload or manage your custom resume file"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Manage Resume File</span>
              </button>

              <a
                href="/bandela_saibabu_portfolio.zip"
                download="bandela_saibabu_portfolio.zip"
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium text-[#57DCC1] hover:bg-[#57DCC1]/10 rounded-lg transition-colors border border-[#57DCC1]/40"
                title="Download full project folder with all source code as .zip"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Project (.ZIP)</span>
              </a>
            </div>

            {/* Verified Links & Socials */}
            <div className="flex items-center gap-6 pt-6 border-t border-[#2C363B] text-sm text-slate-200">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Connect:</span>
              <a
                href={PROFILE.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-white hover:text-[#57DCC1] transition-colors font-medium"
                aria-label="Bandela Saibabu GitHub Profile"
              >
                <Github className="w-4 h-4 text-[#57DCC1]" />
                <span>GitHub</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>

              <a
                href={PROFILE.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-white hover:text-[#57DCC1] transition-colors font-medium"
                aria-label="Bandela Saibabu LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4 text-[#57DCC1]" />
                <span>LinkedIn</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
            </div>

            {/* Compact row of verified technical skills */}
            <div className="mt-6 flex flex-wrap items-center gap-2 text-xs text-slate-300">
              <span className="text-white font-semibold mr-1">Core Tech:</span>
              {PROFILE.verifiedCoreSkills.map((skill, index) => (
                <React.Fragment key={skill}>
                  <span className="text-white font-mono bg-[#202629] px-2.5 py-1 rounded border border-[#3A454B] shadow-sm">
                    {skill}
                  </span>
                  {index < PROFILE.verifiedCoreSkills.length - 1 && (
                    <span className="text-slate-500" aria-hidden="true">/</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Right Column: Professional Photograph / Authenticated Placeholder Container */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="w-full max-w-sm bg-[#202629] rounded-2xl border border-[#2C363B] p-5 shadow-lg relative group">
              
              {/* Photo Viewport */}
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-[#15191C] border border-[#2C363B] flex flex-col items-center justify-center">
                {photoUrl ? (
                  <img
                    src={photoUrl}
                    alt="Bandela Saibabu - Professional Profile Photo"
                    className="w-full h-full object-cover object-center"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  /* Verified Initial & Technical Placeholder */
                  <div className="flex flex-col items-center justify-center p-6 text-center h-full w-full">
                    <div className="w-24 h-24 rounded-2xl bg-[#202629] border border-[#57DCC1]/30 flex items-center justify-center mb-4 text-[#57DCC1] shadow-inner">
                      <span className="text-3xl font-bold tracking-tight">BS</span>
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#57DCC1] mb-1">
                      Bandela Saibabu
                    </span>
                    <span className="text-xs text-[#C2CBCE] mb-2 font-mono">
                      B.Tech CSE - AI (2026)
                    </span>
                    <div className="text-[11px] text-[#C2CBCE]/70 bg-[#15191C] px-3 py-1.5 rounded border border-[#2C363B] max-w-[240px]">
                      Professional Photo Placeholder
                    </div>
                  </div>
                )}

                {/* Overlay Action Buttons on Hover */}
                <div className="absolute inset-0 bg-[#15191C]/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-4">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-[#15191C] bg-[#57DCC1] rounded-lg hover:bg-[#48c9ae] shadow-md transition-transform active:scale-95"
                  >
                    {photoUrl ? <RefreshCw className="w-3.5 h-3.5" /> : <Camera className="w-3.5 h-3.5" />}
                    <span>{photoUrl ? 'Replace Photo' : 'Upload My Photo'}</span>
                  </button>

                  {photoUrl && (
                    <button
                      type="button"
                      onClick={handleRemovePhoto}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-rose-400 bg-[#202629] border border-rose-900/50 rounded-lg hover:bg-rose-950/40 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete Photo</span>
                    </button>
                  )}
                  <p className="text-[10px] text-[#C2CBCE] text-center mt-1">
                    Upload PNG, JPG, or WEBP (Max 5MB)
                  </p>
                </div>
              </div>

              {/* Bottom Card Bar with explicit controls for accessibility & mobile */}
              <div className="mt-4 pt-3 border-t border-[#2C363B] flex items-center justify-between text-xs">
                <span className="text-[#C2CBCE] flex items-center gap-1.5">
                  <Camera className="w-3.5 h-3.5 text-[#57DCC1]" />
                  <span>{photoUrl ? 'Custom Photo Active' : 'Profile Photo'}</span>
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="text-[#57DCC1] hover:underline font-medium cursor-pointer"
                  >
                    {photoUrl ? 'Replace' : 'Upload'}
                  </button>
                  {photoUrl && (
                    <>
                      <span className="text-[#2C363B]">·</span>
                      <button
                        type="button"
                        onClick={handleRemovePhoto}
                        className="text-rose-400 hover:underline cursor-pointer"
                      >
                        Remove
                      </button>
                    </>
                  )}
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Fact Sheet Key Metrics Row with colorful gradients */}
        <div className="mt-14 pt-8 border-t border-[#2C363B] grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          <div className="p-3.5 bg-gradient-to-br from-[#202629] to-[#1a2327] rounded-xl border border-[#3A454B] hover:border-cyan-400/50 transition-colors shadow-md">
            <div className="text-xl sm:text-2xl font-bold font-mono text-white tabular-nums">2026</div>
            <div className="text-xs text-slate-300 mt-0.5">B.Tech Graduation</div>
          </div>
          <div className="p-3.5 bg-gradient-to-br from-[#202629] via-[#1a2528] to-[#162725] rounded-xl border border-[#57DCC1]/40 hover:border-[#57DCC1] transition-colors shadow-md">
            <div className="text-xl sm:text-2xl font-bold font-mono text-[#57DCC1] tabular-nums">7.79</div>
            <div className="text-xs text-slate-300 mt-0.5">Cumulative CGPA</div>
          </div>
          <div className="p-3.5 bg-gradient-to-br from-[#202629] to-[#251e2b] rounded-xl border border-[#3A454B] hover:border-purple-400/50 transition-colors shadow-md">
            <div className="text-xl sm:text-2xl font-bold font-mono text-purple-300 tabular-nums">5 Repos</div>
            <div className="text-xs text-slate-300 mt-0.5">Verified Public Projects</div>
          </div>
          <div className="p-3.5 bg-gradient-to-br from-[#202629] to-[#192622] rounded-xl border border-[#3A454B] hover:border-emerald-400/50 transition-colors shadow-md">
            <div className="text-xl sm:text-2xl font-bold font-mono text-emerald-300">Hyderabad</div>
            <div className="text-xs text-slate-300 mt-0.5">Location (India)</div>
          </div>
        </div>

      </div>
    </section>
  );
};
