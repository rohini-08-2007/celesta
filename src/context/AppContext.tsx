import React, { createContext, useContext, useState } from 'react';
import { 
  ActiveView, 
  Booking, 
  EventType, 
  Provider, 
  QuoteRequest, 
  Review, 
  ServiceCategoryType, 
  UserRole 
} from '../types';
import { INITIAL_BOOKINGS, INITIAL_QUOTE_REQUESTS, MOCK_PROVIDERS } from '../data/mockData';

interface AppContextType {
  currentView: ActiveView;
  setCurrentView: (view: ActiveView) => void;
  selectedCategory: ServiceCategoryType | null;
  setSelectedCategory: (cat: ServiceCategoryType | null) => void;
  selectedEventType: EventType | null;
  setSelectedEventType: (ev: EventType | null) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  locationQuery: string;
  setLocationQuery: (loc: string) => void;
  
  providers: Provider[];
  favorites: string[];
  toggleFavorite: (providerId: string) => void;
  
  selectedProviderForModal: Provider | null;
  setSelectedProviderForModal: (p: Provider | null) => void;
  
  quoteModalProvider: Provider | null;
  setQuoteModalProvider: (p: Provider | null) => void;
  preselectedPackageName?: string;
  setPreselectedPackageName: (name?: string) => void;
  
  contactModalProvider: Provider | null;
  setContactModalProvider: (p: Provider | null) => void;
  
  quoteRequests: QuoteRequest[];
  addQuoteRequest: (req: Omit<QuoteRequest, 'id' | 'createdAt' | 'status'>) => void;
  updateQuoteStatus: (id: string, status: QuoteRequest['status'], quoteAmount?: number, providerNote?: string) => void;
  
  bookings: Booking[];
  addBooking: (booking: Omit<Booking, 'id'>) => void;
  
  activeRole: UserRole;
  setActiveRole: (role: UserRole) => void;
  
  toastMessage: string | null;
  showToast: (msg: string) => void;
  
  approveProvider: (id: string) => void;
  rejectProvider: (id: string) => void;
  toggleFeaturedProvider: (id: string) => void;
  addNewProvider: (newProv: Omit<Provider, 'id' | 'rating' | 'reviewCount' | 'reviews'>) => void;
  addReviewToProvider: (providerId: string, review: Omit<Review, 'id'>) => void;
  updateProviderProfile: (providerId: string, updates: Partial<Provider>) => void;
  
  navigateToExploreWithFilters: (category?: ServiceCategoryType, eventType?: EventType, location?: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<ActiveView>('home');
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategoryType | null>(null);
  const [selectedEventType, setSelectedEventType] = useState<EventType | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  
  const [providers, setProviders] = useState<Provider[]>(MOCK_PROVIDERS);
  const [favorites, setFavorites] = useState<string[]>(['prov-1', 'prov-2']);
  
  const [selectedProviderForModal, setSelectedProviderForModal] = useState<Provider | null>(null);
  const [quoteModalProvider, setQuoteModalProvider] = useState<Provider | null>(null);
  const [preselectedPackageName, setPreselectedPackageName] = useState<string | undefined>(undefined);
  const [contactModalProvider, setContactModalProvider] = useState<Provider | null>(null);
  
  const [quoteRequests, setQuoteRequests] = useState<QuoteRequest[]>(INITIAL_QUOTE_REQUESTS);
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);
  
  const [activeRole, setActiveRole] = useState<UserRole>('customer');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3800);
  };

  const toggleFavorite = (providerId: string) => {
    setFavorites(prev => {
      const exists = prev.includes(providerId);
      const updated = exists ? prev.filter(id => id !== providerId) : [...prev, providerId];
      showToast(exists ? 'Removed from saved favorites' : 'Saved to favorites');
      return updated;
    });
  };

  const addQuoteRequest = (data: Omit<QuoteRequest, 'id' | 'createdAt' | 'status'>) => {
    const newId = `EQ-${Math.floor(10000 + Math.random() * 90000)}`;
    const newRequest: QuoteRequest = {
      ...data,
      id: newId,
      status: 'pending',
      createdAt: new Date().toISOString().split('T')[0]
    };
    setQuoteRequests(prev => [newRequest, ...prev]);
    showToast(`Quote request #${newId} submitted to ${data.providerName}!`);
  };

  const updateQuoteStatus = (id: string, status: QuoteRequest['status'], quoteAmount?: number, providerNote?: string) => {
    setQuoteRequests(prev => prev.map(req => {
      if (req.id === id) {
        return {
          ...req,
          status,
          ...(quoteAmount !== undefined ? { quoteAmount } : {}),
          ...(providerNote !== undefined ? { providerNote } : {})
        };
      }
      return req;
    }));
    showToast(`Inquiry #${id} updated: ${status.toUpperCase()}`);
  };

  const addBooking = (bookingData: Omit<Booking, 'id'>) => {
    const newId = `BK-${Math.floor(1000 + Math.random() * 9000)}`;
    const newBooking: Booking = {
      ...bookingData,
      id: newId
    };
    setBookings(prev => [newBooking, ...prev]);
    showToast(`Booking #${newId} successfully reserved!`);
  };

  const approveProvider = (id: string) => {
    setProviders(prev => prev.map(p => p.id === id ? { ...p, approvalStatus: 'approved', verified: true } : p));
    showToast('Provider application approved and verified!');
  };

  const rejectProvider = (id: string) => {
    setProviders(prev => prev.map(p => p.id === id ? { ...p, approvalStatus: 'rejected' } : p));
    showToast('Provider application rejected.');
  };

  const toggleFeaturedProvider = (id: string) => {
    setProviders(prev => prev.map(p => {
      if (p.id === id) {
        const nextState = !p.featured;
        showToast(nextState ? `${p.businessName} set to Featured!` : `${p.businessName} removed from Featured.`);
        return { ...p, featured: nextState };
      }
      return p;
    }));
  };

  const addNewProvider = (newProv: Omit<Provider, 'id' | 'rating' | 'reviewCount' | 'reviews'>) => {
    const newId = `prov-${Date.now()}`;
    const completeProvider: Provider = {
      ...newProv,
      id: newId,
      rating: 5.0,
      reviewCount: 0,
      reviews: []
    };
    setProviders(prev => [completeProvider, ...prev]);
    showToast('Your business has been registered and submitted for review!');
  };

  const addReviewToProvider = (providerId: string, reviewData: Omit<Review, 'id'>) => {
    const newReviewId = `rev-${Date.now()}`;
    const newReview: Review = { ...reviewData, id: newReviewId };
    
    setProviders(prev => prev.map(p => {
      if (p.id === providerId) {
        const updatedReviews = [newReview, ...p.reviews];
        const sumRatings = updatedReviews.reduce((acc, r) => acc + r.rating, 0);
        const newAverage = Number((sumRatings / updatedReviews.length).toFixed(1));
        return {
          ...p,
          reviews: updatedReviews,
          reviewCount: updatedReviews.length,
          rating: newAverage
        };
      }
      return p;
    }));
    showToast('Thank you for leaving a verified celebration review!');
  };

  const updateProviderProfile = (providerId: string, updates: Partial<Provider>) => {
    setProviders(prev => prev.map(p => p.id === providerId ? { ...p, ...updates } : p));
    showToast('Provider profile updated successfully.');
  };

  const navigateToExploreWithFilters = (category?: ServiceCategoryType, eventType?: EventType, location?: string) => {
    if (category !== undefined) setSelectedCategory(category);
    if (eventType !== undefined) setSelectedEventType(eventType);
    if (location !== undefined) setLocationQuery(location);
    setCurrentView('explore');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AppContext.Provider
      value={{
        currentView,
        setCurrentView,
        selectedCategory,
        setSelectedCategory,
        selectedEventType,
        setSelectedEventType,
        searchQuery,
        setSearchQuery,
        locationQuery,
        setLocationQuery,
        providers,
        favorites,
        toggleFavorite,
        selectedProviderForModal,
        setSelectedProviderForModal,
        quoteModalProvider,
        setQuoteModalProvider,
        preselectedPackageName,
        setPreselectedPackageName,
        contactModalProvider,
        setContactModalProvider,
        quoteRequests,
        addQuoteRequest,
        updateQuoteStatus,
        bookings,
        addBooking,
        activeRole,
        setActiveRole,
        toastMessage,
        showToast,
        approveProvider,
        rejectProvider,
        toggleFeaturedProvider,
        addNewProvider,
        addReviewToProvider,
        updateProviderProfile,
        navigateToExploreWithFilters
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
