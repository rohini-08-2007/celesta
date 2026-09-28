import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Users, 
  Briefcase, 
  Calendar, 
  DollarSign, 
  ShieldCheck, 
  Check, 
  X, 
  Sparkles, 
  Star, 
  AlertCircle,
  TrendingUp,
  Tag
} from 'lucide-react';
import { CATEGORIES } from '../data/mockData';

export const AdminDashboardView: React.FC = () => {
  const { 
    providers, 
    quoteRequests, 
    bookings, 
    approveProvider, 
    rejectProvider, 
    toggleFeaturedProvider,
    showToast 
  } = useApp();

  const [activeAdminTab, setActiveAdminTab] = useState<'providers' | 'categories' | 'analytics'>('providers');

  // Counts
  const totalCustomers = 1420;
  const totalProviders = providers.length;
  const totalBookingsCount = bookings.length + 518;
  const totalQuoteRequests = quoteRequests.length + 380;
  const platformRevenue = 18450; // $18,450 GMV commission + subscriptions

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Top Banner */}
      <div className="bg-[#3D0C37] rounded-3xl p-6 sm:p-8 text-white mb-8 border border-[#55144B] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider">
              Super Admin Console
            </span>
            <span className="bg-[#55144B] text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-400/30">
              Live Production
            </span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold">
            Platform Governance & Operations
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            Approve applicants, manage sponsored vendor placements, and track marketplace health.
          </p>
        </div>

        <div className="text-right">
          <span className="text-[11px] text-slate-300 block uppercase">Platform GMV</span>
          <span className="text-2xl font-bold text-[#D4AF37] font-sans tabular-nums">$148,900</span>
        </div>
      </div>

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        
        <div className="bg-white rounded-2xl border border-[#E8DECB] p-5 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-medium">Total Hosts</span>
            <Users className="w-4 h-4 text-[#55144B]" />
          </div>
          <div className="text-2xl font-bold text-slate-900 font-sans tabular-nums">
            {totalCustomers.toLocaleString()}
          </div>
          <span className="text-[11px] text-emerald-700 font-medium">+14% this month</span>
        </div>

        <div className="bg-white rounded-2xl border border-[#E8DECB] p-5 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-medium">Active Providers</span>
            <Briefcase className="w-4 h-4 text-[#55144B]" />
          </div>
          <div className="text-2xl font-bold text-slate-900 font-sans tabular-nums">
            {totalProviders}
          </div>
          <span className="text-[11px] text-slate-500">11 Categories</span>
        </div>

        <div className="bg-white rounded-2xl border border-[#E8DECB] p-5 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-medium">Total Bookings</span>
            <Calendar className="w-4 h-4 text-[#55144B]" />
          </div>
          <div className="text-2xl font-bold text-slate-900 font-sans tabular-nums">
            {totalBookingsCount}
          </div>
          <span className="text-[11px] text-emerald-700 font-medium">99.4% Fulfillment</span>
        </div>

        <div className="bg-white rounded-2xl border border-[#E8DECB] p-5 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-medium">Quote Requests</span>
            <Sparkles className="w-4 h-4 text-[#55144B]" />
          </div>
          <div className="text-2xl font-bold text-slate-900 font-sans tabular-nums">
            {totalQuoteRequests}
          </div>
          <span className="text-[11px] text-slate-500">&lt; 2hr avg response</span>
        </div>

        <div className="bg-white rounded-2xl border border-[#E8DECB] p-5 shadow-xs col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-medium">Platform Revenue</span>
            <DollarSign className="w-4 h-4 text-[#55144B]" />
          </div>
          <div className="text-2xl font-bold text-[#55144B] font-sans tabular-nums">
            ${platformRevenue.toLocaleString()}
          </div>
          <span className="text-[11px] text-emerald-700 font-medium">Commission & Subs</span>
        </div>

      </div>

      {/* Admin Tabs */}
      <div className="bg-white rounded-2xl border border-[#E8DECB] p-1.5 mb-8 flex items-center gap-1 overflow-x-auto">
        <button
          onClick={() => setActiveAdminTab('providers')}
          className={`px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
            activeAdminTab === 'providers' ? 'bg-[#3D0C37] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Provider Moderation & Featured Toggles ({providers.length})
        </button>

        <button
          onClick={() => setActiveAdminTab('categories')}
          className={`px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
            activeAdminTab === 'categories' ? 'bg-[#3D0C37] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Manage Categories ({CATEGORIES.length})
        </button>

        <button
          onClick={() => setActiveAdminTab('analytics')}
          className={`px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
            activeAdminTab === 'analytics' ? 'bg-[#3D0C37] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Revenue & Monetization Breakdown
        </button>
      </div>

      {/* TAB 1: Provider Moderation Table */}
      {activeAdminTab === 'providers' && (
        <div className="bg-white rounded-2xl border border-[#E8DECB] overflow-hidden shadow-xs">
          <div className="p-6 border-b border-[#F3EDE2] flex items-center justify-between">
            <div>
              <h2 className="font-serif text-lg font-bold text-slate-900">Registered Service Providers</h2>
              <p className="text-xs text-slate-500 mt-0.5">Toggle verification status, approve applicants, or feature top vendors.</p>
            </div>
            <span className="text-xs text-slate-400">Total: {providers.length} registered</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF7F2] text-slate-500 uppercase tracking-wider text-[11px] border-b border-[#E8DECB]">
                <tr>
                  <th className="py-3 px-4 font-semibold">Business / Owner</th>
                  <th className="py-3 px-4 font-semibold">Category & City</th>
                  <th className="py-3 px-4 font-semibold">Plan</th>
                  <th className="py-3 px-4 font-semibold">Rating</th>
                  <th className="py-3 px-4 font-semibold">Status</th>
                  <th className="py-3 px-4 font-semibold text-center">Featured Ad</th>
                  <th className="py-3 px-4 font-semibold text-right">Moderation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F3EDE2] text-slate-700">
                {providers.map((p) => (
                  <tr key={p.id} className="hover:bg-[#FAF7F2]/60 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-900">{p.businessName}</div>
                      <div className="text-[11px] text-slate-400">{p.ownerName} · {p.email}</div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="font-medium text-[#711A62]">{p.category}</span>
                      <div className="text-[11px] text-slate-400">{p.city}</div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="uppercase font-bold text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-700 border">
                        {p.subscriptionTier}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1 font-semibold text-slate-900">
                        <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                        <span>{p.rating.toFixed(1)}</span>
                        <span className="text-slate-400 font-normal">({p.reviewCount})</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      {p.approvalStatus === 'approved' ? (
                        <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[11px] font-semibold border border-emerald-200">
                          <Check className="w-3 h-3" />
                          Approved
                        </span>
                      ) : p.approvalStatus === 'pending' ? (
                        <span className="inline-flex items-center gap-1 text-amber-700 bg-amber-50 px-2 py-0.5 rounded text-[11px] font-semibold border border-amber-200">
                          Pending Review
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-rose-700 bg-rose-50 px-2 py-0.5 rounded text-[11px] font-semibold border border-rose-200">
                          Rejected
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={() => toggleFeaturedProvider(p.id)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                          p.featured
                            ? 'bg-[#D4AF37] text-[#2B0528] shadow-xs'
                            : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                        }`}
                        title="Click to toggle featured placement"
                      >
                        {p.featured ? 'Featured' : 'Standard'}
                      </button>
                    </td>

                    <td className="py-3.5 px-4 text-right space-x-1.5 whitespace-nowrap">
                      {p.approvalStatus !== 'approved' && (
                        <button
                          onClick={() => approveProvider(p.id)}
                          className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[11px] font-semibold"
                        >
                          Approve
                        </button>
                      )}
                      {p.approvalStatus !== 'rejected' && (
                        <button
                          onClick={() => rejectProvider(p.id)}
                          className="px-2.5 py-1 bg-rose-100 hover:bg-rose-200 text-rose-800 rounded-lg text-[11px] font-semibold"
                        >
                          Reject
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: Categories Management */}
      {activeAdminTab === 'categories' && (
        <div className="bg-white rounded-2xl border border-[#E8DECB] p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-[#F3EDE2]">
            <div>
              <h2 className="font-serif text-lg font-bold text-slate-900">Platform Service Categories</h2>
              <p className="text-xs text-slate-500">Taxonomy of event services available to customers.</p>
            </div>
            <button 
              onClick={() => showToast('New category modal is enabled for platform administrators.')}
              className="px-4 py-2 text-xs font-semibold text-white bg-[#3D0C37] rounded-xl hover:bg-[#55144B]"
            >
              Add New Category
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CATEGORIES.map(cat => (
              <div key={cat.id} className="p-4 rounded-xl border border-[#E8DECB] bg-[#FAF7F2] flex items-center justify-between">
                <div>
                  <h4 className="font-serif text-base font-bold text-slate-900">{cat.name}</h4>
                  <span className="text-xs text-slate-500">{cat.providerCount} active listings</span>
                  <div className="text-[11px] text-slate-400 mt-1">Starting from ${cat.startingFrom}</div>
                </div>
                <span className="px-2 py-1 text-[10px] font-semibold rounded bg-white text-emerald-700 border border-emerald-200">
                  Active
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: Revenue & Monetization */}
      {activeAdminTab === 'analytics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl border border-[#E8DECB] p-6 shadow-xs">
              <h4 className="font-serif text-base font-bold text-slate-900 mb-2">1. Featured Listings Ad Revenue</h4>
              <p className="text-xs text-slate-500 mb-4">
                Providers pay a premium to appear at the top of category searches and the homepage hero showcase.
              </p>
              <div className="text-2xl font-bold text-[#55144B] font-sans tabular-nums">$6,450 / mo</div>
              <span className="text-[11px] text-slate-400 block mt-1">45 active featured placements</span>
            </div>

            <div className="bg-white rounded-2xl border border-[#E8DECB] p-6 shadow-xs">
              <h4 className="font-serif text-base font-bold text-slate-900 mb-2">2. Booking Commission (4-8%)</h4>
              <p className="text-xs text-slate-500 mb-4">
                EventEase charges a nominal platform fee on guaranteed confirmed celebration bookings.
              </p>
              <div className="text-2xl font-bold text-[#55144B] font-sans tabular-nums">$8,120 / mo</div>
              <span className="text-[11px] text-slate-400 block mt-1">Based on $148,900 GMV</span>
            </div>

            <div className="bg-white rounded-2xl border border-[#E8DECB] p-6 shadow-xs">
              <h4 className="font-serif text-base font-bold text-slate-900 mb-2">3. Pro & Premium SaaS Subscriptions</h4>
              <p className="text-xs text-slate-500 mb-4">
                Monthly partner plans for SMS lead alerts, verified badges, and portfolio tools.
              </p>
              <div className="text-2xl font-bold text-[#55144B] font-sans tabular-nums">$3,880 / mo</div>
              <span className="text-[11px] text-slate-400 block mt-1">112 Pro & Premium subscribers</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
