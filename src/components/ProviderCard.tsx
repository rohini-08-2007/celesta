import React from 'react';
import { Provider } from '../types';
import { useApp } from '../context/AppContext';
import { Star, CheckCircle, Heart, MapPin, Sparkles, MessageSquare, ArrowRight } from 'lucide-react';

interface ProviderCardProps {
  provider: Provider;
}

export const ProviderCard: React.FC<ProviderCardProps> = ({ provider }) => {
  const { 
    favorites, 
    toggleFavorite, 
    setSelectedProviderForModal, 
    setQuoteModalProvider,
    setContactModalProvider
  } = useApp();

  const isFavorited = favorites.includes(provider.id);

  return (
    <div className="group bg-white rounded-2xl border border-[#E8DECB] overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-[#D4AF37]/50 flex flex-col h-full">
      
      {/* Media & Image Container */}
      <div className="relative aspect-16/10 w-full overflow-hidden bg-slate-100">
        <img 
          src={provider.coverImage} 
          alt={provider.businessName}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Subtle gradient scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

        {/* Top Floating Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-1.5 pointer-events-auto">
            {provider.featured && (
              <span className="flex items-center gap-1 bg-[#3D0C37] text-[#D4AF37] text-xs font-semibold px-2.5 py-1 rounded-md shadow-sm border border-[#D4AF37]/30">
                <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                Featured
              </span>
            )}
            {provider.isAvailable && (
              <span className="flex items-center gap-1 bg-emerald-950/80 backdrop-blur-xs text-emerald-300 text-xs font-medium px-2 py-0.5 rounded-md border border-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Available
              </span>
            )}
          </div>

          {/* Favorite button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(provider.id);
            }}
            className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-slate-700 hover:text-[#55144B] transition-transform hover:scale-110 pointer-events-auto shadow-sm"
            aria-label="Save to favorites"
            title="Save to favorites"
          >
            <Heart className={`w-4 h-4 ${isFavorited ? 'text-[#8F237C] fill-[#8F237C]' : ''}`} />
          </button>
        </div>

        {/* Bottom image overlay metadata */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
          <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-xs px-2.5 py-1 rounded-md">
            <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="truncate max-w-[180px]">{provider.city}</span>
          </div>
          <div className="flex items-center gap-1 bg-black/40 backdrop-blur-xs px-2.5 py-1 rounded-md font-semibold">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>{provider.rating.toFixed(1)}</span>
            <span className="text-slate-300 font-normal">({provider.reviewCount})</span>
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        
        <div>
          {/* Category & Verified Status (Unboxed metadata style) */}
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
            <span className="font-medium text-[#711A62] tracking-wide uppercase">{provider.category}</span>
            {provider.verified && (
              <span className="flex items-center gap-1 text-slate-600 font-medium">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                Verified Pro
              </span>
            )}
          </div>

          {/* Business Name */}
          <h3 
            onClick={() => setSelectedProviderForModal(provider)}
            className="font-serif text-lg font-bold text-slate-900 line-clamp-1 hover:text-[#55144B] transition-colors cursor-pointer"
            title={provider.businessName}
          >
            {provider.businessName}
          </h3>

          {/* Short Description */}
          <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
            {provider.description}
          </p>

          {/* Unboxed details line */}
          <div className="mt-3 pt-3 border-t border-[#F3EDE2] flex items-center justify-between text-xs text-slate-500">
            <span>{provider.experienceYears} yrs experience</span>
            <span aria-hidden="true">·</span>
            <span>Responds {provider.responseTime}</span>
            <span aria-hidden="true">·</span>
            <span className="text-emerald-700 font-medium">{provider.responseRate} rate</span>
          </div>
        </div>

        {/* Pricing & CTA Actions */}
        <div className="mt-5 pt-4 border-t border-[#F3EDE2] flex items-center justify-between gap-3">
          <div>
            <span className="text-[11px] text-slate-400 block uppercase font-medium">Starting from</span>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-bold text-slate-900 font-sans tabular-nums">${provider.startingPrice}</span>
              <span className="text-[11px] text-slate-500">{provider.category === 'Catering' ? '/person' : '/event'}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setContactModalProvider(provider)}
              className="p-2.5 rounded-xl border border-[#E8DECB] hover:bg-[#FAF7F2] text-slate-700 transition-colors"
              title="Quick Message"
              aria-label="Contact provider"
            >
              <MessageSquare className="w-4 h-4 text-[#55144B]" />
            </button>

            <button
              onClick={() => setSelectedProviderForModal(provider)}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-[#3D0C37] hover:bg-[#55144B] rounded-xl transition-all shadow-xs cursor-pointer whitespace-nowrap"
            >
              <span>View Profile</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
