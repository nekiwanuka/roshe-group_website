import React, { useState, useEffect } from 'react';
import { 
  Plane, 
  Ship, 
  ShieldCheck, 
  Search, 
  Warehouse, 
  Truck, 
  Globe, 
  ArrowRight, 
  CheckCircle2, 
  Menu, 
  X, 
  Phone, 
  Mail, 
  MapPin,
  ChevronRight,
  Clock,
  Zap,
  Users
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---
type Page = 'home' | 'about' | 'services' | 'hubs' | 'quote';

// --- Components ---

const Logo = ({ isScrolled, isDark = false }: { isScrolled?: boolean, isDark?: boolean }) => (
  <div className="flex items-center gap-2 cursor-pointer">
    <img 
      src="https://storage.googleapis.com/static.miraibot.ai/app_assets/uaddxy2pxgmcjhdrhzi776/logo.png" 
      alt="Roshe Group Logo" 
      className={`h-10 w-auto object-contain transition-all duration-300 ${isDark ? 'brightness-0 invert' : isScrolled ? 'brightness-0' : 'brightness-0 invert'}`}
      referrerPolicy="no-referrer"
    />
  </div>
);

const Header = ({ activePage, setPage }: { activePage: Page, setPage: (p: Page) => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { label: string, value: Page }[] = [
    { label: 'Home', value: 'home' },
    { label: 'About Us', value: 'about' },
    { label: 'Services', value: 'services' },
    { label: 'Regional Hubs', value: 'hubs' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div onClick={() => setPage('home')}>
          <Logo isScrolled={isScrolled} />
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.value}
              onClick={() => setPage(item.value)}
              className={`text-sm font-medium transition-colors hover:text-brand-yellow ${
                activePage === item.value 
                  ? 'text-brand-yellow' 
                  : isScrolled ? 'text-brand-navy' : 'text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
          <button 
            onClick={() => setPage('quote')}
            className="bg-brand-yellow text-brand-navy px-6 py-2.5 rounded-full font-bold text-sm hover:scale-105 transition-transform shadow-lg"
          >
            Request a Quote
          </button>
        </nav>

        {/* Mobile Toggle */}
        <button className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? (
            <X className={isScrolled ? 'text-brand-navy' : 'text-white'} />
          ) : (
            <Menu className={isScrolled ? 'text-brand-navy' : 'text-white'} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white shadow-2xl p-6 md:hidden flex flex-col gap-4"
          >
            {navItems.map((item) => (
              <button
                key={item.value}
                onClick={() => { setPage(item.value); setIsMobileMenuOpen(false); }}
                className={`text-left text-lg font-semibold ${activePage === item.value ? 'text-brand-yellow' : 'text-brand-navy'}`}
              >
                {item.label}
              </button>
            ))}
            <button 
              onClick={() => { setPage('quote'); setIsMobileMenuOpen(false); }}
              className="bg-brand-yellow text-brand-navy px-6 py-3 rounded-xl font-bold text-center shadow-lg"
            >
              Request a Quote
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

const Footer = () => (
  <footer className="bg-brand-navy text-white pt-20 pb-10">
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
      <div className="space-y-6">
        <Logo isDark={true} />
        <p className="text-slate-400 text-sm leading-relaxed">
          Your premier logistics partner bridging the gap between China's manufacturing hubs and East Africa's growing markets.
        </p>
        <div className="flex gap-4">
          {['facebook', 'twitter', 'linkedin', 'instagram'].map(s => (
            <div key={s} className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-yellow hover:text-brand-navy transition-colors cursor-pointer">
              <Globe size={16} />
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-bold text-lg mb-6">Services</h4>
        <ul className="space-y-4 text-slate-400 text-sm">
          <li className="hover:text-brand-yellow cursor-pointer">Air Freight</li>
          <li className="hover:text-brand-yellow cursor-pointer">Sea Freight</li>
          <li className="hover:text-brand-yellow cursor-pointer">Customs Clearing</li>
          <li className="hover:text-brand-yellow cursor-pointer">Sourcing & Procurement</li>
          <li className="hover:text-brand-yellow cursor-pointer">Warehousing</li>
        </ul>
      </div>

      <div>
        <h4 className="font-bold text-lg mb-6">Quick Links</h4>
        <ul className="space-y-4 text-slate-400 text-sm">
          <li className="hover:text-brand-yellow cursor-pointer">About Us</li>
          <li className="hover:text-brand-yellow cursor-pointer">Regional Hubs</li>
          <li className="hover:text-brand-yellow cursor-pointer">Request a Quote</li>
          <li className="hover:text-brand-yellow cursor-pointer">Track Shipment</li>
          <li className="hover:text-brand-yellow cursor-pointer">Contact</li>
        </ul>
      </div>

      <div>
        <h4 className="font-bold text-lg mb-6">Contact Us</h4>
        <ul className="space-y-4 text-slate-400 text-sm">
          <li className="flex items-start gap-3">
            <MapPin size={18} className="text-brand-yellow shrink-0" />
            <span>Guangzhou, China | Kampala, Uganda</span>
          </li>
          <li className="flex items-center gap-3">
            <Phone size={18} className="text-brand-yellow shrink-0" />
            <span>+256 700 000 000</span>
          </li>
          <li className="flex items-center gap-3">
            <Mail size={18} className="text-brand-yellow shrink-0" />
            <span>info@roshegroup.com</span>
          </li>
        </ul>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-white/10 text-center text-slate-500 text-xs">
      © {new Date().getFullYear()} Roshe Group. All rights reserved. Designed for East African Trade.
    </div>
  </footer>
);

const ServiceCard = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
  <motion.div 
    whileHover={{ y: -10 }}
    className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-2xl transition-all group relative overflow-hidden"
  >
    <div className="absolute -right-4 -top-4 w-24 h-24 bg-brand-yellow/5 rounded-full group-hover:bg-brand-yellow/10 transition-colors" />
    <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-brand-navy transition-all duration-300">
      <Icon className="text-brand-navy w-8 h-8 group-hover:text-brand-yellow transition-colors" />
    </div>
    <h3 className="text-2xl font-black text-brand-navy mb-4">{title}</h3>
    <p className="text-slate-600 text-sm leading-relaxed font-medium">{description}</p>
    <button className="mt-8 flex items-center gap-2 text-brand-navy font-black text-sm group-hover:text-brand-yellow transition-colors uppercase tracking-wider">
      Learn More <ArrowRight size={16} />
    </button>
  </motion.div>
);

const HubCard = ({ country, flag, capability }: { country: string, flag: string, capability: string }) => (
  <div className="bg-white border-l-4 border-brand-yellow p-6 rounded-r-2xl shadow-sm hover:shadow-md transition-all hover:translate-x-1">
    <div className="flex items-center gap-3 mb-4">
      <span className="text-3xl">{flag}</span>
      <h4 className="font-black text-brand-navy text-lg">{country}</h4>
    </div>
    <p className="text-slate-600 text-sm font-medium leading-relaxed">{capability}</p>
  </div>
);

const QuoteForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    origin: '',
    destination: 'Uganda',
    cargoType: '',
    weight: '',
    mode: 'Air',
    name: '',
    email: '',
    whatsapp: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="text-center py-20 space-y-6">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 size={40} />
        </div>
        <h3 className="text-3xl font-bold text-brand-navy">Quote Request Received!</h3>
        <p className="text-slate-600 max-w-md mx-auto">
          Our logistics experts are reviewing your requirements. We will contact you via WhatsApp/Email within 2 hours.
        </p>
        <button 
          onClick={() => setSubmitted(false)}
          className="bg-brand-navy text-white px-8 py-3 rounded-full font-bold"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100">
      <div className="bg-brand-navy p-8 text-white">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold">Smart Quote Center</h3>
          <span className="bg-brand-yellow text-brand-navy px-3 py-1 rounded-full text-xs font-bold">Step {step} of 3</span>
        </div>
        <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
          <motion.div 
            className="bg-brand-yellow h-full"
            initial={{ width: '0%' }}
            animate={{ width: `${(step / 3) * 100}%` }}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-8 space-y-6">
        {step === 1 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
            <h4 className="font-bold text-slate-800">Origin & Destination</h4>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase">Pickup City in China</label>
              <input 
                type="text" 
                placeholder="e.g. Guangzhou, Shenzhen" 
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-navy outline-none"
                value={formData.origin}
                onChange={e => setFormData({...formData, origin: e.target.value})}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase">Destination Country</label>
              <select 
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-navy outline-none"
                value={formData.destination}
                onChange={e => setFormData({...formData, destination: e.target.value})}
              >
                {['Uganda', 'Kenya', 'Tanzania', 'Rwanda', 'Burundi', 'South Sudan'].map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
            <h4 className="font-bold text-slate-800">Cargo Details</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase">Type of Goods</label>
                <input 
                  type="text" 
                  placeholder="e.g. Electronics" 
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                  value={formData.cargoType}
                  onChange={e => setFormData({...formData, cargoType: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase">Weight (kg)</label>
                <input 
                  type="number" 
                  placeholder="0" 
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                  value={formData.weight}
                  onChange={e => setFormData({...formData, weight: e.target.value})}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase">Shipping Mode</label>
              <div className="grid grid-cols-2 gap-4">
                {['Air', 'Sea'].map(m => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setFormData({...formData, mode: m})}
                    className={`p-4 rounded-xl border-2 font-bold transition-all ${formData.mode === m ? 'border-brand-navy bg-brand-navy text-white' : 'border-slate-200 text-slate-500'}`}
                  >
                    {m === 'Air' ? <Plane className="inline mr-2" size={18} /> : <Ship className="inline mr-2" size={18} />}
                    {m} Freight
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
            <h4 className="font-bold text-slate-800">Contact Information</h4>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase">Full Name</label>
              <input 
                type="text" 
                placeholder="Your Name" 
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase">WhatsApp Number</label>
              <input 
                type="tel" 
                placeholder="+256..." 
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                value={formData.whatsapp}
                onChange={e => setFormData({...formData, whatsapp: e.target.value})}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase">Email Address</label>
              <input 
                type="email" 
                placeholder="email@example.com" 
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>
          </motion.div>
        )}

        <div className="flex gap-4 pt-4">
          {step > 1 && (
            <button 
              type="button" 
              onClick={prevStep}
              className="flex-1 p-4 border-2 border-brand-navy text-brand-navy font-bold rounded-xl hover:bg-slate-50"
            >
              Back
            </button>
          )}
          {step < 3 ? (
            <button 
              type="button" 
              onClick={nextStep}
              className="flex-1 p-4 bg-brand-navy text-white font-bold rounded-xl shadow-lg hover:scale-[1.02] transition-transform"
            >
              Next Step
            </button>
          ) : (
            <button 
              type="submit"
              className="flex-1 p-4 bg-brand-yellow text-brand-navy font-bold rounded-xl shadow-lg hover:scale-[1.02] transition-transform"
            >
              Submit Quote Request
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [page, setPage] = useState<Page>('home');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header activePage={page} setPage={setPage} />

      <main className="flex-grow">
        {page === 'home' && (
          <>
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center overflow-hidden">
              {/* Split Background */}
              <div className="absolute inset-0 z-0 flex flex-col lg:flex-row">
                <div className="flex-1 split-hero-left relative">
                  <div className="absolute inset-0 bg-brand-yellow/10" />
                </div>
                <div className="flex-1 split-hero-right relative">
                  <div className="absolute inset-0 bg-brand-navy/40" />
                </div>
              </div>

              <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pt-20">
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="space-y-8 bg-brand-navy/10 backdrop-blur-sm p-8 rounded-3xl border border-white/10 lg:bg-transparent lg:backdrop-blur-none lg:p-0 lg:border-none"
                >
                  <div className="inline-flex items-center gap-2 bg-brand-navy text-brand-yellow px-4 py-2 rounded-full border border-brand-yellow/30 shadow-xl">
                    <Zap size={16} />
                    <span className="text-xs font-bold uppercase tracking-widest">Smart Logistics Partner</span>
                  </div>
                  <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.1] tracking-tight drop-shadow-2xl">
                    Bridging <span className="text-brand-yellow">China</span> to <br />
                    East Africa.
                  </h1>
                  <p className="text-xl text-slate-100 max-w-lg leading-relaxed font-medium">
                    World-class freight forwarding, sourcing, and customs clearing services tailored for the East African Community.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <button 
                      onClick={() => setPage('quote')}
                      className="bg-brand-yellow text-brand-navy px-8 py-4 rounded-full font-black text-lg shadow-2xl hover:scale-105 transition-transform flex items-center gap-2"
                    >
                      Get Instant Quote <ArrowRight size={20} />
                    </button>
                    <button 
                      onClick={() => setPage('services')}
                      className="bg-brand-navy text-white border border-brand-navy/20 px-8 py-4 rounded-full font-black text-lg hover:bg-brand-navy/80 transition-colors shadow-xl"
                    >
                      Our Services
                    </button>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="hidden lg:block relative"
                >
                  <div className="glass-card p-10 rounded-[3rem] space-y-8 border-white/40 shadow-2xl">
                    <div className="flex items-center justify-between">
                      <h3 className="text-brand-navy font-black text-2xl">Track Shipment</h3>
                      <div className="w-10 h-10 bg-brand-yellow/20 rounded-full flex items-center justify-center">
                        <Search className="text-brand-navy" size={20} />
                      </div>
                    </div>
                    <div className="relative">
                      <input 
                        type="text" 
                        placeholder="Enter Tracking Number (e.g. RG-12345)" 
                        className="w-full p-5 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none focus:border-brand-navy transition-all font-medium"
                      />
                    </div>
                    <button className="w-full bg-brand-navy text-white py-5 rounded-2xl font-black shadow-xl hover:bg-brand-navy/90 transition-all transform active:scale-95">
                      Track Now
                    </button>
                    <div className="grid grid-cols-3 gap-6 pt-6 border-t border-slate-100">
                      <div className="text-center">
                        <div className="text-brand-navy font-black text-xl">500+</div>
                        <div className="text-slate-500 text-[10px] uppercase font-black tracking-wider">Containers/Mo</div>
                      </div>
                      <div className="text-center">
                        <div className="text-brand-navy font-black text-xl">24/7</div>
                        <div className="text-slate-500 text-[10px] uppercase font-black tracking-wider">Support</div>
                      </div>
                      <div className="text-center">
                        <div className="text-brand-navy font-black text-xl">99%</div>
                        <div className="text-slate-500 text-[10px] uppercase font-black tracking-wider">On-Time</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </section>

            {/* Service Grid */}
            <section className="py-24 bg-slate-50">
              <div className="max-w-7xl mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
                  <h2 className="text-brand-navy text-4xl md:text-5xl font-black">Comprehensive Solutions</h2>
                  <p className="text-slate-600 text-lg">
                    From the factory floor in China to your warehouse in East Africa, we handle every step of the supply chain.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <ServiceCard 
                    icon={Plane} 
                    title="Air Freight" 
                    description="Express delivery for urgent cargo. Daily flights from Guangzhou and Shanghai to Entebbe, Nairobi, and Kigali."
                  />
                  <ServiceCard 
                    icon={Ship} 
                    title="Sea Freight" 
                    description="Cost-effective LCL and FCL solutions via Mombasa and Dar es Salaam ports with reliable transit times."
                  />
                  <ServiceCard 
                    icon={ShieldCheck} 
                    title="Customs Clearing" 
                    description="Expert handling of documentation and tax compliance to ensure smooth border crossings and port exits."
                  />
                  <ServiceCard 
                    icon={Search} 
                    title="Sourcing" 
                    description="We find the best manufacturers in China, verify quality, and negotiate the best prices for your business."
                  />
                  <ServiceCard 
                    icon={Warehouse} 
                    title="Warehousing" 
                    description="Secure storage facilities in China and East Africa for consolidation and distribution management."
                  />
                  <ServiceCard 
                    icon={Truck} 
                    title="Last Mile Delivery" 
                    description="Efficient inland transport to landlocked countries including South Sudan, Burundi, and Rwanda."
                  />
                </div>
              </div>
            </section>

            {/* Regional Hubs Preview */}
            <section className="py-32 bg-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-brand-yellow/5 rounded-full -mr-48 -mt-48 blur-3xl" />
              <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                  <div className="space-y-10">
                    <div className="space-y-4">
                      <h2 className="text-brand-navy text-4xl md:text-6xl font-black leading-tight">Regional <span className="text-brand-yellow">Reach</span></h2>
                      <p className="text-slate-600 text-xl leading-relaxed font-medium">
                        Roshe Group operates a robust network across the East African Community, ensuring that no matter where your business is, we can reach you.
                      </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <HubCard country="Uganda" flag="🇺🇬" capability="Central transit hub via Northern Corridor." />
                      <HubCard country="Kenya" flag="🇰🇪" capability="Direct port clearing at Mombasa." />
                      <HubCard country="Tanzania" flag="🇹🇿" capability="Gateway via Dar es Salaam port." />
                      <HubCard country="Rwanda" flag="🇷🇼" capability="Efficient cross-border logistics." />
                      <HubCard country="Burundi" flag="🇧🇮" capability="Specialized inland transport." />
                      <HubCard country="South Sudan" flag="🇸🇸" capability="Secure border clearing & delivery." />
                    </div>
                  </div>
                  <div className="relative">
                    <div className="aspect-square bg-slate-100 rounded-[4rem] overflow-hidden shadow-2xl relative border-8 border-slate-50">
                      <img 
                        src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=1000" 
                        alt="Logistics Hub" 
                        className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                      />
                      <div className="absolute inset-0 bg-brand-navy/30 mix-blend-multiply" />
                      <div className="absolute bottom-10 left-10 right-10 glass-card p-8 rounded-3xl border-white/40">
                        <div className="flex items-center gap-4 mb-3">
                          <div className="w-4 h-4 bg-brand-yellow rounded-full animate-ping" />
                          <span className="text-brand-navy font-black text-sm uppercase tracking-widest">Live Route Status: Active</span>
                        </div>
                        <p className="text-slate-700 text-sm font-bold">Mombasa Port to Kampala Transit: 3-5 Days</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* CTA Section */}
            <section className="py-24">
              <div className="max-w-7xl mx-auto px-6">
                <div className="navy-gradient rounded-[3rem] p-12 md:p-20 text-center space-y-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-brand-yellow/10 rounded-full -mr-32 -mt-32 blur-3xl" />
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-yellow/10 rounded-full -ml-32 -mb-32 blur-3xl" />
                  
                  <h2 className="text-4xl md:text-6xl font-black text-white">Ready to Scale Your Trade?</h2>
                  <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                    Join hundreds of businesses relying on Roshe Group for seamless China-East Africa logistics.
                  </p>
                  <div className="flex flex-wrap justify-center gap-4">
                    <button 
                      onClick={() => setPage('quote')}
                      className="bg-brand-yellow text-brand-navy px-10 py-5 rounded-full font-bold text-xl shadow-xl hover:scale-105 transition-transform"
                    >
                      Get Your Free Quote
                    </button>
                    <button className="bg-white/10 text-white border border-white/20 px-10 py-5 rounded-full font-bold text-xl hover:bg-white/20 transition-colors">
                      Contact Sales
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}

        {page === 'about' && (
          <section className="pt-32 pb-24">
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="space-y-8">
                  <span className="text-brand-navy font-bold uppercase tracking-widest text-sm">The Roshe Story</span>
                  <h2 className="text-5xl font-black text-brand-navy leading-tight">Bridging Markets, <br />Building Futures.</h2>
                  <p className="text-slate-600 text-lg leading-relaxed">
                    Founded with a vision to simplify the complex trade routes between China and the East African Community, Roshe Group has grown into a leading logistics powerhouse. 
                  </p>
                  <p className="text-slate-600 text-lg leading-relaxed">
                    We understand the nuances of both regions—from the high-speed manufacturing hubs of Guangzhou to the critical transit corridors of East Africa. Our mission is to provide transparent, efficient, and reliable logistics that empower local businesses to thrive.
                  </p>
                  <div className="grid grid-cols-2 gap-8 pt-8">
                    <div className="space-y-2">
                      <div className="text-4xl font-black text-brand-navy">10+</div>
                      <div className="text-slate-500 font-bold text-xs uppercase">Years Experience</div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-4xl font-black text-brand-navy">5k+</div>
                      <div className="text-slate-500 font-bold text-xs uppercase">Happy Clients</div>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1566576721346-d4a3b4eaad5b?auto=format&fit=crop&q=80&w=1000" 
                    alt="Team Working" 
                    className="rounded-[3rem] shadow-2xl"
                  />
                  <div className="absolute -bottom-10 -left-10 glass-card p-8 rounded-3xl max-w-xs hidden md:block">
                    <p className="text-brand-navy font-bold italic">"Logistics is not just about moving boxes; it's about moving economies."</p>
                    <div className="mt-4 flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-200 rounded-full" />
                      <div>
                        <div className="font-bold text-sm">Director</div>
                        <div className="text-xs text-slate-500">Roshe Group</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {page === 'services' && (
          <section className="pt-32 pb-24 bg-slate-50">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-20">
                <h2 className="text-5xl font-black text-brand-navy mb-6">Our Expertise</h2>
                <p className="text-slate-600 text-xl max-w-2xl mx-auto">
                  Tailored logistics solutions designed for the unique challenges of the China-East Africa trade route.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  { title: 'Air Freight', icon: Plane, detail: 'Daily departures, express customs clearing, and door-to-door delivery options.' },
                  { title: 'Sea Freight', icon: Ship, detail: 'FCL/LCL shipping, port handling at Mombasa & Dar es Salaam, and inland transit.' },
                  { title: 'Customs Clearing', icon: ShieldCheck, detail: 'Documentation support, tax assessment, and regulatory compliance expertise.' },
                  { title: 'Sourcing & Procurement', icon: Search, detail: 'Factory verification, quality control, and direct-from-China sourcing.' },
                  { title: 'Warehousing', icon: Warehouse, detail: 'Consolidation centers in China and distribution hubs in East Africa.' },
                  { title: 'Project Cargo', icon: Truck, detail: 'Specialized handling for heavy machinery and large-scale infrastructure projects.' }
                ].map((s, i) => (
                  <div key={i} className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 flex gap-8 items-start">
                    <div className="w-16 h-16 bg-brand-navy/5 rounded-2xl flex items-center justify-center shrink-0">
                      <s.icon className="text-brand-navy w-8 h-8" />
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-2xl font-bold text-brand-navy">{s.title}</h3>
                      <p className="text-slate-600 leading-relaxed">{s.detail}</p>
                      <button className="text-brand-navy font-bold flex items-center gap-2 hover:text-brand-yellow transition-colors">
                        View Details <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {page === 'hubs' && (
          <section className="pt-32 pb-24">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-20">
                <h2 className="text-5xl font-black text-brand-navy mb-6">Regional Infrastructure</h2>
                <p className="text-slate-600 text-xl max-w-2xl mx-auto">
                  Strategic presence in key East African markets to ensure your cargo moves without friction.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { country: 'Kenya', flag: '🇰🇪', focus: 'Port Clearing (Mombasa)', note: 'Our Mombasa team handles direct port exits and transit to the hinterland.' },
                  { country: 'Tanzania', flag: '🇹🇿', focus: 'Port Clearing (Dar es Salaam)', note: 'Critical gateway for the Central Corridor serving Rwanda and Burundi.' },
                  { country: 'Uganda', flag: '🇺🇬', focus: 'Inland Distribution', note: 'Our Kampala hub serves as the primary consolidation point for the region.' },
                  { country: 'Rwanda', flag: '🇷🇼', focus: 'Cross-Border Logistics', note: 'Fast-track clearing for the Kigali market via both corridors.' },
                  { country: 'Burundi', flag: '🇧🇮', focus: 'Transit Management', note: 'Reliable delivery to Bujumbura via road and lake transport.' },
                  { country: 'South Sudan', flag: '🇸🇸', focus: 'Specialized Logistics', note: 'Secure cross-border clearing and delivery to Juba and beyond.' }
                ].map((h, i) => (
                  <div key={i} className="bg-white border border-slate-100 rounded-3xl p-8 space-y-6 hover:shadow-xl transition-all">
                    <div className="flex items-center justify-between">
                      <span className="text-4xl">{h.flag}</span>
                      <span className="bg-brand-navy/5 text-brand-navy px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">{h.focus}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-brand-navy">{h.country}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{h.note}</p>
                    <div className="pt-4 flex items-center gap-2 text-brand-navy font-bold text-xs uppercase tracking-widest">
                      <Clock size={14} className="text-brand-yellow" /> Transit: 3-7 Days
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {page === 'quote' && (
          <section className="pt-32 pb-24 bg-slate-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-12 space-y-4">
                <h2 className="text-4xl md:text-5xl font-black text-brand-navy">Get a Smart Quote</h2>
                <p className="text-slate-600 text-lg">Fast, transparent, and accurate pricing for your logistics needs.</p>
              </div>
              <QuoteForm />
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
