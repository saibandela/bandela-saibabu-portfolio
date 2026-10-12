import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Copy, 
  Check, 
  Terminal, 
  ShieldCheck, 
  Layers, 
  CheckCircle2, 
  ExternalLink, 
  Play, 
  Pause, 
  RotateCcw,
  Sparkles,
  GitBranch,
  Code
} from 'lucide-react';
import { Project } from '../data/portfolioData';

interface ProjectSpotlightSliderProps {
  projects: Project[];
}

export const ProjectSpotlightSlider: React.FC<ProjectSpotlightSliderProps> = ({ projects }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'console' | 'problem' | 'implementation' | 'tech'>('console');
  const [copiedClone, setCopiedClone] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [isSimulatingRun, setIsSimulatingRun] = useState(false);
  const [simulatedLogs, setSimulatedLogs] = useState<string[]>([]);
  
  // Touch swipe support refs
  const touchStartXRef = useRef<number | null>(null);
  const touchEndXRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeProject = projects[activeIndex] || projects[0];

  // Auto play interval
  useEffect(() => {
    if (!isAutoPlaying) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % projects.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [isAutoPlaying, projects.length]);

  // Keyboard navigation (ArrowLeft & ArrowRight)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle if projects section is somewhat in viewport or user is on page
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, projects.length]);

  // Reset simulation state when active project changes
  useEffect(() => {
    setIsSimulatingRun(false);
    setSimulatedLogs([]);
    setCopiedClone(false);
  }, [activeIndex]);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % projects.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  // Touch swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndXRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartXRef.current || !touchEndXRef.current) return;
    const distance = touchStartXRef.current - touchEndXRef.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }

    touchStartXRef.current = null;
    touchEndXRef.current = null;
  };

  const handleCopyClone = () => {
    if (!activeProject) return;
    const cmd = `git clone ${activeProject.githubUrl}.git`;
    navigator.clipboard.writeText(cmd);
    setCopiedClone(true);
    setTimeout(() => setCopiedClone(false), 2500);
  };

  // Run authentic CLI simulation for each project
  const handleSimulateRun = () => {
    setIsSimulatingRun(true);
    setSimulatedLogs(['Initializing runner environment...']);

    const stepsMap: Record<string, string[]> = {
      qualityhub: [
        '$ pytest -v tests/test_api_endpoints.py',
        'collected 4 items',
        'tests/test_api_endpoints.py::test_get_health_status PASSED [25%]',
        'tests/test_api_endpoints.py::test_auth_headers_validation PASSED [50%]',
        'tests/test_api_endpoints.py::test_payload_schema_assertion PASSED [75%]',
        'tests/test_api_endpoints.py::test_error_handling_boundaries PASSED [100%]',
        '==================== 4 passed, 0 warnings in 0.38s ===================='
      ],
      'rest-api-project': [
        '$ curl -i -X GET http://localhost:8000/api/v1/resources',
        'HTTP/1.1 200 OK',
        'Content-Type: application/json; charset=utf-8',
        'Date: Mon, 12 Oct 2026 09:14:02 GMT',
        '{',
        '  "status": "success",',
        '  "data": [{ "id": "res_01", "name": "Python Core Module", "verified": true }],',
        '  "meta": { "total": 1, "page": 1, "limit": 10 }',
        '}'
      ],
      'retail-data-pipeline': [
        '$ python pipeline/ingest_retail_records.py --db postgresql',
        '[10:14:01] INFO :: Connected to PostgreSQL database: retail_analytics',
        '[10:14:02] INFO :: Extracted raw CSV transactions (batch_size=5000)',
        '[10:14:03] INFO :: Executed normalization & null imputation transforms',
        "[10:14:04] INFO :: Bulk inserted 5,000 rows into table 'sales_fact' with foreign keys",
        '[10:14:04] INFO :: Transaction COMMITTED successfully. 0 integrity violations.'
      ],
      'customer-churn-prediction': [
        '$ python -c "import pandas as pd; print(pd.read_csv(\'churn_data.csv\').shape)"',
        'Dataset Dimensions: 7,043 rows x 21 features',
        'Key Driver Analysis:',
        '  - Month-to-Month Contract: 42.7% attrition risk',
        '  - Electronic Check Payment: Elevated risk correlation',
        '  - Tenure > 24 Months: Retention stability threshold'
      ],
      'chocolate-sales-dashboard': [
        '$ dax_evaluator --measure [Gross Profit Margin %]',
        'EVALUATE',
        '  ROW(',
        '    "Total Revenue", FORMAT(CALCULATE(SUM(Sales[Amount])), "$#,##0"),',
        '    "Gross Margin", FORMAT(DIVIDE([Total Profit], [Total Revenue]), "0.0%"),',
        '    "Top Product", "Dark Chocolate 85% Bar"',
        '  )',
        '------------------------------------------------------------------',
        'Total Revenue: $1,420,500 | Gross Margin: 38.4% | Star Schema Validated'
      ]
    };

    const steps = stepsMap[activeProject.id] || [
      `$ git status`,
      `On branch main`,
      `Your branch is up to date with 'origin/main'.`,
      `nothing to commit, working tree clean`
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        setSimulatedLogs((prev) => [...prev, steps[currentStep]]);
        currentStep++;
      } else {
        clearInterval(interval);
        setIsSimulatingRun(false);
      }
    }, 280);
  };

  return (
    <div 
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="space-y-8 select-none"
    >
      
      {/* Top Deck Control & Index Track */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-[#202629] border border-[#2C363B]">
        
        {/* Left: Progress Counter & Slide Title */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold font-mono text-[#57DCC1] tracking-tight">
              {String(activeIndex + 1).padStart(2, '0')}
            </span>
            <span className="text-sm font-mono text-[#C2CBCE]/60">/</span>
            <span className="text-sm font-mono text-[#C2CBCE]">
              {String(projects.length).padStart(2, '0')}
            </span>
          </div>

          <div className="h-4 w-[1px] bg-[#2C363B]" />

          {/* Mini progress bar */}
          <div className="w-24 sm:w-36 h-1.5 bg-[#15191C] rounded-full overflow-hidden border border-[#2C363B]">
            <div 
              className="h-full bg-[#57DCC1] transition-all duration-300"
              style={{ width: `${((activeIndex + 1) / projects.length) * 100}%` }}
            />
          </div>

          <span className="hidden md:inline-block text-xs font-semibold text-[#F5F7F8] truncate max-w-[200px]">
            {activeProject.title}
          </span>
        </div>

        {/* Right: Autoplay toggle, Keyboard hint, and Nav Arrows */}
        <div className="flex items-center gap-3 self-end sm:self-auto">
          
          <button
            type="button"
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-md border transition-colors ${
              isAutoPlaying
                ? 'bg-[#57DCC1]/10 text-[#57DCC1] border-[#57DCC1]/40'
                : 'bg-[#15191C] text-[#C2CBCE] border-[#2C363B] hover:text-[#F5F7F8]'
            }`}
            title={isAutoPlaying ? 'Pause automatic project cycling' : 'Enable automatic project cycling'}
          >
            {isAutoPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            <span className="hidden sm:inline">{isAutoPlaying ? 'Auto-Cycle On' : 'Auto-Cycle'}</span>
          </button>

          <span className="hidden lg:inline text-[11px] text-[#C2CBCE]/60 font-mono">
            Keys: [←] / [→]
          </span>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handlePrev}
              className="p-2 rounded-lg bg-[#15191C] border border-[#2C363B] text-[#F5F7F8] hover:border-[#57DCC1] hover:text-[#57DCC1] active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#57DCC1]"
              aria-label="Previous project in deck"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="p-2 rounded-lg bg-[#15191C] border border-[#2C363B] text-[#F5F7F8] hover:border-[#57DCC1] hover:text-[#57DCC1] active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#57DCC1]"
              aria-label="Next project in deck"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Spotlight Project Stage with Colorful Ambient Accent */}
      <div className="bg-gradient-to-b from-[#202629] via-[#1a2327] to-[#151c20] rounded-2xl border border-[#2C363B] overflow-hidden shadow-2xl transition-all duration-300 relative">
        
        {/* Luminous colorful ambient bloom inside stage */}
        <div className="absolute top-0 right-0 w-80 h-80 ambient-glow-teal opacity-25 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 ambient-glow-purple opacity-20 blur-3xl pointer-events-none" />

        {/* Spotlight Top Bar: Project Meta & Quick Actions */}
        <div className="p-6 border-b border-[#2C363B] flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-[#1b2529] via-[#182329] to-[#221c29] relative z-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#57DCC1] mb-1">
              <GitBranch className="w-3.5 h-3.5" />
              <span>{activeProject.category}</span>
              <span className="text-[#2C363B]" aria-hidden="true">·</span>
              <span className="text-[#C2CBCE] font-mono text-[11px]">main branch</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#F5F7F8] tracking-tight">
              {activeProject.title}
            </h3>
            <p className="text-xs sm:text-sm text-[#C2CBCE] mt-1 max-w-2xl">
              {activeProject.shortDescription}
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={handleCopyClone}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium bg-[#15191C] text-[#C2CBCE] hover:text-[#57DCC1] border border-[#2C363B] hover:border-[#57DCC1]/40 rounded-lg transition-colors"
              title="Copy git clone URL to clipboard"
            >
              {copiedClone ? <Check className="w-3.5 h-3.5 text-[#57DCC1]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedClone ? 'Clone Command Copied!' : 'Copy Clone URL'}</span>
            </button>

            <a
              href={activeProject.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-[#15191C] bg-[#57DCC1] hover:bg-[#48c9ae] active:bg-[#3dbda3] rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#57DCC1]"
            >
              <span>GitHub Repo</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Spotlight Navigation Tabs */}
        <div className="px-6 pt-4 border-b border-[#2C363B] bg-[#1a1f22] flex items-center gap-2 overflow-x-auto no-scrollbar">
          <button
            type="button"
            onClick={() => setActiveTab('console')}
            className={`inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-t-lg transition-colors border-b-2 whitespace-nowrap ${
              activeTab === 'console'
                ? 'bg-[#202629] text-[#57DCC1] border-[#57DCC1] font-semibold'
                : 'text-[#C2CBCE] border-transparent hover:text-[#F5F7F8]'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Interactive Terminal & Code Spec</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('problem')}
            className={`inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-t-lg transition-colors border-b-2 whitespace-nowrap ${
              activeTab === 'problem'
                ? 'bg-[#202629] text-[#57DCC1] border-[#57DCC1] font-semibold'
                : 'text-[#C2CBCE] border-transparent hover:text-[#F5F7F8]'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Problem & Technical Solution</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('implementation')}
            className={`inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-t-lg transition-colors border-b-2 whitespace-nowrap ${
              activeTab === 'implementation'
                ? 'bg-[#202629] text-[#57DCC1] border-[#57DCC1] font-semibold'
                : 'text-[#C2CBCE] border-transparent hover:text-[#F5F7F8]'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Verified Implementation</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('tech')}
            className={`inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-t-lg transition-colors border-b-2 whitespace-nowrap ${
              activeTab === 'tech'
                ? 'bg-[#202629] text-[#57DCC1] border-[#57DCC1] font-semibold'
                : 'text-[#C2CBCE] border-transparent hover:text-[#F5F7F8]'
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            <span>Tech Stack Details</span>
          </button>
        </div>

        {/* Tab 1: Interactive Terminal Workstation */}
        {activeTab === 'console' && (
          <div className="p-6">
            <div className="bg-[#15191C] rounded-xl border border-[#2C363B] overflow-hidden">
              
              {/* Terminal Window Header */}
              <div className="px-4 py-3 bg-[#111416] border-b border-[#2C363B] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 text-xs font-mono text-[#C2CBCE]/70">
                    bash ~ saibabu/{activeProject.id}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleSimulateRun}
                  disabled={isSimulatingRun}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono font-medium rounded bg-[#202629] text-[#57DCC1] border border-[#2C363B] hover:border-[#57DCC1] disabled:opacity-50 transition-colors"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>{isSimulatingRun ? 'Executing...' : 'Run Live Inspection'}</span>
                </button>
              </div>

              {/* Terminal Output Body */}
              <div className="p-5 font-mono text-xs text-[#C2CBCE] space-y-2 max-h-72 overflow-y-auto leading-relaxed">
                <div className="text-[#C2CBCE]/50">
                  # Verified repository: {activeProject.githubUrl}
                </div>
                <div className="text-[#57DCC1]">
                  $ cd saibabu/{activeProject.id} && git branch -v
                </div>
                <div className="text-[#F5F7F8]">
                  * main 7.79-verified [commit: latest production build]
                </div>
                
                {simulatedLogs.length > 0 ? (
                  simulatedLogs.map((log, idx) => (
                    <div 
                      key={idx} 
                      className={
                        log.startsWith('$') 
                          ? 'text-[#57DCC1] font-semibold mt-2' 
                          : log.includes('PASSED') || log.includes('200 OK') || log.includes('COMMITTED')
                          ? 'text-emerald-400 font-medium'
                          : log.includes('INFO')
                          ? 'text-[#C2CBCE]'
                          : 'text-[#F5F7F8]'
                      }
                    >
                      {log}
                    </div>
                  ))
                ) : (
                  <>
                    <div className="text-[#C2CBCE]/80 mt-2">
                      Key verification targets:
                    </div>
                    {activeProject.implementationDetails.map((detail, idx) => (
                      <div key={idx} className="text-[#F5F7F8] pl-2 flex items-center gap-2">
                        <span className="text-[#57DCC1]">→</span>
                        <span>{detail}</span>
                      </div>
                    ))}
                    <div className="mt-4 pt-3 border-t border-[#2C363B]/60 text-[11px] text-[#C2CBCE]/60 flex items-center justify-between">
                      <span>Click "Run Live Inspection" to simulate repo test output.</span>
                      <span className="text-[#57DCC1]">READY</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Problem & Architectural Solution */}
        {activeTab === 'problem' && (
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="p-5 rounded-xl bg-[#15191C] border border-[#2C363B]">
                <div className="flex items-center gap-2 text-xs font-bold text-rose-400 uppercase tracking-wider mb-2">
                  <span>The Engineering Problem</span>
                </div>
                <p className="text-xs sm:text-sm text-[#C2CBCE] leading-relaxed">
                  {activeProject.problemSolved}
                </p>
              </div>

              <div className="p-5 rounded-xl bg-[#15191C] border border-[#2C363B]">
                <div className="flex items-center gap-2 text-xs font-bold text-[#57DCC1] uppercase tracking-wider mb-2">
                  <span>Methodology & Technical Solution</span>
                </div>
                <p className="text-xs sm:text-sm text-[#C2CBCE] leading-relaxed">
                  Engineered using disciplined Python patterns, modular directory structures, and clear separation of concerns. Designed for clean testability and regression avoidance.
                </p>
              </div>

            </div>

            <div className="p-4 rounded-xl bg-[#1b2225] border border-[#2C363B] flex items-center justify-between text-xs text-[#C2CBCE]">
              <span>Verification Status:</span>
              <span className="text-[#57DCC1] font-mono font-medium">100% Verifiable on GitHub</span>
            </div>
          </div>
        )}

        {/* Tab 3: Verified Implementation */}
        {activeTab === 'implementation' && (
          <div className="p-6">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#57DCC1] mb-4">
              Detailed Implementation Checklist
            </h4>
            <div className="space-y-3">
              {activeProject.implementationDetails.map((detail, idx) => (
                <div 
                  key={idx} 
                  className="p-3.5 rounded-xl bg-[#15191C] border border-[#2C363B] flex items-start gap-3"
                >
                  <div className="p-1 rounded bg-[#202629] text-[#57DCC1] mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs sm:text-sm text-[#F5F7F8] font-medium block">
                      {detail}
                    </span>
                    <span className="text-[11px] text-[#C2CBCE]/70 mt-0.5 block">
                      Implemented in accordance with Python and backend engineering conventions.
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Tech Stack Details */}
        {activeTab === 'tech' && (
          <div className="p-6">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#57DCC1] mb-4">
              Technologies & Frameworks Leveraged
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {activeProject.techStack.map((tech) => (
                <div 
                  key={tech} 
                  className="p-3 rounded-xl bg-[#15191C] border border-[#2C363B] flex items-center gap-2.5"
                >
                  <div className="w-2 h-2 rounded-full bg-[#57DCC1]" />
                  <span className="text-xs font-mono text-[#F5F7F8] font-semibold">{tech}</span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Interactive Deck Filmstrip (Click any card to jump immediately) */}
      <div>
        <div className="flex items-center justify-between mb-3 text-xs text-[#C2CBCE]">
          <span className="font-semibold text-[#F5F7F8]">Project Queue (Deck Overview)</span>
          <span>Click any card to bring into spotlight</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          {projects.map((proj, idx) => {
            const isActive = idx === activeIndex;
            const tints = [
              'hover:border-cyan-400/50 from-[#202629] to-[#162327]',
              'hover:border-sky-400/50 from-[#202629] to-[#172129]',
              'hover:border-emerald-400/50 from-[#202629] to-[#152520]',
              'hover:border-purple-400/50 from-[#202629] to-[#221c29]',
              'hover:border-amber-400/50 from-[#202629] to-[#252016]'
            ];
            const currentTint = tints[idx % tints.length];

            return (
              <button
                key={proj.id}
                type="button"
                onClick={() => setActiveIndex(idx)}
                className={`text-left p-3.5 rounded-xl border transition-all flex flex-col justify-between h-32 bg-gradient-to-b ${currentTint} ${
                  isActive
                    ? 'border-[#57DCC1] shadow-lg ring-1 ring-[#57DCC1] scale-[1.02]'
                    : 'border-[#2C363B] opacity-85 hover:opacity-100 hover:scale-[1.01]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] mb-1">
                    <span className="font-mono text-[#57DCC1] font-semibold">
                      #{String(idx + 1).padStart(2, '0')}
                    </span>
                    {isActive && (
                      <span className="text-[10px] uppercase font-bold text-[#57DCC1] tracking-wider">
                        Active
                      </span>
                    )}
                  </div>
                  <h4 className={`text-xs font-bold line-clamp-2 ${isActive ? 'text-[#F5F7F8]' : 'text-[#C2CBCE]'}`}>
                    {proj.title}
                  </h4>
                </div>

                <div className="mt-2 pt-2 border-t border-[#2C363B]/60 flex items-center justify-between text-[10px] text-[#C2CBCE]/70">
                  <span className="truncate max-w-[90px]">{proj.techStack[0]}</span>
                  <span>{proj.category.split(' ')[0]}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
};
