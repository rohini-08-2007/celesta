import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Heart, Menu, X, Shield, Briefcase, User, Sparkles } from 'lucide-react';
import { ActiveView, UserRole } from '../types';

export const Navbar: React.FC = () => {
  const { 
    currentView, 
    setCurrentView, 
    favorites, 
    activeRole, 
    setActiveRole,
    showToast
  } = useApp();
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (view: ActiveView) => {
    setCurrentView(view);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRoleChange = (newRole: UserRole) => {
    setActiveRole(newRole);
    if (newRole === 'provider') {
      setCurrentView('provider-dashboard');
      showToast('Switched to Provider Portal: Manage your business');
    } else if (newRole === 'admin') {
      setCurrentView('admin-dashboard');
      showToast('Switched to Admin Console: Platform overview & approvals');
    } else {
      setCurrentView('customer-dashboard');
      showToast('Switched to Customer Dashboard');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E8DECB] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Zone 1: Single text element wordmark */}
          <button 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2 group text-left focus:outline-none"
            aria-label="EventEase Home"
          >
            <span className="w-9 h-9 rounded-xl bg-[#3D0C37] text-[#D4AF37] flex items-center justify-center font-serif text-xl font-bold shadow-sm transition-transform group-hover:scale-105">
              E
            </span>
            <span className="font-serif text-2xl font-bold tracking-tight text-[#2B0528] group-hover:text-[#55144B] transition-colors">
              EventEase
            </span>
          </button>

          {/* Zone 2: 4-6 clean text navigation links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-700">
            <button 
              onClick={() => handleNavClick('home')}
              className={`transition-colors hover:text-[#55144B] ${currentView === 'home' ? 'text-[#55144B] font-semibold border-b-2 border-[#55144B] pb-1' : ''}`}
            >
              Home
            </button>
            <button 
              onClick={() => handleNavClick('categories')}
              className={`transition-colors hover:text-[#55144B] ${currentView === 'categories' ? 'text-[#55144B] font-semibold border-b-2 border-[#55144B] pb-1' : ''}`}
            >
              Categories
            </button>
            <button 
              onClick={() => handleNavClick('explore')}
              className={`transition-colors hover:text-[#55144B] ${currentView === 'explore' ? 'text-[#55144B] font-semibold border-b-2 border-[#55144B] pb-1' : ''}`}
            >
              Explore Providers
            </button>
            <button 
              onClick={() => handleNavClick('pricing')}
              className={`transition-colors hover:text-[#55144B] ${currentView === 'pricing' ? 'text-[#55144B] font-semibold border-b-2 border-[#55144B] pb-1' : ''}`}
            >
              Provider Plans
            </button>
          </nav>

          {/* Zone 3: 1-2 primary actions & Role Switcher */}
          <div className="hidden lg:flex items-center gap-4">
            
            {/* Quick Role Switcher Pill for reviewer ease */}
            <div className="flex items-center bg-[#F3EDE2] p-1 rounded-xl border border-[#E8DECB] text-xs font-medium">
              <button
                onClick={() => handleRoleChange('customer')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                  activeRole === 'customer' 
                    ? 'bg-white text-[#3D0C37] shadow-sm font-semibold' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Customer perspective"
              >
                <User className="w-3.5 h-3.5" />
                <span>Customer</span>
              </button>
              <button
                onClick={() => handleRoleChange('provider')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                  activeRole === 'provider' 
                    ? 'bg-[#3D0C37] text-white shadow-sm font-semibold' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Service provider dashboard"
              >
                <Briefcase className="w-3.5 h-3.5" />
                <span>Provider</span>
              </button>
              <button
                onClick={() => handleRoleChange('admin')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                  activeRole === 'admin' 
                    ? 'bg-[#8F237C] text-white shadow-sm font-semibold' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Platform administrator console"
              >
                <Shield className="w-3.5 h-3.5" />
                <span>Admin</span>
              </button>
            </div>

            {/* Saved Favorites Trigger */}
            <button
              onClick={() => handleNavClick('customer-dashboard')}
              className="relative p-2.5 rounded-xl border border-[#E8DECB] bg-white text-slate-700 hover:text-[#55144B] hover:border-[#D4AF37] transition-all shadow-xs"
              aria-label="View Saved Providers"
              title="Saved Providers"
            >
              <Heart className={`w-4 h-4 ${favorites.length > 0 ? 'text-[#8F237C] fill-[#8F237C]' : ''}`} />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#55144B] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </button>

            {/* List Your Business Primary CTA */}
            <button
              onClick={() => handleNavClick('register-provider')}
              className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-[#3D0C37] hover:bg-[#55144B] rounded-xl transition-all shadow-xs hover:shadow-md cursor-pointer whitespace-nowrap"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>List Your Business</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden items-center gap-3">
            <button
              onClick={() => handleNavClick('customer-dashboard')}
              className="relative p-2 rounded-lg border border-[#E8DECB] bg-white text-slate-700"
              aria-label="Saved items"
            >
              <Heart className={`w-4 h-4 ${favorites.length > 0 ? 'text-[#8F237C] fill-[#8F237C]' : ''}`} />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#55144B] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </button>
            
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-[#F3EDE2] transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-[#E8DECB] bg-[#FAF7F2] px-4 pt-3 pb-6 space-y-4">
          <div className="flex flex-col space-y-2">
            <button 
              onClick={() => handleNavClick('home')}
              className="text-left px-3 py-2 text-sm font-medium rounded-lg text-slate-800 hover:bg-[#F3EDE2]"
            >
              Home
            </button>
            <button 
              onClick={() => handleNavClick('categories')}
              className="text-left px-3 py-2 text-sm font-medium rounded-lg text-slate-800 hover:bg-[#F3EDE2]"
            >
              Service Categories
            </button>
            <button 
              onClick={() => handleNavClick('explore')}
              className="text-left px-3 py-2 text-sm font-medium rounded-lg text-slate-800 hover:bg-[#F3EDE2]"
            >
              Explore Providers
            </button>
            <button 
              onClick={() => handleNavClick('pricing')}
              className="text-left px-3 py-2 text-sm font-medium rounded-lg text-slate-800 hover:bg-[#F3EDE2]"
            >
              Provider Pricing Plans
            </button>
          </div>

          <div className="pt-2 border-t border-[#E8DECB]">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Switch View</p>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => { handleRoleChange('customer'); setMobileMenuOpen(false); }}
                className={`py-2 text-xs font-medium rounded-lg border text-center ${activeRole === 'customer' ? 'bg-white border-[#3D0C37] text-[#3D0C37] font-semibold' : 'border-[#E8DECB] text-slate-600'}`}
              >
                Customer
              </button>
              <button
                onClick={() => { handleRoleChange('provider'); setMobileMenuOpen(false); }}
                className={`py-2 text-xs font-medium rounded-lg border text-center ${activeRole === 'provider' ? 'bg-[#3D0C37] text-white' : 'border-[#E8DECB] text-slate-600'}`}
              >
                Provider
              </button>
              <button
                onClick={() => { handleRoleChange('admin'); setMobileMenuOpen(false); }}
                className={`py-2 text-xs font-medium rounded-lg border text-center ${activeRole === 'admin' ? 'bg-[#8F237C] text-white' : 'border-[#E8DECB] text-slate-600'}`}
              >
                Admin
              </button>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => handleNavClick('register-provider')}
              className="w-full flex items-center justify-center gap-2 py-3 text-sm font-semibold text-white bg-[#3D0C37] rounded-xl shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span>List Your Business as a Pro</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
