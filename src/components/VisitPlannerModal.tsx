import React, { useState } from 'react';
import { X, Calendar, Clock, Heart, Users, Coffee, Check, ShieldCheck, Download, Sparkles, AlertCircle, ShoppingBag, Plus, Minus, Trash2 } from 'lucide-react';
import { CAMPAIGN_INFO, PROMO_BUNDLES } from '../data/cafeData';
import { PromoBundle, CartItem } from '../types';

interface VisitPlannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedBundle?: PromoBundle | null;
  cart?: CartItem[];
  onAddToCart?: (item: {
    bundleId: string;
    name: string;
    itemType: 'drink' | 'plushie' | 'bundle';
    isRental: boolean;
    price: number;
    priceFormatted: string;
    image: string;
  }) => void;
  onUpdateQuantity?: (id: string, delta: number) => void;
  onRemoveItem?: (id: string) => void;
  onOpenCart?: () => void;
}

export const VisitPlannerModal: React.FC<VisitPlannerModalProps> = ({
  isOpen,
  onClose,
  preselectedBundle,
  cart = [],
  onAddToCart,
  onUpdateQuantity,
  onRemoveItem,
  onOpenCart,
}) => {
  const [step, setStep] = useState<'form' | 'confirmed'>('form');
  const [partyType, setPartyType] = useState<'solo' | 'couple' | 'group'>('solo');
  const [orderType, setOrderType] = useState<'dine-in' | 'takeaway'>('dine-in');
  const [visitDate, setVisitDate] = useState('2026-11-08');
  const [visitTime, setVisitTime] = useState('14:30');
  const [selectedBundleId, setSelectedBundleId] = useState(
    preselectedBundle ? preselectedBundle.id : 'pebble-choco'
  );
  const [purchaseMode, setPurchaseMode] = useState<'bundle' | 'drink' | 'plushie'>('bundle');
  const [addedCartFeedback, setAddedCartFeedback] = useState<string | null>(null);
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('+63 920 963 1006');
  const [snugPassCode, setSnugPassCode] = useState('');

  if (!isOpen) return null;

  const handleAddCartFromModal = (b: PromoBundle, mode: 'bundle' | 'drink' | 'plushie' = purchaseMode) => {
    if (!onAddToCart) return;
    const isDrink = mode === 'drink';
    const isBundle = mode === 'bundle';
    const isRental = isBundle ? b.bundleType === 'Rental' : (b.bundleType === 'Rental' && !isDrink);
    
    let priceNum = 0;
    let name = '';
    let image = '';

    const parsePrice = (raw?: string) => {
      if (!raw) return 0;
      const match = raw.match(/\d+/);
      return match ? parseInt(match[0], 10) : 0;
    };

    if (isBundle) {
      priceNum = parsePrice(b.price);
      name = b.name;
      image = b.drinkImage;
    } else if (isDrink) {
      priceNum = parsePrice(b.drinkOnlyPrice);
      name = b.drinkName;
      image = b.drinkImage;
    } else {
      priceNum = parsePrice(b.plushieOnlyPrice);
      name = b.plushieName;
      image = b.plushieImage;
    }

    onAddToCart({
      bundleId: b.id,
      name,
      itemType: mode,
      isRental,
      price: priceNum,
      priceFormatted: `₱${priceNum}`,
      image,
    });

    const key = `${b.id}-${mode}`;
    setAddedCartFeedback(key);
    setTimeout(() => {
      setAddedCartFeedback((curr) => (curr === key ? null : curr));
    }, 1500);
  };

  const selectedBundle = PROMO_BUNDLES.find((b) => b.id === selectedBundleId) || PROMO_BUNDLES[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const randomCode = `SNUG-${Math.floor(1000 + Math.random() * 9000)}`;
    setSnugPassCode(randomCode);
    setStep('confirmed');
  };

  const resetAndClose = () => {
    setStep('form');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-[#DDD2B1] max-h-[92vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#FAF6EB] flex items-center justify-between bg-[#FAF6EB]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#3D231E] text-white flex items-center justify-center">
              <Heart className="w-5 h-5 text-[#E8A2A5] fill-[#E8A2A5]" />
            </div>
            <div>
              <span className="text-[11px] font-mono text-[#9B8B59] uppercase tracking-wider block">
                {CAMPAIGN_INFO.tagline}
              </span>
              <h3 className="font-display font-bold text-xl text-[#3D231E]">
                {step === 'form' ? 'Plan Your Snug Visit' : 'Your Snug Pass is Ready!'}
              </h3>
            </div>
          </div>

          <button
            onClick={resetAndClose}
            className="w-9 h-9 rounded-full bg-white border border-[#DDD2B1] flex items-center justify-center text-[#7A574E] hover:text-[#3D231E] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 overflow-y-auto">
          {step === 'form' ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Primary CTA Reminder */}
              <div className="p-4 rounded-2xl bg-[#FAF6EB] border border-[#DDD2B1]/80 text-xs text-[#3D231E] flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-[#E8A2A5] shrink-0" />
                <div>
                  <span className="font-bold block">Find Your Snugness at Snug Cafe — Visit Us Today!</span>
                  <span className="text-[#7A574E]">Reserve your table & tabletop companion ahead of peak cuddle hours (1:00 PM – 7:00 PM).</span>
                </div>
              </div>

              {/* Order & Experience Type */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-[#7A574E] uppercase tracking-wider">
                  Experience Format
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setOrderType('dine-in')}
                    className={`p-3 rounded-2xl text-center border transition-all cursor-pointer ${
                      orderType === 'dine-in'
                        ? 'border-[#3D231E] bg-[#FAF6EB] text-[#3D231E] shadow-2xs font-semibold'
                        : 'border-[#DDD2B1] text-[#7A574E] hover:bg-[#FAF6EB]/50'
                    }`}
                  >
                    <div className="flex items-center justify-center gap-1.5 text-xs mb-1">
                      <span>Dine-In</span>
                      {orderType === 'dine-in' && <Check className="w-3.5 h-3.5 text-[#3D231E]" />}
                    </div>
                    <span className="text-[11px] text-[#7A574E] block">
                      Tabletop Buddy Rental (Capybara or Mossy Bear) eligible.
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setOrderType('takeaway');
                      setSelectedBundleId('pebble-choco');
                    }}
                    className={`p-3 rounded-2xl text-center border transition-all cursor-pointer ${
                      orderType === 'takeaway'
                        ? 'border-[#3D231E] bg-[#FAF6EB] text-[#3D231E] shadow-2xs font-semibold'
                        : 'border-[#DDD2B1] text-[#7A574E] hover:bg-[#FAF6EB]/50'
                    }`}
                  >
                    <div className="flex items-center justify-center gap-1.5 text-xs mb-1">
                      <span>Takeaway</span>
                      {orderType === 'takeaway' && <Check className="w-3.5 h-3.5 text-[#3D231E]" />}
                    </div>
                    <span className="text-[11px] text-[#7A574E] block">
                      Skippie Penguin Couple purchase add-on eligible.
                    </span>
                  </button>
                </div>

                {orderType === 'takeaway' && (
                  <p className="text-[11px] text-[#D07A7E] flex items-center gap-1.5 pt-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>Tabletop plushie rentals (Capybara & Mossy Bear) are strictly for Dine-In Snuggies.</span>
                  </p>
                )}
              </div>

              {/* Party Type Selection */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-[#7A574E] uppercase tracking-wider">
                  Who Are You Visiting With?
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'solo', label: 'Solo Snuggie', desc: 'Quiet study / unwinding' },
                    { id: 'couple', label: 'Cozy Couple', desc: 'Date night / besties' },
                    { id: 'group', label: 'Study Group', desc: '3–6 person circle' },
                  ].map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setPartyType(p.id as 'solo' | 'couple' | 'group')}
                      className={`p-3 rounded-2xl text-center border transition-all cursor-pointer ${
                        partyType === p.id
                          ? 'border-[#3D231E] bg-[#FAF6EB] text-[#3D231E] font-semibold shadow-2xs'
                          : 'border-[#DDD2B1] text-[#7A574E] hover:bg-[#FAF6EB]/50'
                      }`}
                    >
                      <span className="text-xs block font-bold">{p.label}</span>
                      <span className="text-[10px] text-[#7A574E] block mt-0.5">{p.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-[#7A574E] uppercase tracking-wider">
                    Visit Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      required
                      value={visitDate}
                      min="2026-11-01"
                      max="2026-12-31"
                      onChange={(e) => setVisitDate(e.target.value)}
                      className="w-full px-4 py-2.5 text-xs text-[#3D231E] bg-[#FAF6EB] border border-[#DDD2B1] rounded-xl focus:outline-none focus:border-[#3D231E]"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-[#7A574E] uppercase tracking-wider">
                    Target Arrival Time
                  </label>
                  <div className="relative">
                    <input
                      type="time"
                      required
                      value={visitTime}
                      onChange={(e) => setVisitTime(e.target.value)}
                      className="w-full px-4 py-2.5 text-xs text-[#3D231E] bg-[#FAF6EB] border border-[#DDD2B1] rounded-xl focus:outline-none focus:border-[#3D231E]"
                    />
                  </div>
                </div>
              </div>

              {/* Select Promotional Bundle & Buddy (Connected to Add to Cart for Multiple Purchases) */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="block text-xs font-bold text-[#7A574E] uppercase tracking-wider">
                      Select & Add Items to Order
                    </label>
                    <span className="text-[11px] text-[#7A574E]">
                      Select single or add multiple items for your visit or takeaway.
                    </span>
                  </div>
                  {onOpenCart && (
                    <button
                      type="button"
                      onClick={onOpenCart}
                      className="text-[11px] font-semibold text-[#D07A7E] hover:text-[#3D231E] flex items-center gap-1.5 cursor-pointer bg-[#FAF6EB] px-2.5 py-1 rounded-full border border-[#DDD2B1]"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Cozy Cart ({cart.reduce((acc, it) => acc + it.quantity, 0)})</span>
                    </button>
                  )}
                </div>

                {/* Purchase Mode Switcher: Bundle vs Drink Only vs Plushie Only */}
                <div className="grid grid-cols-3 gap-1.5 p-1 bg-[#FAF6EB] rounded-full border border-[#DDD2B1]">
                  <button
                    type="button"
                    onClick={() => setPurchaseMode('bundle')}
                    className={`py-1.5 text-xs font-semibold rounded-full transition-all cursor-pointer ${
                      purchaseMode === 'bundle'
                        ? 'bg-[#3D231E] text-white shadow-xs'
                        : 'text-[#7A574E] hover:text-[#3D231E]'
                    }`}
                  >
                    Promo Bundle
                  </button>
                  <button
                    type="button"
                    onClick={() => setPurchaseMode('drink')}
                    className={`py-1.5 text-xs font-semibold rounded-full transition-all cursor-pointer ${
                      purchaseMode === 'drink'
                        ? 'bg-[#3D231E] text-white shadow-xs'
                        : 'text-[#7A574E] hover:text-[#3D231E]'
                    }`}
                  >
                    Drink Only
                  </button>
                  <button
                    type="button"
                    onClick={() => setPurchaseMode('plushie')}
                    className={`py-1.5 text-xs font-semibold rounded-full transition-all cursor-pointer ${
                      purchaseMode === 'plushie'
                        ? 'bg-[#3D231E] text-white shadow-xs'
                        : 'text-[#7A574E] hover:text-[#3D231E]'
                    }`}
                  >
                    Plushie Only
                  </button>
                </div>

                {/* Dynamic Items List with Multiple Item Stepper & Add to Order */}
                <div className="space-y-2">
                  {PROMO_BUNDLES.map((b) => {
                    const isRental = b.bundleType === 'Rental';
                    const isDisabledForTakeaway =
                      orderType === 'takeaway' &&
                      ((purchaseMode === 'bundle' && b.id !== 'pebble-choco') ||
                        (purchaseMode === 'plushie' && isRental));

                    const itemTitle =
                      purchaseMode === 'bundle'
                        ? b.name
                        : purchaseMode === 'drink'
                        ? b.drinkName
                        : b.plushieName;

                    const itemImage =
                      purchaseMode === 'plushie' ? b.plushieImage : b.drinkImage;

                    const itemPrice =
                      purchaseMode === 'bundle'
                        ? b.price
                        : purchaseMode === 'drink'
                        ? b.drinkOnlyPrice
                        : b.plushieOnlyPrice;

                    const itemDesc =
                      purchaseMode === 'bundle'
                        ? `Includes: ${b.plushieName} (${b.bundleType})`
                        : purchaseMode === 'drink'
                        ? 'Handcrafted signature beverage'
                        : isRental
                        ? 'Tabletop cuddle companion (Dine-in rental)'
                        : 'Keepsake cuddle pair (Take home)';

                    const isSelected = selectedBundleId === b.id;
                    const isCartAdded = addedCartFeedback === `${b.id}-${purchaseMode}`;
                    const lineId = `${b.id}-${purchaseMode}`;
                    const cartItem = cart.find(
                      (it) => it.id === lineId || (it.bundleId === b.id && it.itemType === purchaseMode)
                    );

                    return (
                      <div
                        key={b.id}
                        onClick={() => {
                          if (!isDisabledForTakeaway) {
                            setSelectedBundleId(b.id);
                          }
                        }}
                        className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 cursor-pointer ${
                          isDisabledForTakeaway
                            ? 'opacity-40 cursor-not-allowed bg-gray-50 border-gray-200'
                            : isSelected
                            ? 'border-[#3D231E] bg-[#FAF6EB] shadow-2xs'
                            : 'border-[#DDD2B1] hover:bg-[#FAF6EB]/40'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <img
                            src={itemImage}
                            alt={itemTitle}
                            className="w-12 h-12 object-contain rounded-xl bg-white p-1 border border-[#DDD2B1]/60 shrink-0"
                          />
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="font-display font-bold text-xs text-[#3D231E] block truncate">
                                {itemTitle}
                              </span>
                              {cartItem && (
                                <span className="bg-[#3D231E] text-white text-[10px] font-mono px-1.5 py-0.2 rounded-md font-bold">
                                  {cartItem.quantity} in order
                                </span>
                              )}
                            </div>
                            <span className="text-[11px] text-[#7A574E] block truncate">
                              {itemDesc}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2.5 shrink-0">
                          <div className="text-right">
                            <span className="font-mono text-xs font-bold text-[#3D231E] block">
                              {itemPrice}
                            </span>
                            <span className="text-[10px] text-[#9B8B59] font-medium block">
                              {purchaseMode === 'bundle'
                                ? b.availability
                                : isRental && purchaseMode === 'plushie'
                                ? 'Dine-In Rental'
                                : 'Available'}
                            </span>
                          </div>

                          {/* Multiple Items Quantity Controls or Add Action */}
                          {onAddToCart && !isDisabledForTakeaway && (
                            <>
                              {cartItem ? (
                                <div
                                  onClick={(e) => e.stopPropagation()}
                                  className="flex items-center gap-1 bg-white px-1.5 py-1 rounded-xl border border-[#DDD2B1] shadow-2xs"
                                >
                                  <button
                                    type="button"
                                    onClick={() => onUpdateQuantity?.(cartItem.id, -1)}
                                    className="w-5 h-5 rounded-md bg-[#FAF6EB] hover:bg-[#3D231E] hover:text-white text-[#3D231E] flex items-center justify-center transition-colors cursor-pointer"
                                    title="Decrease quantity"
                                  >
                                    <Minus className="w-3 h-3" />
                                  </button>
                                  <span className="font-mono text-xs font-bold px-1.5 text-[#3D231E] min-w-[1rem] text-center">
                                    {cartItem.quantity}
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() => onUpdateQuantity?.(cartItem.id, 1)}
                                    className="w-5 h-5 rounded-md bg-[#3D231E] text-white hover:bg-[#52312A] flex items-center justify-center transition-colors cursor-pointer"
                                    title="Increase quantity"
                                  >
                                    <Plus className="w-3 h-3" />
                                  </button>
                                </div>
                              ) : (
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleAddCartFromModal(b, purchaseMode);
                                  }}
                                  className={`px-3.5 py-1.5 rounded-xl text-[11px] font-semibold border transition-all cursor-pointer whitespace-nowrap flex items-center justify-center ${
                                    isCartAdded
                                      ? 'bg-[#9B8B59] text-white border-[#9B8B59]'
                                      : 'bg-white hover:bg-[#3D231E] hover:text-white text-[#3D231E] border-[#DDD2B1]'
                                  }`}
                                  title="Add to order"
                                >
                                  <span>{isCartAdded ? 'Added ✓' : 'Add'}</span>
                                </button>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Multiple Items Order Tray & Summary */}
                {cart && cart.length > 0 ? (
                  <div className="bg-[#FAF6EB] rounded-2xl p-3 border border-[#DDD2B1] space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <ShoppingBag className="w-4 h-4 text-[#D07A7E]" />
                        <span className="text-xs font-bold text-[#3D231E]">
                          Multiple Items in Order ({cart.reduce((acc, it) => acc + it.quantity, 0)})
                        </span>
                      </div>
                      <span className="font-mono text-xs font-bold text-[#3D231E]">
                        Total: ₱{cart.reduce((acc, it) => acc + it.price * it.quantity, 0)}
                      </span>
                    </div>

                    {/* Chips for multiple items */}
                    <div className="flex flex-wrap gap-1.5 max-h-28 overflow-y-auto pt-0.5">
                      {cart.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-xl border border-[#DDD2B1] text-[11px] text-[#3D231E]"
                        >
                          <span className="font-bold text-[#9B8B59]">{item.quantity}x</span>
                          <span className="font-medium truncate max-w-[130px]">{item.name}</span>
                          <span className="font-mono text-[10px] text-[#7A574E]">
                            ₱{item.price * item.quantity}
                          </span>
                          <div className="flex items-center gap-0.5 ml-1">
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity?.(item.id, -1)}
                              className="w-4 h-4 rounded flex items-center justify-center hover:bg-gray-100 text-[#7A574E]"
                              title="Decrease"
                            >
                              <Minus className="w-2.5 h-2.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity?.(item.id, 1)}
                              className="w-4 h-4 rounded flex items-center justify-center hover:bg-gray-100 text-[#3D231E]"
                              title="Increase"
                            >
                              <Plus className="w-2.5 h-2.5" />
                            </button>
                            {onRemoveItem && (
                              <button
                                type="button"
                                onClick={() => onRemoveItem(item.id)}
                                className="w-4 h-4 rounded flex items-center justify-center hover:bg-red-50 text-[#D07A7E] ml-0.5"
                                title="Remove"
                              >
                                <Trash2 className="w-2.5 h-2.5" />
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-1 border-t border-[#DDD2B1]/70 text-[11px]">
                      <span className="text-[#7A574E]">
                        All items will be prepped together for your visit.
                      </span>
                      {onOpenCart && (
                        <button
                          type="button"
                          onClick={onOpenCart}
                          className="font-bold text-[#D07A7E] hover:text-[#3D231E] flex items-center gap-1 cursor-pointer"
                        >
                          <span>Open Full Cart</span>
                          <span aria-hidden="true">&rarr;</span>
                        </button>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="p-2.5 bg-[#FAF6EB]/60 rounded-xl border border-dashed border-[#DDD2B1] text-[11px] text-[#7A574E] text-center">
                    Want to buy multiple drinks or plushies? Click <strong>Add</strong> on any item above to add multiples to your order!
                  </div>
                )}
              </div>

              {/* Guest Details */}
              <div className="space-y-3 pt-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                      className="w-full px-3.5 py-2.5 text-xs text-[#3D231E] bg-white border border-[#DDD2B1] rounded-xl focus:outline-none focus:border-[#3D231E]"
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
                      className="w-full px-3.5 py-2.5 text-xs text-[#3D231E] bg-white border border-[#DDD2B1] rounded-xl focus:outline-none focus:border-[#3D231E]"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#7A574E] uppercase tracking-wider">
                    Phone / Contact Number
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+639209631006"
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs text-[#3D231E] bg-white border border-[#DDD2B1] rounded-xl focus:outline-none focus:border-[#3D231E]"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-4 bg-[#3D231E] text-white font-bold text-sm rounded-full hover:bg-[#52312A] shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Confirm Table Reservation</span>
                <Sparkles className="w-4 h-4 text-[#E8A2A5]" />
              </button>
            </form>
          ) : (
            /* Confirmation Pass View */
            <div className="space-y-6 text-center">
              <div className="w-16 h-16 rounded-full bg-[#FAF6EB] text-[#3D231E] mx-auto flex items-center justify-center border border-[#DDD2B1] shadow-2xs">
                <Check className="w-8 h-8 text-[#9B8B59]" />
              </div>

              <div className="space-y-1">
                <span className="text-xs font-mono font-bold text-[#D07A7E] uppercase tracking-widest">
                  Confirmed Snuggie Reservation
                </span>
                <h3 className="font-display font-extrabold text-2xl text-[#3D231E]">
                  We Can’t Wait to Welcome You, {guestName || 'Snuggie'}!
                </h3>
                <p className="text-xs text-[#7A574E]">
                  Show this pass to our counter barista upon arrival.
                </p>
              </div>

              {/* The Visual Snug Pass Ticket */}
              <div className="bg-[#FAF6EB] rounded-3xl p-6 border-2 border-dashed border-[#DDD2B1] text-left space-y-4 relative">
                <div className="flex items-center justify-between pb-3 border-b border-[#DDD2B1]/80">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-[#7A574E] block">Reservation Pass</span>
                    <span className="font-mono text-xl font-bold text-[#3D231E]">{snugPassCode}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-mono uppercase text-[#7A574E] block">Experience</span>
                    <span className="text-xs font-bold text-[#9B8B59] uppercase">{orderType}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-[#7A574E] block text-[11px]">Guest:</span>
                    <strong className="text-[#3D231E]">{guestName || 'Valued Snuggie'}</strong>
                  </div>
                  <div>
                    <span className="text-[#7A574E] block text-[11px]">Party:</span>
                    <strong className="text-[#3D231E] capitalize">{partyType} Visit</strong>
                  </div>
                  <div>
                    <span className="text-[#7A574E] block text-[11px]">Date & Time:</span>
                    <strong className="text-[#3D231E]">{visitDate} at {visitTime}</strong>
                  </div>
                  <div>
                    <span className="text-[#7A574E] block text-[11px]">Location:</span>
                    <strong className="text-[#3D231E]">{CAMPAIGN_INFO.location}</strong>
                  </div>
                </div>

                {cart && cart.length > 0 ? (
                  <div className="pt-3 border-t border-[#DDD2B1]/80 space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold text-[#3D231E]">
                      <span>Reserved Order ({cart.reduce((a, b) => a + b.quantity, 0)} items)</span>
                      <span className="font-mono">Total: ₱{cart.reduce((a, b) => a + b.price * b.quantity, 0)}</span>
                    </div>
                    <div className="space-y-1.5 max-h-36 overflow-y-auto">
                      {cart.map((it) => (
                        <div key={it.id} className="flex items-center justify-between text-xs text-[#52312A] bg-white p-2 rounded-xl border border-[#DDD2B1]/60">
                          <div className="flex items-center gap-2">
                            <img src={it.image} alt={it.name} className="w-7 h-7 object-contain rounded-md" />
                            <span className="font-medium">
                              {it.quantity}x {it.name} {it.isRental && <span className="text-[10px] text-[#9B8B59] font-bold">(Rental)</span>}
                            </span>
                          </div>
                          <span className="font-mono font-semibold">₱{it.price * it.quantity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="pt-3 border-t border-[#DDD2B1]/80 flex items-center gap-3">
                    <img
                      src={purchaseMode === 'drink' ? selectedBundle.drinkImage : selectedBundle.plushieImage}
                      alt={purchaseMode === 'drink' ? selectedBundle.drinkName : selectedBundle.plushieName}
                      className="w-12 h-12 object-contain bg-white rounded-xl p-1 border border-[#DDD2B1]"
                    />
                    <div className="text-xs">
                      <span className="font-bold text-[#3D231E] block">
                        {purchaseMode === 'bundle' ? selectedBundle.name : purchaseMode === 'drink' ? selectedBundle.drinkName : selectedBundle.plushieName}
                      </span>
                      <span className="text-[#7A574E]">
                        {purchaseMode === 'bundle' && (
                          <>Promo Combo: <strong>{selectedBundle.drinkName} + {selectedBundle.plushieName}</strong></>
                        )}
                        {purchaseMode === 'drink' && (
                          <>A la Carte Drink ({selectedBundle.drinkOnlyPrice})</>
                        )}
                        {purchaseMode === 'plushie' && (
                          <>{selectedBundle.bundleType === 'Rental' ? 'Tabletop Rental (Not for take-home)' : 'Keepsake Plushie'} ({selectedBundle.plushieOnlyPrice})</>
                        )}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Guidelines reminder */}
              <div className="p-3.5 bg-white rounded-2xl border border-[#DDD2B1] text-xs text-[#7A574E] text-left flex items-start gap-2.5">
                <ShieldCheck className="w-5 h-5 text-[#9B8B59] shrink-0 mt-0.5" />
                <p>
                  Remember: Tabletop rental plushies remain inside the cafe and must be returned with your food tray. We sanitize every plushie between guests with UV & steam. Enjoy your calm!
                </p>
              </div>

              <div className="flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={resetAndClose}
                  className="px-6 py-2.5 bg-[#3D231E] text-white text-xs font-bold rounded-full hover:bg-[#52312A] transition-colors cursor-pointer"
                >
                  Done & Back to Site
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
