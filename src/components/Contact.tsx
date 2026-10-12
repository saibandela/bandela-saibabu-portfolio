import React, { useState } from 'react';
import { Mail, Linkedin, Github, MapPin, Copy, Check, Send, ExternalLink } from 'lucide-react';
import { PROFILE } from '../data/portfolioData';

export const Contact: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Job Opportunity / Technical Discussion',
    message: ''
  });
  const [formStatus, setFormStatus] = useState<string | null>(null);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PROFILE.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSendViaMailClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.message.trim()) {
      setFormStatus('Please enter a brief message before opening your mail client.');
      return;
    }

    const mailtoSubject = encodeURIComponent(formData.subject || 'Portfolio Inquiry');
    const mailtoBody = encodeURIComponent(
      `Hello Saibabu,\n\nName: ${formData.name || 'Not specified'}\nEmail: ${formData.email || 'Not specified'}\n\nMessage:\n${formData.message}\n`
    );

    const mailtoUrl = `mailto:${PROFILE.email}?subject=${mailtoSubject}&body=${mailtoBody}`;
    window.location.href = mailtoUrl;

    setFormStatus('Launched your default email client with your prefilled message.');
  };

  const handleCopyDraft = () => {
    if (!formData.message.trim()) {
      setFormStatus('Please write a message to copy.');
      return;
    }

    const draft = `To: ${PROFILE.email}\nSubject: ${formData.subject}\nFrom: ${formData.name} (${formData.email})\n\n${formData.message}`;
    navigator.clipboard.writeText(draft);
    setFormStatus('Draft copied to clipboard! You can now paste directly into Gmail, Outlook, or LinkedIn.');
    setTimeout(() => setFormStatus(null), 4000);
  };

  return (
    <section id="contact" className="relative py-20 border-b border-[#2C363B] overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#57DCC1] mb-2">
            <span>Direct Communications</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Get in Touch
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-2xl font-normal">
            Currently seeking entry-level software engineering, Python development, QA testing, and data analyst roles. I am prompt in replying to recruitment inquiries.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Direct Contact Details & Links */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Primary Email Card */}
            <div className="bg-gradient-to-br from-[#202629] to-[#162428] rounded-2xl border border-[#2C363B] p-6 hover:border-cyan-400/50 transition-all shadow-md">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-[#15191C] text-cyan-400 border border-[#2C363B] shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-xs uppercase tracking-wider text-[#C2CBCE]/70 block font-semibold mb-1">
                    Email Address
                  </span>
                  <a
                    href={`mailto:${PROFILE.email}`}
                    className="text-sm sm:text-base font-bold text-[#F5F7F8] hover:text-[#57DCC1] transition-colors break-all block"
                  >
                    {PROFILE.email}
                  </a>
                  
                  <div className="mt-3 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-[#15191C] text-[#C2CBCE] hover:text-[#57DCC1] rounded-lg border border-[#2C363B] transition-colors"
                    >
                      {copiedEmail ? <Check className="w-3.5 h-3.5 text-[#57DCC1]" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedEmail ? 'Copied to Clipboard!' : 'Copy Email'}</span>
                    </button>

                    <a
                      href={`mailto:${PROFILE.email}`}
                      className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-[#15191C] bg-[#57DCC1] rounded-lg hover:bg-[#48c9ae] transition-colors"
                    >
                      <span>Compose</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* LinkedIn Card */}
            <div className="bg-gradient-to-br from-[#202629] to-[#18202d] rounded-2xl border border-[#2C363B] p-6 hover:border-blue-400/50 transition-all shadow-md">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-[#15191C] text-blue-400 border border-[#2C363B] shrink-0">
                  <Linkedin className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-xs uppercase tracking-wider text-[#C2CBCE]/70 block font-semibold mb-1">
                    Professional Network
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-[#F5F7F8]">
                    LinkedIn Profile
                  </h3>
                  <p className="text-xs text-[#C2CBCE] mt-0.5 mb-3">
                    Connect for professional networking and career discussions.
                  </p>
                  <a
                    href={PROFILE.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#57DCC1] hover:underline"
                  >
                    <span>View LinkedIn Profile</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* GitHub Card */}
            <div className="bg-gradient-to-br from-[#202629] to-[#241d2a] rounded-2xl border border-[#2C363B] p-6 hover:border-purple-400/50 transition-all shadow-md">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-[#15191C] text-purple-400 border border-[#2C363B] shrink-0">
                  <Github className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-xs uppercase tracking-wider text-[#C2CBCE]/70 block font-semibold mb-1">
                    Source Code
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-[#F5F7F8]">
                    GitHub Profile
                  </h3>
                  <p className="text-xs text-[#C2CBCE] mt-0.5 mb-3">
                    Review repositories, commit activity, and code samples.
                  </p>
                  <a
                    href={PROFILE.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#57DCC1] hover:underline"
                  >
                    <span>View GitHub Repositories</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Location Card */}
            <div className="bg-gradient-to-br from-[#202629] to-[#182622] rounded-xl border border-[#2C363B] p-4 flex items-center gap-3 text-xs text-[#C2CBCE] hover:border-emerald-400/40 transition-colors">
              <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
              <div>
                <span className="text-[#F5F7F8] font-medium">Location: </span>
                <span>{PROFILE.location} (Open to local, hybrid, and remote roles)</span>
              </div>
            </div>

          </div>

          {/* Right Column: Direct Message Composer */}
          <div className="lg:col-span-7 bg-gradient-to-b from-[#202629] via-[#1d2326] to-[#181d20] rounded-2xl border border-[#2C363B] p-6 sm:p-8 shadow-xl">
            <h3 className="text-lg font-bold text-[#F5F7F8] mb-1">
              Send a Direct Message
            </h3>
            <p className="text-xs sm:text-sm text-[#C2CBCE] mb-6">
              Use this message form to draft an inquiry. Clicking submit will directly launch your default email client with your message prepared, or copy the formatted text.
            </p>

            <form onSubmit={handleSendViaMailClient} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-xs font-medium text-[#C2CBCE] mb-1.5">
                    Your Name / Company
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    placeholder="e.g. Hiring Manager / Recruiter"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#15191C] border border-[#2C363B] text-sm text-[#F5F7F8] placeholder-[#C2CBCE]/40 focus:outline-none focus:border-[#57DCC1] transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-medium text-[#C2CBCE] mb-1.5">
                    Your Work Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    placeholder="name@company.com"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#15191C] border border-[#2C363B] text-sm text-[#F5F7F8] placeholder-[#C2CBCE]/40 focus:outline-none focus:border-[#57DCC1] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-xs font-medium text-[#C2CBCE] mb-1.5">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleFormChange}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#15191C] border border-[#2C363B] text-sm text-[#F5F7F8] placeholder-[#C2CBCE]/40 focus:outline-none focus:border-[#57DCC1] transition-colors"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-medium text-[#C2CBCE] mb-1.5">
                  Message Details <span className="text-[#57DCC1]">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  value={formData.message}
                  onChange={handleFormChange}
                  placeholder="Hello Saibabu, we reviewed your projects and would like to discuss an opportunity regarding..."
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#15191C] border border-[#2C363B] text-sm text-[#F5F7F8] placeholder-[#C2CBCE]/40 focus:outline-none focus:border-[#57DCC1] transition-colors resize-y min-h-[100px]"
                />
              </div>

              {formStatus && (
                <div className="p-3 rounded-lg bg-[#15191C] border border-[#57DCC1]/50 text-xs text-[#57DCC1] flex items-center gap-2">
                  <Check className="w-4 h-4 shrink-0" />
                  <span>{formStatus}</span>
                </div>
              )}

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-[#15191C] bg-[#57DCC1] rounded-lg hover:bg-[#48c9ae] active:bg-[#3dbda3] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#57DCC1]"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send via Email Client</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopyDraft}
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-[#F5F7F8] bg-[#15191C] border border-[#2C363B] rounded-lg hover:border-[#57DCC1] hover:text-[#57DCC1] transition-colors"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Message Draft</span>
                </button>
              </div>

              <p className="text-[11px] text-[#C2CBCE]/60 pt-2">
                Note: No automated tracking or telemetry is used. Messages are dispatched directly to <code>bandelasai245@gmail.com</code>.
              </p>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
};
