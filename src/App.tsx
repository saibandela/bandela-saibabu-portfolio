/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Education } from './components/Education';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ResumeManagerModal } from './components/ResumeManagerModal';

export default function App() {
  const [isResumeManagerOpen, setIsResumeManagerOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#121619] text-[#F5F7F8] selection:bg-[#57DCC1]/25 selection:text-[#57DCC1] relative overflow-hidden">
      {/* Global Ambient Colorful Lighting Orbs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        {/* Subtle dot matrix grid */}
        <div className="absolute inset-0 bg-tech-grid opacity-60" />
        
        {/* Top-Right Luminous Teal Orb */}
        <div className="absolute -top-32 -right-32 w-[600px] h-[600px] ambient-glow-teal opacity-60 blur-3xl" />
        
        {/* Top-Left Ambient Violet Orb */}
        <div className="absolute top-48 -left-48 w-[650px] h-[650px] ambient-glow-purple opacity-45 blur-3xl" />
        
        {/* Mid-Screen Cyan Radiant Bloom */}
        <div className="absolute top-[45%] right-0 w-[700px] h-[700px] ambient-glow-cyan opacity-40 blur-3xl" />
        
        {/* Lower Screen Emerald & Teal Aurora */}
        <div className="absolute bottom-40 -left-32 w-[650px] h-[650px] ambient-glow-emerald opacity-35 blur-3xl" />
        
        {/* Bottom Contact Violet Bloom */}
        <div className="absolute -bottom-32 right-1/4 w-[550px] h-[550px] ambient-glow-purple opacity-40 blur-3xl" />
      </div>

      {/* Skip to Main Content link for keyboard accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 px-4 py-2 bg-[#57DCC1] text-[#15191C] font-semibold text-xs rounded-md shadow-lg"
      >
        Skip to main content
      </a>

      {/* Global Navigation */}
      <Navbar onOpenResumeManager={() => setIsResumeManagerOpen(true)} />

      {/* Main Content Sections */}
      <main id="main-content" tabIndex={-1} className="relative z-10 outline-none">
        <Hero onOpenResumeManager={() => setIsResumeManagerOpen(true)} />
        <About />
        <Skills />
        <Projects />
        <Education />
        <Contact />
      </main>

      {/* Site Footer */}
      <div className="relative z-10">
        <Footer />
      </div>

      {/* Interactive Resume Manager Modal */}
      <ResumeManagerModal
        isOpen={isResumeManagerOpen}
        onClose={() => setIsResumeManagerOpen(false)}
      />
    </div>
  );
}
