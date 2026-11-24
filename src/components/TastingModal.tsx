import React, { useState, useEffect } from 'react';
import { 
  X, 
  Send, 
  CheckCircle2, 
  Phone, 
  User, 
  MapPin, 
  Coffee,
  Package,
  MessageSquare,
  Building2,
  HeartHandshake
} from 'lucide-react';
import { getAssetUrl } from '../utils/assets.ts';

interface TastingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialProduct?: string;
}

export const TastingModal: React.FC<TastingModalProps> = ({ isOpen, onClose, initialProduct }) => {
  const [submitted, setSubmitted] = useState(false);
  const [inquiryId, setInquiryId] = useState('');
  const [inquiryType, setInquiryType] = useState<'personal' | 'wholesale'>('personal');

  // Personal Order State
  const [personalBlend, setPersonalBlend] = useState('Shanker Premium CTC Tea');
  const [personalWeight, setPersonalWeight] = useState('500g Fresh Pack (Recommended)');
  const [personalName, setPersonalName] = useState('');
  const [personalPhone, setPersonalPhone] = useState('');
  const [personalCity, setPersonalCity] = useState('');
  const [personalNotes, setPersonalNotes] = useState('');

  // Wholesale B2B State (3 rows)
  const [businessName, setBusinessName] = useState('');
  const [wholesaleBlend, setWholesaleBlend] = useState('Shanker Premium CTC (Cafe Grade)');
  const [contactPerson, setContactPerson] = useState('');
  const [wholesalePhone, setWholesalePhone] = useState('');
  const [businessCity, setBusinessCity] = useState('');
  const [monthlyVolume, setMonthlyVolume] = useState('25kg – 50kg / month');

  // Pre-fill blend and weight when opened from a specific product card
  useEffect(() => {
    if (initialProduct) {
      setInquiryType('personal');
      if (initialProduct.includes('Kadak')) setPersonalBlend('Shanker Kadak Chai Patti');
      else if (initialProduct.includes('Adrak')) setPersonalBlend('Shanker Adrak Chai Patti');
      else if (initialProduct.includes('Elaichi')) setPersonalBlend('Shanker Elaichi Chai Patti');
      else setPersonalBlend('Shanker Premium CTC Tea');

      if (initialProduct.includes('250g')) setPersonalWeight('250g Artisanal Pack');
      else if (initialProduct.includes('1kg')) setPersonalWeight('1kg Master Reserve Pack');
      else if (initialProduct.includes('500g')) setPersonalWeight('500g Fresh Pack (Recommended)');
    }
  }, [initialProduct, isOpen]);

  if (!isOpen) return null;

  const handleSubmitPersonal = (e: React.FormEvent) => {
    e.preventDefault();
    const randomId = 'ST-P' + Math.floor(1000 + Math.random() * 9000);
    setInquiryId(randomId);
    setSubmitted(true);
  };

  const handleSubmitWholesale = (e: React.FormEvent) => {
    e.preventDefault();
    const randomId = 'ST-B2B' + Math.floor(1000 + Math.random() * 9000);
    setInquiryId(randomId);
    setSubmitted(true);
  };

  const whatsappPhone = import.meta.env.VITE_WHATSAPP_NUMBER || '919876543210';

  const handleWhatsAppPersonal = () => {
    const text = encodeURIComponent(
      `Hello Shanker Tea Estate,\n\nI would like to place a Personal Harvest Order:\n• Blend: ${personalBlend}\n• Pack Size: ${personalWeight}\n• Name: ${personalName || 'Tea Lover'}\n• City: ${personalCity || 'India'}${personalNotes ? `\n• Special Request: ${personalNotes}` : ''}\n\nPlease share price quote & delivery timeline.`
    );
    window.open(`https://wa.me/${whatsappPhone}?text=${text}`, '_blank');
  };

  const handleWhatsAppWholesale = () => {
    const text = encodeURIComponent(
      `Hello Shanker Tea Wholesale Desk,\n\nWe would like to inquire about Wholesale / Bulk Supply:\n• Business/Outlet: ${businessName || 'Business Outlet'}\n• Blend Required: ${wholesaleBlend}\n• Monthly Volume: ${monthlyVolume}\n• Contact Person: ${contactPerson || 'Authorized Representative'}\n• Location: ${businessCity || 'India'}\n\nPlease share your Wholesale Price Catalog & Sample details.`
    );
    window.open(`https://wa.me/${whatsappPhone}?text=${text}`, '_blank');
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-xl transition-all">
      
      {/* Background Subtle Golden Ambient Glow */}
      <div className="absolute w-[550px] h-[550px] bg-[#F7CE68]/12 rounded-full blur-[150px] pointer-events-none" />

      {/* Luxury Glassmorphism Modal Card - NO SCROLLER, perfectly fitted */}
      <div className="relative w-full max-w-xl md:max-w-2xl rounded-3xl bg-[#06140D]/85 backdrop-blur-2xl border border-white/20 text-[#F5F0E5] shadow-[0_35px_100px_rgba(0,0,0,0.9)] p-5 sm:p-7 md:p-8 select-none overflow-hidden">
        
        {/* Subtle Top Glass Reflection Line */}
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/35 to-transparent pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={handleResetAndClose}
          className="absolute top-4 right-4 p-2 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors z-20"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          /* ===================================================================
              SUCCESS / CONFIRMATION SCREEN
              =================================================================== */
          <div className="py-8 text-center flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-[#1A3826] border border-[#F7CE68]/40 flex items-center justify-center mb-3 shadow-lg shadow-[#F7CE68]/20">
              <CheckCircle2 className="w-8 h-8 text-[#F7CE68]" />
            </div>

            <div className="text-[10px] font-mono text-[#F7CE68] uppercase tracking-widest font-bold mb-1">
              INQUIRY REF: {inquiryId}
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#F5F0E5] mb-2">
              {inquiryType === 'personal' ? 'Harvest Request Received' : 'Wholesale Inquiry Registered'}
            </h3>

            <p className="text-xs sm:text-sm text-[#F5F0E5]/80 font-light max-w-md leading-relaxed mb-5">
              {inquiryType === 'personal' ? (
                <>
                  Thank you, <span className="text-[#F7CE68] font-medium">{personalName || 'valued connoisseur'}</span>. 
                  Your order for <span className="text-[#F7CE68] font-medium">{personalBlend} ({personalWeight})</span> has been received. Our team will contact you shortly to confirm dispatch.
                </>
              ) : (
                <>
                  Thank you, <span className="text-[#F7CE68] font-medium">{contactPerson || 'Partner'}</span> ({businessName || 'your business'}). 
                  Your wholesale inquiry for <span className="text-[#F7CE68] font-medium">{wholesaleBlend}</span> ({monthlyVolume}) has been assigned to our B2B trade desk.
                </>
              )}
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-sm">
              <button
                type="button"
                onClick={inquiryType === 'personal' ? handleWhatsAppPersonal : handleWhatsAppWholesale}
                className="w-full py-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-[#09150E] font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Confirm on WhatsApp</span>
              </button>

              <button
                type="button"
                onClick={handleResetAndClose}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-[#F5F0E5] text-xs font-medium uppercase tracking-wider transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          /* ===================================================================
              SPACIOUS, NO-SCROLLER LUXURY FORM
              =================================================================== */
          <div>
            {/* Header: Clean Logo & Luxury Brand Title */}
            <div className="text-center mb-4">
              <img 
                src={getAssetUrl('assets/icons/logo.png')} 
                alt="Shanker Tea" 
                className="h-12 sm:h-14 w-auto object-contain mx-auto mb-2 filter drop-shadow-[0_4px_14px_rgba(0,0,0,0.8)]" 
              />
              <h2 className="font-serif text-2xl sm:text-3xl font-light tracking-[0.08em] text-[#F5F0E5]">
                SHANKER TEA
              </h2>
              <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-[#F7CE68] mt-0.5 font-semibold transition-all">
                {inquiryType === 'personal' 
                  ? 'Direct Estate Harvest • Fresh To Cup' 
                  : 'Estate Wholesale & Bulk Supply'}
              </p>
            </div>

            {/* Mode Switcher: Single Word Clean Tabs */}
            <div className="grid grid-cols-2 gap-2 p-1 rounded-2xl bg-white/[0.04] border border-white/10 mb-4">
              <button
                type="button"
                onClick={() => setInquiryType('personal')}
                className={`py-2 px-3 rounded-xl flex items-center justify-center gap-2 text-xs font-mono uppercase tracking-wider transition-all duration-300 ${
                  inquiryType === 'personal'
                    ? 'bg-[#F7CE68] text-[#0E2015] font-bold shadow-md shadow-[#F7CE68]/20 scale-[1.01]'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                <HeartHandshake className="w-3.5 h-3.5" />
                <span>Personal</span>
              </button>

              <button
                type="button"
                onClick={() => setInquiryType('wholesale')}
                className={`py-2 px-3 rounded-xl flex items-center justify-center gap-2 text-xs font-mono uppercase tracking-wider transition-all duration-300 ${
                  inquiryType === 'wholesale'
                    ? 'bg-[#F7CE68] text-[#0E2015] font-bold shadow-md shadow-[#F7CE68]/20 scale-[1.01]'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>Wholesale</span>
              </button>
            </div>

            {/* ===================================================================
                FORM VARIANT A: PERSONAL ORDER (3 Rows, No Scroller)
                =================================================================== */}
            {inquiryType === 'personal' ? (
              <form onSubmit={handleSubmitPersonal} className="space-y-3">
                
                {/* Row 1: Tea Flavor & Pack Size */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-[#F7CE68] font-bold mb-1">
                      <Coffee className="w-3.5 h-3.5" />
                      <span>Tea Flavor</span>
                    </label>
                    <select
                      value={personalBlend}
                      onChange={(e) => setPersonalBlend(e.target.value)}
                      className="w-full px-3.5 py-3 rounded-xl bg-white/[0.06] backdrop-blur-md border border-white/20 focus:border-[#F7CE68] focus:bg-white/[0.1] focus:outline-none text-xs sm:text-sm text-[#F5F0E5] font-medium cursor-pointer shadow-inner transition-all"
                    >
                      <option value="Shanker Premium CTC Tea" className="bg-[#0B1A11] text-white">Shanker Premium CTC Tea</option>
                      <option value="Shanker Kadak Chai Patti" className="bg-[#0B1A11] text-white">Shanker Kadak Chai Patti</option>
                      <option value="Shanker Adrak Chai Patti" className="bg-[#0B1A11] text-white">Shanker Adrak Chai Patti</option>
                      <option value="Shanker Elaichi Chai Patti" className="bg-[#0B1A11] text-white">Shanker Elaichi Chai Patti</option>
                      <option value="Grand Sampler Box (All 4 Blends)" className="bg-[#0B1A11] text-white">Grand Sampler Box (All 4 Blends)</option>
                    </select>
                  </div>

                  <div>
                    <label className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-[#F7CE68] font-bold mb-1">
                      <Package className="w-3.5 h-3.5" />
                      <span>Pack Size</span>
                    </label>
                    <select
                      value={personalWeight}
                      onChange={(e) => setPersonalWeight(e.target.value)}
                      className="w-full px-3.5 py-3 rounded-xl bg-white/[0.06] backdrop-blur-md border border-white/20 focus:border-[#F7CE68] focus:bg-white/[0.1] focus:outline-none text-xs sm:text-sm text-[#F5F0E5] font-medium cursor-pointer shadow-inner transition-all"
                    >
                      <option value="250g Artisanal Pack" className="bg-[#0B1A11] text-white">250g Artisanal Pack</option>
                      <option value="500g Fresh Pack (Recommended)" className="bg-[#0B1A11] text-white">500g Fresh Pack (Recommended)</option>
                      <option value="1kg Master Reserve Pack" className="bg-[#0B1A11] text-white">1kg Master Reserve Pack</option>
                      <option value="Grand Sampler Curation Box" className="bg-[#0B1A11] text-white">Grand Sampler Curation Box</option>
                    </select>
                  </div>
                </div>

                {/* Row 2: Customer Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-white/70 mb-1">
                      <User className="w-3.5 h-3.5 text-[#F7CE68]" />
                      <span>Your Name *</span>
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Praveen Kumar"
                      value={personalName}
                      onChange={(e) => setPersonalName(e.target.value)}
                      className="w-full px-3.5 py-3 rounded-xl bg-white/[0.06] backdrop-blur-md border border-white/15 focus:border-[#F7CE68] focus:bg-white/[0.1] focus:outline-none text-xs sm:text-sm text-white placeholder-white/35 transition-all shadow-inner"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-white/70 mb-1">
                      <Phone className="w-3.5 h-3.5 text-[#F7CE68]" />
                      <span>Phone / WhatsApp *</span>
                    </label>
                    <input
                      required
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={personalPhone}
                      onChange={(e) => setPersonalPhone(e.target.value)}
                      className="w-full px-3.5 py-3 rounded-xl bg-white/[0.06] backdrop-blur-md border border-white/15 focus:border-[#F7CE68] focus:bg-white/[0.1] focus:outline-none text-xs sm:text-sm text-white placeholder-white/35 transition-all shadow-inner"
                    />
                  </div>
                </div>

                {/* Row 3: City & Special Request */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-white/70 mb-1">
                      <MapPin className="w-3.5 h-3.5 text-[#F7CE68]" />
                      <span>Delivery City / Pincode *</span>
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Kanpur, UP / 208001"
                      value={personalCity}
                      onChange={(e) => setPersonalCity(e.target.value)}
                      className="w-full px-3.5 py-3 rounded-xl bg-white/[0.06] backdrop-blur-md border border-white/15 focus:border-[#F7CE68] focus:bg-white/[0.1] focus:outline-none text-xs sm:text-sm text-white placeholder-white/35 transition-all shadow-inner"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-white/70 mb-1">
                      <MessageSquare className="w-3.5 h-3.5 text-[#F7CE68]" />
                      <span>Special Note (Optional)</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Gift packaging / rush order"
                      value={personalNotes}
                      onChange={(e) => setPersonalNotes(e.target.value)}
                      className="w-full px-3.5 py-3 rounded-xl bg-white/[0.06] backdrop-blur-md border border-white/15 focus:border-[#F7CE68] focus:bg-white/[0.1] focus:outline-none text-xs sm:text-sm text-white placeholder-white/35 transition-all shadow-inner"
                    />
                  </div>
                </div>

                {/* Actions: Submit & Direct WhatsApp */}
                <div className="pt-2 flex flex-col sm:flex-row items-center gap-2.5">
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#F7CE68] to-[#E5B544] hover:from-[#FFE18E] hover:to-[#F7CE68] text-[#0E2015] font-bold text-xs uppercase tracking-[0.18em] transition-all flex items-center justify-center gap-2 shadow-xl shadow-[#F7CE68]/20 hover:scale-[1.01] active:scale-95"
                  >
                    <span>Submit Personal Order</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={handleWhatsAppPersonal}
                    className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-[#25D366]/20 hover:bg-[#25D366] text-[#25D366] hover:text-[#0E2015] border border-[#25D366]/40 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 whitespace-nowrap shadow-lg shadow-black/20"
                    title="Direct WhatsApp Order"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </button>
                </div>

              </form>
            ) : (
              /* ===================================================================
                  FORM VARIANT B: WHOLESALE (3 Rows, No Scroller)
                  =================================================================== */
              <form onSubmit={handleSubmitWholesale} className="space-y-3">
                
                {/* Row 1: Business / Cafe Name & Blend Required */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-[#F7CE68] font-bold mb-1">
                      <Building2 className="w-3.5 h-3.5" />
                      <span>Business / Cafe Name *</span>
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Chai Shai Cafe / Royal Hotel"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      className="w-full px-3.5 py-3 rounded-xl bg-white/[0.06] backdrop-blur-md border border-white/20 focus:border-[#F7CE68] focus:bg-white/[0.1] focus:outline-none text-xs sm:text-sm text-white placeholder-white/35 transition-all shadow-inner"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-[#F7CE68] font-bold mb-1">
                      <Coffee className="w-3.5 h-3.5" />
                      <span>Primary Blend Required</span>
                    </label>
                    <select
                      value={wholesaleBlend}
                      onChange={(e) => setWholesaleBlend(e.target.value)}
                      className="w-full px-3.5 py-3 rounded-xl bg-white/[0.06] backdrop-blur-md border border-white/20 focus:border-[#F7CE68] focus:bg-white/[0.1] focus:outline-none text-xs sm:text-sm text-[#F5F0E5] font-medium cursor-pointer shadow-inner transition-all"
                    >
                      <option value="Shanker Premium CTC (Cafe Grade)" className="bg-[#0B1A11] text-white">Shanker Premium CTC (Cafe Grade)</option>
                      <option value="Shanker Kadak Chai (Extra Strong)" className="bg-[#0B1A11] text-white">Shanker Kadak Chai (Extra Strong)</option>
                      <option value="Shanker Adrak & Elaichi Spiced" className="bg-[#0B1A11] text-white">Shanker Adrak & Elaichi Spiced</option>
                      <option value="Complete Cafe Trial Sample Kit" className="bg-[#0B1A11] text-white">Complete Cafe Trial Sample Kit</option>
                      <option value="Custom Proprietary Estate Blend" className="bg-[#0B1A11] text-white">Custom Proprietary Estate Blend</option>
                    </select>
                  </div>
                </div>

                {/* Row 2: Contact Person & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-white/70 mb-1">
                      <User className="w-3.5 h-3.5 text-[#F7CE68]" />
                      <span>Contact Person & Role *</span>
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Rahul Sharma (Owner / Manager)"
                      value={contactPerson}
                      onChange={(e) => setContactPerson(e.target.value)}
                      className="w-full px-3.5 py-3 rounded-xl bg-white/[0.06] backdrop-blur-md border border-white/15 focus:border-[#F7CE68] focus:bg-white/[0.1] focus:outline-none text-xs sm:text-sm text-white placeholder-white/35 transition-all shadow-inner"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-white/70 mb-1">
                      <Phone className="w-3.5 h-3.5 text-[#F7CE68]" />
                      <span>Phone / WhatsApp *</span>
                    </label>
                    <input
                      required
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={wholesalePhone}
                      onChange={(e) => setWholesalePhone(e.target.value)}
                      className="w-full px-3.5 py-3 rounded-xl bg-white/[0.06] backdrop-blur-md border border-white/15 focus:border-[#F7CE68] focus:bg-white/[0.1] focus:outline-none text-xs sm:text-sm text-white placeholder-white/35 transition-all shadow-inner"
                    />
                  </div>
                </div>

                {/* Row 3: Outlet Location & Monthly Requirement */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-white/70 mb-1">
                      <MapPin className="w-3.5 h-3.5 text-[#F7CE68]" />
                      <span>Outlet Location (City / State) *</span>
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Lucknow, Uttar Pradesh"
                      value={businessCity}
                      onChange={(e) => setBusinessCity(e.target.value)}
                      className="w-full px-3.5 py-3 rounded-xl bg-white/[0.06] backdrop-blur-md border border-white/15 focus:border-[#F7CE68] focus:bg-white/[0.1] focus:outline-none text-xs sm:text-sm text-white placeholder-white/35 transition-all shadow-inner"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-white/70 mb-1">
                      <Package className="w-3.5 h-3.5 text-[#F7CE68]" />
                      <span>Estimated Monthly Requirement</span>
                    </label>
                    <select
                      value={monthlyVolume}
                      onChange={(e) => setMonthlyVolume(e.target.value)}
                      className="w-full px-3.5 py-3 rounded-xl bg-white/[0.06] backdrop-blur-md border border-white/15 focus:border-[#F7CE68] focus:bg-white/[0.1] focus:outline-none text-xs sm:text-sm text-[#F5F0E5] font-medium cursor-pointer shadow-inner transition-all"
                    >
                      <option value="10kg – 25kg / month (Boutique Cafe)" className="bg-[#0B1A11] text-white">10kg – 25kg / month (Boutique Cafe)</option>
                      <option value="25kg – 50kg / month (Active Outlet)" className="bg-[#0B1A11] text-white">25kg – 50kg / month (Active Outlet)</option>
                      <option value="50kg – 100kg / month (Multi-Outlet/Hotel)" className="bg-[#0B1A11] text-white">50kg – 100kg / month (Multi-Outlet/Hotel)</option>
                      <option value="100kg+ Commercial Bulk Sacks" className="bg-[#0B1A11] text-white">100kg+ Commercial Bulk Sacks</option>
                      <option value="Trial Sample Box First" className="bg-[#0B1A11] text-white">Trial Sample Box First</option>
                    </select>
                  </div>
                </div>

                {/* Actions: Request Wholesale Catalog & WhatsApp B2B */}
                <div className="pt-2 flex flex-col sm:flex-row items-center gap-2.5">
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#F7CE68] to-[#E5B544] hover:from-[#FFE18E] hover:to-[#F7CE68] text-[#0E2015] font-bold text-xs uppercase tracking-[0.18em] transition-all flex items-center justify-center gap-2 shadow-xl shadow-[#F7CE68]/20 hover:scale-[1.01] active:scale-95"
                  >
                    <span>Request Wholesale Catalog</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={handleWhatsAppWholesale}
                    className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-[#25D366]/20 hover:bg-[#25D366] text-[#25D366] hover:text-[#0E2015] border border-[#25D366]/40 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 whitespace-nowrap shadow-lg shadow-black/20"
                    title="Direct WhatsApp B2B Desk"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </button>
                </div>

              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
