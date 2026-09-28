import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { CategoriesView } from './components/CategoriesView';
import { ExploreView } from './components/ExploreView';
import { CustomerDashboardView } from './components/CustomerDashboardView';
import { ProviderDashboardView } from './components/ProviderDashboardView';
import { ProviderRegistrationView } from './components/ProviderRegistrationView';
import { AdminDashboardView } from './components/AdminDashboardView';
import { PricingView } from './components/PricingView';
import { ProviderProfileModal } from './components/ProviderProfileModal';
import { QuoteRequestModal } from './components/QuoteRequestModal';
import { ContactModal } from './components/ContactModal';
import { NotificationToast } from './components/NotificationToast';

const AppContent: React.FC = () => {
  const { currentView } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-slate-800 font-sans selection:bg-[#3D0C37] selection:text-white">
      {/* Sticky Navigation Bar */}
      <Navbar />

      {/* Main View Area */}
      <main className="flex-1">
        {currentView === 'home' && <HomeView />}
        {currentView === 'categories' && <CategoriesView />}
        {currentView === 'explore' && <ExploreView />}
        {currentView === 'customer-dashboard' && <CustomerDashboardView />}
        {currentView === 'provider-dashboard' && <ProviderDashboardView />}
        {currentView === 'register-provider' && <ProviderRegistrationView />}
        {currentView === 'admin-dashboard' && <AdminDashboardView />}
        {currentView === 'pricing' && <PricingView />}
      </main>

      {/* Universal Modals & Overlays */}
      <ProviderProfileModal />
      <QuoteRequestModal />
      <ContactModal />
      <NotificationToast />

      {/* Comprehensive Business Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
