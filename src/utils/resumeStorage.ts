import { PROFILE, SKILL_CATEGORIES, PROJECTS, EDUCATION_DATA } from '../data/portfolioData';

export interface StoredResume {
  fileName: string;
  fileSize: number;
  fileType: string;
  dataUrl: string;
  uploadedAt: string;
}

const RESUME_STORAGE_KEY = 'saibabu_uploaded_resume';
const PHOTO_STORAGE_KEY = 'saibabu_avatar_photo';

export const getStoredResume = (): StoredResume | null => {
  try {
    const raw = localStorage.getItem(RESUME_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    console.error('Error reading stored resume:', e);
    return null;
  }
};

export const saveStoredResume = (resume: StoredResume): void => {
  try {
    localStorage.setItem(RESUME_STORAGE_KEY, JSON.stringify(resume));
  } catch (e) {
    console.error('Error saving resume to localStorage:', e);
  }
};

export const deleteStoredResume = (): void => {
  try {
    localStorage.removeItem(RESUME_STORAGE_KEY);
  } catch (e) {
    console.error('Error deleting stored resume:', e);
  }
};

export const getStoredPhoto = (): string | null => {
  try {
    return localStorage.getItem(PHOTO_STORAGE_KEY);
  } catch (e) {
    console.error('Error reading stored photo:', e);
    return null;
  }
};

export const saveStoredPhoto = (dataUrl: string): void => {
  try {
    localStorage.setItem(PHOTO_STORAGE_KEY, dataUrl);
  } catch (e) {
    console.error('Error saving photo to localStorage:', e);
  }
};

export const deleteStoredPhoto = (): void => {
  try {
    localStorage.removeItem(PHOTO_STORAGE_KEY);
  } catch (e) {
    console.error('Error deleting stored photo:', e);
  }
};

/**
 * Generates a clean, factual, recruiter-ready textual resume for Bandela Saibabu
 * if a custom PDF/DOC file has not yet been uploaded.
 */
export const generateDefaultResumeContent = (): string => {
  return `================================================================================
                              BANDELA SAIBABU
================================================================================
Location: ${PROFILE.location}
Email: ${PROFILE.email}
LinkedIn: ${PROFILE.linkedin}
GitHub: ${PROFILE.github}
--------------------------------------------------------------------------------
PROFESSIONAL SUMMARY
--------------------------------------------------------------------------------
Computer Science undergraduate (Class of 2026, CGPA: ${PROFILE.education.cgpa}) specializing in Artificial
Intelligence, with an emphasis on Python software development, REST API design,
and relational databases. Experienced in end-to-end data pipelines, exploratory
data analytics, and systematic Quality Assurance (API testing, validation, and debugging).

--------------------------------------------------------------------------------
EDUCATION
--------------------------------------------------------------------------------
${EDUCATION_DATA.degree}
Field: ${EDUCATION_DATA.major}
Graduation Year: ${EDUCATION_DATA.duration}
CGPA: ${EDUCATION_DATA.cgpa}
Relevant Coursework:
${EDUCATION_DATA.relevantCoursework.map(c => `  - ${c}`).join('\n')}

--------------------------------------------------------------------------------
TECHNICAL SKILLS
--------------------------------------------------------------------------------
${SKILL_CATEGORIES.map(cat => `${cat.title.toUpperCase()}:
  ${cat.skills.map(s => `${s.name} (${s.context})`).join('\n  ')}`).join('\n\n')}

--------------------------------------------------------------------------------
FEATURED PROJECTS & VERIFIABLE CODE
--------------------------------------------------------------------------------
${PROJECTS.map((p, i) => `${i + 1}. ${p.title} [${p.category}]
   Repository: ${p.githubUrl}
   Problem Solved: ${p.problemSolved}
   Technologies: ${p.techStack.join(', ')}
   Key Implementation:
${p.implementationDetails.map(d => `     * ${d}`).join('\n')}`).join('\n\n')}

--------------------------------------------------------------------------------
CAREER INTERESTS
--------------------------------------------------------------------------------
- Python Software Development & Backend Services
- Data Engineering & Relational Database Architecture (PostgreSQL / SQL)
- Quality Assurance (API Validation, Test Cases & Debugging)
- Technical Support & Systems Troubleshooting
================================================================================
`;
};

/**
 * Downloads either the uploaded custom resume file or the formatted default resume.
 */
export const downloadResumeFile = (): void => {
  const uploaded = getStoredResume();
  if (uploaded) {
    const a = document.createElement('a');
    a.href = uploaded.dataUrl;
    a.download = uploaded.fileName || 'Bandela_Saibabu_Resume.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  } else {
    // Generate text/markdown file
    const content = generateDefaultResumeContent();
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Bandela_Saibabu_Resume.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
};
