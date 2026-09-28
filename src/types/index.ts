export type ServiceCategoryType = 
  | 'Decorations'
  | 'Photography'
  | 'Videography'
  | 'Catering'
  | 'DJ & Music'
  | 'Anchors & MCs'
  | 'Makeup Artists'
  | 'Mehendi Artists'
  | 'Cakes & Bakery'
  | 'Florists'
  | 'Event Planning';

export type EventType = 
  | 'Wedding'
  | 'Birthday Party'
  | 'Engagement'
  | 'Baby Shower'
  | 'College Fest'
  | 'Corporate Event'
  | 'Anniversary';

export interface ServicePackage {
  id: string;
  name: string;
  price: number;
  duration: string;
  description: string;
  features: string[];
  popular?: boolean;
}

export interface Review {
  id: string;
  authorName: string;
  authorAvatar?: string;
  rating: number;
  date: string;
  eventType: EventType;
  comment: string;
  providerReply?: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  imageUrl: string;
  category: string;
  eventType?: EventType;
}

export interface Provider {
  id: string;
  businessName: string;
  ownerName: string;
  email: string;
  phone: string;
  category: ServiceCategoryType;
  location: string;
  city: string;
  startingPrice: number;
  rating: number;
  reviewCount: number;
  description: string;
  aboutLong: string;
  coverImage: string;
  profileImage: string;
  verified: boolean;
  featured: boolean;
  isAvailable: boolean;
  experienceYears: number;
  responseRate: string;
  responseTime: string;
  eventTypes: EventType[];
  packages: ServicePackage[];
  portfolio: PortfolioItem[];
  reviews: Review[];
  subscriptionTier: 'free' | 'pro' | 'premium';
  approvalStatus: 'approved' | 'pending' | 'rejected';
}

export interface QuoteRequest {
  id: string;
  providerId: string;
  providerName: string;
  providerCategory: ServiceCategoryType;
  providerImage: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  eventType: EventType;
  eventDate: string;
  location: string;
  guestCount: number;
  serviceCategory: ServiceCategoryType;
  selectedPackage?: string;
  budget: number;
  requirements: string;
  status: 'pending' | 'responded' | 'accepted' | 'declined';
  quoteAmount?: number;
  providerNote?: string;
  createdAt: string;
}

export interface Booking {
  id: string;
  providerId: string;
  providerName: string;
  providerCategory: ServiceCategoryType;
  providerImage: string;
  customerName: string;
  eventType: EventType;
  eventDate: string;
  location: string;
  packageName: string;
  totalPrice: number;
  depositPaid: number;
  status: 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  notes: string;
}

export interface CategoryInfo {
  id: string;
  name: ServiceCategoryType;
  shortDesc: string;
  iconName: string;
  coverImage: string;
  providerCount: number;
  startingFrom: number;
  popularFor: string[];
}

export type ActiveView = 
  | 'home'
  | 'categories'
  | 'explore'
  | 'provider-profile'
  | 'customer-dashboard'
  | 'provider-dashboard'
  | 'register-provider'
  | 'admin-dashboard'
  | 'pricing';

export type UserRole = 'customer' | 'provider' | 'admin';
