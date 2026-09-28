import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORIES, HERO_IMAGE, TESTIMONIALS, TRUST_METRICS } from '../data/mockData';
import { ProviderCard } from './ProviderCard';
import { EventType, ServiceCategoryType } from '../types';
import { 
  Search, 
  MapPin, 
  Calendar, 
  Sparkles, 
  ArrowRight, 
  CheckCircle, 
  Star, 
  ShieldCheck, 
  MessageSquare,
  DollarSign
} from 'lucide-react';

export const HomeView: React.FC = () => {
  const { 
    providers, 
    setCurrentView, 
    navigateToExploreWithFilters, 
    setSelectedCategory 
  } = useApp();

  const [heroLocation, setHeroLocation] = useState('San Francisco, CA');
  const [heroEventType, setHeroEventType] = useState<EventType | ''>('Wedding');
  const [heroCategory, setHeroCategory] = useState<ServiceCategoryType | ''>('Decorations');

  // Featured providers (filter providers where featured === true)
  const featuredProviders = providers.filter(p => p.featured && p.approvalStatus === 'approved');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigateToExploreWithFilters(
      heroCategory || undefined,
      heroEventType || undefined,
      heroLocation || undefined
    );
  };

  return (
    <div className="space-y-20 pb-20">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24">
        
        {/* Ambient background decoration */}
        <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-[#F3EDE2]/60 to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Headline, Subtitle, Search Widget */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#3D0C37]/8 border border-[#3D0C37]/15 text-[#55144B] text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>The Premier Local Event-Services Marketplace</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#2B0528] leading-[1.12]">
                Everything You Need for Your Perfect Event
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed">
                Discover trusted local event professionals, compare services, and make your celebration unforgettable.
              </p>

              {/* SEARCH WIDGET CARD */}
              <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-xl border border-[#E8DECB] mt-8">
                <form onSubmit={handleSearchSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    
                    {/* Location input */}
                    <div className="space-y-1">
                      <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                        City / Location
                      </label>
                      <div className="relative">
                        <MapPin className="w-4 h-4 text-[#55144B] absolute left-3 top-3 pointer-events-none" />
                        <input
                          type="text"
                          value={heroLocation}
                          onChange={(e) => setHeroLocation(e.target.value)}
                          placeholder="e.g. San Francisco, CA"
                          className="w-full pl-9 pr-3 py-2.5 text-xs bg-[#FAF7F2] border border-[#E8DECB] rounded-xl text-slate-800 focus:outline-none focus:border-[#55144B] font-medium"
                        />
                      </div>
                    </div>

                    {/* Event Type dropdown */}
                    <div className="space-y-1">
                      <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                        Celebration
                      </label>
                      <div className="relative">
                        <Calendar className="w-4 h-4 text-[#55144B] absolute left-3 top-3 pointer-events-none" />
                        <select
                          value={heroEventType}
                          onChange={(e) => setHeroEventType(e.target.value as any)}
                          className="w-full pl-9 pr-3 py-2.5 text-xs bg-[#FAF7F2] border border-[#E8DECB] rounded-xl text-slate-800 focus:outline-none focus:border-[#55144B] font-medium appearance-none cursor-pointer"
                        >
                          <option value="">Any Event Type</option>
                          <option value="Wedding">Wedding</option>
                          <option value="Birthday Party">Birthday Party</option>
                          <option value="Engagement">Engagement</option>
                          <option value="Baby Shower">Baby Shower</option>
                          <option value="College Fest">College Fest</option>
                          <option value="Corporate Event">Corporate Event</option>
                          <option value="Anniversary">Anniversary</option>
                        </select>
                      </div>
                    </div>

                    {/* Service Category dropdown */}
                    <div className="space-y-1">
                      <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                        Service Category
                      </label>
                      <div className="relative">
                        <Sparkles className="w-4 h-4 text-[#55144B] absolute left-3 top-3 pointer-events-none" />
                        <select
                          value={heroCategory}
                          onChange={(e) => setHeroCategory(e.target.value as any)}
                          className="w-full pl-9 pr-3 py-2.5 text-xs bg-[#FAF7F2] border border-[#E8DECB] rounded-xl text-slate-800 focus:outline-none focus:border-[#55144B] font-medium appearance-none cursor-pointer"
                        >
                          <option value="">All Services (11)</option>
                          {CATEGORIES.map(c => (
                            <option key={c.id} value={c.name}>{c.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <span className="text-xs text-slate-400">
                      ⚡ Free custom quotes · No obligation · Verified reviews
                    </span>

                    <button
                      type="submit"
                      className="w-full sm:w-auto px-7 py-3 text-xs font-semibold text-white bg-[#3D0C37] hover:bg-[#55144B] rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Search className="w-4 h-4 text-[#D4AF37]" />
                      <span>Find Services</span>
                    </button>
                  </div>
                </form>
              </div>

            </div>

            {/* Right Column: Hero Visual Collage */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-4/3 rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src={HERO_IMAGE}
                  alt="Luxury Celebration Banquet Setup"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                
                {/* Floating pill badge unboxed */}
                <div className="absolute bottom-5 left-5 right-5 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-white/40 shadow-lg text-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#3D0C37] text-[#D4AF37] flex items-center justify-center font-serif text-lg font-bold">
                      ★
                    </div>
                    <div>
                      <div className="font-semibold text-xs text-slate-900">Top-Rated Celebration Planners</div>
                      <div className="text-[11px] text-slate-500">4.92 Average Rating across 18,400+ events</div>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#55144B]">Verified</span>
                </div>
              </div>
            </div>

          </div>

          {/* Trust stats row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-12 mt-12 border-t border-[#E8DECB]/70">
            {TRUST_METRICS.map((metric, i) => (
              <div key={i} className="text-center sm:text-left">
                <div className="text-2xl sm:text-3xl font-bold font-serif text-[#3D0C37] tabular-nums">
                  {metric.value}
                </div>
                <div className="text-xs text-slate-500 mt-1 font-medium">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 2. POPULAR SERVICE CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-semibold text-[#711A62] uppercase tracking-wider block mb-1">
              Curated Specializations
            </span>
            <h2 className="font-serif text-3xl font-bold text-slate-900">
              Popular Event Services
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Everything you need to orchestrate milestone weddings, birthdays, baby showers, and parties.
            </p>
          </div>

          <button
            onClick={() => setCurrentView('categories')}
            className="flex items-center gap-1.5 text-xs font-semibold text-[#55144B] hover:text-[#711A62] transition-colors"
          >
            <span>View All 11 Categories</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {CATEGORIES.slice(0, 5).map((category) => (
            <div
              key={category.id}
              onClick={() => navigateToExploreWithFilters(category.name)}
              className="group bg-white rounded-2xl border border-[#E8DECB] p-4 text-center hover:shadow-lg hover:border-[#D4AF37]/50 transition-all cursor-pointer flex flex-col justify-between"
            >
              <div className="relative aspect-4/3 rounded-xl overflow-hidden mb-3 bg-slate-100">
                <img
                  src={category.coverImage}
                  alt={category.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <div>
                <h3 className="font-serif text-sm font-bold text-slate-900 group-hover:text-[#55144B] transition-colors">
                  {category.name}
                </h3>
                <span className="text-[11px] text-slate-500 block mt-0.5">
                  From ${category.startingFrom}{category.name === 'Catering' ? '/person' : ''}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. FEATURED PROVIDERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-semibold text-[#711A62] uppercase tracking-wider block mb-1">
              Spotlight Talent
            </span>
            <h2 className="font-serif text-3xl font-bold text-slate-900">
              Featured Event Professionals
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Hand-selected for outstanding craftsmanship, flawless reviews, and rapid response times.
            </p>
          </div>

          <button
            onClick={() => setCurrentView('explore')}
            className="flex items-center gap-1.5 text-xs font-semibold text-[#55144B] hover:text-[#711A62] transition-colors"
          >
            <span>Explore All Providers</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProviders.slice(0, 3).map((provider) => (
            <ProviderCard key={provider.id} provider={provider} />
          ))}
        </div>
      </section>

      {/* 4. HOW IT WORKS */}
      <section className="bg-white border-y border-[#E8DECB] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-semibold text-[#711A62] uppercase tracking-wider block mb-2">
              Effortless Booking Process
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900">
              How EventEase Works
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Three simple steps to coordinate every artisan for your celebration.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            
            {/* Step 1 */}
            <div className="bg-[#FAF7F2] rounded-2xl p-6 border border-[#E8DECB] space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#3D0C37] text-[#D4AF37] flex items-center justify-center font-serif text-xl font-bold">
                01
              </div>
              <h3 className="font-serif text-lg font-bold text-slate-900">Discover & Compare</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Filter verified decorators, caterers, photographers, and DJs by budget, date, and verified reviews. Preview genuine past event photos.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-[#FAF7F2] rounded-2xl p-6 border border-[#E8DECB] space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#3D0C37] text-[#D4AF37] flex items-center justify-center font-serif text-xl font-bold">
                02
              </div>
              <h3 className="font-serif text-lg font-bold text-slate-900">Request Custom Quotes</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Share your celebration date, guest count, and vision in one click. Receive itemized proposals with zero pressure or hidden charges.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-[#FAF7F2] rounded-2xl p-6 border border-[#E8DECB] space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#3D0C37] text-[#D4AF37] flex items-center justify-center font-serif text-xl font-bold">
                03
              </div>
              <h3 className="font-serif text-lg font-bold text-slate-900">Celebrate with Confidence</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Lock in dates directly with owners. Enjoy complete reschedule protection and verified communication up until showtime.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 5. CUSTOMER TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-semibold text-[#711A62] uppercase tracking-wider block mb-2">
            Real Stories, Real Celebrations
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900">
            Loved by Event Hosts
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2">
            Read verified reviews from couples, families, and organizers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((test) => (
            <div key={test.id} className="bg-white rounded-2xl border border-[#E8DECB] p-6 flex flex-col justify-between shadow-xs">
              <div className="space-y-3">
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: test.rating }).map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-700 leading-relaxed italic">
                  "{test.quote}"
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-[#F3EDE2]">
                <div className="font-bold text-xs text-slate-900">{test.author}</div>
                <div className="text-[11px] text-slate-400">
                  {test.role} · {test.eventType} ({test.location})
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. JOIN AS SERVICE PROVIDER CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#2B0528] rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 border border-[#3D0C37]">
          
          <div className="space-y-4 max-w-xl">
            <span className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider block">
              For Event Professionals
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight">
              Grow Your Event Business with Qualified Local Leads
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Join hundreds of vetted decorators, caterers, photographers, DJs, and planners. Set your own prices, manage your portfolio, and receive direct quote inquiries.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 pt-2">
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                Free to list
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                Keep 92-100% of earnings
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                Direct client chat
              </span>
            </div>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => {
                setCurrentView('register-provider');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-6 py-3.5 text-xs font-semibold text-[#2B0528] bg-[#D4AF37] hover:bg-[#E2C35D] rounded-xl transition-all shadow-md cursor-pointer text-center"
            >
              List Your Business Now
            </button>
            <button
              onClick={() => {
                setCurrentView('pricing');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-5 py-3.5 text-xs font-semibold text-white bg-white/10 hover:bg-white/20 rounded-xl transition-all border border-white/20 text-center"
            >
              View Provider Plans
            </button>
          </div>

        </div>
      </section>

    </div>
  );
};
