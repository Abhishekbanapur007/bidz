import React from 'react';
import { BrandLogo } from './BrandLogo';
import { CATEGORIES } from '../data/mockMarketplace';
import { useMarketplace } from '../context/MarketplaceContext';
import { ShieldCheck, Mail, MapPin, Phone, HelpCircle } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveCategory } = useMarketplace();

  return (
    <footer className="bg-white border-t border-slate-200 mt-16 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-slate-200">
          {/* Col 1 & 2: Brand Info */}
          <div className="lg:col-span-2">
            <BrandLogo size="lg" showTagline />
            <p className="text-xs text-slate-500 mt-4 leading-relaxed max-w-sm">
              Bidz is a multi-category live auction marketplace built for students, tech collectors, freelancers, and institutions. Discover deals, sell what you no longer need, showcase your skills and participate in competitive auctions.
            </p>

            <div className="mt-4 flex items-center gap-2 text-xs text-slate-600">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>Student Hackathon Demonstration & Prototype</span>
            </div>
          </div>

          {/* Col 3: Categories */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              Categories
            </h4>
            <ul className="space-y-2 text-xs text-slate-600">
              {CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => {
                      setActiveCategory(cat.id);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-blue-600 transition-colors"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Safety & Support */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              Safety & Guidelines
            </h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li>
                <a href="#how-it-works" className="hover:text-blue-600 transition-colors">
                  How Bidz Works
                </a>
              </li>
              <li>
                <span className="cursor-pointer hover:text-blue-600" onClick={() => alert('Safety Guidelines: Meet in well-lit public campus locations (e.g. Student Center, Campus Library) for physical item handovers. For sports memorabilia, always inspect physical Beckett/PSA COA serial holograms.')}>
                  Buyer Safety Protocol
                </span>
              </li>
              <li>
                <span className="cursor-pointer hover:text-blue-600" onClick={() => alert('Seller Verification: Vehicle listings require clean title verification. High-value tech items require serial registration checks.')}>
                  Seller Verification Rules
                </span>
              </li>
              <li>
                <span className="cursor-pointer hover:text-blue-600" onClick={() => alert('Government Tenders: All tender opportunities shown in this demo are simulated sample notices for evaluation purposes.')}>
                  Tender Transparency Notice
                </span>
              </li>
              <li>
                <span className="cursor-pointer hover:text-blue-600" onClick={() => alert('Demo Bidding Rules: Bids placed are binding in simulated mode and automatically update highest bidder standing.')}>
                  Live Auction Rules
                </span>
              </li>
            </ul>
          </div>

          {/* Col 5: Contact & Legal */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              Support & Inquiries
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-600">
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span>support@bidz-auction.demo</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                <span>+1 (800) 555-BIDZ (Demo)</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>San Francisco, CA & Campus Hubs</span>
              </li>
              <li className="pt-2 text-[11px] text-slate-400">
                Terms of Service · Privacy Policy · Cookie Policy
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>&copy; 2026 Bidz Marketplace. Official brand identity & student hackathon implementation.</p>
          <p className="text-[11px]">
            Demonstration Mode: Accounts, bids, and simulated transactions are mock data.
          </p>
        </div>
      </div>
    </footer>
  );
};
