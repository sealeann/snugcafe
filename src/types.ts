export interface PromoBundle {
  id: string;
  name: string;
  drinkName: string;
  category: 'Frappe' | 'Hot Cocoa' | 'Matcha Latte';
  drinkImage: string;
  plushieName: string;
  plushieImage: string;
  price: string;
  originalPrice?: string;
  bundleType: 'Rental' | 'Discounted Add-on';
  availability: 'Dine-In Only' | 'Dine-In & Takeaway';
  flavorNotes: string;
  offerDescription: string;
  plushieDescription: string;
  accentColor: 'toffee' | 'strawberry' | 'olive';
  drinkOnlyPrice?: string;
  plushieOnlyPrice?: string;
}

export interface VisitReservation {
  guestName: string;
  email: string;
  phone: string;
  visitDate: string;
  visitTime: string;
  partyType: 'solo' | 'couple' | 'group';
  orderType: 'dine-in' | 'takeaway';
  selectedBuddy: string;
  selectedDrink: string;
  specialNotes?: string;
}

export interface MarketingKPI {
  id: string;
  title: string;
  metric: string;
  target: string;
  currentValue: string;
  progressPercentage: number;
  purpose: string;
  accent: 'toffee' | 'strawberry' | 'olive';
}

export interface SocialPost {
  id: string;
  platform: 'instagram' | 'tiktok';
  author: string;
  handle: string;
  caption: string;
  likes: string;
  timeAgo: string;
  tag: string;
  imageOrPlushie: string;
}

export interface CartItem {
  id: string;
  bundleId: string;
  name: string;
  itemType: 'drink' | 'plushie' | 'bundle';
  isRental: boolean;
  price: number;
  priceFormatted: string;
  image: string;
  quantity: number;
}
