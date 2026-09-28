import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Calendar, MapPin, Users, DollarSign, CheckCircle2, Sparkles, Clock } from 'lucide-react';
import { EventType, ServiceCategoryType } from '../types';
import { CATEGORIES } from '../data/mockData';

export const QuoteRequestModal: React.FC = () => {
  const { 
    quoteModalProvider, 
    setQuoteModalProvider, 
    preselectedPackageName,
    setPreselectedPackageName,
    addQuoteRequest,
    setCurrentView
  } = useApp();

  const [customerName, setCustomerName] = useState('Sarah Jenkins');
  const [customerEmail, setCustomerEmail] = useState('sarah.j@example.com');
  const [customerPhone, setCustomerPhone] = useState('+1 (555) 345-6789');
  const [eventType, setEventType] = useState<EventType>('Wedding');
  const [eventDate, setEventDate] = useState('2026-11-14');
  const [location, setLocation] = useState('Presidio Officers Club, SF');
  const [guestCount, setGuestCount] = useState(120);
  const [budget, setBudget] = useState(quoteModalProvider ? quoteModalProvider.startingPrice * 2 : 1500);
  const [requirements, setRequirements] = useState(
    preselectedPackageName 
      ? `Interested in booking the "${preselectedPackageName}" package with custom timing adjustments.`
      : 'Looking for high quality setup, punctual coordination, and transparent pricing.'
  );

  const [submittedId, setSubmittedId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!quoteModalProvider) return null;

  const provider = quoteModalProvider;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const generatedId = `EQ-${Math.floor(10000 + Math.random() * 90000)}`;
      addQuoteRequest({
        providerId: provider.id,
        providerName: provider.businessName,
        providerCategory: provider.category,
        providerImage: provider.coverImage,
        customerName,
        customerEmail,
        customerPhone,
        eventType,
        eventDate,
        location,
        guestCount,
        serviceCategory: provider.category,
        selectedPackage: preselectedPackageName,
        budget,
        requirements
      });

      setIsSubmitting(false);
      setSubmittedId(generatedId);
    }, 600);
  };

  const handleClose = () => {
    setQuoteModalProvider(null);
    setPreselectedPackageName(undefined);
    setSubmittedId(null);
  };

  const handleGoToDashboard = () => {
    handleClose();
    setCurrentView('customer-dashboard');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden border border-[#E8DECB]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="bg-[#3D0C37] text-white p-6 relative flex items-start justify-between">
          <div>
            <span className="text-[11px] font-semibold text-[#D4AF37] uppercase tracking-wider block mb-1">
              Direct Vendor Quote Request
            </span>
            <h3 className="font-serif text-2xl font-bold">
              Request a Custom Quote
            </h3>
            <p className="text-xs text-slate-300 mt-1">
              Sending to <span className="font-semibold text-white">{provider.businessName}</span> ({provider.category})
            </p>
          </div>

          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form or Success Confirmation */}
        {submittedId ? (
          <div className="p-8 text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <h4 className="font-serif text-2xl font-bold text-slate-900">
                Quote Request Submitted!
              </h4>
              <p className="text-xs text-slate-500 mt-1.5 max-w-md mx-auto leading-relaxed">
                Your request has been routed directly to <span className="font-semibold text-slate-800">{provider.businessName}</span>.
              </p>
            </div>

            {/* Confirmation Box */}
            <div className="bg-[#FAF7F2] p-5 rounded-2xl border border-[#E8DECB] max-w-md mx-auto text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Quote Reference ID:</span>
                <span className="font-mono font-bold text-[#55144B] tabular-nums">#{submittedId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Event Date:</span>
                <span className="font-semibold text-slate-800">{eventDate} ({eventType})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Expected Response:</span>
                <span className="font-semibold text-emerald-700 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  Within {provider.responseTime}
                </span>
              </div>
            </div>

            <p className="text-[11px] text-slate-400">
              You will receive email & SMS updates when the provider sends an itemized estimate.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={handleGoToDashboard}
                className="w-full sm:w-auto px-6 py-2.5 text-xs font-semibold text-white bg-[#3D0C37] rounded-xl hover:bg-[#55144B] transition-colors"
              >
                Track in Customer Dashboard
              </button>
              <button
                onClick={handleClose}
                className="w-full sm:w-auto px-6 py-2.5 text-xs font-semibold text-slate-700 bg-[#FAF7F2] rounded-xl border border-[#E8DECB] hover:bg-[#F3EDE2] transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
            
            {preselectedPackageName && (
              <div className="bg-[#FAF7F2] border border-[#D4AF37]/50 rounded-xl p-3 flex items-center justify-between text-xs">
                <span className="text-slate-700">
                  Pre-selected package: <strong className="text-[#3D0C37]">{preselectedPackageName}</strong>
                </span>
                <button
                  type="button"
                  onClick={() => setPreselectedPackageName(undefined)}
                  className="text-xs text-[#711A62] hover:underline"
                >
                  Change
                </button>
              </div>
            )}

            {/* Customer Details */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Your Full Name *</label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#E8DECB] rounded-xl focus:outline-none focus:border-[#55144B]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#E8DECB] rounded-xl focus:outline-none focus:border-[#55144B]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#E8DECB] rounded-xl focus:outline-none focus:border-[#55144B]"
                />
              </div>
            </div>

            {/* Event Specifics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Event / Celebration Type *</label>
                <select
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value as EventType)}
                  className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#E8DECB] rounded-xl focus:outline-none focus:border-[#55144B]"
                >
                  <option value="Wedding">Wedding</option>
                  <option value="Birthday Party">Birthday Party</option>
                  <option value="Engagement">Engagement</option>
                  <option value="Baby Shower">Baby Shower</option>
                  <option value="College Fest">College Fest</option>
                  <option value="Corporate Event">Corporate Event</option>
                  <option value="Anniversary">Anniversary</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Celebration Date *</label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="date"
                    required
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs bg-[#FAF7F2] border border-[#E8DECB] rounded-xl focus:outline-none focus:border-[#55144B]"
                  />
                </div>
              </div>
            </div>

            {/* Venue & Guests */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Venue / City Location *</label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. SF Conservatory of Flowers"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs bg-[#FAF7F2] border border-[#E8DECB] rounded-xl focus:outline-none focus:border-[#55144B]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Guests *</label>
                  <div className="relative">
                    <Users className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="number"
                      required
                      min={5}
                      value={guestCount}
                      onChange={(e) => setGuestCount(Number(e.target.value))}
                      className="w-full pl-9 pr-2 py-2 text-xs bg-[#FAF7F2] border border-[#E8DECB] rounded-xl focus:outline-none focus:border-[#55144B]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Budget ($)</label>
                  <div className="relative">
                    <DollarSign className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="number"
                      min={50}
                      value={budget}
                      onChange={(e) => setBudget(Number(e.target.value))}
                      className="w-full pl-9 pr-2 py-2 text-xs bg-[#FAF7F2] border border-[#E8DECB] rounded-xl focus:outline-none focus:border-[#55144B]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Special Instructions & Notes */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Additional Requirements & Specifics</label>
              <textarea
                rows={3}
                placeholder="Mention theme colors, stage dimensions, dietary restrictions, preferred music genres, or start/end times..."
                value={requirements}
                onChange={(e) => setRequirements(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#E8DECB] rounded-xl focus:outline-none focus:border-[#55144B]"
              />
            </div>

            {/* Submit Action */}
            <div className="pt-3 border-t border-[#F3EDE2] flex items-center justify-between">
              <span className="text-[11px] text-slate-500">
                100% Free · No obligation to book
              </span>

              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 text-xs font-semibold text-white bg-[#3D0C37] hover:bg-[#55144B] rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-70"
              >
                {isSubmitting ? (
                  <span>Sending request...</span>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Send Quote Request</span>
                  </>
                )}
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
