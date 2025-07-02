import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onClose: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onClose }) => {
  return (
    <div className="bg-red-500/10 backdrop-blur-md border border-red-400/20 rounded-2xl p-6 mb-6 animate-in slide-in-from-top-4 duration-500">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <AlertTriangle className="w-6 h-6 text-red-400" />
          </div>
          <div>
            <p className="text-red-200 font-medium">Error</p>
            <p className="text-red-300 text-sm">{message}</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="flex-shrink-0 text-red-400 hover:text-red-300 transition-colors duration-200"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};