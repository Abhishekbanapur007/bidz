import React from 'react';
import { CATEGORIES } from '../data/mockMarketplace';
import { CategoryId } from '../types/marketplace';
import { useMarketplace } from '../context/MarketplaceContext';
import {
  Trophy,
  GraduationCap,
  Cpu,
  Building2,
  Sparkles,
  Car,
  Radio,
  ArrowRight,
} from 'lucide-react';

const ICON_MAP: Record<string, React.ElementType> = {
  Trophy,
  GraduationCap,
  Cpu,
  Building2,
  Sparkles,
  Car,
};

export const CategoryExplorer: React.FC = () => {
  const { activeCategory, setActiveCategory } = useMarketplace();

  return (
    <section className="py-8" id="categories-section">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#0B1B3A] tracking-tight">
            Explore 6 Main Categories
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Curated live bidding across student resale, memorabilia, technology, freelancing, and verified tenders.
          </p>
        </div>

        {activeCategory !== 'all' && (
          <button
            onClick={() => setActiveCategory('all')}
            className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors"
          >
            Show All &rarr;
          </button>
        )}
      </div>

      {/* Grid of 6 Category Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {CATEGORIES.map((cat) => {
          const IconComponent = ICON_MAP[cat.iconName] || Trophy;
          const isSelected = activeCategory === cat.id;

          return (
            <div
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`group relative rounded-2xl p-5 sm:p-6 transition-all duration-200 cursor-pointer border ${
                isSelected
                  ? 'border-blue-600 bg-blue-50/50 shadow-md ring-2 ring-blue-500/20'
                  : 'border-slate-200/90 bg-white hover:border-blue-300 hover:shadow-md'
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105"
                  style={{ backgroundColor: cat.lightBg, color: cat.accentColor }}
                >
                  <IconComponent className="w-6 h-6" />
                </div>

                <div className="flex flex-col items-end gap-1">
                  {cat.liveCount > 0 && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      <Radio className="w-3 h-3 text-emerald-600 animate-pulse" />
                      {cat.liveCount} Live
                    </span>
                  )}
                  <span className="text-[11px] text-slate-400 font-mono">
                    {cat.sampleCount} demo items
                  </span>
                </div>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                {cat.name}
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 mt-1.5 line-clamp-2 leading-relaxed">
                {cat.description}
              </p>

              <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 group-hover:text-blue-600">
                  {cat.tagline}
                </span>

                <button
                  type="button"
                  className={`text-xs font-semibold inline-flex items-center gap-1 transition-all ${
                    isSelected ? 'text-blue-700 font-bold' : 'text-blue-600 group-hover:translate-x-1'
                  }`}
                >
                  <span>{isSelected ? 'Filtered' : 'Explore'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
