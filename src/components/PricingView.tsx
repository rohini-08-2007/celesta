import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, Sparkles, HelpCircle, ArrowRight } from 'lucide-react';

export const PricingView: React.FC = () => {
  const { setCurrentView } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs font-semibold text-[#711A62] uppercase tracking-wider block mb-2">
          Transparent Partnership Plans
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-slate-900 tracking-tight">
          Simple Plans Designed to Grow Your Studio
        </h1>
        <p className="text-slate-600 text-sm sm:text-base mt-4 leading-relaxed">
          Choose a plan that fits your growth goals. Whether you are an independent artisan or a premier full-service production company, EventEase puts you in front of qualified celebration hosts.
        </p>
      </div>

      {/* Plan Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-20">
        
        {/* Plan 1: Free */}
        <div className="bg-white rounded-3xl p-8 border border-[#E8DECB] shadow-xs flex flex-col justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Starter</span>
            <h3 className="font-serif text-2xl font-bold text-slate-900 mt-1">Free Basic</h3>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-4xl font-bold text-slate-900 font-sans">$0</span>
              <span className="text-xs text-slate-500">/month</span>
            </div>
            <p className="text-xs text-slate-600 mt-3 leading-relaxed">
              Start building your reputation and receiving genuine celebration quote inquiries.
            </p>

            <div className="mt-8 pt-6 border-t border-[#F3EDE2] space-y-3 text-xs text-slate-700">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Standard directory listing</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Up to 5 quote requests per month</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Up to 6 portfolio images</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>8% platform commission on confirmed bookings</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              setCurrentView('register-provider');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="mt-8 w-full py-3 rounded-xl text-xs font-semibold text-slate-800 bg-[#FAF7F2] hover:bg-[#F3EDE2] border border-[#E8DECB] transition-all"
          >
            Start Free
          </button>
        </div>

        {/* Plan 2: Pro Partner */}
        <div className="bg-white rounded-3xl p-8 border-2 border-[#D4AF37] shadow-xl relative flex flex-col justify-between">
          <div className="absolute -top-3.5 right-8 bg-[#3D0C37] text-[#D4AF37] text-[10px] font-bold uppercase tracking-wider px-3.5 py-1 rounded-full border border-[#D4AF37]/50 shadow-sm">
            Most Popular
          </div>

          <div>
            <span className="text-xs font-semibold text-[#711A62] uppercase tracking-wider">High Visibility</span>
            <h3 className="font-serif text-2xl font-bold text-slate-900 mt-1">Pro Partner</h3>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-4xl font-bold text-[#55144B] font-sans">$29</span>
              <span className="text-xs text-slate-500">/month</span>
            </div>
            <p className="text-xs text-slate-600 mt-3 leading-relaxed">
              For established vendors who want consistent bookings and verified credibility.
            </p>

            <div className="mt-8 pt-6 border-t border-[#F3EDE2] space-y-3 text-xs text-slate-700">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span><strong>Verified Provider Badge</strong> on your profile</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span><strong>Unlimited</strong> quote requests and direct chats</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Up to 25 portfolio photos & video previews</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Reduced 4% commission on bookings</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Priority placement in category searches</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              setCurrentView('register-provider');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="mt-8 w-full py-3 rounded-xl text-xs font-semibold text-white bg-[#3D0C37] hover:bg-[#55144B] transition-all shadow-md"
          >
            Get Started with Pro
          </button>
        </div>

        {/* Plan 3: Premium Elite */}
        <div className="bg-white rounded-3xl p-8 border border-[#E8DECB] shadow-xs flex flex-col justify-between">
          <div>
            <span className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider">Maximum Reach</span>
            <h3 className="font-serif text-2xl font-bold text-slate-900 mt-1">Premium Elite</h3>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-4xl font-bold text-slate-900 font-sans">$69</span>
              <span className="text-xs text-slate-500">/month</span>
            </div>
            <p className="text-xs text-slate-600 mt-3 leading-relaxed">
              Prime featured placement for luxury studios, caterers, and high-volume planners.
            </p>

            <div className="mt-8 pt-6 border-t border-[#F3EDE2] space-y-3 text-xs text-slate-700">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span><strong>Featured Listing Placement</strong> on homepage & search top</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span><strong>0% Commission</strong> (keep 100% of your booking rate)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Instant SMS notifications for new leads</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Unlimited portfolio galleries & 4K video embeds</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Dedicated account concierge & onboarding</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              setCurrentView('register-provider');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="mt-8 w-full py-3 rounded-xl text-xs font-semibold text-slate-800 bg-[#FAF7F2] hover:bg-[#F3EDE2] border border-[#E8DECB] transition-all"
          >
            Upgrade to Premium
          </button>
        </div>

      </div>

      {/* FAQ Accordion Section */}
      <div className="max-w-3xl mx-auto pt-10 border-t border-[#E8DECB]">
        <h3 className="font-serif text-2xl font-bold text-slate-900 text-center mb-8">
          Frequently Asked Questions
        </h3>

        <div className="space-y-4 text-xs sm:text-sm text-slate-700">
          <div className="bg-white p-5 rounded-2xl border border-[#E8DECB]">
            <h4 className="font-semibold text-slate-900 mb-1.5">How do customer quote requests work?</h4>
            <p className="text-slate-600 leading-relaxed text-xs">
              When a customer is interested in your services, they submit their event date, guest count, and requirements through the "Request a Quote" form. You receive the inquiry instantly in your dashboard and can send an itemized proposal with your custom price.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#E8DECB]">
            <h4 className="font-semibold text-slate-900 mb-1.5">Can I pause my profile when fully booked?</h4>
            <p className="text-slate-600 leading-relaxed text-xs">
              Yes! You have a one-click "Accepting Inquiries" toggle right inside your Provider Dashboard. When paused, you will not receive new inquiries during dates you are unavailable.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#E8DECB]">
            <h4 className="font-semibold text-slate-900 mb-1.5">When do I pay the commission?</h4>
            <p className="text-slate-600 leading-relaxed text-xs">
              Commission is only charged on confirmed, paid bookings. If a client simply asks for a quote or cancels, you pay zero commission. Premium Elite plan members enjoy 0% commission on all events.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
