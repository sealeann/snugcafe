import React from 'react';
import { Shield } from 'lucide-react';

export const PlushieRentalGuide: React.FC = () => {
  return (
    <section id="rentals" className="py-16 sm:py-24 bg-white border-b border-[#DDD2B1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl mx-auto">
          {/* Visual Ritual Card */}
          <div className="bg-[#FAF6EB] rounded-3xl p-6 sm:p-8 border border-[#DDD2B1] relative overflow-hidden shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-[#DDD2B1]/60">
              <div>
                <h3 className="font-display font-bold text-lg text-[#3D231E]">Sip & Snuggle in 3 Steps</h3>
              </div>
              <span className="text-xs font-mono text-[#D07A7E] font-bold">For Dine-In Customers</span>
            </div>

            {/* Step Flow */}
            <div className="space-y-6 my-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-[#3D231E] text-white flex items-center justify-center font-bold text-xs shrink-0">
                  1
                </div>
                <div className="space-y-1">
                  <h4 className="font-display font-bold text-sm text-[#3D231E]">Order Signature Beverage</h4>
                  <p className="text-xs text-[#7A574E] leading-relaxed">
                    Order the Capybara Hot Spring Cocoa or The Mossy Bear Matcha Latte at our friendly counter.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-[#E8A2A5] text-[#3D231E] flex items-center justify-center font-bold text-xs shrink-0">
                  2
                </div>
                <div className="space-y-1">
                  <h4 className="font-display font-bold text-sm text-[#3D231E]">Welcome Your Table Companion</h4>
                  <p className="text-xs text-[#7A574E] leading-relaxed">
                    Receive your freshly sanitized tabletop plushie. Place them beside your cup, books, or phone to cuddle.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-[#9B8B59] text-white flex items-center justify-center font-bold text-xs shrink-0">
                  3
                </div>
                <div className="space-y-1">
                  <h4 className="font-display font-bold text-sm text-[#3D231E]">Return with Food Tray</h4>
                  <p className="text-xs text-[#7A574E] leading-relaxed">
                    When done, tuck your buddy back onto your tray so they can take a refreshing nap before the next guest.
                  </p>
                </div>
              </div>
            </div>

            {/* Hygiene Stamp */}
            <div className="p-4 bg-white rounded-2xl border border-[#DDD2B1] flex items-center gap-3">
              <Shield className="w-6 h-6 text-[#9B8B59] shrink-0" />
              <div className="text-xs">
                <span className="font-bold text-[#3D231E] block">Hypoallergenic & Steam Sanitized</span>
                <span className="text-[#7A574E]">Every tabletop plushie undergoes medical-grade UV-C and botanical steam sanitization after each visit.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
