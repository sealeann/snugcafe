import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, Check, AlertCircle } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [serviceFormat, setServiceFormat] = useState<'dine-in' | 'takeaway'>('dine-in');
  const [orderTicket, setOrderTicket] = useState<string | null>(null);

  if (!isOpen) return null;

  const totalAmount = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalItemCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const hasRental = items.some((item) => item.isRental);

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    setOrderTicket(`SNUG-CART-${randomCode}`);
  };

  const handleDone = () => {
    onClearCart();
    setOrderTicket(null);
    setCustomerName('');
    setCustomerEmail('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs transition-opacity duration-300">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between border-l border-[#DDD2B1] relative animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-[#DDD2B1] flex items-center justify-between bg-[#FAF6EB]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-[#3D231E] text-white flex items-center justify-center">
              <ShoppingBag className="w-4 h-4 text-[#E8A2A5]" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-[#3D231E]">Your Cozy Cart</h3>
              <span className="text-xs text-[#7A574E]">
                {totalItemCount} {totalItemCount === 1 ? 'item' : 'items'} selected
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white text-[#7A574E] hover:text-[#3D231E] transition-colors cursor-pointer"
            aria-label="Close Cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {orderTicket ? (
            /* Order Ticket Pass Confirmation */
            <div className="text-center space-y-5 my-auto py-8">
              <div className="w-16 h-16 rounded-full bg-[#FAF6EB] text-[#3D231E] mx-auto flex items-center justify-center border border-[#DDD2B1] shadow-2xs">
                <Check className="w-8 h-8 text-[#9B8B59]" />
              </div>

              <div className="space-y-1">
                <span className="text-xs font-mono font-bold text-[#D07A7E] uppercase tracking-widest">
                  Order Pass Confirmed
                </span>
                <h4 className="font-display font-bold text-2xl text-[#3D231E]">
                  Ticket #{orderTicket}
                </h4>
                <p className="text-xs text-[#7A574E]">
                  Warmest thanks, {customerName || 'Snuggie'}! Present this pass to our counter barista.
                </p>
              </div>

              {/* Receipt Breakdown */}
              <div className="bg-[#FAF6EB] rounded-2xl p-4 border border-[#DDD2B1] text-left text-xs space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-[#DDD2B1]/70 font-semibold text-[#3D231E]">
                  <span>Items ({totalItemCount})</span>
                  <span>₱{totalAmount}</span>
                </div>

                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {items.map((it) => (
                    <div key={it.id} className="flex items-center justify-between text-[#52312A]">
                      <span className="truncate pr-2">
                        {it.quantity}x {it.name}
                        {it.isRental && <span className="text-[10px] text-[#9B8B59] ml-1">(Rental)</span>}
                      </span>
                      <span className="font-mono font-semibold shrink-0">₱{it.price * it.quantity}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-[#DDD2B1]/70 flex items-center justify-between text-[11px] text-[#7A574E]">
                  <span>Format: <strong className="capitalize text-[#3D231E]">{hasRental ? 'Dine-In Sanctuary' : serviceFormat}</strong></span>
                  <span>Status: Ready to brew & cuddle</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleDone}
                className="w-full py-3 bg-[#3D231E] text-white text-xs font-bold rounded-full hover:bg-[#52312A] transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          ) : items.length === 0 ? (
            /* Empty Cart View */
            <div className="text-center py-16 space-y-3">
              <div className="w-16 h-16 rounded-full bg-[#FAF6EB] text-[#7A574E] mx-auto flex items-center justify-center border border-[#DDD2B1]">
                <ShoppingBag className="w-7 h-7 text-[#9B8B59]" />
              </div>
              <h4 className="font-display font-bold text-base text-[#3D231E]">Your Cart is Empty</h4>
              <p className="text-xs text-[#7A574E] max-w-xs mx-auto leading-relaxed">
                Add standalone drinks, tabletop plushie rentals, or keepsake couple plushies to checkout together!
              </p>
            </div>
          ) : (
            /* Items List */
            <div className="space-y-4">
              <div className="space-y-3">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-2xl bg-[#FAF6EB]/60 border border-[#DDD2B1] flex items-center justify-between gap-3"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-14 h-14 object-contain rounded-xl bg-white p-1 border border-[#DDD2B1]/60 shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <h4 className="font-display font-bold text-xs text-[#3D231E] truncate">
                        {item.name}
                      </h4>
                      <span className="text-[11px] font-mono text-[#7A574E] block">
                        {item.priceFormatted}
                        {item.isRental && (
                          <span className="ml-1 text-[10px] text-[#9B8B59] font-medium">
                            · Tabletop Rental
                          </span>
                        )}
                      </span>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="w-6 h-6 rounded-full bg-white border border-[#DDD2B1] flex items-center justify-center text-[#3D231E] hover:bg-[#DDD2B1]/40 transition-colors cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-mono font-bold text-[#3D231E] w-5 text-center">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="w-6 h-6 rounded-full bg-white border border-[#DDD2B1] flex items-center justify-center text-[#3D231E] hover:bg-[#DDD2B1]/40 transition-colors cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    <div className="text-right shrink-0 space-y-2">
                      <span className="font-mono text-xs font-bold text-[#3D231E] block">
                        ₱{item.price * item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => onRemoveItem(item.id)}
                        className="text-[#7A574E] hover:text-[#D07A7E] p-1 transition-colors cursor-pointer"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Checkout Form */}
              <form onSubmit={handleCheckout} className="space-y-4 pt-4 border-t border-[#DDD2B1]">
                {/* Dine-In or Takeaway Format */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-[#7A574E] uppercase tracking-wider">
                    Order Format
                  </label>
                  {hasRental ? (
                    <div className="p-3 bg-[#FAF6EB] rounded-2xl border border-[#DDD2B1] text-xs text-[#7A574E] flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-[#9B8B59] shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-[#3D231E] block">Dine-In Sanctuary (Rental Included)</strong>
                        <span>Your cart includes tabletop buddy rental(s) which remain in the cafe during your visit.</span>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setServiceFormat('dine-in')}
                        className={`p-2.5 rounded-xl text-center text-xs font-semibold border transition-all cursor-pointer ${
                          serviceFormat === 'dine-in'
                            ? 'border-[#3D231E] bg-[#FAF6EB] text-[#3D231E] shadow-2xs'
                            : 'border-[#DDD2B1] text-[#7A574E] hover:bg-[#FAF6EB]/40'
                        }`}
                      >
                        Dine-In
                      </button>
                      <button
                        type="button"
                        onClick={() => setServiceFormat('takeaway')}
                        className={`p-2.5 rounded-xl text-center text-xs font-semibold border transition-all cursor-pointer ${
                          serviceFormat === 'takeaway'
                            ? 'border-[#3D231E] bg-[#FAF6EB] text-[#3D231E] shadow-2xs'
                            : 'border-[#DDD2B1] text-[#7A574E] hover:bg-[#FAF6EB]/40'
                        }`}
                      >
                        Takeaway
                      </button>
                    </div>
                  )}
                </div>

                {/* Customer Details */}
                <div className="space-y-2">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-[#7A574E] uppercase tracking-wider">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Maya Santos"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-3 py-2 text-xs text-[#3D231E] bg-[#FAF6EB] border border-[#DDD2B1] rounded-xl focus:outline-none focus:border-[#3D231E]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-[#7A574E] uppercase tracking-wider">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. placeholder@gmail.com"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      className="w-full px-3 py-2 text-xs text-[#3D231E] bg-[#FAF6EB] border border-[#DDD2B1] rounded-xl focus:outline-none focus:border-[#3D231E]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#3D231E] text-white font-bold text-xs rounded-full hover:bg-[#52312A] shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 mt-2"
                >
                  <ShoppingBag className="w-4 h-4 text-[#E8A2A5]" />
                  <span>Checkout Multiple Items (₱{totalAmount})</span>
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Footer Subtotal Bar */}
        {items.length > 0 && !orderTicket && (
          <div className="p-4 sm:p-5 bg-[#FAF6EB] border-t border-[#DDD2B1] flex items-center justify-between">
            <div>
              <span className="text-[11px] text-[#7A574E] block uppercase tracking-wider">Subtotal</span>
              <span className="font-mono text-lg font-bold text-[#3D231E]">₱{totalAmount}</span>
            </div>

            <button
              type="button"
              onClick={onClearCart}
              className="text-xs text-[#7A574E] hover:text-[#D07A7E] underline cursor-pointer"
            >
              Clear Cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
