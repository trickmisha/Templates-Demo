
import React, { useState, useRef } from 'react';
import { Technology, UIComponent, UserSession } from '../types';

interface AdminPanelProps {
  categories: string[];
  currentUser: UserSession;
  onClose: () => void;
  onSave: (component: UIComponent) => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ categories, currentUser, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: categories[0] || 'Uncategorized',
    tech: Technology.REACT,
    tags: '',
    imageUrl: '',
    code: ''
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, imageUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newComponent: UIComponent = {
      id: Date.now().toString(),
      name: formData.name,
      description: formData.description,
      category: formData.category,
      technology: [formData.tech],
      tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
      imageUrl: formData.imageUrl || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200',
      author: currentUser.username, // Automatically set the current user as author
      dateAdded: new Date().toISOString(),
      code: { react: formData.code }
    };
    onSave(newComponent);
  };

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-md animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div 
        className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-10 duration-500"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between">
          <div className="flex flex-col">
            <h2 className="text-xl font-bold tracking-tight">Create Asset</h2>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Author: {currentUser.username}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6 overflow-y-auto max-h-[70vh] no-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[11px] font-black text-gray-300 uppercase tracking-widest ml-1">Asset Name</label>
              <input 
                required
                className="w-full px-5 py-3.5 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all text-sm font-semibold outline-none"
                placeholder="e.g. Modern Header"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-black text-gray-300 uppercase tracking-widest ml-1">Target Category</label>
              <select 
                className="w-full px-5 py-3.5 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all text-sm font-semibold outline-none appearance-none"
                value={formData.category}
                onChange={e => setFormData({...formData, category: e.target.value})}
              >
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-black text-gray-300 uppercase tracking-widest ml-1">Context Summary</label>
            <textarea 
              required
              className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all text-sm font-medium outline-none min-h-[100px]"
              placeholder="Describe the functionality and design intent..."
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="space-y-2">
              <label className="text-[11px] font-black text-gray-300 uppercase tracking-widest ml-1">Preview Image</label>
              <div className="flex flex-col gap-2">
                <input 
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                />
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full px-5 py-3.5 bg-gray-50 border-2 border-dashed border-gray-200 hover:border-blue-400 rounded-2xl cursor-pointer transition-all text-sm font-semibold flex items-center justify-center gap-2 group"
                >
                  {formData.imageUrl ? (
                    <div className="flex items-center gap-2">
                      <img src={formData.imageUrl} className="w-8 h-8 rounded-lg object-cover" alt="preview" />
                      <span className="text-blue-600">Change Image</span>
                    </div>
                  ) : (
                    <>
                      <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                      </svg>
                      <span className="text-gray-400 group-hover:text-blue-500">Upload from device</span>
                    </>
                  )}
                </div>
                <input 
                  className="w-full px-5 py-2 bg-gray-50 border-none rounded-xl text-[10px] font-medium text-gray-400 outline-none"
                  placeholder="Or paste URL here..."
                  value={formData.imageUrl.startsWith('data:') ? '' : formData.imageUrl}
                  onChange={e => setFormData({...formData, imageUrl: e.target.value})}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-black text-gray-300 uppercase tracking-widest ml-1">Metadata Tags</label>
              <input 
                className="w-full px-5 py-3.5 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all text-sm font-semibold outline-none"
                placeholder="e.g. glass, dark, mobile"
                value={formData.tags}
                onChange={e => setFormData({...formData, tags: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-black text-gray-300 uppercase tracking-widest ml-1">Source Implementation</label>
            <textarea 
              required
              className="w-full px-6 py-6 bg-[#1d1d1f] text-gray-100 border-none rounded-[2rem] focus:ring-2 focus:ring-blue-500 transition-all text-xs font-mono outline-none min-h-[200px]"
              placeholder="Paste raw JSX/HTML/CSS..."
              value={formData.code}
              onChange={e => setFormData({...formData, code: e.target.value})}
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button 
              type="button"
              onClick={onClose}
              className="flex-1 py-4 bg-gray-50 hover:bg-gray-100 text-gray-900 font-bold rounded-2xl transition-all text-sm"
            >
              Discard
            </button>
            <button 
              type="submit"
              className="flex-[2] py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl transition-all text-sm shadow-xl shadow-blue-500/20"
            >
              Submit to Library
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminPanel;
