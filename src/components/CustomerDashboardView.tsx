import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ProviderCard } from './ProviderCard';
import { 
  Heart, 
  FileText, 
  Calendar, 
  Star, 
  User, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  ArrowRight,
  MessageSquare
} from 'lucide-react';

export const CustomerDashboardView: React.FC = () => {
  const { 
    providers, 
    favorites, 
    quoteRequests, 
    updateQuoteStatus, 
    bookings, 
    setCurrentView,
    setSelectedProviderForModal,
    showToast
  } = useApp();

  const [activeTab, setActiveTab] = useState<'favorites' | 'quotes' | 'bookings' | 'profile'>('quotes');
  const [profileName, setProfileName] = useState('Sarah Jenkins');
  const [profileEmail, setProfileEmail] = useState('sarah.j@example.com');
  const [profilePhone, setProfilePhone] = useState('+1 (555) 345-6789');
  const [profileCity, setProfileCity] = useState('San Francisco, CA');
  const [nextCelebration, setNextCelebration] = useState('Wedding Celebration - October 24, 2026');

  const favoritedProviders = providers.filter(p => favorites.includes(p.id));

  const handleAcceptQuote = (quoteId: string) => {
    updateQuoteStatus(quoteId, 'accepted');
    showToast('Quote accepted! The provider has been notified to send the final contract.');
  };

  const handleDeclineQuote = (quoteId: string) => {
    updateQuoteStatus(quoteId, 'declined');
    showToast('Quote declined.');
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Customer profile settings saved!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Dashboard Top Banner */}
      <div className="bg-[#3D0C37] rounded-3xl p-6 sm:p-8 text-white mb-8 relative overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <span className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider block mb-1">
            Celebration Host Hub
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold">
            Welcome back, {profileName}
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            Tracking your event vendors, live quote proposals, and upcoming milestones.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentView('explore')}
            className="px-4 py-2 text-xs font-semibold text-[#2B0528] bg-[#D4AF37] hover:bg-[#E2C35D] rounded-xl transition-all shadow-sm"
          >
            Find More Vendors
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-2xl border border-[#E8DECB] p-1.5 mb-8 flex items-center gap-1 overflow-x-auto">
        <button
          onClick={() => setActiveTab('quotes')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
            activeTab === 'quotes'
              ? 'bg-[#3D0C37] text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Quote Requests ({quoteRequests.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('bookings')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
            activeTab === 'bookings'
              ? 'bg-[#3D0C37] text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Confirmed Bookings ({bookings.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('favorites')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
            activeTab === 'favorites'
              ? 'bg-[#3D0C37] text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Heart className="w-4 h-4" />
          <span>Saved Favorites ({favoritedProviders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
            activeTab === 'profile'
              ? 'bg-[#3D0C37] text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <User className="w-4 h-4" />
          <span>Host Profile</span>
        </button>
      </div>

      {/* TAB CONTENT */}

      {/* 1. Quote Requests */}
      {activeTab === 'quotes' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-xl font-bold text-slate-900">Your Event Inquiries & Quotes</h2>
            <span className="text-xs text-slate-400">Sorted by most recent</span>
          </div>

          {quoteRequests.length === 0 ? (
            <div className="bg-white rounded-2xl border border-[#E8DECB] p-12 text-center">
              <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="font-serif text-lg font-bold text-slate-900">No quote requests yet</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                Explore local event providers and click "Request a Quote" to receive customized proposals with transparent pricing.
              </p>
              <button
                onClick={() => setCurrentView('explore')}
                className="mt-4 px-4 py-2 text-xs font-semibold text-white bg-[#3D0C37] rounded-xl hover:bg-[#55144B]"
              >
                Browse Providers
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {quoteRequests.map((req) => (
                <div key={req.id} className="bg-white rounded-2xl border border-[#E8DECB] p-6 shadow-xs space-y-4">
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#F3EDE2]">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                        <img 
                          src={req.providerImage} 
                          alt={req.providerName} 
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-serif text-base font-bold text-slate-900">{req.providerName}</h3>
                          <span className="text-xs text-[#711A62] font-semibold">{req.providerCategory}</span>
                        </div>
                        <span className="text-xs text-slate-400">
                          Ref #{req.id} · Requested on {req.createdAt}
                        </span>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div>
                      {req.status === 'pending' && (
                        <span className="flex items-center gap-1.5 bg-amber-50 text-amber-800 border border-amber-200 px-3 py-1 rounded-full text-xs font-medium">
                          <Clock className="w-3.5 h-3.5" />
                          Awaiting Provider Proposal
                        </span>
                      )}
                      {req.status === 'responded' && (
                        <span className="flex items-center gap-1.5 bg-purple-50 text-[#55144B] border border-purple-200 px-3 py-1 rounded-full text-xs font-semibold">
                          <Star className="w-3.5 h-3.5 fill-[#55144B]" />
                          Quote Received: ${req.quoteAmount}
                        </span>
                      )}
                      {req.status === 'accepted' && (
                        <span className="flex items-center gap-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1 rounded-full text-xs font-semibold">
                          <CheckCircle className="w-3.5 h-3.5" />
                          Quote Accepted
                        </span>
                      )}
                      {req.status === 'declined' && (
                        <span className="flex items-center gap-1.5 bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs">
                          Declined
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Inquiry details */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                    <div>
                      <span className="text-slate-400 block font-medium">Celebration</span>
                      <span className="font-semibold text-slate-800">{req.eventType}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-medium">Date & Guests</span>
                      <span className="font-semibold text-slate-800">{req.eventDate} ({req.guestCount} guests)</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-medium">Venue Location</span>
                      <span className="font-semibold text-slate-800 truncate block">{req.location}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-medium">Target Budget</span>
                      <span className="font-semibold text-slate-800 font-sans tabular-nums">${req.budget}</span>
                    </div>
                  </div>

                  {/* Requirements note */}
                  <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#E8DECB] text-xs text-slate-700">
                    <span className="font-semibold text-slate-800 block mb-0.5">Your Requirements:</span>
                    <p className="italic">"{req.requirements}"</p>
                  </div>

                  {/* Provider reply / proposal note */}
                  {req.providerNote && (
                    <div className="bg-emerald-50/70 p-4 rounded-xl border border-emerald-200 text-xs space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-emerald-950">
                          Proposal Note from {req.providerName}:
                        </span>
                        {req.quoteAmount && (
                          <span className="text-base font-bold text-emerald-900 font-sans tabular-nums">
                            Offered Price: ${req.quoteAmount}
                          </span>
                        )}
                      </div>
                      <p className="text-emerald-900">
                        "{req.providerNote}"
                      </p>

                      {req.status === 'responded' && (
                        <div className="pt-2 flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleDeclineQuote(req.id)}
                            className="px-3 py-1.5 text-xs text-slate-600 hover:bg-white rounded-lg border border-slate-200"
                          >
                            Decline
                          </button>
                          <button
                            onClick={() => handleAcceptQuote(req.id)}
                            className="px-4 py-1.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-xs"
                          >
                            Accept & Proceed to Contract
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 2. Confirmed Bookings */}
      {activeTab === 'bookings' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-xl font-bold text-slate-900">Your Event Schedule & Bookings</h2>
            <span className="text-xs text-slate-400">All contracts backed by EventEase Guarantee</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bookings.map((booking) => (
              <div key={booking.id} className="bg-white rounded-2xl border border-[#E8DECB] p-6 space-y-4 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-slate-400 block">ID: #{booking.id}</span>
                      <h3 className="font-serif text-lg font-bold text-slate-900 mt-0.5">{booking.providerName}</h3>
                      <span className="text-xs text-[#711A62] font-semibold">{booking.providerCategory}</span>
                    </div>

                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                      booking.status === 'confirmed' 
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
                        : 'bg-slate-100 text-slate-700'
                    }`}>
                      {booking.status === 'confirmed' ? 'Confirmed & Reserved' : 'Completed'}
                    </span>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#F3EDE2] space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Event Date:</span>
                      <span className="font-semibold text-slate-800">{booking.eventDate} ({booking.eventType})</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Package:</span>
                      <span className="font-semibold text-slate-800">{booking.packageName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Venue:</span>
                      <span className="font-semibold text-slate-800 truncate max-w-[200px]">{booking.location}</span>
                    </div>
                    <div className="flex justify-between pt-1 border-t border-[#F3EDE2]">
                      <span className="text-slate-500">Total Contract / Deposit:</span>
                      <span className="font-bold text-slate-900 font-sans tabular-nums">
                        ${booking.totalPrice} (Paid: ${booking.depositPaid})
                      </span>
                    </div>
                  </div>

                  {booking.notes && (
                    <div className="mt-3 bg-[#FAF7F2] p-2.5 rounded-xl border border-[#E8DECB] text-xs text-slate-600">
                      <strong>Logistics:</strong> {booking.notes}
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-[#F3EDE2] flex items-center justify-between">
                  <span className="text-[11px] text-emerald-700 font-medium flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" />
                    Vendor Confirmed
                  </span>

                  <button
                    onClick={() => {
                      const matched = providers.find(p => p.id === booking.providerId);
                      if (matched) setSelectedProviderForModal(matched);
                    }}
                    className="px-3 py-1.5 text-xs font-semibold text-[#3D0C37] hover:bg-[#FAF7F2] rounded-lg border border-[#E8DECB]"
                  >
                    View Vendor Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. Saved Favorites */}
      {activeTab === 'favorites' && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-serif text-xl font-bold text-slate-900">Saved Event Artisans</h2>
            <span className="text-xs text-slate-400">{favoritedProviders.length} saved vendors</span>
          </div>

          {favoritedProviders.length === 0 ? (
            <div className="bg-white rounded-2xl border border-[#E8DECB] p-12 text-center">
              <Heart className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="font-serif text-lg font-bold text-slate-900">No saved favorites yet</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                While exploring decorators, photographers, and caterers, tap the heart icon on any card to save them to your shortlist.
              </p>
              <button
                onClick={() => setCurrentView('explore')}
                className="mt-4 px-4 py-2 text-xs font-semibold text-white bg-[#3D0C37] rounded-xl hover:bg-[#55144B]"
              >
                Explore Providers
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favoritedProviders.map(provider => (
                <ProviderCard key={provider.id} provider={provider} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* 4. Host Profile */}
      {activeTab === 'profile' && (
        <div className="bg-white rounded-2xl border border-[#E8DECB] p-6 max-w-2xl mx-auto shadow-xs">
          <h2 className="font-serif text-xl font-bold text-slate-900 mb-4">Host Profile & Event Preferences</h2>
          
          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Your Full Name</label>
                <input
                  type="text"
                  value={profileName}
                  onChange={(e) => setProfileName(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#E8DECB] rounded-xl focus:outline-none focus:border-[#55144B]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  value={profileEmail}
                  onChange={(e) => setProfileEmail(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#E8DECB] rounded-xl focus:outline-none focus:border-[#55144B]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={profilePhone}
                  onChange={(e) => setProfilePhone(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#E8DECB] rounded-xl focus:outline-none focus:border-[#55144B]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Primary Celebration City</label>
                <input
                  type="text"
                  value={profileCity}
                  onChange={(e) => setProfileCity(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#E8DECB] rounded-xl focus:outline-none focus:border-[#55144B]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Next Big Celebration</label>
              <input
                type="text"
                value={nextCelebration}
                onChange={(e) => setNextCelebration(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#E8DECB] rounded-xl focus:outline-none focus:border-[#55144B]"
              />
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 text-xs font-semibold text-white bg-[#3D0C37] rounded-xl hover:bg-[#55144B] transition-colors"
              >
                Save Preferences
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
};
