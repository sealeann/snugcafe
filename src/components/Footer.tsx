import React, { useState } from 'react';
import { Mail, Phone, MapPin, Instagram, Clock, Heart, Send, Check } from 'lucide-react';
import { CAMPAIGN_INFO } from '../data/cafeData';

export const Footer: React.FC = () => {
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [inquirySent, setInquirySent] = useState(false);

  const handleInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySent(true);
    setTimeout(() => {
      setInquiryName('');
      setInquiryEmail('');
      setInquiryMessage('');
      setInquirySent(false);
    }, 4000);
  };

  return (
    <footer id="contact" className="bg-[#3D231E] text-[#FAF6EB] pt-16 pb-12 border-t border-[#52312A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#52312A]">
          {/* Col 1: Brand Info & Mascot */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="./assets/aistudio/LOGO_7a4dd7b8.png"
                alt="Snug Cafe Logo"
                className="w-12 h-12 object-contain bg-white/10 rounded-2xl p-1"
              />
              <div>
                <span className="font-display font-bold text-xl text-white tracking-tight block">
                  Snug Cafe
                </span>
                <span className="text-xs text-[#E8A2A5] font-medium tracking-wide">
                  {CAMPAIGN_INFO.tagline}
                </span>
              </div>
            </div>

            <p className="text-xs text-[#FAF6EB]/80 leading-relaxed max-w-sm">
              A soft, welcoming sanctuary away from daily stress. We pair velvety signature beverages with tactile tabletop plushie companions so students, couples, and friends can slow down, unwind, and truly rest.
            </p>

            <div className="pt-2 text-xs text-[#FAF6EB]/70 space-y-1">
              <p><strong>Campaign Dates:</strong> {CAMPAIGN_INFO.startDate} – {CAMPAIGN_INFO.endDate}</p>
              <p className="italic text-[11px] text-[#E8A2A5]">{CAMPAIGN_INFO.durationNote}</p>
            </div>
          </div>

          {/* Col 2: Contacts & Hours */}
          <div className="md:col-span-4 space-y-4 text-xs">
            <h4 className="font-display font-bold text-sm text-white tracking-wider uppercase">
              Contact & Location
            </h4>

            <ul className="space-y-3 text-[#FAF6EB]/80">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#9B8B59] shrink-0 mt-0.5" />
                <span>{CAMPAIGN_INFO.location}</span>
              </li>

              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#E8A2A5] shrink-0" />
                <a
                  href={`mailto:${CAMPAIGN_INFO.contactEmail}`}
                  className="hover:text-white underline underline-offset-2 transition-colors"
                >
                  {CAMPAIGN_INFO.contactEmail}
                </a>
              </li>

              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#9B8B59] shrink-0" />
                <a
                  href={`tel:${CAMPAIGN_INFO.contactPhone}`}
                  className="hover:text-white underline underline-offset-2 transition-colors font-mono"
                >
                  {CAMPAIGN_INFO.contactPhone}
                </a>
              </li>

              <li className="flex items-start gap-2.5 pt-1">
                <Clock className="w-4 h-4 text-[#E8A2A5] shrink-0 mt-0.5" />
                <div>
                  <span className="block text-white font-medium">{CAMPAIGN_INFO.operatingHours}</span>
                  <span className="text-[11px] text-[#FAF6EB]/60">{CAMPAIGN_INFO.peakHours}</span>
                </div>
              </li>
            </ul>

            {/* Social links to respective homepages */}
            <div className="pt-3">
              <span className="block text-[11px] font-bold text-white uppercase tracking-wider mb-2">
                FOLLOW OUR SOCIALS!
              </span>
              <div className="flex items-center gap-3">
                <a
                  href={CAMPAIGN_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs transition-colors"
                >
                  <Instagram className="w-3.5 h-3.5 text-[#E8A2A5]" />
                  <span>Instagram</span>
                </a>

                <a
                  href={CAMPAIGN_INFO.tiktokUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs transition-colors"
                >
                  <span className="inline-flex items-center justify-center text-[#E8A2A5]">
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 3 15.65 6.34 6.34 0 0 0 9.35 22a6.33 6.33 0 0 0 6.33-6.33V9.08a8.2 8.2 0 0 0 4.6 1.4v-3.4a4.85 4.85 0 0 1-.69-.39z" />
                    </svg>
                  </span>
                  <span>TikTok</span>
                </a>
              </div>
            </div>
          </div>

          {/* Col 3: Quick Cozy Message Form */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-display font-bold text-sm text-white tracking-wider uppercase">
              Send Skippie a Message
            </h4>
            <p className="text-xs text-[#FAF6EB]/70">
              Have questions about plushie care or study space bookings? Leave a quick note.
            </p>

            {inquirySent ? (
              <div className="p-4 bg-white/10 rounded-2xl border border-white/20 text-xs text-center space-y-2">
                <Check className="w-6 h-6 text-[#9B8B59] mx-auto" />
                <p className="font-bold text-white">Message received warmly!</p>
                <p className="text-[#FAF6EB]/70 text-[11px]">We’ll reply to {inquiryEmail} shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleInquiry} className="space-y-2">
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  value={inquiryName}
                  onChange={(e) => setInquiryName(e.target.value)}
                  className="w-full px-3 py-2 text-xs text-white bg-white/10 border border-white/20 rounded-xl placeholder:text-white/40 focus:outline-none focus:border-[#E8A2A5]"
                />
                <input
                  type="email"
                  required
                  placeholder="Your Email"
                  value={inquiryEmail}
                  onChange={(e) => setInquiryEmail(e.target.value)}
                  className="w-full px-3 py-2 text-xs text-white bg-white/10 border border-white/20 rounded-xl placeholder:text-white/40 focus:outline-none focus:border-[#E8A2A5]"
                />
                <textarea
                  required
                  rows={2}
                  placeholder="Your note or questions..."
                  value={inquiryMessage}
                  onChange={(e) => setInquiryMessage(e.target.value)}
                  className="w-full px-3 py-2 text-xs text-white bg-white/10 border border-white/20 rounded-xl placeholder:text-white/40 focus:outline-none focus:border-[#E8A2A5] resize-none"
                />
                <button
                  type="submit"
                  className="w-full py-2 bg-[#E8A2A5] hover:bg-[#D07A7E] text-[#3D231E] font-bold text-xs rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send to Snug Cafe</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar: Quiet Copyright & Disclaimer */}
        <div className="pt-8 flex items-center justify-center text-xs text-[#FAF6EB]/60 text-center">
          <p>© 2026 Snug Cafe. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
