import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Star, 
  CheckCircle, 
  MapPin, 
  Clock, 
  Sparkles, 
  Heart, 
  MessageSquare, 
  Calendar, 
  ShieldCheck, 
  ArrowRight,
  ChevronRight,
  Maximize2
} from 'lucide-react';
import { ServicePackage } from '../types';

export const ProviderProfileModal: React.FC = () => {
  const { 
    selectedProviderForModal, 
    setSelectedProviderForModal,
    setQuoteModalProvider,
    setPreselectedPackageName,
    setContactModalProvider,
    favorites,
    toggleFavorite,
    addReviewToProvider
  } = useApp();

  const [activeTab, setActiveTab] = useState<'about' | 'packages' | 'portfolio' | 'reviews'>('packages');
  const [selectedPortfolioImage, setSelectedPortfolioImage] = useState<string | null>(null);

  // Review submission inside profile
  const [reviewAuthor, setReviewAuthor] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewEventType, setReviewEventType] = useState('Wedding');
  const [showReviewForm, setShowReviewForm] = useState(false);

  if (!selectedProviderForModal) return null;

  const provider = selectedProviderForModal;
  const isFavorited = favorites.includes(provider.id);

  const handleRequestQuote = (pkg?: ServicePackage) => {
    if (pkg) {
      setPreselectedPackageName(pkg.name);
    } else {
      setPreselectedPackageName(undefined);
    }
    setQuoteModalProvider(provider);
  };

  const handleBookNow = (pkg: ServicePackage) => {
    handleRequestQuote(pkg);
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewAuthor.trim() || !reviewComment.trim()) return;

    addReviewToProvider(provider.id, {
      authorName: reviewAuthor.trim(),
      rating: reviewRating,
      date: 'Just now',
      eventType: reviewEventType as any,
      comment: reviewComment.trim()
    });

    setReviewAuthor('');
    setReviewComment('');
    setShowReviewForm(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 md:p-6 animate-fadeIn">
      
      {/* Modal Card Container */}
      <div 
        className="bg-[#FAF7F2] rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-[#E8DECB]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Top Bar */}
        <div className="relative aspect-21/9 w-full bg-slate-900 shrink-0 overflow-hidden">
          <img 
            src={provider.coverImage} 
            alt={provider.businessName}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/40" />

          {/* Close & Favorite button */}
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <button
              onClick={() => toggleFavorite(provider.id)}
              className="w-9 h-9 rounded-full bg-black/50 backdrop-blur-xs text-white hover:text-[#D4AF37] flex items-center justify-center transition-colors"
              aria-label="Save to favorites"
            >
              <Heart className={`w-4 h-4 ${isFavorited ? 'text-[#8F237C] fill-[#8F237C]' : ''}`} />
            </button>
            <button
              onClick={() => setSelectedProviderForModal(null)}
              className="w-9 h-9 rounded-full bg-black/50 backdrop-blur-xs text-white hover:bg-black/70 flex items-center justify-center transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Provider identity overlay */}
          <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-3 text-white">
            <div>
              <div className="flex items-center gap-2 text-xs mb-1">
                <span className="font-semibold uppercase tracking-wider text-[#D4AF37]">{provider.category}</span>
                {provider.verified && (
                  <span className="flex items-center gap-1 bg-white/20 backdrop-blur-xs px-2 py-0.5 rounded text-[11px]">
                    <CheckCircle className="w-3 h-3 text-emerald-400" />
                    Verified Provider
                  </span>
                )}
                {provider.featured && (
                  <span className="flex items-center gap-1 bg-[#D4AF37] text-[#2B0528] font-bold px-2 py-0.5 rounded text-[11px]">
                    <Sparkles className="w-3 h-3" />
                    Featured
                  </span>
                )}
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight">
                {provider.businessName}
              </h2>
              <div className="flex items-center gap-3 text-xs text-slate-200 mt-1">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                  {provider.city}
                </span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1 text-amber-300 font-semibold">
                  <Star className="w-3.5 h-3.5 fill-amber-300" />
                  {provider.rating.toFixed(1)} ({provider.reviewCount} verified reviews)
                </span>
              </div>
            </div>

            {/* Price badge */}
            <div className="bg-black/50 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 shrink-0 self-start sm:self-end">
              <span className="text-[10px] text-slate-300 block uppercase">Starting from</span>
              <span className="text-xl font-bold text-[#D4AF37] font-sans tabular-nums">${provider.startingPrice}</span>
              <span className="text-xs text-slate-300"> / event</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white border-b border-[#E8DECB] px-6 flex items-center justify-between overflow-x-auto shrink-0">
          <div className="flex items-center gap-6 text-xs sm:text-sm font-medium">
            <button
              onClick={() => setActiveTab('packages')}
              className={`py-3.5 border-b-2 transition-all cursor-pointer ${
                activeTab === 'packages' 
                  ? 'border-[#55144B] text-[#55144B] font-bold' 
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Packages & Pricing ({provider.packages.length})
            </button>
            <button
              onClick={() => setActiveTab('about')}
              className={`py-3.5 border-b-2 transition-all cursor-pointer ${
                activeTab === 'about' 
                  ? 'border-[#55144B] text-[#55144B] font-bold' 
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              About & Experience
            </button>
            <button
              onClick={() => setActiveTab('portfolio')}
              className={`py-3.5 border-b-2 transition-all cursor-pointer ${
                activeTab === 'portfolio' 
                  ? 'border-[#55144B] text-[#55144B] font-bold' 
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Portfolio Gallery ({provider.portfolio.length})
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`py-3.5 border-b-2 transition-all cursor-pointer ${
                activeTab === 'reviews' 
                  ? 'border-[#55144B] text-[#55144B] font-bold' 
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Reviews ({provider.reviews.length})
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-2 py-2">
            <button
              onClick={() => setContactModalProvider(provider)}
              className="px-3.5 py-1.5 text-xs font-semibold rounded-lg border border-[#E8DECB] text-slate-700 hover:bg-[#FAF7F2] transition-colors"
            >
              Message
            </button>
            <button
              onClick={() => handleRequestQuote()}
              className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-[#3D0C37] text-white hover:bg-[#55144B] transition-colors shadow-xs"
            >
              Request Quote
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          
          {/* TAB 1: Packages & Pricing */}
          {activeTab === 'packages' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-serif text-xl font-bold text-slate-900">Standard Service Packages</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Transparent packages ready for direct booking or customizable upon request.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {provider.packages.map((pkg) => (
                  <div 
                    key={pkg.id} 
                    className={`bg-white rounded-2xl p-6 border transition-all flex flex-col justify-between ${
                      pkg.popular 
                        ? 'border-[#D4AF37] ring-1 ring-[#D4AF37]/50 shadow-md relative' 
                        : 'border-[#E8DECB]'
                    }`}
                  >
                    <div>
                      {pkg.popular && (
                        <span className="absolute -top-3 right-6 bg-[#3D0C37] text-[#D4AF37] text-[10px] font-bold uppercase tracking-wider px-3 py-0.5 rounded-full border border-[#D4AF37]/40 shadow-xs">
                          Most Requested
                        </span>
                      )}
                      
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-serif text-lg font-bold text-slate-900">{pkg.name}</h4>
                          <span className="text-xs text-slate-400 block mt-0.5">{pkg.duration}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-2xl font-bold text-[#55144B] font-sans tabular-nums">${pkg.price}</span>
                          <span className="text-[10px] text-slate-400 block">all inclusive</span>
                        </div>
                      </div>

                      <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                        {pkg.description}
                      </p>

                      <div className="mt-4 pt-3 border-t border-[#F3EDE2] space-y-2">
                        <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide block">
                          Included in this package:
                        </span>
                        {pkg.features.map((feat, fidx) => (
                          <div key={fidx} className="flex items-start gap-2 text-xs text-slate-700">
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-[#F3EDE2] flex items-center gap-3">
                      <button
                        onClick={() => handleBookNow(pkg)}
                        className="flex-1 py-2 px-3 text-xs font-semibold text-white bg-[#3D0C37] hover:bg-[#55144B] rounded-xl transition-colors shadow-xs text-center"
                      >
                        Book This Package
                      </button>
                      <button
                        onClick={() => handleRequestQuote(pkg)}
                        className="py-2 px-3 text-xs font-semibold text-slate-700 bg-[#FAF7F2] hover:bg-[#F3EDE2] rounded-xl border border-[#E8DECB] transition-colors"
                      >
                        Customize Quote
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: About & Experience */}
          {activeTab === 'about' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-[#E8DECB] p-6 space-y-4">
                <h3 className="font-serif text-lg font-bold text-slate-900">About {provider.businessName}</h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                  {provider.aboutLong}
                </p>

                {/* Quick stats unboxed */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-[#F3EDE2]">
                  <div>
                    <span className="text-[11px] text-slate-400 block uppercase font-medium">Experience</span>
                    <span className="text-base font-bold text-slate-900 font-sans tabular-nums">{provider.experienceYears} Years</span>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 block uppercase font-medium">Response Rate</span>
                    <span className="text-base font-bold text-emerald-700 font-sans tabular-nums">{provider.responseRate}</span>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 block uppercase font-medium">Avg. Response Time</span>
                    <span className="text-base font-bold text-slate-900 font-sans">{provider.responseTime}</span>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 block uppercase font-medium">Owner / Lead</span>
                    <span className="text-base font-bold text-slate-900 font-sans">{provider.ownerName}</span>
                  </div>
                </div>
              </div>

              {/* Event Types Handled */}
              <div className="bg-white rounded-2xl border border-[#E8DECB] p-6">
                <h4 className="font-serif text-base font-bold text-slate-900 mb-3">Celebration Types Catered</h4>
                <div className="flex flex-wrap gap-2 text-xs">
                  {provider.eventTypes.map(type => (
                    <span key={type} className="px-3 py-1.5 rounded-lg bg-[#FAF7F2] border border-[#E8DECB] text-slate-700 font-medium">
                      {type}
                    </span>
                  ))}
                </div>
              </div>

              {/* Service Trust Guarantees */}
              <div className="bg-white rounded-2xl border border-[#E8DECB] p-6 space-y-3">
                <h4 className="font-serif text-base font-bold text-slate-900">EventEase Quality Assurance</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Background-checked and certified business owner</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Free reschedule protection up to 14 days before</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Portfolio Gallery */}
          {activeTab === 'portfolio' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-xl font-bold text-slate-900">Featured Work & Gallery</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Real images from recent celebration setups and assignments.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {provider.portfolio.map((item) => (
                  <div 
                    key={item.id}
                    onClick={() => setSelectedPortfolioImage(item.imageUrl)}
                    className="group relative aspect-4/3 rounded-xl overflow-hidden bg-slate-100 cursor-pointer border border-[#E8DECB] shadow-xs"
                  >
                    <img 
                      src={item.imageUrl} 
                      alt={item.title} 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3 text-white">
                      <span className="text-xs font-semibold">{item.title}</span>
                      <span className="text-[10px] text-slate-300">{item.eventType} · {item.category}</span>
                      <Maximize2 className="w-4 h-4 text-white absolute top-3 right-3" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: Reviews */}
          {activeTab === 'reviews' && (
            <div className="space-y-6">
              
              {/* Review summary box */}
              <div className="bg-white rounded-2xl border border-[#E8DECB] p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="text-center sm:text-left">
                    <span className="text-4xl font-bold font-serif text-[#3D0C37]">{provider.rating.toFixed(1)}</span>
                    <div className="flex items-center gap-0.5 mt-1 justify-center sm:justify-start">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className="w-4 h-4 text-amber-400 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-xs text-slate-400 block mt-1">Based on {provider.reviewCount} customer reviews</span>
                  </div>
                </div>

                <button
                  onClick={() => setShowReviewForm(!showReviewForm)}
                  className="px-4 py-2 text-xs font-semibold text-[#3D0C37] bg-[#FAF7F2] hover:bg-[#F3EDE2] rounded-xl border border-[#E8DECB] transition-colors"
                >
                  {showReviewForm ? 'Cancel Review' : 'Write a Review'}
                </button>
              </div>

              {/* Review Form */}
              {showReviewForm && (
                <form onSubmit={handleSubmitReview} className="bg-white rounded-2xl border border-[#E8DECB] p-6 space-y-4">
                  <h4 className="font-serif text-base font-bold text-slate-900">Share Your Experience</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Your Name</label>
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. Maria Gonzalez"
                        value={reviewAuthor}
                        onChange={(e) => setReviewAuthor(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#E8DECB] rounded-xl focus:outline-none focus:border-[#55144B]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Event Type</label>
                      <select
                        value={reviewEventType}
                        onChange={(e) => setReviewEventType(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#E8DECB] rounded-xl focus:outline-none focus:border-[#55144B]"
                      >
                        <option value="Wedding">Wedding</option>
                        <option value="Birthday Party">Birthday Party</option>
                        <option value="Engagement">Engagement</option>
                        <option value="Anniversary">Anniversary</option>
                        <option value="College Fest">College Fest</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Star Rating</label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          type="button"
                          key={star}
                          onClick={() => setReviewRating(star)}
                          className="focus:outline-none"
                        >
                          <Star className={`w-5 h-5 ${star <= reviewRating ? 'text-amber-400 fill-amber-400' : 'text-slate-300'}`} />
                        </button>
                      ))}
                      <span className="text-xs text-slate-500 font-semibold ml-2">{reviewRating} Stars</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Your Review</label>
                    <textarea 
                      required
                      rows={3}
                      placeholder="Describe the quality of service, punctuality, and event outcome..."
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#E8DECB] rounded-xl focus:outline-none focus:border-[#55144B]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-5 py-2 text-xs font-semibold text-white bg-[#3D0C37] rounded-xl hover:bg-[#55144B] transition-colors"
                  >
                    Submit Verified Review
                  </button>
                </form>
              )}

              {/* Reviews List */}
              <div className="space-y-4">
                {provider.reviews.map((rev) => (
                  <div key={rev.id} className="bg-white rounded-2xl border border-[#E8DECB] p-5 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h5 className="font-semibold text-sm text-slate-900">{rev.authorName}</h5>
                        <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                          <span className="text-slate-600 font-medium">{rev.eventType}</span>
                          <span aria-hidden="true">·</span>
                          <span>{rev.date}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: rev.rating }).map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                        ))}
                      </div>
                    </div>

                    <p className="text-xs text-slate-700 leading-relaxed">
                      "{rev.comment}"
                    </p>

                    {rev.providerReply && (
                      <div className="mt-3 bg-[#FAF7F2] p-3 rounded-xl border border-[#E8DECB] text-xs">
                        <span className="font-semibold text-[#55144B] block mb-1">
                          Response from {provider.businessName}:
                        </span>
                        <p className="text-slate-600 italic">
                          "{rev.providerReply}"
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

            </div>
          )}

        </div>

        {/* Modal Bottom Action Bar */}
        <div className="bg-white border-t border-[#E8DECB] p-4 sm:px-6 flex items-center justify-between shrink-0">
          <div>
            <span className="text-[11px] text-slate-400 block uppercase">Starting at</span>
            <span className="text-lg font-bold text-slate-900 font-sans tabular-nums">${provider.startingPrice}</span>
            <span className="text-xs text-slate-500"> / event</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setContactModalProvider(provider)}
              className="px-4 py-2.5 rounded-xl border border-[#E8DECB] hover:bg-[#FAF7F2] text-xs font-semibold text-slate-700 transition-colors flex items-center gap-1.5"
            >
              <MessageSquare className="w-4 h-4 text-[#55144B]" />
              <span>Contact</span>
            </button>

            <button
              onClick={() => handleRequestQuote()}
              className="px-5 py-2.5 rounded-xl bg-[#3D0C37] hover:bg-[#55144B] text-xs font-semibold text-white transition-all shadow-md flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span>Request a Quote</span>
            </button>
          </div>
        </div>

      </div>

      {/* Lightbox for Portfolio Fullscreen */}
      {selectedPortfolioImage && (
        <div 
          className="fixed inset-0 z-60 bg-black/90 flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setSelectedPortfolioImage(null)}
        >
          <button
            onClick={() => setSelectedPortfolioImage(null)}
            className="absolute top-6 right-6 text-white hover:text-slate-300"
          >
            <X className="w-8 h-8" />
          </button>
          <img 
            src={selectedPortfolioImage} 
            alt="Portfolio Fullscreen" 
            className="max-h-[85vh] max-w-[90vw] object-contain rounded-xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

    </div>
  );
};
