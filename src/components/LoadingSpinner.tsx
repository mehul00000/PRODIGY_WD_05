import React from 'react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center p-12">
      <div className="relative">
        <div className="w-12 h-12 rounded-full border-4 border-white/20 border-t-white animate-spin"></div>
        <div className="absolute inset-0 w-12 h-12 rounded-full border-4 border-transparent border-t-white/50 animate-ping"></div>
      </div>
    </div>
  );
};