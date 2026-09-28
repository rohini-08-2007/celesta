import React from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORIES } from '../data/mockData';
import { ServiceCategoryType } from '../types';
import { ArrowRight, Sparkles, Check } from 'lucide-react';

export const CategoriesView: React.FC = () => {
  const { navigateToExploreWithFilters } = useApp();

  const handleCategoryExplore = (catName: ServiceCategoryType) => {
    navigateToExploreWithFilters(catName);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* Header section */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs font-semibold text-[#711A62] uppercase tracking-wider block mb-2">
          Curated Event Specializations
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-slate-900 tracking-tight">
          Explore Service Categories
        </h1>
        <p className="text-slate-600 text-sm sm:text-base mt-4 leading-relaxed">
          From breathtaking venue transformations and Michelin-grade banquet menus to candid cinematic photography and dynamic hosts, find vetted artisans for every detail.
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {CATEGORIES.map((category) => (
          <div 
            key={category.id}
            className="group bg-white rounded-2xl border border-[#E8DECB] overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-[#D4AF37]/50 flex flex-col justify-between"
          >
            <div>
              {/* Media image container with measured scrim */}
              <div className="relative aspect-16/10 w-full overflow-hidden bg-slate-100">
                <img
                  src={category.coverImage}
                  alt={category.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
                
                {/* Provider count and pricing banner */}
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white text-xs">
                  <span className="bg-black/50 backdrop-blur-xs px-2.5 py-1 rounded-md font-medium">
                    {category.providerCount} Verified Specialists
                  </span>
                  <span className="bg-[#3D0C37]/80 backdrop-blur-xs text-[#D4AF37] px-2.5 py-1 rounded-md font-semibold border border-[#D4AF37]/20">
                    From ${category.startingFrom}{category.name === 'Catering' ? '/person' : ''}
                  </span>
                </div>
              </div>

              {/* Text content */}
              <div className="p-6">
                <h3 className="font-serif text-xl font-bold text-slate-900 group-hover:text-[#55144B] transition-colors">
                  {category.name}
                </h3>
                <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">
                  {category.shortDesc}
                </p>

                {/* Popular for tags (unboxed text style) */}
                <div className="mt-4 pt-3 border-t border-[#F3EDE2]">
                  <span className="text-[11px] font-semibold text-slate-400 block uppercase mb-1.5">
                    Popular Celebrations
                  </span>
                  <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-600">
                    {category.popularFor.map((item, idx) => (
                      <React.Fragment key={item}>
                        <span>{item}</span>
                        {idx < category.popularFor.length - 1 && <span className="text-slate-300" aria-hidden="true">·</span>}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom action bar */}
            <div className="px-6 pb-6 pt-2">
              <button
                onClick={() => handleCategoryExplore(category.name)}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold text-white bg-[#3D0C37] hover:bg-[#55144B] rounded-xl transition-all shadow-xs cursor-pointer group-hover:shadow-md"
              >
                <span>Explore {category.name}</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Custom Category Request Banner */}
      <div className="mt-16 bg-[#3D0C37] rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <span className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider block mb-2">
            Looking for something unique?
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight">
            Can’t find your exact service category?
          </h2>
          <p className="text-slate-300 text-sm mt-3 leading-relaxed">
            Our event concierge team matches bespoke requirements—including ice sculptors, aerial acrobats, pyrotechnicians, and vintage car rentals.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <button
              onClick={() => navigateToExploreWithFilters()}
              className="px-6 py-3 text-xs font-semibold text-[#2B0528] bg-[#D4AF37] hover:bg-[#E2C35D] rounded-xl transition-all shadow-md cursor-pointer"
            >
              Browse All Providers
            </button>
            <span className="text-xs text-slate-400">
              Response within 2 hours guaranteed
            </span>
          </div>
        </div>
      </div>

    </div>
  );
};
