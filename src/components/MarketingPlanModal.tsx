import React from 'react';
import { X, Target, BarChart, Users, Sparkles, Calendar, CheckCircle2, ShieldCheck, Heart } from 'lucide-react';
import { CAMPAIGN_INFO, MARKETING_KPIS, SMART_GOALS_DATA, COLOR_PALETTE_INFO } from '../data/cafeData';

interface MarketingPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPlanVisit: () => void;
}

export const MarketingPlanModal: React.FC<MarketingPlanModalProps> = ({
  isOpen,
  onClose,
  onPlanVisit,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-[#DDD2B1] max-h-[90vh] flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-[#FAF6EB] flex items-center justify-between bg-[#FAF6EB]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#3D231E] text-white flex items-center justify-center font-bold text-sm">
              <Target className="w-5 h-5 text-[#E8A2A5]" />
            </div>
            <div>
              <span className="text-[11px] font-mono text-[#9B8B59] uppercase tracking-wider block">
                Official Strategic Blueprint
              </span>
              <h3 className="font-display font-bold text-xl text-[#3D231E]">
                Snug Cafe Marketing Campaign Plan
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white border border-[#DDD2B1] flex items-center justify-center text-[#7A574E] hover:text-[#3D231E] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body (Scrollable) */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 text-[#52312A] text-sm">
          {/* Executive Overview */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-lg text-[#3D231E] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#D07A7E]" />
              1. Brand Identity & Persona
            </h4>
            <div className="bg-[#FAF6EB] p-4 rounded-2xl border border-[#DDD2B1] space-y-2">
              <p className="leading-relaxed">
                <strong>Persona:</strong> &ldquo;Skippie and The Cozy Crew&rdquo; is a gentle penguin on a mission to bring comfort to everyone. Snug Cafe embodies a soft, welcoming, and relaxed persona–think warm plushies, warm drinks, and a safe cozy space away from daily stress.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                <div>
                  <span className="font-bold text-[#3D231E]">Logo Concept:</span>
                  <p className="text-[#7A574E]">A cozy penguin hugging a coffee cup.</p>
                </div>
                <div>
                  <span className="font-bold text-[#3D231E]">Brand Tagline:</span>
                  <p className="text-[#7A574E]">Sip, Snuggle, Repeat</p>
                </div>
              </div>
            </div>
          </div>

          {/* Customer Problem & Value Proposition */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-lg text-[#3D231E] flex items-center gap-2">
              <Users className="w-4 h-4 text-[#9B8B59]" />
              2. Customer Problem & Value Proposition
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-white border border-[#DDD2B1] space-y-1.5">
                <span className="text-xs font-bold text-[#D07A7E] uppercase tracking-wider block">Customer Problem</span>
                <p className="text-xs leading-relaxed text-[#7A574E]">
                  Students, couples, and young professionals often deal with high everyday stress, fatigue, and burnout. A standard cafe can feel noisy and impersonal. Customers lack a comforting physical space where they can slow down, unwind and enjoy both fun signature beverages and tactile comfort.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF6EB] border border-[#DDD2B1] space-y-1.5">
                <span className="text-xs font-bold text-[#9B8B59] uppercase tracking-wider block">Value Proposition</span>
                <p className="text-xs leading-relaxed text-[#3D231E]">
                  At Snug Cafe, we help various individuals (whether they are solo, with a partner, or in a group) be able to unwind and enjoy their visit at Snug Cafe through the uniqueness of its space and its products. Unlike other cafes, we offer aromatic beverages with promos that provide you with a buddy and help our Snuggies appreciate their stay, because at Snug Cafe, your snugness is our utmost priority.
                </p>
              </div>
            </div>
          </div>

          {/* Primary CTA */}
          <div className="p-4 rounded-2xl bg-[#3D231E] text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] uppercase font-mono tracking-wider text-[#E8A2A5] block">
                Primary Call-To-Action (CTA)
              </span>
              <p className="font-display font-bold text-base text-white">
                &ldquo;{CAMPAIGN_INFO.primaryCTA}&rdquo;
              </p>
            </div>
            <button
              onClick={() => {
                onClose();
                onPlanVisit();
              }}
              className="px-4 py-2 bg-[#FAF6EB] text-[#3D231E] text-xs font-bold rounded-full hover:bg-white transition-colors cursor-pointer whitespace-nowrap"
            >
              Test Visit Planner
            </button>
          </div>

          {/* SMART Goal Framework */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-lg text-[#3D231E] flex items-center gap-2">
              <Target className="w-4 h-4 text-[#3D231E]" />
              3. SMART Goal Statement
            </h4>
            <p className="text-xs text-[#7A574E] leading-relaxed">
              <strong>Core SMART Goal:</strong> Increase Snug Cafe&apos;s customer visits by promoting and using its website within three months, showcasing its unique café atmosphere, aromatic beverages, and buddy promos on social media to encourage individuals, couples, and groups to visit and unwind.
            </p>

            <div className="space-y-2 pt-2">
              {SMART_GOALS_DATA.map((g) => (
                <div key={g.letter} className="flex items-start gap-3 p-3 rounded-xl bg-[#FAF6EB] border border-[#DDD2B1]/60 text-xs">
                  <span className="w-6 h-6 rounded-md bg-[#3D231E] text-white font-mono font-bold flex items-center justify-center shrink-0">
                    {g.letter}
                  </span>
                  <div>
                    <strong className="text-[#3D231E]">{g.label}:</strong>{' '}
                    <span className="text-[#52312A]">{g.description}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3 Core KPIs */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-lg text-[#3D231E] flex items-center gap-2">
              <BarChart className="w-4 h-4 text-[#9B8B59]" />
              4. Key Performance Indicators (3 KPIs)
            </h4>

            <div className="space-y-4">
              {MARKETING_KPIS.map((kpi, i) => (
                <div key={kpi.id} className="p-4 rounded-2xl border border-[#DDD2B1] bg-white space-y-2">
                  <div className="flex items-center justify-between">
                    <h5 className="font-display font-bold text-sm text-[#3D231E]">
                      KPI #{i + 1}: {kpi.title}
                    </h5>
                    <span className="text-xs font-mono font-bold text-[#9B8B59]">
                      {kpi.currentValue}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-1">
                    <div>
                      <span className="font-bold text-[#7A574E] block">Metric:</span>
                      <p>{kpi.metric}</p>
                    </div>
                    <div>
                      <span className="font-bold text-[#7A574E] block">Target:</span>
                      <p>{kpi.target}</p>
                    </div>
                    <div>
                      <span className="font-bold text-[#7A574E] block">Purpose:</span>
                      <p>{kpi.purpose}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Social Platforms & Guidelines */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-lg text-[#3D231E] flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#D07A7E]" />
              5. Social Platforms (Instagram & TikTok)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-[#FAF6EB] border border-[#DDD2B1] space-y-1.5">
                <strong className="text-sm text-[#3D231E] block">Instagram (Reels & Stories)</strong>
                <p className="text-[#52312A] leading-relaxed">
                  With the use of Reels, Stories, and eye-pleasing photos to showcase Snug Cafe’s atmosphere, aromatic beverages, and buddy promos. These appeal to Gen Z to engage, visit, and share their experience.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF6EB] border border-[#DDD2B1] space-y-1.5">
                <strong className="text-sm text-[#3D231E] block">TikTok (Relatable Videos & Challenges)</strong>
                <p className="text-[#52312A] leading-relaxed">
                  Creation of relatable videos, featuring drinks, cafe tours, promos, and trending challenges. This type of content creation will help Snug Cafe reach audiences and encourage them to visit.
                </p>
              </div>
            </div>
          </div>

          {/* Color Palette from user attachment */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-lg text-[#3D231E]">
              6. Brand Color Palette (Based on Attachment)
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {COLOR_PALETTE_INFO.map((color) => (
                <div key={color.name} className="p-3 rounded-2xl border border-[#DDD2B1] bg-white space-y-2">
                  <div
                    className="w-full h-12 rounded-xl border border-black/10 shadow-2xs"
                    style={{ backgroundColor: color.hex }}
                  />
                  <div>
                    <strong className="font-display text-xs text-[#3D231E] block">{color.name}</strong>
                    <span className="font-mono text-[10px] text-[#7A574E] block">{color.code}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-[#FAF6EB] bg-[#FAF6EB] flex items-center justify-between">
          <span className="text-xs text-[#7A574E]">
            Contact: {CAMPAIGN_INFO.contactEmail} · {CAMPAIGN_INFO.contactPhone}
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#3D231E] text-white text-xs font-bold rounded-full hover:bg-[#52312A] transition-colors cursor-pointer"
          >
            Close Blueprint
          </button>
        </div>
      </div>
    </div>
  );
};
