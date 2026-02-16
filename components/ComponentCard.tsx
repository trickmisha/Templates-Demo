
import React from 'react';
import { UIComponent } from '../types';

interface ComponentCardProps {
  component: UIComponent;
  onClick: () => void;
  isFavorite: boolean;
  onToggleFavorite: (e: React.MouseEvent) => void;
}

const ComponentCard: React.FC<ComponentCardProps> = ({ component, onClick, isFavorite, onToggleFavorite }) => {
  return (
    <div 
      className="group flex flex-col h-full bg-white rounded-3xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_48px_rgba(0,0,0,0.08)] transition-all duration-500 cursor-pointer border border-gray-100/50"
      onClick={onClick}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-[#f5f5f7] flex-shrink-0">
        <img 
          src={component.imageUrl} 
          alt={component.name} 
          className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out"
          loading="lazy"
        />
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          <button 
            onClick={onToggleFavorite}
            className={`p-2.5 rounded-full backdrop-blur-md shadow-sm transition-all ${isFavorite ? 'bg-red-500 text-white' : 'bg-white/80 text-gray-600 hover:bg-white'}`}
          >
            <svg className="w-4 h-4" fill={isFavorite ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-1">
        <div className="flex flex-col gap-1 mb-3">
          <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest leading-none">{component.category}</span>
          <h3 className="text-[17px] font-bold text-[#1d1d1f]">{component.name}</h3>
        </div>
        
        <p className="text-[13px] text-gray-500 leading-snug line-clamp-2 mb-4 flex-1">{component.description}</p>
        
        <div className="flex items-center justify-between pt-4 border-t border-gray-50 mt-auto">
          <div className="flex gap-2">
            {component.technology.slice(0, 1).map(tech => (
              <span key={tech} className="px-2.5 py-1 bg-gray-50 text-[11px] font-semibold text-gray-500 rounded-full border border-gray-100">
                {tech}
              </span>
            ))}
          </div>
          <div className="text-[11px] font-medium text-gray-400">
            {component.author}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComponentCard;
