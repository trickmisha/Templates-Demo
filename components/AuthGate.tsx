
import React, { useState } from 'react';

interface AuthGateProps {
  onUnlock: (username: string) => void;
}

const AuthGate: React.FC<AuthGateProps> = ({ onUnlock }) => {
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    const userLower = username.toLowerCase().trim();
    const pass = password.trim();

    // Logic: 
    // 1. Check for the main admin: mishatrick / 2107m
    // 2. Allow a generic demo access: any username / apple
    const isMainAdmin = userLower === 'mishatrick' && pass === '2107m';
    const isDemoUser = pass === 'apple' && username.length > 2;

    if (isMainAdmin || isDemoUser) {
      onUnlock(username.trim());
    } else {
      setError(true);
      setTimeout(() => setError(false), 500);
    }
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-[#f5f5f7]">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-400/20 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-400/20 blur-[120px] rounded-full"></div>
      </div>
      
      <div className={`w-full max-w-sm p-10 bg-white/70 backdrop-blur-3xl rounded-[2.5rem] shadow-2xl border border-white/50 transition-all duration-300 ${error ? 'translate-x-2 ring-2 ring-red-500' : ''}`}>
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center shadow-xl mb-6">
            <span className="text-white text-3xl font-black">U</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">UI Hub Access</h1>
          <p className="text-sm text-gray-400 mt-2 text-center font-medium">Please enter your credentials to browse the library.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Identity</label>
            <input 
              type="text"
              className="w-full px-5 py-4 bg-gray-100/50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all outline-none text-sm font-semibold"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Access Key</label>
            <input 
              type="password"
              className="w-full px-5 py-4 bg-gray-100/50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all outline-none text-sm font-semibold"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button 
            type="submit"
            className="w-full py-4 bg-black text-white rounded-2xl font-bold text-sm apple-button hover:bg-gray-800 shadow-lg shadow-black/10 mt-2"
          >
            Enter Workspace
          </button>
        </form>
        
        <p className="mt-6 text-[10px] text-gray-400 text-center font-medium uppercase tracking-widest">
          Secure Environment v1.0
        </p>
      </div>
    </div>
  );
};

export default AuthGate;
