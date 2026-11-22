import React, { useState } from 'react';
import { Building2 } from 'lucide-react';

interface ClinicImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
}

export const ClinicImage: React.FC<ClinicImageProps> = ({
  src,
  alt,
  className = 'w-full h-full object-cover',
  fallbackTitle,
}) => {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`bg-gradient-to-br from-slate-800 via-cyan-950 to-slate-900 flex flex-col items-center justify-center text-center p-6 ${className}`}
        role="img"
        aria-label={alt}
      >
        <Building2 className="w-8 h-8 text-cyan-300 mb-2" />
        <span className="text-xs font-medium text-slate-200 max-w-xs">
          {fallbackTitle || alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={className}
    />
  );
};
