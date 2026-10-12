import React, { useState } from 'react';
import { LayoutGrid, SlidersHorizontal, Github, Sparkles } from 'lucide-react';
import { PROJECTS, Project } from '../data/portfolioData';
import { ProjectCard } from './ProjectCard';
import { ProjectSpotlightSlider } from './ProjectSpotlightSlider';

export const Projects: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'slider' | 'grid'>('slider');

  const categories = ['All', 'Software Development', 'Quality Assurance', 'Data & Analytics'];

  const filteredProjects: Project[] = PROJECTS.filter((p) => {
    if (activeFilter === 'All') return true;
    return p.category === activeFilter;
  });

  return (
    <section id="projects" className="relative py-20 border-b border-[#2C363B] overflow-hidden">
      {/* Colorful Tech Art Subtle Backdrop */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none" aria-hidden="true">
        <img
          src="/src/assets/images/data_pipeline_tech_art_1791797927711.jpg"
          alt=""
          className="w-full h-full object-cover object-center opacity-15 mix-blend-screen scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#121619] via-[#121619]/90 to-[#121619]" />
        <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full ambient-glow-cyan opacity-40 blur-3xl" />
        <div className="absolute bottom-10 right-1/4 w-80 h-80 rounded-full ambient-glow-purple opacity-35 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#57DCC1] mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Verified Repositories & Workstation</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#F5F7F8]">
              Featured Projects
            </h2>
            <p className="text-sm sm:text-base text-[#C2CBCE] mt-2 max-w-xl">
              Authentic software, testing frameworks, and analytics pipelines hosted on GitHub with verified source code, live terminal inspection, and documentation.
            </p>
          </div>

          {/* View Mode Toggle Controls */}
          <div className="flex items-center gap-2 self-start md:self-auto bg-[#202629] p-1 rounded-lg border border-[#2C363B]">
            <button
              type="button"
              onClick={() => setViewMode('slider')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                viewMode === 'slider'
                  ? 'bg-[#15191C] text-[#57DCC1] shadow-sm font-semibold'
                  : 'text-[#C2CBCE] hover:text-[#F5F7F8]'
              }`}
              title="Interactive spotlight slider view"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Spotlight Slider</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                viewMode === 'grid'
                  ? 'bg-[#15191C] text-[#57DCC1] shadow-sm font-semibold'
                  : 'text-[#C2CBCE] hover:text-[#F5F7F8]'
              }`}
              title="Grid layout view"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Grid View</span>
            </button>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveFilter(category)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors border ${
                activeFilter === category
                  ? 'bg-[#57DCC1] text-[#15191C] border-[#57DCC1] font-semibold'
                  : 'bg-[#202629] text-[#C2CBCE] border-[#2C363B] hover:border-[#57DCC1]/40 hover:text-[#F5F7F8]'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Dynamic Project Display: Unique Spotlight Slider vs Classic Grid */}
        {viewMode === 'slider' ? (
          <ProjectSpotlightSlider projects={filteredProjects} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div key={project.id} className="h-full">
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        )}

        {/* GitHub Repositories Banner with Colorful Glow */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#1c2429] via-[#1a252a] to-[#241e2b] border border-[#2C363B] shadow-lg relative overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="absolute top-0 right-0 w-64 h-64 ambient-glow-teal opacity-20 blur-2xl pointer-events-none" />
          <div className="relative z-10">
            <h3 className="text-base font-bold text-[#F5F7F8]">
              More Code & Experiments on GitHub
            </h3>
            <p className="text-xs sm:text-sm text-[#C2CBCE] mt-0.5">
              Explore commit history, issue tracking, and code reviews directly on my profile.
            </p>
          </div>
          <a
            href="https://github.com/saibandela"
            target="_blank"
            rel="noreferrer"
            className="relative z-10 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-[#15191C] bg-[#57DCC1] rounded-lg hover:bg-[#48c9ae] active:bg-[#3dbda3] transition-colors shrink-0 shadow-sm"
          >
            <Github className="w-4 h-4" />
            <span>Visit @saibandela on GitHub</span>
          </a>
        </div>

      </div>
    </section>
  );
};

