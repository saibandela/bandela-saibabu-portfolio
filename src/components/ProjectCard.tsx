import React from 'react';
import { Github, ExternalLink, CheckCircle2 } from 'lucide-react';
import { Project } from '../data/portfolioData';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  // Generate a thematic visual header preview matching the project domain
  const getDomainVisual = (id: string) => {
    switch (id) {
      case 'qualityhub':
        return (
          <div className="w-full h-40 bg-gradient-to-br from-[#1b2226] to-[#15191C] p-4 flex flex-col justify-between border-b border-[#2C363B] relative overflow-hidden font-mono text-[11px]">
            <div className="flex items-center justify-between text-[#C2CBCE]">
              <span className="text-[#57DCC1] font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#57DCC1]" />
                QualityHub // QA Suite
              </span>
              <span className="text-[10px] text-[#C2CBCE]/60">v1.0.0</span>
            </div>
            <div className="bg-[#202629]/90 rounded p-2.5 border border-[#2C363B] text-[10px] space-y-1 text-[#C2CBCE]">
              <div className="flex justify-between">
                <span>test_api_endpoints.py</span>
                <span className="text-[#57DCC1]">PASSED</span>
              </div>
              <div className="flex justify-between">
                <span>test_status_codes_and_payload.py</span>
                <span className="text-[#57DCC1]">PASSED</span>
              </div>
              <div className="flex justify-between">
                <span>test_schema_assertions.py</span>
                <span className="text-[#57DCC1]">PASSED</span>
              </div>
            </div>
            <div className="text-[10px] text-[#C2CBCE]/70 flex items-center justify-between">
              <span>Test Suite Coverage</span>
              <span>API & Schema Assertions</span>
            </div>
          </div>
        );
      case 'rest-api-project':
        return (
          <div className="w-full h-40 bg-gradient-to-br from-[#1b2226] to-[#15191C] p-4 flex flex-col justify-between border-b border-[#2C363B] relative overflow-hidden font-mono text-[11px]">
            <div className="flex items-center justify-between text-[#C2CBCE]">
              <span className="text-[#57DCC1] font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#57DCC1]" />
                Python REST API
              </span>
              <span className="text-[10px] text-[#C2CBCE]/60">HTTP/1.1</span>
            </div>
            <div className="bg-[#202629]/90 rounded p-2.5 border border-[#2C363B] text-[10px] space-y-1">
              <div className="text-emerald-400">GET /api/v1/resources → 200 OK</div>
              <div className="text-amber-300">POST /api/v1/resources → 201 Created</div>
              <div className="text-rose-400">DELETE /api/v1/resources/:id → 204 No Content</div>
            </div>
            <div className="text-[10px] text-[#C2CBCE]/70 flex items-center justify-between">
              <span>Payload: application/json</span>
              <span>Modular Routers</span>
            </div>
          </div>
        );
      case 'retail-data-pipeline':
        return (
          <div className="w-full h-40 bg-gradient-to-br from-[#1b2226] to-[#15191C] p-4 flex flex-col justify-between border-b border-[#2C363B] relative overflow-hidden font-mono text-[11px]">
            <div className="flex items-center justify-between text-[#C2CBCE]">
              <span className="text-[#57DCC1] font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#57DCC1]" />
                ETL Pipeline Engine
              </span>
              <span className="text-[10px] text-[#C2CBCE]/60">PostgreSQL</span>
            </div>
            <div className="bg-[#202629]/90 rounded p-2 border border-[#2C363B] text-[10px] space-y-1">
              <div className="text-[#C2CBCE] flex items-center justify-between">
                <span>[EXTRACT] Raw Retail Records</span>
                <span className="text-[#57DCC1]">100%</span>
              </div>
              <div className="text-[#C2CBCE] flex items-center justify-between">
                <span>[TRANSFORM] Data Normalization</span>
                <span className="text-[#57DCC1]">100%</span>
              </div>
              <div className="text-[#C2CBCE] flex items-center justify-between">
                <span>[LOAD] PostgreSQL Batch Ingest</span>
                <span className="text-[#57DCC1]">COMPLETED</span>
              </div>
            </div>
            <div className="text-[10px] text-[#C2CBCE]/70 flex items-center justify-between">
              <span>Storage: Relational Tables</span>
              <span>Referential Integrity</span>
            </div>
          </div>
        );
      case 'customer-churn-prediction':
        return (
          <div className="w-full h-40 bg-gradient-to-br from-[#1b2226] to-[#15191C] p-4 flex flex-col justify-between border-b border-[#2C363B] relative overflow-hidden font-mono text-[11px]">
            <div className="flex items-center justify-between text-[#C2CBCE]">
              <span className="text-[#57DCC1] font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#57DCC1]" />
                Customer Churn EDA
              </span>
              <span className="text-[10px] text-[#C2CBCE]/60">Pandas / NumPy</span>
            </div>
            <div className="bg-[#202629]/90 rounded p-2.5 border border-[#2C363B] text-[10px] space-y-1 text-[#C2CBCE]">
              <div className="flex justify-between">
                <span>Contract Type Analysis:</span>
                <span className="text-[#F5F7F8]">Month-to-Month Risk</span>
              </div>
              <div className="flex justify-between">
                <span>Feature Correlation:</span>
                <span className="text-[#F5F7F8]">Tenure & Charges</span>
              </div>
              <div className="flex justify-between">
                <span>Data Preprocessing:</span>
                <span className="text-[#57DCC1]">Encoded & Scaled</span>
              </div>
            </div>
            <div className="text-[10px] text-[#C2CBCE]/70 flex items-center justify-between">
              <span>EDA & Feature Insights</span>
              <span>Jupyter Workflow</span>
            </div>
          </div>
        );
      case 'chocolate-sales-dashboard':
        return (
          <div className="w-full h-40 bg-gradient-to-br from-[#1b2226] to-[#15191C] p-4 flex flex-col justify-between border-b border-[#2C363B] relative overflow-hidden font-mono text-[11px]">
            <div className="flex items-center justify-between text-[#C2CBCE]">
              <span className="text-[#57DCC1] font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#57DCC1]" />
                Power BI Sales Report
              </span>
              <span className="text-[10px] text-[#C2CBCE]/60">DAX Model</span>
            </div>
            <div className="bg-[#202629]/90 rounded p-2.5 border border-[#2C363B] text-[10px] space-y-1 text-[#C2CBCE]">
              <div className="flex justify-between">
                <span>Gross Profit Margin:</span>
                <span className="text-[#57DCC1]">Calculated DAX</span>
              </div>
              <div className="flex justify-between">
                <span>Cross-Filtering:</span>
                <span className="text-[#F5F7F8]">Geography & Products</span>
              </div>
              <div className="flex justify-between">
                <span>Visual Drill-Down:</span>
                <span className="text-[#F5F7F8]">Quarterly Trends</span>
              </div>
            </div>
            <div className="text-[10px] text-[#C2CBCE]/70 flex items-center justify-between">
              <span>Interactive Slicers</span>
              <span>Business Intelligence</span>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-[#202629] rounded-2xl border border-[#2C363B] overflow-hidden flex flex-col justify-between h-full hover:border-[#57DCC1]/50 transition-all group">
      
      {/* Top Preview Canvas */}
      <div>
        {getDomainVisual(project.id)}

        <div className="p-5 sm:p-6">
          {/* Category Tag & Status */}
          <div className="flex items-center justify-between text-xs mb-3 text-[#C2CBCE]">
            <span className="text-[#57DCC1] font-medium">{project.category}</span>
            <span className="text-[11px] text-[#C2CBCE]/70 font-mono">Verified Repository</span>
          </div>

          {/* Project Title */}
          <h3 className="text-lg font-bold text-[#F5F7F8] mb-2 group-hover:text-[#57DCC1] transition-colors">
            {project.title}
          </h3>

          {/* Short Description & Problem Solved */}
          <p className="text-xs sm:text-sm text-[#C2CBCE] leading-relaxed mb-4">
            {project.shortDescription}
          </p>

          <div className="mb-4 p-3 rounded-lg bg-[#15191C] border border-[#2C363B] text-xs">
            <span className="text-[#F5F7F8] font-semibold block mb-1">Problem Solved:</span>
            <span className="text-[#C2CBCE] leading-snug">{project.problemSolved}</span>
          </div>

          {/* Key Implementation Details */}
          <div className="space-y-1.5 mb-5 text-xs text-[#C2CBCE]">
            <span className="text-[#F5F7F8] font-semibold block mb-1">Key Implementation:</span>
            {project.implementationDetails.map((detail, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#57DCC1] shrink-0 mt-0.5" />
                <span>{detail}</span>
              </div>
            ))}
          </div>

          {/* Technology Tags */}
          <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[#2C363B]">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="text-[11px] font-mono text-[#C2CBCE] bg-[#15191C] px-2 py-0.5 rounded border border-[#2C363B]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Card Actions Footer */}
      <div className="p-5 sm:p-6 pt-0 mt-auto border-t border-[#2C363B]/60 flex items-center justify-between gap-3">
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-[#F5F7F8] bg-[#15191C] border border-[#2C363B] rounded-lg hover:border-[#57DCC1] hover:text-[#57DCC1] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#57DCC1]"
        >
          <Github className="w-3.5 h-3.5" />
          <span>View on GitHub</span>
          <ExternalLink className="w-3 h-3 text-[#C2CBCE]/60" />
        </a>

        {project.liveDemoUrl ? (
          <a
            href={project.liveDemoUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#15191C] bg-[#57DCC1] rounded-lg hover:bg-[#48c9ae] transition-colors"
          >
            <span>Live Demo</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        ) : (
          <span className="text-[11px] text-[#C2CBCE]/60 font-mono">
            Source Code Available
          </span>
        )}
      </div>

    </div>
  );
};
