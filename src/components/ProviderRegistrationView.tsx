import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORIES, DECOR_IMAGE } from '../data/mockData';
import { ServiceCategoryType, EventType } from '../types';
import { CheckCircle2, Sparkles, Shield, ArrowRight, Star, HelpCircle } from 'lucide-react';

export const ProviderRegistrationView: React.FC = () => {
  const { addNewProvider, setCurrentView, setActiveRole, showToast } = useApp();

  const [businessName, setBusinessName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState<ServiceCategoryType>('Decorations');
  const [city, setCity] = useState('San Francisco, CA');
  const [experienceYears, setExperienceYears] = useState(5);
  const [startingPrice, setStartingPrice] = useState(400);
  const [description, setDescription] = useState('');
  const [selectedPlan, setSelectedPlan] = useState<'free' | 'pro' | 'premium'>('pro');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessName.trim() || !ownerName.trim()) return;

    addNewProvider({
      businessName,
      ownerName,
      email,
      phone,
      category,
      location: 'Metro & Suburbs',
      city,
      startingPrice,
      description: description || `Professional ${category.toLowerCase()} services for celebrations of all scales.`,
      aboutLong: description || `We bring passion, reliability, and artistic distinction to every ${category.toLowerCase()} project. With ${experienceYears} years of expertise, our dedicated crew works closely with you to ensure a stress-free, unforgettable celebration.`,
      coverImage: DECOR_IMAGE,
      profileImage: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(businessName)}&backgroundColor=55144b&textColor=ffffff`,
      verified: true,
      featured: selectedPlan === 'premium',
      isAvailable: true,
      experienceYears,
      responseRate: '100%',
      responseTime: '< 1 hour',
      eventTypes: ['Wedding', 'Birthday Party', 'Engagement'],
      subscriptionTier: selectedPlan,
      approvalStatus: 'approved',
      packages: [
        {
          id: `pkg-${Date.now()}-1`,
          name: 'Standard Celebration Package',
          price: startingPrice,
          duration: 'Up to 5 hours',
          description: `Our foundational ${category.toLowerCase()} package for standard celebrations.`,
          features: [
            'Dedicated setup and breakdown team',
            'Full day coordination support',
            'Complimentary consultation meeting',
            'Safety & insurance coverage included'
          ]
        },
        {
          id: `pkg-${Date.now()}-2`,
          name: 'Signature Luxe Package',
          price: startingPrice * 2.2,
          duration: 'Turnkey full celebration',
          popular: true,
          description: `Comprehensive premium ${category.toLowerCase()} package with custom accents.`,
          features: [
            'Lead master artist on-site throughout the event',
            'High-end upgraded material selections',
            'VIP custom coordination with other vendors',
            'Complimentary emergency backup provisions'
          ]
        }
      ],
      portfolio: [
        {
          id: `port-${Date.now()}-1`,
          title: 'Signature Celebration Showcase',
          imageUrl: DECOR_IMAGE,
          category: 'Event'
        }
      ]
    });

    setActiveRole('provider');
    setCurrentView('provider-dashboard');
    showToast(`Welcome ${businessName}! Your business has been listed on EventEase.`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* Hero Banner */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs font-semibold text-[#711A62] uppercase tracking-wider block mb-2">
          Partner With EventEase
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-slate-900 tracking-tight">
          List Your Event Business
        </h1>
        <p className="text-slate-600 text-sm sm:text-base mt-4 leading-relaxed">
          Get discovered by customers looking for event professionals in your area. Showcase your portfolio, receive verified customer quote requests, and grow your bookings without upfront marketing overhead.
        </p>
      </div>

      {/* Pricing Tiers Selection */}
      <div className="mb-16">
        <div className="text-center mb-8">
          <h2 className="font-serif text-2xl font-bold text-slate-900">Choose Your Visibility Plan</h2>
          <p className="text-xs text-slate-500 mt-1">Upgrade or cancel anytime. No lock-in contracts.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          
          {/* Free Tier */}
          <div 
            onClick={() => setSelectedPlan('free')}
            className={`bg-white rounded-2xl p-6 border transition-all cursor-pointer flex flex-col justify-between ${
              selectedPlan === 'free' 
                ? 'border-[#3D0C37] ring-2 ring-[#3D0C37] shadow-md' 
                : 'border-[#E8DECB] hover:border-slate-400'
            }`}
          >
            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Starter</span>
              <h3 className="font-serif text-xl font-bold text-slate-900 mt-1">Free Basic</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-3xl font-bold text-slate-900 font-sans">$0</span>
                <span className="text-xs text-slate-500">/month</span>
              </div>
              <p className="text-xs text-slate-600 mt-3">
                Ideal for solo artisans testing the platform.
              </p>

              <div className="mt-6 pt-4 border-t border-[#F3EDE2] space-y-2.5 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Standard search directory listing</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Up to 5 client quote inquiries / month</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Standard 8% booking commission</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <span className="w-4 h-4 text-center">✕</span>
                  <span>No featured badge placement</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              className={`mt-6 w-full py-2.5 rounded-xl text-xs font-semibold transition-all ${
                selectedPlan === 'free'
                  ? 'bg-[#3D0C37] text-white'
                  : 'bg-[#FAF7F2] text-slate-700 border border-[#E8DECB]'
              }`}
            >
              {selectedPlan === 'free' ? 'Selected Plan' : 'Select Free'}
            </button>
          </div>

          {/* Pro Tier (Recommended) */}
          <div 
            onClick={() => setSelectedPlan('pro')}
            className={`bg-white rounded-2xl p-6 border transition-all cursor-pointer relative flex flex-col justify-between ${
              selectedPlan === 'pro' 
                ? 'border-[#D4AF37] ring-2 ring-[#D4AF37] shadow-xl' 
                : 'border-[#E8DECB] hover:border-slate-400'
            }`}
          >
            <div className="absolute -top-3 right-6 bg-[#3D0C37] text-[#D4AF37] text-[10px] font-bold uppercase tracking-wider px-3 py-0.5 rounded-full border border-[#D4AF37]/40 shadow-xs">
              Most Popular
            </div>

            <div>
              <span className="text-xs font-semibold text-[#711A62] uppercase tracking-wider">Growth</span>
              <h3 className="font-serif text-xl font-bold text-slate-900 mt-1">Pro Partner</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-3xl font-bold text-[#55144B] font-sans">$29</span>
                <span className="text-xs text-slate-500">/month</span>
              </div>
              <p className="text-xs text-slate-600 mt-3">
                For established businesses seeking consistent inquiries.
              </p>

              <div className="mt-6 pt-4 border-t border-[#F3EDE2] space-y-2.5 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span><strong>Verified Pro Badge</strong> on profile</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Unlimited client quote requests</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Priority search category placement</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Discounted 4% booking commission</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Upload up to 25 portfolio photos</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              className={`mt-6 w-full py-2.5 rounded-xl text-xs font-semibold transition-all ${
                selectedPlan === 'pro'
                  ? 'bg-[#3D0C37] text-white shadow-md'
                  : 'bg-[#FAF7F2] text-slate-700 border border-[#E8DECB]'
              }`}
            >
              {selectedPlan === 'pro' ? 'Selected Plan' : 'Select Pro'}
            </button>
          </div>

          {/* Premium Elite */}
          <div 
            onClick={() => setSelectedPlan('premium')}
            className={`bg-white rounded-2xl p-6 border transition-all cursor-pointer flex flex-col justify-between ${
              selectedPlan === 'premium' 
                ? 'border-[#3D0C37] ring-2 ring-[#3D0C37] shadow-md' 
                : 'border-[#E8DECB] hover:border-slate-400'
            }`}
          >
            <div>
              <span className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider">Top Tier</span>
              <h3 className="font-serif text-xl font-bold text-slate-900 mt-1">Premium Elite</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-3xl font-bold text-slate-900 font-sans">$69</span>
                <span className="text-xs text-slate-500">/month</span>
              </div>
              <p className="text-xs text-slate-600 mt-3">
                For premier agencies and luxury production studios.
              </p>

              <div className="mt-6 pt-4 border-t border-[#F3EDE2] space-y-2.5 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span><strong>Featured Listing</strong> pinned to top</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span><strong>0% Commission</strong> on all bookings</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Instant SMS lead alerts to your phone</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Dedicated concierge account manager</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              className={`mt-6 w-full py-2.5 rounded-xl text-xs font-semibold transition-all ${
                selectedPlan === 'premium'
                  ? 'bg-[#3D0C37] text-white'
                  : 'bg-[#FAF7F2] text-slate-700 border border-[#E8DECB]'
              }`}
            >
              {selectedPlan === 'premium' ? 'Selected Plan' : 'Select Premium'}
            </button>
          </div>

        </div>
      </div>

      {/* Registration Form */}
      <div className="bg-white rounded-3xl border border-[#E8DECB] p-6 sm:p-10 max-w-3xl mx-auto shadow-sm">
        <div className="mb-6 pb-4 border-b border-[#F3EDE2]">
          <h2 className="font-serif text-2xl font-bold text-slate-900">Business Registration Form</h2>
          <p className="text-xs text-slate-500 mt-1">
            Fill in your business details. After listing, your profile goes live immediately.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Business / Studio Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Celestial Event Decor"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#E8DECB] rounded-xl focus:outline-none focus:border-[#55144B]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Owner / Lead Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Sarah Jenkins"
                value={ownerName}
                onChange={(e) => setOwnerName(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#E8DECB] rounded-xl focus:outline-none focus:border-[#55144B]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Contact Email *</label>
              <input
                type="email"
                required
                placeholder="contact@yourbusiness.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#E8DECB] rounded-xl focus:outline-none focus:border-[#55144B]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number *</label>
              <input
                type="tel"
                required
                placeholder="+1 (555) 000-0000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#E8DECB] rounded-xl focus:outline-none focus:border-[#55144B]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Service Category *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ServiceCategoryType)}
                className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#E8DECB] rounded-xl focus:outline-none focus:border-[#55144B]"
              >
                {CATEGORIES.map(c => (
                  <option key={c.id} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">City / Region *</label>
              <input
                type="text"
                required
                placeholder="San Francisco, CA"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#E8DECB] rounded-xl focus:outline-none focus:border-[#55144B]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Years Experience *</label>
              <input
                type="number"
                required
                min={1}
                value={experienceYears}
                onChange={(e) => setExperienceYears(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#E8DECB] rounded-xl focus:outline-none focus:border-[#55144B]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Starting Price ($) *</label>
            <input
              type="number"
              required
              min={20}
              placeholder="e.g. 450"
              value={startingPrice}
              onChange={(e) => setStartingPrice(Number(e.target.value))}
              className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#E8DECB] rounded-xl focus:outline-none focus:border-[#55144B]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Studio Bio & Service Overview *</label>
            <textarea
              rows={4}
              required
              placeholder="Describe your style, specialty celebration types, and what sets your service apart..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#E8DECB] rounded-xl focus:outline-none focus:border-[#55144B]"
            />
          </div>

          <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#E8DECB] flex items-center justify-between text-xs">
            <div>
              <span className="text-slate-500">Selected Plan:</span>
              <strong className="text-[#3D0C37] block uppercase">{selectedPlan} Tier</strong>
            </div>
            <span className="text-slate-400">
              {selectedPlan === 'free' ? '$0/mo' : selectedPlan === 'pro' ? '$29/mo' : '$69/mo'} (Simulated billing)
            </span>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3.5 px-6 text-sm font-semibold text-white bg-[#3D0C37] hover:bg-[#55144B] rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span>Complete Registration & Go to Dashboard</span>
            </button>
          </div>

        </form>
      </div>

    </div>
  );
};
