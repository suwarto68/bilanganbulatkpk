import React, { useState } from 'react';
import { Award, BookOpen } from 'lucide-react';

interface LogoProps {
  className?: string;
  url?: string;
  schoolName?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = 'h-10 w-10', url, schoolName }) => {
  const [imageError, setImageError] = useState(false);

  // Default logo fallback if external url is not directly loadable
  if (imageError || !url) {
    return (
      <div className={`flex items-center justify-center rounded-lg bg-white/10 text-white font-bold border border-white/20 shadow-sm ${className}`}>
        <div className="flex flex-col items-center justify-center p-1 text-center">
          <BookOpen className="w-5 h-5 text-amber-300" />
          <span className="text-[9px] font-black tracking-tighter text-white uppercase mt-0.5">ANBK</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative flex items-center justify-center overflow-hidden rounded-lg bg-white p-1 shadow-sm ${className}`}>
      <img
        src={url}
        alt={schoolName || 'Logo Sekolah CBT'}
        className="h-full w-full object-contain"
        referrerPolicy="no-referrer"
        onError={() => setImageError(true)}
      />
    </div>
  );
};
