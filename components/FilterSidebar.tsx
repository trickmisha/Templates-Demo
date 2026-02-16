
import React, { useState } from 'react';
import { FilterState } from '../types';

interface FilterSidebarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  categories: string[];
  onAddCategory: (name: string) => void;
  userRole: string;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ 
  filters, 
  onFilterChange, 
  categories, 
  onAddCategory,
  userRole
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newCatName, setNewCatName] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCatName.trim()) {
      onAddCategory(newCatName.trim());
      setNewCatName('');
      setIsAdding(false);
    }
  };

  return (
    <div className="space-y-10 h-fit sticky top-24">
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Library Sections</h3>
          {(userRole === 'Admin' || userRole === 'Moderator') && (
            <button 
              onClick={() => setIsAdding(true)}
              className="text-blue-600 hover:text-blue-700 p-1"
              title="Add Category"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
              </svg>
            </button>
          )}
        </div>
        
        <div className="space-y-1.5">
          <button
            onClick={() => onFilterChange({ ...filters, category: 'All' })}
            className={`w-full text-left px-4 py-2 rounded-xl text-[13px] font-bold transition-all ${
              filters.category === 'All' ? 'bg-white shadow-sm text-black' : 'text-gray-400 hover:text-black'
            }`}
          >
            All Materials
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onFilterChange({ ...filters, category: cat })}
              className={`w-full text-left px-4 py-2 rounded-xl text-[13px] font-bold transition-all ${
                filters.category === cat ? 'bg-white shadow-sm text-black' : 'text-gray-400 hover:text-black'
              }`}
            >
              {cat}
            </button>
          ))}
          
          {isAdding && (
            <form onSubmit={handleAdd} className="mt-4 p-4 bg-white rounded-2xl shadow-sm border border-blue-100 animate-in slide-in-from-top-2">
              <input 
                autoFocus
                className="w-full px-3 py-2 bg-gray-50 border-none rounded-xl text-xs font-semibold outline-none focus:ring-1 focus:ring-blue-500 mb-2"
                placeholder="Category name..."
                value={newCatName}
                onChange={(e) => setNewCatName(e.target.value)}
              />
              <div className="flex gap-2">
                <button type="submit" className="flex-1 bg-blue-600 text-white text-[10px] font-bold py-1.5 rounded-lg">Save</button>
                <button onClick={() => setIsAdding(false)} className="flex-1 bg-gray-100 text-gray-500 text-[10px] font-bold py-1.5 rounded-lg">Cancel</button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
