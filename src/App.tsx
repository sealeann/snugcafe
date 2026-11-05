import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PersonaStory } from './components/PersonaStory';
import { PromoBundles } from './components/PromoBundles';
import { PlushieRentalGuide } from './components/PlushieRentalGuide';
import { SocialMediaHub } from './components/SocialMediaHub';
import { Footer } from './components/Footer';
import { VisitPlannerModal } from './components/VisitPlannerModal';
import { MarketingPlanModal } from './components/MarketingPlanModal';
import { CartDrawer } from './components/CartDrawer';
import { PromoBundle, CartItem } from './types';

export default function App() {
  const [isPlannerOpen, setIsPlannerOpen] = useState(false);
  const [isMarketingPlanOpen, setIsMarketingPlanOpen] = useState(false);
  const [selectedBundleForPlanner, setSelectedBundleForPlanner] = useState<PromoBundle | null>(null);

  // Cart state for multiple standalone purchases
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleAddToCart = (item: {
    bundleId: string;
    name: string;
    itemType: 'drink' | 'plushie' | 'bundle';
    isRental: boolean;
    price: number;
    priceFormatted: string;
    image: string;
  }) => {
    setCart((prev) => {
      const lineId = `${item.bundleId}-${item.itemType}`;
      const existing = prev.find((x) => x.id === lineId);
      if (existing) {
        return prev.map((x) => (x.id === lineId ? { ...x, quantity: x.quantity + 1 } : x));
      }
      return [...prev, { ...item, id: lineId, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((it) => (it.id === id ? { ...it, quantity: it.quantity + delta } : it))
        .filter((it) => it.quantity > 0)
    );
  };

  const handleRemoveItem = (id: string) => {
    setCart((prev) => prev.filter((it) => it.id !== id));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleSelectBundle = (bundle: PromoBundle) => {
    setSelectedBundleForPlanner(bundle);
    setIsPlannerOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF6EB] text-[#3D231E]">
      {/* Top Bar following Top Bar Contract */}
      <Navbar
        onOpenPlanner={() => {
          setSelectedBundleForPlanner(null);
          setIsPlannerOpen(true);
        }}
        cartItemCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Main Content Flow: Proposition -> Mechanism -> Proof -> Conversion */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onOpenPlanner={() => {
            setSelectedBundleForPlanner(null);
            setIsPlannerOpen(true);
          }}
        />

        {/* Brand Persona & The Cozy Crew */}
        <PersonaStory />

        {/* 3 Promotional Bundles & Specific Offers */}
        <PromoBundles
          onSelectBundle={handleSelectBundle}
          onAddToCart={handleAddToCart}
          onOpenCart={() => setIsCartOpen(true)}
          cartCount={totalCartCount}
        />

        {/* Tactile Dine-In Plushie Rental Guide & Hygiene */}
        <PlushieRentalGuide />

        {/* Social Media Growth Hub (Instagram & TikTok) & UGC Feed */}
        <SocialMediaHub />
      </main>

      {/* Footer with Contacts, Socials & Hours */}
      <Footer />

      {/* Interactive Visit Planner Modal (Primary CTA Fulfillment) */}
      <VisitPlannerModal
        isOpen={isPlannerOpen}
        onClose={() => setIsPlannerOpen(false)}
        preselectedBundle={selectedBundleForPlanner}
        cart={cart}
        onAddToCart={handleAddToCart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Cart Drawer for Multiple Standalone Purchases */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Full Marketing Blueprint Modal */}
      <MarketingPlanModal
        isOpen={isMarketingPlanOpen}
        onClose={() => setIsMarketingPlanOpen(false)}
        onPlanVisit={() => {
          setSelectedBundleForPlanner(null);
          setIsPlannerOpen(true);
        }}
      />
    </div>
  );
}
