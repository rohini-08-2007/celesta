import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { ProviderCard } from './ProviderCard';
import { CATEGORIES } from '../data/mockData';
import { EventType, ServiceCategoryType } from '../types';
import { Search, SlidersHorizontal, MapPin, X, RotateCcw } from 'lucide-react';

export const ExploreView: React.FC = () => {
  const { 
    providers, 
    selectedCategory, 
    setSelectedCategory, 
    selectedEventType, 
    setSelectedEventType,
    locationQuery,
    setLocationQuery
  } = useApp();

  const [localSearch, setLocalSearch] = useState('');
  const [priceTier, setPriceTier] = useState<'all' | 'budget' | 'mid' | 'luxury'>('all');
  const [minRating, setMinRating] = useState<number>(0);
  const [availabilityOnly, setAvailabilityOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'rating' | 'price-asc' | 'price-desc' | 'reviews'>('rating');
  const [showMobileFilters, setShowMobileFilters] = useState<boolean>(false);

  const eventTypesList: EventType[] = [
    'Wedding',
    'Birthday Party',
    'Engagement',
    'Baby Shower',
    'College Fest',
    'Corporate Event',
    'Anniversary'
  ];

  // Filtering & Sorting
  const filteredProviders = useMemo(() => {
    return providers.filter(provider => {
      // Must be approved
      if (provider.approvalStatus !== 'approved') return false;

      // Category filter
      if (selectedCategory && provider.category !== selectedCategory) {
        return false;
      }

      // Event Type filter
      if (selectedEventType && !provider.eventTypes.includes(selectedEventType)) {
        return false;
      }

      // Location filter
      if (locationQuery && !provider.city.toLowerCase().includes(locationQuery.toLowerCase()) && !provider.location.toLowerCase().includes(locationQuery.toLowerCase())) {
        return false;
      }

      // Search keyword
      if (localSearch) {
        const query = localSearch.toLowerCase();
        const matchesName = provider.businessName.toLowerCase().includes(query);
        const matchesDesc = provider.description.toLowerCase().includes(query);
        const matchesCategory = provider.category.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesCategory) return false;
      }

      // Price Tier filter
      if (priceTier === 'budget' && provider.startingPrice > 300) return false;
      if (priceTier === 'mid' && (provider.startingPrice <= 300 || provider.startingPrice > 1000)) return false;
      if (priceTier === 'luxury' && provider.startingPrice <= 1000) return false;

      // Rating filter
      if (minRating > 0 && provider.rating < minRating) return false;

      // Availability filter
      if (availabilityOnly && !provider.isAvailable) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'price-asc') return a.startingPrice - b.startingPrice;
      if (sortBy === 'price-desc') return b.startingPrice - a.startingPrice;
      if (sortBy === 'reviews') return b.reviewCount - a.reviewCount;
      return 0;
    });
  }, [providers, selectedCategory, selectedEventType, locationQuery, localSearch, priceTier, minRating, availabilityOnly, sortBy]);

  const resetFilters = () => {
    setSelectedCategory(null);
    setSelectedEventType(null);
    setLocationQuery('');
    setLocalSearch('');
    setPriceTier('all');
    setMinRating(0);
    setAvailabilityOnly(false);
    setSortBy('rating');
  };

  const hasActiveFilters = Boolean(
    selectedCategory || 
    selectedEventType || 
    locationQuery || 
    localSearch || 
    priceTier !== 'all' || 
    minRating > 0 || 
    availabilityOnly
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Page Title & Breadcrumb */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-[#E8DECB]">
        <div>
          <span className="text-xs font-semibold text-[#711A62] uppercase tracking-wider block mb-1">
            Discover Verified Professionals
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900">
            {selectedCategory ? `${selectedCategory} Professionals` : 'Explore All Event Pros'}
          </h1>
          <p className="text-sm text-slate-600 mt-1.5">
            Showing <span className="font-semibold text-slate-900 tabular-nums">{filteredProviders.length}</span> trusted event specialists ready for your celebration
          </p>
        </div>

        {/* Sort & Mobile filter trigger */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-white border border-[#E8DECB] rounded-xl text-xs font-semibold text-slate-700 shadow-xs"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#55144B]" />
            <span>Filters {hasActiveFilters && '(Active)'}</span>
          </button>

          <div className="flex items-center gap-2 bg-white border border-[#E8DECB] rounded-xl px-3 py-2 text-xs">
            <span className="text-slate-400 font-medium">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent font-semibold text-slate-800 focus:outline-none cursor-pointer"
            >
              <option value="rating">Highest Rated</option>
              <option value="reviews">Most Reviewed</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Grid: Filters Sidebar + Results */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 pt-8">
        
        {/* Filters Sidebar */}
        <div className={`lg:block ${showMobileFilters ? 'block' : 'hidden'} space-y-6 bg-[#FAF7F2] lg:bg-transparent`}>
          <div className="bg-white rounded-2xl border border-[#E8DECB] p-6 space-y-6 shadow-xs sticky top-28">
            
            <div className="flex items-center justify-between pb-4 border-b border-[#F3EDE2]">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#55144B]" />
                <h3 className="font-serif text-base font-bold text-slate-900">Filter By</h3>
              </div>
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="flex items-center gap-1 text-xs text-[#711A62] hover:underline font-semibold"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              )}
            </div>

            {/* Keyword Search */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">Search Keywords</label>
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="e.g. Floral arch, DJ, Cake..."
                  value={localSearch}
                  onChange={(e) => setLocalSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-[#FAF7F2] border border-[#E8DECB] rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#55144B]"
                />
                {localSearch && (
                  <button onClick={() => setLocalSearch('')} className="absolute right-3 top-3 text-slate-400 hover:text-slate-600">
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>

            {/* Location filter */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">Location / City</label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="e.g. San Francisco, Metro..."
                  value={locationQuery}
                  onChange={(e) => setLocationQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-[#FAF7F2] border border-[#E8DECB] rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#55144B]"
                />
              </div>
            </div>

            {/* Service Category */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">Service Category</label>
              <select
                value={selectedCategory || ''}
                onChange={(e) => setSelectedCategory(e.target.value ? (e.target.value as ServiceCategoryType) : null)}
                className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#E8DECB] rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#55144B] cursor-pointer"
              >
                <option value="">All Categories (11)</option>
                {CATEGORIES.map(c => (
                  <option key={c.id} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>

            {/* Event Type */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">Celebration Type</label>
              <select
                value={selectedEventType || ''}
                onChange={(e) => setSelectedEventType(e.target.value ? (e.target.value as EventType) : null)}
                className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#E8DECB] rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#55144B] cursor-pointer"
              >
                <option value="">Any Celebration Type</option>
                {eventTypesList.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* Price Tier Segmented Controls */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">Starting Budget</label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  onClick={() => setPriceTier('all')}
                  className={`py-2 px-2.5 rounded-lg border text-center transition-all ${priceTier === 'all' ? 'bg-[#3D0C37] text-white border-[#3D0C37] font-semibold' : 'bg-[#FAF7F2] border-[#E8DECB] text-slate-700'}`}
                >
                  All Budgets
                </button>
                <button
                  onClick={() => setPriceTier('budget')}
                  className={`py-2 px-2.5 rounded-lg border text-center transition-all ${priceTier === 'budget' ? 'bg-[#3D0C37] text-white border-[#3D0C37] font-semibold' : 'bg-[#FAF7F2] border-[#E8DECB] text-slate-700'}`}
                >
                  Under $300
                </button>
                <button
                  onClick={() => setPriceTier('mid')}
                  className={`py-2 px-2.5 rounded-lg border text-center transition-all ${priceTier === 'mid' ? 'bg-[#3D0C37] text-white border-[#3D0C37] font-semibold' : 'bg-[#FAF7F2] border-[#E8DECB] text-slate-700'}`}
                >
                  $300 - $1,000
                </button>
                <button
                  onClick={() => setPriceTier('luxury')}
                  className={`py-2 px-2.5 rounded-lg border text-center transition-all ${priceTier === 'luxury' ? 'bg-[#3D0C37] text-white border-[#3D0C37] font-semibold' : 'bg-[#FAF7F2] border-[#E8DECB] text-slate-700'}`}
                >
                  $1,000+ Luxury
                </button>
              </div>
            </div>

            {/* Minimum Star Rating */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">Minimum Rating</label>
              <div className="flex items-center gap-2">
                {[0, 4.5, 4.8, 5.0].map(rating => (
                  <button
                    key={rating}
                    onClick={() => setMinRating(rating)}
                    className={`flex-1 py-1.5 rounded-lg border text-xs font-medium text-center transition-all ${
                      minRating === rating 
                        ? 'bg-[#55144B] text-white border-[#55144B]' 
                        : 'bg-[#FAF7F2] border-[#E8DECB] text-slate-700 hover:border-slate-400'
                    }`}
                  >
                    {rating === 0 ? 'Any' : `${rating}★`}
                  </button>
                ))}
              </div>
            </div>

            {/* Immediate Availability Toggle */}
            <div className="pt-2 border-t border-[#F3EDE2]">
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-xs font-semibold text-slate-700">Available This Month</span>
                <input
                  type="checkbox"
                  checked={availabilityOnly}
                  onChange={(e) => setAvailabilityOnly(e.target.checked)}
                  className="w-4 h-4 rounded text-[#55144B] focus:ring-[#55144B] accent-[#55144B]"
                />
              </label>
            </div>

          </div>
        </div>

        {/* Results Column */}
        <div className="lg:col-span-3">
          
          {filteredProviders.length === 0 ? (
            <div className="bg-white rounded-2xl border border-[#E8DECB] p-12 text-center max-w-lg mx-auto">
              <div className="w-16 h-16 rounded-full bg-[#F3EDE2] text-[#55144B] flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 opacity-70" />
              </div>
              <h3 className="font-serif text-xl font-bold text-slate-900">No professionals found</h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                We couldn't find any service providers matching your exact criteria. Try broadening your location, adjusting the budget filter, or resetting all filters.
              </p>
              <button
                onClick={resetFilters}
                className="mt-6 px-5 py-2.5 text-xs font-semibold text-white bg-[#3D0C37] rounded-xl hover:bg-[#55144B] transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProviders.map(provider => (
                <ProviderCard key={provider.id} provider={provider} />
              ))}
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
