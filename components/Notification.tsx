
import React, { useEffect } from 'react';

interface NotificationProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onClose, 2500);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[300] animate-in slide-in-from-top-4 fade-in duration-500 ease-out">
      <div className="bg-[#1d1d1f] text-white px-6 py-3 rounded-full shadow-[0_20px_40px_rgba(0,0,0,0.2)] flex items-center gap-3 border border-white/10">
        <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
        </svg>
        <span className="text-[13px] font-bold tracking-tight">{message}</span>
      </div>
    </div>
  );
};

export default Notification;
