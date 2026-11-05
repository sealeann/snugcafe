import React, { useState } from 'react';
import { PROMO_BUNDLES } from '../data/cafeData';
import { PromoBundle } from '../types';
import { Info, Heart, ArrowRight, CheckCircle2, AlertCircle, Coffee, ShoppingBag, X, Check } from 'lucide-react';

interface PromoBundlesProps {
  onSelectBundle: (bundle: PromoBundle) => void;
  onAddToCart?: (item: {
    bundleId: string;
    name: string;
    itemType: 'drink' | 'plushie';
    isRental: boolean;
    price: number;
    priceFormatted: string;
    image: string;
  }) => void;
  onOpenCart?: () => void;
  cartCount?: number;
}

export const PromoBundles: React.FC<PromoBundlesProps> = ({
  onSelectBundle,
  onAddToCart,
  onOpenCart,
  cartCount = 0,
}) => {
  const [viewModes, setViewModes] = useState<Record<string, 'drink' | 'plushie'>>({
    'pebble-choco': 'drink',
    'capybara-hot-spring': 'drink',
    'mossy-bear-latte': 'drink',
  });

  const [addedItemKey, setAddedItemKey] = useState<string | null>(null);

  // State for buying drinks or plushies separately
  const [standaloneOrder, setStandaloneOrder] = useState<{
    bundle: PromoBundle;
    itemType: 'drink' | 'plushie';
  } | null>(null);
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [orderFormat, setOrderFormat] = useState<'dine-in' | 'takeaway'>('dine-in');
  const [confirmedTicket, setConfirmedTicket] = useState<string | null>(null);

  const toggleViewMode = (id: string, mode: 'drink' | 'plushie') => {
    setViewModes((prev) => ({ ...prev, [id]: mode }));
  };

  const handleAddToCartClick = (bundle: PromoBundle, itemType: 'drink' | 'plushie') => {
    const isRental = bundle.bundleType === 'Rental' && itemType === 'plushie';
    const priceRaw = itemType === 'drink' ? bundle.drinkOnlyPrice : bundle.plushieOnlyPrice;
    const match = (priceRaw || '').match(/\d+/);
    const priceNum = match ? parseInt(match[0], 10) : 0;
    const name = itemType === 'drink' ? bundle.drinkName : bundle.plushieName;
    const image = itemType === 'drink' ? bundle.drinkImage : bundle.plushieImage;

    if (onAddToCart) {
      onAddToCart({
        bundleId: bundle.id,
        name,
        itemType,
        isRental,
        price: priceNum,
        priceFormatted: `₱${priceNum}`,
        image,
      });
    }

    const key = `${bundle.id}-${itemType}`;
    setAddedItemKey(key);
    setTimeout(() => {
      setAddedItemKey((curr) => (curr === key ? null : curr));
    }, 1500);
  };

  const handleOpenStandalone = (bundle: PromoBundle, itemType: 'drink' | 'plushie') => {
    setStandaloneOrder({ bundle, itemType });
    setConfirmedTicket(null);
  };

  const handleConfirmStandalone = (e: React.FormEvent) => {
    e.preventDefault();
    const prefix = standaloneOrder?.itemType === 'drink' ? 'DRK' : 'PLS';
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    setConfirmedTicket(`SNUG-${prefix}-${randomCode}`);
  };

  const closeStandaloneModal = () => {
    setStandaloneOrder(null);
    setConfirmedTicket(null);
    setGuestName('');
    setGuestEmail('');
  };

  return (
    <section id="promos" className="py-16 sm:py-24 bg-[#FAF6EB] border-b border-[#DDD2B1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-[#3D231E] tracking-tight">
            Signature Drinks & Buddy Promos
          </h2>
        </div>

        {/* 3 Promo Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {PROMO_BUNDLES.map((bundle) => {
            const currentMode = viewModes[bundle.id] || 'drink';
            const isRental = bundle.bundleType === 'Rental';

            return (
              <div
                key={bundle.id}
                className="bg-white rounded-3xl p-4 sm:p-6 border border-[#DDD2B1] shadow-xs flex flex-col justify-between hover:shadow-md transition-all duration-300 group"
              >
                <div>
                  {/* Card Header Metadata (Clean unboxed text) */}
                  <div className="flex items-center justify-between text-xs text-[#7A574E] pb-3 border-b border-[#FAF6EB]">
                    <span className="font-semibold text-[#3D231E]">{bundle.category}</span>
                    <span aria-hidden="true">·</span>
                    <span className={isRental ? 'text-[#9B8B59] font-medium' : 'text-[#D07A7E] font-medium'}>
                      {bundle.availability}
                    </span>
                  </div>

                  {/* Drink / Plushie View Switcher */}
                  <div className="flex items-center justify-center gap-1.5 p-1 bg-[#FAF6EB] rounded-full my-3 sm:my-4 border border-[#DDD2B1]">
                    <button
                      onClick={() => toggleViewMode(bundle.id, 'drink')}
                      className={`flex-1 py-1 sm:py-1.5 text-xs font-semibold rounded-full transition-all cursor-pointer ${
                        currentMode === 'drink'
                          ? 'bg-[#3D231E] text-white shadow-xs'
                          : 'text-[#7A574E] hover:text-[#3D231E]'
                      }`}
                    >
                      Signature Drink
                    </button>
                    <button
                      onClick={() => toggleViewMode(bundle.id, 'plushie')}
                      className={`flex-1 py-1 sm:py-1.5 text-xs font-semibold rounded-full transition-all cursor-pointer ${
                        currentMode === 'plushie'
                          ? 'bg-[#3D231E] text-white shadow-xs'
                          : 'text-[#7A574E] hover:text-[#3D231E]'
                      }`}
                    >
                      {isRental ? 'Tabletop Buddy' : 'Add-on Plushie'}
                    </button>
                  </div>

                  {/* Visual Image Slot */}
                  <div className="relative h-48 sm:h-60 lg:h-72 w-full rounded-2xl bg-[#FAF6EB]/60 border border-[#DDD2B1]/40 flex items-center justify-center p-3 sm:p-4 overflow-hidden mb-4 sm:mb-5">
                    <img
                      src={currentMode === 'drink' ? bundle.drinkImage : bundle.plushieImage}
                      alt={currentMode === 'drink' ? bundle.drinkName : bundle.plushieName}
                      className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>

                  {/* Title & Flavor Profile */}
                  <div className="space-y-1.5 sm:space-y-2 mb-3.5 sm:mb-4">
                    <h3 className="font-display font-bold text-lg sm:text-xl text-[#3D231E] leading-snug">
                      {bundle.name}
                    </h3>
                    <p className="text-xs text-[#7A574E] leading-relaxed">
                      {bundle.flavorNotes}
                    </p>
                  </div>

                  {/* The Offer Breakdown Box */}
                  <div className="bg-[#FAF6EB] rounded-2xl p-3.5 sm:p-4 border border-[#DDD2B1]/70 space-y-1.5 sm:space-y-2 mb-4 sm:mb-6">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#3D231E]">
                      <Heart className="w-3.5 h-3.5 text-[#E8A2A5] fill-[#E8A2A5]" />
                      <span>The Bundle Promo:</span>
                    </div>
                    <p className="text-xs text-[#52312A] leading-relaxed">
                      {bundle.offerDescription}
                    </p>
                  </div>
                </div>

                <div>
                  {/* Price & Action Button (Bundle Promo) */}
                  <div className="pt-3.5 sm:pt-4 border-t border-[#FAF6EB] flex flex-col sm:flex-row md:flex-col lg:flex-row items-start sm:items-center md:items-start lg:items-center justify-between gap-2.5 sm:gap-3 lg:gap-4">
                    <div>
                      <span className="text-[10px] sm:text-[11px] text-[#7A574E] block uppercase tracking-wider">Bundle Promo Price</span>
                      <div className="flex items-baseline gap-1.5 sm:gap-2">
                        <span className="font-mono text-base sm:text-lg font-bold text-[#3D231E]">{bundle.price}</span>
                        {bundle.originalPrice && (
                          <span className="text-[11px] sm:text-xs text-[#9B8B59] font-medium">{bundle.originalPrice}</span>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => onSelectBundle(bundle)}
                      className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 text-xs font-bold text-white bg-[#3D231E] rounded-full hover:bg-[#52312A] transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-2xs whitespace-nowrap w-full sm:w-auto md:w-full lg:w-auto"
                    >
                      <span>Claim Promo</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#E8A2A5]" />
                    </button>
                  </div>

                  {/* Standalone À La Carte Purchase Options (Buy Separately without promo) */}
                  <div className="mt-3.5 sm:mt-4 pt-3 border-t border-[#FAF6EB] space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#7A574E] block text-center">
                      Or Buy Separately (Without Promo)
                    </span>
                    <div className="grid grid-cols-2 gap-2 sm:gap-3 text-xs">
                      {/* Drink Standalone Button */}
                      {(() => {
                        const isDrinkAdded = addedItemKey === `${bundle.id}-drink`;
                        return (
                          <button
                            type="button"
                            onClick={() => handleAddToCartClick(bundle, 'drink')}
                            className="p-2.5 sm:p-3.5 lg:p-4 rounded-2xl bg-[#FAF6EB] hover:bg-[#F4EEDC] border border-[#DDD2B1] text-left transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex flex-col justify-between group/item min-h-[125px] sm:min-h-[140px]"
                          >
                            <div>
                              <div className="flex items-center justify-between gap-1 mb-1">
                                <span className="text-[9px] sm:text-[10px] font-bold text-[#7A574E] uppercase tracking-wider">Drink Only</span>
                                <Coffee className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#9B8B59]" />
                              </div>
                              <span className="text-xs sm:text-sm font-bold text-[#3D231E] block truncate leading-snug">{bundle.drinkName}</span>
                              <div className="mt-1.5 sm:mt-2 mb-2 sm:mb-2.5">
                                <span className="font-mono text-xs sm:text-sm md:text-base font-bold text-[#3D231E] block">{bundle.drinkOnlyPrice}</span>
                              </div>
                            </div>
                            <div
                              className={`w-full py-1.5 sm:py-2 px-2 sm:px-3 rounded-xl text-center text-[11px] sm:text-xs font-bold transition-all flex items-center justify-center ${
                                isDrinkAdded
                                  ? 'bg-[#9B8B59] text-white'
                                  : 'bg-[#3D231E] text-white group-hover/item:bg-[#52312A] shadow-2xs'
                              }`}
                            >
                              <span>{isDrinkAdded ? 'Added ✓' : 'Add to Cart'}</span>
                            </div>
                          </button>
                        );
                      })()}

                      {/* Plushie Standalone Button */}
                      {(() => {
                        const isPlushieAdded = addedItemKey === `${bundle.id}-plushie`;
                        return (
                          <button
                            type="button"
                            onClick={() => handleAddToCartClick(bundle, 'plushie')}
                            className="p-2.5 sm:p-3.5 lg:p-4 rounded-2xl bg-[#FAF6EB] hover:bg-[#F4EEDC] border border-[#DDD2B1] text-left transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex flex-col justify-between group/item min-h-[125px] sm:min-h-[140px]"
                          >
                            <div>
                              <div className="flex items-center justify-between gap-1 mb-1">
                                <span className="text-[9px] sm:text-[10px] font-bold text-[#7A574E] uppercase tracking-wider truncate">
                                  {isRental ? 'Rent Tabletop' : 'Keepsake Plush'}
                                </span>
                                <Heart className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#E8A2A5] shrink-0" />
                              </div>
                              <span className="text-xs sm:text-sm font-bold text-[#3D231E] block truncate leading-snug">{bundle.plushieName}</span>
                              <div className="mt-1.5 sm:mt-2 mb-2 sm:mb-2.5">
                                <span className="font-mono text-xs sm:text-sm md:text-base font-bold text-[#3D231E] block">{bundle.plushieOnlyPrice}</span>
                              </div>
                            </div>
                            <div
                              className={`w-full py-1.5 sm:py-2 px-2 sm:px-3 rounded-xl text-center text-[11px] sm:text-xs font-bold transition-all flex items-center justify-center ${
                                isPlushieAdded
                                  ? 'bg-[#9B8B59] text-white'
                                  : 'bg-[#3D231E] text-white group-hover/item:bg-[#52312A] shadow-2xs'
                              }`}
                            >
                              <span>{isPlushieAdded ? 'Added ✓' : 'Add to Cart'}</span>
                            </div>
                          </button>
                        );
                      })()}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Cart Trigger Bar if items added */}
        {cartCount > 0 && onOpenCart && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={onOpenCart}
              className="inline-flex items-center gap-2.5 px-6 py-3 bg-[#3D231E] text-white rounded-full text-xs font-bold hover:bg-[#52312A] shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 text-[#E8A2A5]" />
              <span>View Cart & Checkout ({cartCount} {cartCount === 1 ? 'item' : 'items'})</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#E8A2A5]" />
            </button>
          </div>
        )}

        {/* Eligibility & Exclusions Banner (Strictly following user brief) */}
        <div className="mt-16 bg-white rounded-3xl p-6 sm:p-8 border border-[#DDD2B1] space-y-6">
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-[#7A574E] uppercase tracking-wider">
            <Info className="w-4 h-4 text-[#9B8B59]" />
            <span>Eligibility & Campaign Guidelines</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs text-[#52312A]">
            <div className="space-y-3">
              <h4 className="font-display font-bold text-sm text-[#3D231E] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#9B8B59]" />
                Customer Eligibility
              </h4>
              <ul className="space-y-1.5 pl-4 list-disc text-[#7A574E]">
                <li><strong>Tabletop Plushie Rentals (Capybara & Mossy Bear):</strong> Strictly available for Dine-In Snuggies only to keep you company during your cafe stay.</li>
                <li><strong>Pebble Choco Couple Plushie:</strong> The exclusive discounted purchase add-on is available for both Dine-In and Takeaway orders.</li>
                <li><strong>Individual Purchases:</strong> All signature drinks and plushies can be ordered standalone à la carte without bundle promo requirements.</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-display font-bold text-sm text-[#3D231E] flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-[#D07A7E]" />
                Important Exclusions
              </h4>
              <ul className="space-y-1.5 pl-4 list-disc text-[#7A574E] leading-relaxed">
                <li><strong>Premises Policy:</strong> Rentable plushies must remain inside cafe premises and must be returned upon returning your food tray.</li>
                <li><strong>Care & Cleaning:</strong> A cleaning/replacement fee applies if plushies are damaged, heavily stained, or taken home without authorization.</li>
                <li><strong>Third-Party Delivery:</strong> Promo plushies (rentals and add-ons) are strictly excluded from third-party delivery services (Grab/Foodpanda).</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Standalone À La Carte Purchase Modal */}
      {standaloneOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-[#DDD2B1] shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={closeStandaloneModal}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-[#FAF6EB] text-[#7A574E] hover:text-[#3D231E] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {!confirmedTicket ? (
              <form onSubmit={handleConfirmStandalone} className="space-y-5">
                <div>
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#9B8B59] block mb-1">
                    Standalone À La Carte
                  </span>
                  <h3 className="font-display font-extrabold text-xl text-[#3D231E]">
                    {standaloneOrder.itemType === 'drink'
                      ? 'Order Drink Only'
                      : (standaloneOrder.bundle.bundleType === 'Rental' ? 'Rent Tabletop Plushie' : 'Order Keepsake Plushie')}
                  </h3>
                  <p className="text-xs text-[#7A574E] mt-1">
                    {standaloneOrder.itemType === 'plushie' && standaloneOrder.bundle.bundleType === 'Rental'
                      ? 'Rent a sanitized plushie buddy to cuddle at your table during your visit. Strictly for dining in (not for taking home).'
                      : 'Ordering individually without the promotional bundle package.'}
                  </p>
                </div>

                {/* Selected Item Summary Card */}
                <div className="p-4 bg-[#FAF6EB] rounded-2xl border border-[#DDD2B1] flex items-center gap-4">
                  <img
                    src={standaloneOrder.itemType === 'drink' ? standaloneOrder.bundle.drinkImage : standaloneOrder.bundle.plushieImage}
                    alt={standaloneOrder.itemType === 'drink' ? standaloneOrder.bundle.drinkName : standaloneOrder.bundle.plushieName}
                    className="w-16 h-16 object-contain bg-white rounded-xl p-1 border border-[#DDD2B1]/80"
                  />
                  <div className="flex-1">
                    <span className="font-display font-bold text-sm text-[#3D231E] block">
                      {standaloneOrder.itemType === 'drink' ? standaloneOrder.bundle.drinkName : standaloneOrder.bundle.plushieName}
                    </span>
                    <span className="font-mono text-sm font-bold text-[#3D231E]">
                      {standaloneOrder.itemType === 'drink' ? standaloneOrder.bundle.drinkOnlyPrice : standaloneOrder.bundle.plushieOnlyPrice}
                    </span>
                    <span className="text-[10px] text-[#7A574E] block mt-0.5">
                      {standaloneOrder.itemType === 'drink'
                        ? 'Single Handcrafted Beverage'
                        : (standaloneOrder.bundle.bundleType === 'Rental'
                          ? 'Tabletop Companion Rental (Dine-in only · not for taking home)'
                          : 'Keepsake Plushie (Take home to keep)')}
                    </span>
                  </div>
                </div>

                {/* Order Format Selector */}
                {standaloneOrder.itemType === 'plushie' && standaloneOrder.bundle.bundleType === 'Rental' ? (
                  <div className="p-3 bg-[#FAF6EB] rounded-2xl border border-[#DDD2B1] text-xs text-[#7A574E] flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-[#9B8B59] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#3D231E] block">Dine-In Rental Only</strong>
                      <span>This plushie must remain inside cafe premises and be returned with your food tray after dining.</span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-[#7A574E] uppercase tracking-wider">
                      Format
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setOrderFormat('dine-in')}
                        className={`p-2.5 rounded-xl text-center border text-xs font-semibold transition-all cursor-pointer ${
                          orderFormat === 'dine-in'
                            ? 'border-[#3D231E] bg-[#FAF6EB] text-[#3D231E] shadow-2xs'
                            : 'border-[#DDD2B1] text-[#7A574E] hover:bg-[#FAF6EB]/40'
                        }`}
                      >
                        Dine-In
                      </button>
                      <button
                        type="button"
                        onClick={() => setOrderFormat('takeaway')}
                        className={`p-2.5 rounded-xl text-center border text-xs font-semibold transition-all cursor-pointer ${
                          orderFormat === 'takeaway'
                            ? 'border-[#3D231E] bg-[#FAF6EB] text-[#3D231E] shadow-2xs'
                            : 'border-[#DDD2B1] text-[#7A574E] hover:bg-[#FAF6EB]/40'
                        }`}
                      >
                        Takeaway
                      </button>
                    </div>
                  </div>
                )}

                {/* Guest Details */}
                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#7A574E] uppercase tracking-wider">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Maya Santos"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      className="w-full px-3.5 py-2 text-xs text-[#3D231E] bg-[#FAF6EB] border border-[#DDD2B1] rounded-xl focus:outline-none focus:border-[#3D231E]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#7A574E] uppercase tracking-wider">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. placeholder@gmail.com"
                      value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                      className="w-full px-3.5 py-2 text-xs text-[#3D231E] bg-[#FAF6EB] border border-[#DDD2B1] rounded-xl focus:outline-none focus:border-[#3D231E]"
                    />
                  </div>
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#3D231E] text-white font-bold text-xs rounded-full hover:bg-[#52312A] shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4 text-[#E8A2A5]" />
                  <span>Confirm À La Carte Order</span>
                </button>
              </form>
            ) : (
              /* Success confirmation state */
              <div className="text-center space-y-5">
                <div className="w-14 h-14 rounded-full bg-[#FAF6EB] text-[#3D231E] mx-auto flex items-center justify-center border border-[#DDD2B1] shadow-2xs">
                  <Check className="w-7 h-7 text-[#9B8B59]" />
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-mono font-bold text-[#D07A7E] uppercase tracking-widest">
                    Order Registered
                  </span>
                  <h3 className="font-display font-extrabold text-xl text-[#3D231E]">
                    Order Ticket: {confirmedTicket}
                  </h3>
                  <p className="text-xs text-[#7A574E]">
                    Thank you, {guestName || 'Snuggie'}! Please show this ticket code to our cashier counter.
                  </p>
                </div>

                <div className="p-4 bg-[#FAF6EB] rounded-2xl border border-[#DDD2B1] text-left text-xs space-y-2">
                  <div className="flex items-center justify-between pb-2 border-b border-[#DDD2B1]/60">
                    <span className="font-bold text-[#3D231E]">
                      {standaloneOrder.itemType === 'drink' ? standaloneOrder.bundle.drinkName : standaloneOrder.bundle.plushieName}
                    </span>
                    <span className="font-mono font-bold text-[#3D231E]">
                      {standaloneOrder.itemType === 'drink' ? standaloneOrder.bundle.drinkOnlyPrice : standaloneOrder.bundle.plushieOnlyPrice}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-[#7A574E]">
                    <span>Format: <strong className="capitalize text-[#3D231E]">{orderFormat}</strong></span>
                    <span>No promo bundling required</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={closeStandaloneModal}
                  className="px-6 py-2.5 bg-[#3D231E] text-white text-xs font-bold rounded-full hover:bg-[#52312A] transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
