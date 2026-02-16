
import React, { useState } from 'react';
import { UIComponent } from '../types';

interface ComponentDetailsProps {
  component: UIComponent;
  onClose: () => void;
  onCopy: (text: string) => void;
}

const ComponentDetails: React.FC<ComponentDetailsProps> = ({ component, onClose, onCopy }) => {
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');
  const codeEntries = Object.entries(component.code);

  return (
    <div 
      className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-10 bg-black/30 backdrop-blur-md animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div 
        className="bg-white w-full max-w-5xl max-h-[90vh] rounded-[3rem] shadow-[0_32px_128px_rgba(0,0,0,0.15)] overflow-hidden flex flex-col animate-in zoom-in-95 duration-500 ease-out"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Apple Style Modal Header */}
        <div className="px-8 py-5 flex items-center justify-between bg-white/80 backdrop-blur-md border-b border-gray-100">
          <div>
            <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest leading-none">{component.category}</span>
            <h2 className="text-xl font-extrabold text-[#1d1d1f] mt-1 tracking-tight">{component.name}</h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex p-1 bg-[#f5f5f7] rounded-full">
              <button 
                onClick={() => setActiveTab('preview')}
                className={`px-6 py-1.5 rounded-full text-[12px] font-bold transition-all ${activeTab === 'preview' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}
              >
                Overview
              </button>
              <button 
                onClick={() => setActiveTab('code')}
                className={`px-6 py-1.5 rounded-full text-[12px] font-bold transition-all ${activeTab === 'code' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}
              >
                Source Code
              </button>
            </div>
            <button onClick={onClose} className="p-2.5 hover:bg-gray-100 rounded-full text-gray-400 transition-all apple-button">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto no-scrollbar p-0">
          {activeTab === 'preview' ? (
            <div className="flex flex-col">
              <div className="bg-[#f5f5f7] p-12 flex justify-center border-b border-gray-100">
                <div className="w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl border border-gray-200/50 bg-white">
                  <img src={component.imageUrl} alt={component.name} className="w-full h-auto" />
                </div>
              </div>
              
              <div className="px-12 py-12 grid grid-cols-1 md:grid-cols-3 gap-16">
                <div className="md:col-span-2 space-y-8">
                  <div className="space-y-4">
                    <h3 className="text-2xl font-extrabold tracking-tight">Description</h3>
                    <p className="text-[16px] text-gray-500 leading-relaxed font-medium">{component.description}</p>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold tracking-tight">Implementation Details</h3>
                    <p className="text-[14px] text-gray-400 leading-relaxed">
                      This component is designed with accessibility and performance in mind. To use it, ensure you have the required technology stack installed.
                    </p>
                  </div>
                </div>
                <div className="space-y-10">
                   <div>
                    <h4 className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-4">Specifications</h4>
                    <div className="space-y-4">
                      <div className="flex flex-col border-l-2 border-gray-100 pl-4">
                        <span className="text-[11px] text-gray-400 font-bold uppercase">Designer</span>
                        <span className="text-sm font-bold">{component.author}</span>
                      </div>
                      <div className="flex flex-col border-l-2 border-gray-100 pl-4">
                        <span className="text-[11px] text-gray-400 font-bold uppercase">Released</span>
                        <span className="text-sm font-bold">{new Date(component.dateAdded).toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-4">Attributes</h4>
                    <div className="flex flex-wrap gap-2">
                      {component.tags.map(tag => (
                        <span key={tag} className="px-3 py-1.5 bg-[#f5f5f7] rounded-full text-[11px] font-bold text-gray-500">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-8 space-y-8">
              {codeEntries.map(([lang, code]) => (
                <div key={lang} className="space-y-4">
                  <div className="flex items-center justify-between px-2">
                    <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">{lang}</span>
                    <button 
                      onClick={() => onCopy(code || '')}
                      className="text-[12px] text-blue-600 font-bold hover:text-blue-700 flex items-center gap-1.5 transition-colors"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                      </svg>
                      Copy Snippet
                    </button>
                  </div>
                  <div className="relative group">
                    <pre className="bg-[#1d1d1f] text-gray-300 p-10 rounded-[2rem] text-[13px] overflow-x-auto font-mono leading-relaxed no-scrollbar shadow-inner">
                      <code>{code}</code>
                    </pre>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Apple Style Footer Action */}
        <div className="px-12 py-8 border-t border-gray-50 bg-white flex justify-end items-center gap-6">
           <button 
            onClick={onClose}
            className="text-[14px] font-bold text-gray-400 hover:text-gray-600 transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={() => onCopy(Object.values(component.code)[0] || '')}
            className="apple-button px-10 py-4 bg-[#1d1d1f] text-white rounded-full text-[14px] font-bold hover:bg-black transition-all shadow-xl shadow-black/10"
          >
            Copy Everything
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComponentDetails;
