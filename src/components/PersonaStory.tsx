import React from 'react';

export const PersonaStory: React.FC = () => {
  return (
    <section id="crew" className="py-16 sm:py-20 bg-white border-b border-[#DDD2B1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3">
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-[#3D231E] tracking-tight">
            About Us
          </h2>
          <p className="text-sm sm:text-base text-[#52312A] leading-relaxed">
            Snug Cafe embodies a soft, welcoming, and relaxed persona. We believe that tactile comfort—hugging a plushie, sipping a rich, comforting beverage, and resting in an unhurried corner—can reverse the everyday burnout of modern life.
          </p>
        </div>
      </div>
    </section>
  );
};
