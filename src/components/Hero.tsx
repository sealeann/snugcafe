import React from 'react';
import { ArrowRight } from 'lucide-react';
import { CAMPAIGN_INFO } from '../data/cafeData';

interface HeroProps {
  onOpenPlanner: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenPlanner }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FAF6EB] via-[#F4EEDC]/40 to-[#FAF6EB] py-12 lg:py-20 border-b border-[#DDD2B1]/60">
      {/* Gentle background organic shapes */}
      <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-[#E8A2A5]/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-[#9B8B59]/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Proposition, Tagline & Primary Action */}
          <div className="md:col-span-7 space-y-6">
            {/* Main Display Headline */}
            <div className="space-y-3">
              <span className="text-sm font-semibold tracking-widest text-[#D07A7E] uppercase block">
                {CAMPAIGN_INFO.tagline}
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-[#3D231E] leading-[1.12] tracking-tight text-balance">
                Find Your Snugness at <span className="italic text-[#a4905d]">Snug Cafe</span>.
              </h1>
            </div>

            {/* Value Proposition & Customer Problem statement */}
            <p className="text-base sm:text-lg text-[#52312A] leading-relaxed max-w-xl">
              Tired of noisy, impersonal cafes when burnout hits? Meet your cozy sanctuary.
              At Snug Cafe, we pair velvety aromatic beverages with tactile cuddle buddies to help solo
              students, couples, and groups slow down, breathe, and truly unwind.
            </p>

            {/* Primary Call to Action */}
            <div className="pt-2">
              <button
                onClick={onOpenPlanner}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 text-base font-bold text-white bg-[#3D231E] rounded-full hover:bg-[#52312A] shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
              >
                <span>Visit Us Today!</span>
                <ArrowRight className="w-5 h-5 text-[#E8A2A5]" />
              </button>
            </div>
          </div>

          {/* Right Column: Skippie the Penguin Mascot and Visual Anchor */}
          <div className="md:col-span-5 relative flex justify-center md:justify-end items-center">
            <div className="relative w-full max-w-md ml-auto">
              {/* Cozy background card container */}
              <div className="relative bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-[#DDD2B1] overflow-hidden text-center">
                {/* Visual badge top */}
                <div className="text-center mb-4 pb-3 border-b border-[#FAF6EB]">
                  <span className="text-[11px] uppercase tracking-wider text-[#9B8B59] font-bold">Brand Mascot</span>
                  <h3 className="font-display font-bold text-lg text-[#3D231E]">Skippie the Penguin</h3>
                </div>

                {/* Skippie Cozy Illustration */}
                <div className="relative my-4 flex items-center justify-center">
                  <div className="absolute inset-0 bg-[#E8A2A5]/15 rounded-full filter blur-xl scale-95" />
                  <img
                    src="./assets/aistudio/Persona_b565c636.png"
                    alt="Skippie the cozy penguin resting on a pink cushion with warm coffee"
                    className="relative w-64 h-64 sm:w-72 sm:h-72 object-contain mx-auto drop-shadow-md hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Persona Quote */}
                <div className="bg-[#FAF6EB] rounded-2xl p-4 border border-[#DDD2B1]/60 text-center">
                  <p className="text-xs font-semibold text-[#3D231E]">
                    &ldquo;Be just as snug as Skippie!&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
