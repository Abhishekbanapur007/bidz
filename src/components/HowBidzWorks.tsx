import React from 'react';
import { Compass, Gavel, Award } from 'lucide-react';

export const HowBidzWorks: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Discover',
      desc: 'Explore categories and listings. Filter by sport authenticity, campus dorm delivery, electronic warranties, vehicle titles, or freelance scopes.',
      icon: Compass,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
    {
      num: '02',
      title: 'Participate',
      desc: 'Place valid bids or list eligible items. Live countdowns, automated incremental bidding, and instant notifications keep you informed.',
      icon: Gavel,
      color: 'text-sky-600',
      bg: 'bg-sky-50',
    },
    {
      num: '03',
      title: 'Win or Sell',
      desc: 'Review the final result and complete the transaction through the supported process with clear delivery, pickup, or digital repo handovers.',
      icon: Award,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
    },
  ];

  return (
    <section className="py-12 border-t border-slate-200/80" id="how-it-works">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#0B1B3A] tracking-tight">
          How Bidz Works
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-2">
          A seamless, transparent live auction journey designed for students, collectors, developers, and institutions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {steps.map((step) => {
          const Icon = step.icon;
          return (
            <div
              key={step.num}
              className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs flex flex-col justify-between relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${step.bg} ${step.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className="font-mono text-2xl font-black text-slate-200">
                  {step.num}
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
