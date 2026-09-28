import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Send, CheckCircle, MessageSquare } from 'lucide-react';

export const ContactModal: React.FC = () => {
  const { contactModalProvider, setContactModalProvider, showToast } = useApp();
  const [message, setMessage] = useState('');
  const [senderName, setSenderName] = useState('Sarah Jenkins');
  const [senderEmail, setSenderEmail] = useState('sarah.j@example.com');
  const [sent, setSent] = useState(false);

  if (!contactModalProvider) return null;

  const provider = contactModalProvider;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setSent(true);
    setTimeout(() => {
      showToast(`Message sent to ${provider.businessName}! They will reply via email/SMS.`);
      setSent(false);
      setMessage('');
      setContactModalProvider(null);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div 
        className="bg-white rounded-3xl max-w-md w-full shadow-2xl overflow-hidden border border-[#E8DECB]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-[#3D0C37] text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-white/20 shrink-0">
              <img 
                src={provider.coverImage} 
                alt={provider.businessName}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h4 className="font-serif text-base font-bold leading-tight">{provider.businessName}</h4>
              <span className="text-[11px] text-slate-300">Typically replies in {provider.responseTime}</span>
            </div>
          </div>

          <button
            onClick={() => setContactModalProvider(null)}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {sent ? (
          <div className="p-8 text-center space-y-3">
            <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
            <h5 className="font-serif text-lg font-bold text-slate-900">Message Delivered</h5>
            <p className="text-xs text-slate-500">
              {provider.businessName} has received your direct message and will follow up shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSend} className="p-5 space-y-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">Your Name</label>
              <input
                type="text"
                required
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#E8DECB] rounded-xl focus:outline-none focus:border-[#55144B]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">Email or Phone</label>
              <input
                type="text"
                required
                value={senderEmail}
                onChange={(e) => setSenderEmail(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#E8DECB] rounded-xl focus:outline-none focus:border-[#55144B]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">Message</label>
              <textarea
                required
                rows={4}
                placeholder="Hi, I am planning a celebration on..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#E8DECB] rounded-xl focus:outline-none focus:border-[#55144B]"
              />
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setContactModalProvider(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-[#FAF7F2] rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-semibold text-white bg-[#3D0C37] hover:bg-[#55144B] rounded-xl flex items-center gap-1.5"
              >
                <Send className="w-3 h-3" />
                <span>Send Message</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
