import React from 'react';
import { Heart, ShoppingBag } from 'lucide-react';
import { CAMPAIGN_INFO } from '../data/cafeData';

interface NavbarProps {
  onOpenPlanner: () => void;
  onOpenMarketingPlan?: () => void;
  cartItemCount?: number;
  onOpenCart?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenPlanner,
  cartItemCount = 0,
  onOpenCart,
}) => {

  return (
    <header className="sticky top-0 z-40 bg-[#FAF6EC]/90 backdrop-blur-md border-b border-[#DDD2B1]">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-4 md:px-5 lg:px-8 h-16 md:h-18 lg:h-20 flex items-center justify-between gap-2 md:gap-3 lg:gap-8">
        {/* Zone 1: Brand Wordmark with Logo */}
        <a href="#" className="flex items-center gap-2 sm:gap-2.5 lg:gap-3 shrink-0 group">
          <img
            src="./assets/aistudio/LOGO_7a4dd7b8.png"
            alt="Snug Cafe Logo"
            className="w-9 h-9 md:w-10 md:h-10 lg:w-11 lg:h-11 object-contain transition-transform group-hover:scale-105 duration-200"
          />
          <div className="flex flex-col">
            <span className="font-display font-bold text-base md:text-lg lg:text-xl text-[#3D231E] tracking-tight whitespace-nowrap leading-tight">
              Snug Cafe
            </span>
            <span className="text-[10px] lg:text-xs text-[#9B8B59] font-medium tracking-wide leading-tight">
              {CAMPAIGN_INFO.tagline}
            </span>
          </div>
        </a>

        {/* Zone 2: Navigation Links (Single line, responsive spacing on tablet) */}
        <nav className="hidden md:flex items-center justify-center gap-2 md:gap-2.5 lg:gap-6 xl:gap-8 text-xs lg:text-sm font-medium text-[#52312A] flex-1 min-w-0">
          <a
            href="#crew"
            className="px-1.5 md:px-2 lg:px-3 py-1 lg:py-1.5 hover:text-[#3D231E] transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8 decoration-[#E8A2A5] tracking-wide"
          >
            About Us
          </a>
          <a
            href="#promos"
            className="px-1.5 md:px-2 lg:px-3 py-1 lg:py-1.5 hover:text-[#3D231E] transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8 decoration-[#E8A2A5] tracking-wide"
          >
            Bundle Promos
          </a>
          <a
            href="#socials"
            className="px-1.5 md:px-2 lg:px-3 py-1 lg:py-1.5 hover:text-[#3D231E] transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8 decoration-[#E8A2A5] tracking-wide"
          >
            Community Feed
          </a>
          <a
            href="#contact"
            className="px-1.5 md:px-2 lg:px-3 py-1 lg:py-1.5 hover:text-[#3D231E] transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8 decoration-[#E8A2A5] tracking-wide"
          >
            Contact Us
          </a>
        </nav>

        {/* Zone 3: Primary Action & Cart */}
        <div className="flex items-center gap-1.5 md:gap-2.5 lg:gap-3 shrink-0">
          {onOpenCart && (
            <button
              onClick={onOpenCart}
              type="button"
              className="relative p-2 md:p-2 lg:p-2.5 rounded-full bg-white hover:bg-[#FAF6EB] text-[#3D231E] border border-[#DDD2B1] transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-2xs"
              aria-label="View Cart"
            >
              <ShoppingBag className="w-4 h-4 text-[#3D231E]" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#3D231E] text-white text-[9px] sm:text-[10px] font-mono font-bold flex items-center justify-center border-2 border-[#FAF6EC]">
                  {cartItemCount}
                </span>
              )}
            </button>
          )}

          <button
            onClick={onOpenPlanner}
            type="button"
            className="flex items-center gap-1.5 md:gap-2 px-3 md:px-3.5 lg:px-4 py-2 md:py-2 lg:py-2.5 text-xs lg:text-sm font-semibold text-white bg-[#3D231E] rounded-full hover:bg-[#52312A] shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Heart className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-[#E8A2A5] fill-[#E8A2A5]" />
            <span className="hidden lg:inline">Visit Us Today</span>
            <span className="lg:hidden">Visit Us</span>
          </button>
        </div>
      </div>
    </header>
  );
};
