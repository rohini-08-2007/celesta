import React from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, CheckCircle, Info } from 'lucide-react';

export const NotificationToast: React.FC = () => {
  const { toastMessage } = useApp();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-60 animate-bounce-short">
      <div className="bg-[#2B0528] text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-[#D4AF37]/40 flex items-center gap-3 text-xs font-medium max-w-md">
        <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0" />
        <span className="leading-snug">{toastMessage}</span>
      </div>
    </div>
  );
};
