
import React from 'react';

interface HeaderProps {
  onAddClick: () => void;
  isAdmin: boolean;
  onOpenDashboard: () => void;
}

const Header: React.FC<HeaderProps> = ({ onAddClick, isAdmin, onOpenDashboard }) => {
  return (
    <header className="glass border-b border-gray-200/50 sticky top-0 z-[60] h-14 flex items-center">
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-2.5 cursor-pointer group">
            <div className="w-6 h-6 bg-black rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-sm">U</span>
            </div>
            <span className="text-sm font-bold tracking-tight">UI Hub</span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="text-[11px] font-bold text-gray-400 hover:text-black transition-colors uppercase tracking-widest">Library</a>
            {isAdmin && (
              <button 
                onClick={onOpenDashboard}
                className="text-[11px] font-bold text-gray-400 hover:text-blue-600 transition-colors uppercase tracking-widest"
              >
                Dashboard
              </button>
            )}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={onAddClick}
            className="apple-button flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-full text-[12px] font-bold transition-all shadow-md shadow-blue-500/20"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
            </svg>
            Publish
          </button>
          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200 overflow-hidden">
             <div className="w-full h-full bg-gradient-to-tr from-gray-200 to-gray-50"></div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
