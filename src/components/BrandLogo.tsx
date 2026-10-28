import React, { useState } from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  className?: string;
  onClick?: () => void;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  showTagline = false,
  className = '',
  onClick,
}) => {
  const [imageError, setImageError] = useState(false);

  const sizeClasses = {
    sm: { img: 'h-8 w-auto', text: 'text-xl', badge: 'text-[10px]', sub: 'text-[10px]' },
    md: { img: 'h-10 w-auto', text: 'text-2xl', badge: 'text-xs', sub: 'text-xs' },
    lg: { img: 'h-14 w-auto', text: 'text-3xl', badge: 'text-xs', sub: 'text-sm' },
    xl: { img: 'h-20 w-auto', text: 'text-4xl', badge: 'text-sm', sub: 'text-base' },
  }[size];

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-2.5 select-none ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {!imageError ? (
        <img
          src="/bidz-logo.jpeg"
          alt="Bidz Marketplace"
          className={`${sizeClasses.img} object-contain rounded-xl transition-transform hover:scale-105 duration-200`}
          onError={() => setImageError(true)}
        />
      ) : (
        /* Pure SVG reproduction matching the official Bidz emblem */
        <div className="flex items-center gap-2">
          <div className="relative flex items-center justify-center">
            <svg
              className={size === 'xl' ? 'w-16 h-16' : size === 'lg' ? 'w-12 h-12' : size === 'md' ? 'w-9 h-9' : 'w-7 h-7'}
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Outer bright blue ring */}
              <circle cx="48" cy="52" r="34" stroke="url(#bidz_grad)" strokeWidth="12" fill="white" />
              {/* Center tilted square */}
              <rect
                x="34"
                y="38"
                width="28"
                height="28"
                rx="6"
                transform="rotate(-15 48 52)"
                fill="url(#bidz_grad)"
              />
              {/* Top right spark rays */}
              <line x1="68" y1="26" x2="74" y2="18" stroke="#0EA5E9" strokeWidth="5" strokeLinecap="round" />
              <line x1="77" y1="33" x2="86" y2="28" stroke="#0EA5E9" strokeWidth="5" strokeLinecap="round" />
              <line x1="80" y1="42" x2="90" y2="42" stroke="#0EA5E9" strokeWidth="5" strokeLinecap="round" />
              <defs>
                <linearGradient id="bidz_grad" x1="14" y1="18" x2="82" y2="86" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#0EA5E9" />
                  <stop offset="1" stopColor="#2563EB" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <span className={`font-extrabold tracking-tight text-[#0B1B3A] ${sizeClasses.text}`}>
            Bidz
          </span>
        </div>
      )}

      {showTagline && (
        <span className={`hidden sm:inline-block font-medium text-slate-500 border-l border-slate-200 pl-2.5 ml-1 ${sizeClasses.sub}`}>
          Live Auction Marketplace
        </span>
      )}
    </div>
  );
};
