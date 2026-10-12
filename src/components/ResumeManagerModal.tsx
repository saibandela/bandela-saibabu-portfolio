import React, { useState, useEffect, useRef } from 'react';
import { X, Upload, Download, Trash2, FileText, CheckCircle2, AlertCircle, RefreshCw, Eye } from 'lucide-react';
import { StoredResume, getStoredResume, saveStoredResume, deleteStoredResume, downloadResumeFile, generateDefaultResumeContent } from '../utils/resumeStorage';

interface ResumeManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeManagerModal: React.FC<ResumeManagerModalProps> = ({ isOpen, onClose }) => {
  const [storedResume, setStoredResume] = useState<StoredResume | null>(null);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setStoredResume(getStoredResume());
      setFeedback(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (max 8MB)
    if (file.size > 8 * 1024 * 1024) {
      setFeedback({ type: 'error', message: 'File exceeds 8MB limit. Please upload a smaller file.' });
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        const newResume: StoredResume = {
          fileName: file.name,
          fileSize: file.size,
          fileType: file.type || 'application/octet-stream',
          dataUrl: result,
          uploadedAt: new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })
        };

        saveStoredResume(newResume);
        setStoredResume(newResume);
        setFeedback({ type: 'success', message: `Successfully saved "${file.name}". Your portfolio will now serve this file for downloads.` });
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleDeleteResume = () => {
    deleteStoredResume();
    setStoredResume(null);
    setFeedback({ type: 'success', message: 'Custom resume deleted. Restored default verified resume format.' });
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#202629] border border-[#2C363B] w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-[#2C363B] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-[#15191C] text-[#57DCC1] border border-[#2C363B]">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#F5F7F8]">
                Resume Management
              </h3>
              <p className="text-xs text-[#C2CBCE]">
                Upload, replace, download, or delete your portfolio resume file
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#C2CBCE] hover:text-[#F5F7F8] hover:bg-[#15191C] transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Feedback banner */}
          {feedback && (
            <div
              className={`p-3.5 rounded-xl border text-xs flex items-start gap-2.5 ${
                feedback.type === 'success'
                  ? 'bg-emerald-950/40 border-emerald-800 text-emerald-300'
                  : 'bg-rose-950/40 border-rose-800 text-rose-300'
              }`}
            >
              {feedback.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              )}
              <span>{feedback.message}</span>
            </div>
          )}

          {/* Active Resume Status Card */}
          <div className="p-4 rounded-xl bg-[#15191C] border border-[#2C363B]">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#C2CBCE]/70 block mb-2">
              Current Active Resume
            </span>

            {storedResume ? (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-[#202629] text-[#57DCC1] border border-[#2C363B]">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#F5F7F8] break-all">
                      {storedResume.fileName}
                    </h4>
                    <p className="text-xs text-[#C2CBCE] mt-0.5">
                      {formatFileSize(storedResume.fileSize)} · Uploaded {storedResume.uploadedAt}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <button
                    type="button"
                    onClick={downloadResumeFile}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#15191C] bg-[#57DCC1] rounded-lg hover:bg-[#48c9ae] transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleDeleteResume}
                    className="p-1.5 text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 rounded-lg transition-colors"
                    title="Delete custom uploaded resume"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h4 className="text-sm font-bold text-[#F5F7F8]">
                    Default Verified Resume (Formatted Text / Plaintext)
                  </h4>
                  <p className="text-xs text-[#C2CBCE] mt-0.5">
                    Pre-configured with Bandela Saibabu's verified education, CGPA (7.79), skills, and 5 projects.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={downloadResumeFile}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#15191C] bg-[#57DCC1] rounded-lg hover:bg-[#48c9ae] transition-colors self-start sm:self-auto shrink-0"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Default</span>
                </button>
              </div>
            )}
          </div>

          {/* Upload New / Replace File Area */}
          <div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept=".pdf,.doc,.docx,.txt"
              className="hidden"
            />

            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-[#2C363B] hover:border-[#57DCC1] p-6 rounded-2xl bg-[#15191C]/50 hover:bg-[#15191C] transition-all cursor-pointer text-center group"
            >
              <div className="w-12 h-12 rounded-full bg-[#202629] text-[#57DCC1] border border-[#2C363B] flex items-center justify-center mx-auto mb-3 group-hover:scale-105 transition-transform">
                {storedResume ? <RefreshCw className="w-5 h-5" /> : <Upload className="w-5 h-5" />}
              </div>
              <h4 className="text-sm font-bold text-[#F5F7F8] mb-1">
                {storedResume ? 'Click to Replace Resume File' : 'Click to Upload Your Resume File'}
              </h4>
              <p className="text-xs text-[#C2CBCE] max-w-sm mx-auto">
                Supported formats: PDF, DOC, DOCX, TXT (Maximum file size: 8MB)
              </p>
              <p className="text-[11px] text-[#57DCC1] mt-2 font-medium">
                Saves directly into your browser storage so recruiters download your actual file
              </p>
            </div>
          </div>

          {/* Toggle Preview Option */}
          <div>
            <button
              type="button"
              onClick={() => setShowPreview(!showPreview)}
              className="inline-flex items-center gap-1.5 text-xs text-[#C2CBCE] hover:text-[#57DCC1] transition-colors"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{showPreview ? 'Hide Verified Resume Text Preview' : 'Preview Verified Resume Content'}</span>
            </button>

            {showPreview && (
              <div className="mt-3 p-4 rounded-xl bg-[#15191C] border border-[#2C363B] max-h-60 overflow-y-auto">
                <pre className="text-[11px] font-mono text-[#C2CBCE] whitespace-pre-wrap leading-relaxed">
                  {generateDefaultResumeContent()}
                </pre>
              </div>
            )}
          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-[#2C363B] bg-[#1a1f23] flex items-center justify-between">
          <span className="text-[11px] text-[#C2CBCE]/70">
            {storedResume ? 'Custom file active' : 'Default factual resume active'}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-[#F5F7F8] bg-[#202629] border border-[#2C363B] rounded-lg hover:border-[#57DCC1] transition-colors"
          >
            Close Window
          </button>
        </div>

      </div>
    </div>
  );
};
