import React from 'react';
import { useApp } from '../context/AppContext';
import { Mail, Phone, MapPin, Heart, ShieldCheck, Clock, Award } from 'lucide-react';
import { CATEGORIES } from '../data/mockData';
import { ServiceCategoryType } from '../types';

export const Footer: React.FC = () => {
  const { setCurrentView, navigateToExploreWithFilters } = useApp();

  const handleCategoryClick = (catName: ServiceCategoryType) => {
    navigateToExploreWithFilters(catName);
  };

  return (
    <footer className="bg-[#2B0528] text-slate-300 pt-16 pb-12 border-t border-[#3D0C37]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Value props highlight row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-12 border-b border-[#3D0C37]">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#3D0C37] text-[#D4AF37] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-base">100% Vetted Local Professionals</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Every decorator, caterer, photographer, and DJ undergoes background and quality verification.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#3D0C37] text-[#D4AF37] flex items-center justify-center shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-base">Fast Free Custom Quotes</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Submit your celebration requirements once and receive personalized proposals within 2 hours.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#3D0C37] text-[#D4AF37] flex items-center justify-center shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-base">Direct Booking & Zero Hidden Fees</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Transparent itemized packages. Compare side-by-side and collaborate directly with owners.
              </p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 py-12">
          
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-[#55144B] text-[#D4AF37] flex items-center justify-center font-serif text-lg font-bold">
                E
              </span>
              <span className="font-serif text-2xl font-bold tracking-tight text-white">
                EventEase
              </span>
            </div>
            <p className="text-sm text-slate-300 max-w-sm leading-relaxed">
              The premier marketplace connecting celebration hosts with the finest local event artisans—from intimate birthdays to grand weddings.
            </p>
            
            <div className="space-y-2 pt-2 text-xs text-slate-300">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#D4AF37]" />
                <span>San Francisco, CA & Greater Bay Area (Expanding Nationwide)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#D4AF37]" />
                <span>+1 (800) 592-EASE (3273)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#D4AF37]" />
                <span>concierge@eventease-marketplace.com</span>
              </div>
            </div>
          </div>

          {/* Popular Categories */}
          <div>
            <h4 className="text-white text-sm font-semibold tracking-wide uppercase mb-4">
              Event Services
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              {CATEGORIES.slice(0, 6).map(cat => (
                <li key={cat.id}>
                  <button 
                    onClick={() => handleCategoryClick(cat.name)}
                    className="hover:text-white transition-colors text-left"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* More Categories */}
          <div>
            <h4 className="text-white text-sm font-semibold tracking-wide uppercase mb-4">
              More Specialties
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              {CATEGORIES.slice(6).map(cat => (
                <li key={cat.id}>
                  <button 
                    onClick={() => handleCategoryClick(cat.name)}
                    className="hover:text-white transition-colors text-left"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
              <li>
                <button 
                  onClick={() => setCurrentView('categories')}
                  className="text-[#D4AF37] hover:underline pt-1 inline-block"
                >
                  View All 11 Categories →
                </button>
              </li>
            </ul>
          </div>

          {/* For Providers & Platform */}
          <div>
            <h4 className="text-white text-sm font-semibold tracking-wide uppercase mb-4">
              For Providers
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button 
                  onClick={() => { setCurrentView('register-provider'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors"
                >
                  List Your Business
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setCurrentView('pricing'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors"
                >
                  Subscription Pricing
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setCurrentView('provider-dashboard'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors"
                >
                  Provider Portal
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setCurrentView('customer-dashboard'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors"
                >
                  Customer Bookings Hub
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setCurrentView('admin-dashboard'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors"
                >
                  Admin Governance
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-[#3D0C37] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} EventEase Inc. All rights reserved. Built for celebrations of all scales.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-400 cursor-pointer">Trust & Safety Guidelines</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
