import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  DollarSign, 
  TrendingUp, 
  Users, 
  Calendar, 
  Star, 
  Eye, 
  CheckCircle, 
  Clock, 
  Plus, 
  Image as ImageIcon, 
  Save, 
  Send,
  MessageSquare,
  Sparkles,
  Edit3
} from 'lucide-react';
import { ServicePackage } from '../types';

export const ProviderDashboardView: React.FC = () => {
  const { 
    providers, 
    quoteRequests, 
    updateQuoteStatus, 
    bookings, 
    updateProviderProfile,
    showToast 
  } = useApp();

  // Pick first provider as the active logged-in provider context
  const activeProvider = providers[0];

  const [activeTab, setActiveTab] = useState<'overview' | 'inquiries' | 'bookings' | 'profile' | 'packages' | 'gallery'>('overview');
  
  // Profile form state
  const [businessName, setBusinessName] = useState(activeProvider.businessName);
  const [startingPrice, setStartingPrice] = useState(activeProvider.startingPrice);
  const [city, setCity] = useState(activeProvider.city);
  const [aboutLong, setAboutLong] = useState(activeProvider.aboutLong);
  const [isAvailable, setIsAvailable] = useState(activeProvider.isAvailable);

  // Quote response state
  const [respondingQuoteId, setRespondingQuoteId] = useState<string | null>(null);
  const [quotePrice, setQuotePrice] = useState<number>(1400);
  const [quoteMessage, setQuoteMessage] = useState('We would love to create this setup for you! The proposal includes on-site coordinator and premium fresh florals.');

  // Add Package State
  const [newPkgName, setNewPkgName] = useState('');
  const [newPkgPrice, setNewPkgPrice] = useState<number>(500);
  const [newPkgDuration, setNewPkgDuration] = useState('Up to 5 hours');
  const [newPkgDesc, setNewPkgDesc] = useState('');
  const [newPkgFeatures, setNewPkgFeatures] = useState('');
  const [showAddPackage, setShowAddPackage] = useState(false);

  // Add Portfolio Image State
  const [newImageTitle, setNewImageTitle] = useState('');
  const [newImageCategory, setNewImageCategory] = useState('Floral');
  const [showAddImage, setShowAddImage] = useState(false);

  // Inquiries for this provider
  const providerInquiries = quoteRequests.filter(q => q.providerId === activeProvider.id || q.providerCategory === activeProvider.category);
  const providerBookings = bookings.filter(b => b.providerId === activeProvider.id || b.providerCategory === activeProvider.category);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProviderProfile(activeProvider.id, {
      businessName,
      startingPrice,
      city,
      aboutLong,
      isAvailable
    });
  };

  const handleSendQuoteResponse = (quoteId: string) => {
    updateQuoteStatus(quoteId, 'responded', quotePrice, quoteMessage);
    setRespondingQuoteId(null);
  };

  const handleAddPackage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPkgName.trim()) return;

    const newPackage: ServicePackage = {
      id: `pkg-${Date.now()}`,
      name: newPkgName,
      price: newPkgPrice,
      duration: newPkgDuration,
      description: newPkgDesc || 'Custom tailored celebration service package.',
      features: newPkgFeatures.split('\n').filter(f => f.trim().length > 0)
    };

    updateProviderProfile(activeProvider.id, {
      packages: [...activeProvider.packages, newPackage]
    });

    setNewPkgName('');
    setNewPkgPrice(500);
    setNewPkgFeatures('');
    setShowAddPackage(false);
    showToast(`Package "${newPackage.name}" added to your live profile!`);
  };

  const handleAddPortfolioImage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newImageTitle.trim()) return;

    const newPortItem = {
      id: `port-${Date.now()}`,
      title: newImageTitle,
      imageUrl: activeProvider.coverImage,
      category: newImageCategory
    };

    updateProviderProfile(activeProvider.id, {
      portfolio: [newPortItem, ...activeProvider.portfolio]
    });

    setNewImageTitle('');
    setShowAddImage(false);
    showToast(`Added "${newPortItem.title}" to your portfolio showcase!`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Top Welcome Header */}
      <div className="bg-[#2B0528] rounded-3xl p-6 sm:p-8 text-white mb-8 border border-[#3D0C37] flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider">
              Service Provider Portal
            </span>
            <span className="bg-[#55144B] text-[#D4AF37] text-[10px] font-bold px-2 py-0.5 rounded border border-[#D4AF37]/30">
              PRO PARTNER
            </span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold">
            {activeProvider.businessName}
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            Managed by {activeProvider.ownerName} · {activeProvider.city} · Category: <strong className="text-white">{activeProvider.category}</strong>
          </p>
        </div>

        {/* Live Availability Toggle */}
        <div className="bg-[#3D0C37] p-3 rounded-2xl border border-white/10 flex items-center justify-between gap-4">
          <div>
            <span className="text-xs font-semibold text-white block">Accepting Inquiries</span>
            <span className="text-[11px] text-slate-300">
              {isAvailable ? 'Profile is visible in search' : 'Temporarily paused'}
            </span>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              checked={isAvailable} 
              onChange={(e) => {
                setIsAvailable(e.target.checked);
                updateProviderProfile(activeProvider.id, { isAvailable: e.target.checked });
              }}
              className="sr-only peer" 
            />
            <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
          </label>
        </div>
      </div>

      {/* Metric Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-2xl border border-[#E8DECB] p-5 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">Estimated Revenue</span>
            <DollarSign className="w-4 h-4 text-[#55144B]" />
          </div>
          <div className="text-2xl font-bold text-slate-900 font-sans tabular-nums">$14,250</div>
          <span className="text-[11px] text-emerald-700 font-medium flex items-center gap-1 mt-1">
            <TrendingUp className="w-3 h-3" />
            +18% from last month
          </span>
        </div>

        <div className="bg-white rounded-2xl border border-[#E8DECB] p-5 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">Active Inquiries</span>
            <MessageSquare className="w-4 h-4 text-[#55144B]" />
          </div>
          <div className="text-2xl font-bold text-slate-900 font-sans tabular-nums">{providerInquiries.length}</div>
          <span className="text-[11px] text-slate-500 block mt-1">
            Avg response: &lt; 1 hr
          </span>
        </div>

        <div className="bg-white rounded-2xl border border-[#E8DECB] p-5 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">Confirmed Bookings</span>
            <Calendar className="w-4 h-4 text-[#55144B]" />
          </div>
          <div className="text-2xl font-bold text-slate-900 font-sans tabular-nums">{providerBookings.length}</div>
          <span className="text-[11px] text-slate-500 block mt-1">
            Next event on Oct 24
          </span>
        </div>

        <div className="bg-white rounded-2xl border border-[#E8DECB] p-5 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">Client Rating</span>
            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
          </div>
          <div className="text-2xl font-bold text-slate-900 font-sans tabular-nums">
            {activeProvider.rating.toFixed(1)}
          </div>
          <span className="text-[11px] text-slate-500 block mt-1">
            {activeProvider.reviewCount} verified client reviews
          </span>
        </div>
      </div>

      {/* Provider Portal Tabs */}
      <div className="bg-white rounded-2xl border border-[#E8DECB] p-1.5 mb-8 flex items-center gap-1 overflow-x-auto">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
            activeTab === 'overview' ? 'bg-[#3D0C37] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Inquiries & Leads ({providerInquiries.length})
        </button>

        <button
          onClick={() => setActiveTab('bookings')}
          className={`px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
            activeTab === 'bookings' ? 'bg-[#3D0C37] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Bookings Calendar ({providerBookings.length})
        </button>

        <button
          onClick={() => setActiveTab('packages')}
          className={`px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
            activeTab === 'packages' ? 'bg-[#3D0C37] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Packages & Pricing ({activeProvider.packages.length})
        </button>

        <button
          onClick={() => setActiveTab('gallery')}
          className={`px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
            activeTab === 'gallery' ? 'bg-[#3D0C37] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Portfolio Gallery ({activeProvider.portfolio.length})
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className={`px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
            activeTab === 'profile' ? 'bg-[#3D0C37] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Business Profile
        </button>
      </div>

      {/* TAB 1: Inquiries & Leads */}
      {activeTab === 'overview' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-xl font-bold text-slate-900">Customer Quote Inquiries</h2>
            <span className="text-xs text-slate-400">Respond within 2 hours to maintain high conversion ranking</span>
          </div>

          <div className="space-y-4">
            {providerInquiries.map((inq) => (
              <div key={inq.id} className="bg-white rounded-2xl border border-[#E8DECB] p-6 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#F3EDE2]">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-serif text-base font-bold text-slate-900">{inq.customerName}</h4>
                      <span className="text-xs text-slate-400">({inq.customerEmail} · {inq.customerPhone})</span>
                    </div>
                    <span className="text-xs text-slate-500">
                      Celebration: <strong className="text-slate-800">{inq.eventType}</strong> on <strong>{inq.eventDate}</strong> · Venue: {inq.location}
                    </span>
                  </div>

                  <div>
                    {inq.status === 'pending' ? (
                      <span className="bg-amber-100 text-amber-800 text-xs font-semibold px-3 py-1 rounded-full">
                        Pending Your Proposal
                      </span>
                    ) : (
                      <span className="bg-emerald-100 text-emerald-800 text-xs font-semibold px-3 py-1 rounded-full capitalize">
                        Status: {inq.status}
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400 block">Guest Count</span>
                    <span className="font-semibold text-slate-800">{inq.guestCount} guests</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Requested Package</span>
                    <span className="font-semibold text-slate-800">{inq.selectedPackage || 'Custom'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Client Budget</span>
                    <span className="font-semibold text-slate-800 font-sans tabular-nums">${inq.budget}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Inquiry ID</span>
                    <span className="font-mono text-slate-600">#{inq.id}</span>
                  </div>
                </div>

                <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#E8DECB] text-xs">
                  <span className="font-semibold text-slate-700 block mb-0.5">Client Note:</span>
                  <p className="text-slate-600">"{inq.requirements}"</p>
                </div>

                {/* Response Action Box */}
                {respondingQuoteId === inq.id ? (
                  <div className="bg-purple-50 p-4 rounded-xl border border-purple-200 space-y-3">
                    <h5 className="font-semibold text-xs text-[#55144B]">Send Custom Proposal & Quote</h5>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-700 mb-1">Quote Price ($)</label>
                        <input
                          type="number"
                          value={quotePrice}
                          onChange={(e) => setQuotePrice(Number(e.target.value))}
                          className="w-full px-3 py-1.5 text-xs bg-white border border-[#E8DECB] rounded-lg"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-[11px] font-semibold text-slate-700 mb-1">Proposal Message</label>
                        <input
                          type="text"
                          value={quoteMessage}
                          onChange={(e) => setQuoteMessage(e.target.value)}
                          className="w-full px-3 py-1.5 text-xs bg-white border border-[#E8DECB] rounded-lg"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        onClick={() => setRespondingQuoteId(null)}
                        className="px-3 py-1.5 text-xs text-slate-600 hover:bg-white rounded-lg border"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleSendQuoteResponse(inq.id)}
                        className="px-4 py-1.5 text-xs font-semibold text-white bg-[#3D0C37] rounded-lg hover:bg-[#55144B] flex items-center gap-1.5"
                      >
                        <Send className="w-3 h-3" />
                        <span>Submit Quote to Client</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-end gap-2 pt-2">
                    {inq.status === 'pending' && (
                      <button
                        onClick={() => setRespondingQuoteId(inq.id)}
                        className="px-4 py-2 text-xs font-semibold text-white bg-[#3D0C37] rounded-xl hover:bg-[#55144B] transition-colors"
                      >
                        Respond & Send Custom Quote
                      </button>
                    )}
                  </div>
                )}

              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: Bookings Calendar */}
      {activeTab === 'bookings' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-xl font-bold text-slate-900">Event Execution Schedule</h2>
            <span className="text-xs text-slate-400">Total active events: {providerBookings.length}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {providerBookings.map((b) => (
              <div key={b.id} className="bg-white rounded-2xl border border-[#E8DECB] p-6 shadow-xs space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-slate-400">Booking #{b.id}</span>
                    <h4 className="font-serif text-base font-bold text-slate-900">{b.customerName}</h4>
                    <span className="text-xs text-slate-500">{b.eventType} · {b.packageName}</span>
                  </div>
                  <span className="bg-emerald-100 text-emerald-800 text-xs font-semibold px-2.5 py-0.5 rounded-full capitalize">
                    {b.status}
                  </span>
                </div>

                <div className="pt-2 border-t border-[#F3EDE2] text-xs space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Date:</span>
                    <span className="font-semibold text-slate-800">{b.eventDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Venue:</span>
                    <span className="font-semibold text-slate-800">{b.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Contract Total:</span>
                    <span className="font-bold text-slate-900 font-sans tabular-nums">${b.totalPrice}</span>
                  </div>
                </div>

                <div className="bg-[#FAF7F2] p-2.5 rounded-xl border border-[#E8DECB] text-xs text-slate-600">
                  {b.notes}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: Packages & Pricing */}
      {activeTab === 'packages' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-serif text-xl font-bold text-slate-900">Your Service Packages</h2>
              <p className="text-xs text-slate-500">Clients can book these packages directly or request quotes.</p>
            </div>
            <button
              onClick={() => setShowAddPackage(!showAddPackage)}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#3D0C37] rounded-xl hover:bg-[#55144B]"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add New Package</span>
            </button>
          </div>

          {showAddPackage && (
            <form onSubmit={handleAddPackage} className="bg-white rounded-2xl border border-[#E8DECB] p-6 space-y-4 shadow-sm">
              <h4 className="font-serif text-base font-bold text-slate-900">Create New Service Package</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Package Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. VIP Reception Package"
                    value={newPkgName}
                    onChange={(e) => setNewPkgName(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#E8DECB] rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Price ($)</label>
                  <input
                    type="number"
                    required
                    min={50}
                    value={newPkgPrice}
                    onChange={(e) => setNewPkgPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#E8DECB] rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Duration / Scope</label>
                  <input
                    type="text"
                    value={newPkgDuration}
                    onChange={(e) => setNewPkgDuration(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#E8DECB] rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Short Description</label>
                <input
                  type="text"
                  placeholder="Summary of who this package is for..."
                  value={newPkgDesc}
                  onChange={(e) => setNewPkgDesc(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#E8DECB] rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Included Deliverables (one per line)</label>
                <textarea
                  rows={3}
                  placeholder="Custom stage floral arch&#10;Fairy lights backdrop&#10;On-site coordinator"
                  value={newPkgFeatures}
                  onChange={(e) => setNewPkgFeatures(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#E8DECB] rounded-xl"
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddPackage(false)}
                  className="px-4 py-2 text-xs text-slate-600 hover:bg-[#FAF7F2] rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-white bg-[#3D0C37] rounded-xl hover:bg-[#55144B]"
                >
                  Save Package
                </button>
              </div>
            </form>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activeProvider.packages.map((pkg) => (
              <div key={pkg.id} className="bg-white rounded-2xl border border-[#E8DECB] p-6 space-y-3 shadow-xs">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-serif text-lg font-bold text-slate-900">{pkg.name}</h4>
                    <span className="text-xs text-slate-400">{pkg.duration}</span>
                  </div>
                  <span className="text-xl font-bold text-[#55144B] font-sans tabular-nums">${pkg.price}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{pkg.description}</p>
                <div className="pt-2 border-t border-[#F3EDE2] space-y-1.5">
                  {pkg.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: Gallery Manager */}
      {activeTab === 'gallery' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-serif text-xl font-bold text-slate-900">Portfolio Image Manager</h2>
              <p className="text-xs text-slate-500">Showcase your high-resolution event captures to prospective clients.</p>
            </div>
            <button
              onClick={() => setShowAddImage(!showAddImage)}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#3D0C37] rounded-xl hover:bg-[#55144B]"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Portfolio Item</span>
            </button>
          </div>

          {showAddImage && (
            <form onSubmit={handleAddPortfolioImage} className="bg-white rounded-2xl border border-[#E8DECB] p-6 space-y-4 max-w-lg shadow-sm">
              <h4 className="font-serif text-base font-bold text-slate-900">Add Portfolio Photo</h4>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Item Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sunset Ceremony Arch"
                  value={newImageTitle}
                  onChange={(e) => setNewImageTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#E8DECB] rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Category / Tag</label>
                <input
                  type="text"
                  value={newImageCategory}
                  onChange={(e) => setNewImageCategory(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#E8DECB] rounded-xl"
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddImage(false)}
                  className="px-4 py-2 text-xs text-slate-600 hover:bg-[#FAF7F2] rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-white bg-[#3D0C37] rounded-xl hover:bg-[#55144B]"
                >
                  Add to Gallery
                </button>
              </div>
            </form>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {activeProvider.portfolio.map((item) => (
              <div key={item.id} className="group relative aspect-4/3 rounded-xl overflow-hidden border border-[#E8DECB] bg-slate-100 shadow-xs">
                <img 
                  src={item.imageUrl} 
                  alt={item.title} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3 text-white">
                  <span className="text-xs font-semibold">{item.title}</span>
                  <span className="text-[10px] text-slate-300">{item.category}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: Profile Editor */}
      {activeTab === 'profile' && (
        <form onSubmit={handleSaveProfile} className="bg-white rounded-2xl border border-[#E8DECB] p-6 max-w-2xl mx-auto space-y-4 shadow-xs">
          <h2 className="font-serif text-xl font-bold text-slate-900 mb-2">Edit Public Business Profile</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Business Name</label>
              <input
                type="text"
                required
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#E8DECB] rounded-xl"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Starting Price ($)</label>
              <input
                type="number"
                required
                value={startingPrice}
                onChange={(e) => setStartingPrice(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#E8DECB] rounded-xl"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Location / Service Area</label>
            <input
              type="text"
              required
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#E8DECB] rounded-xl"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">About Your Studio & Philosophy</label>
            <textarea
              rows={5}
              required
              value={aboutLong}
              onChange={(e) => setAboutLong(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#E8DECB] rounded-xl"
            />
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 text-xs font-semibold text-white bg-[#3D0C37] rounded-xl hover:bg-[#55144B] flex items-center gap-2"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Update Profile Changes</span>
            </button>
          </div>
        </form>
      )}

    </div>
  );
};
