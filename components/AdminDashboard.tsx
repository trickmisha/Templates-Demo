
import React from 'react';
import { UserSession, UserRole } from '../types';

interface AdminDashboardProps {
  users: UserSession[];
  onClose: () => void;
  onUpdateRole: (userId: string, role: UserRole) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ users, onClose, onUpdateRole }) => {
  return (
    <div className="fixed inset-0 z-[500] bg-[#f5f5f7] flex flex-col animate-in fade-in duration-500">
      <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 px-10 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
            <span className="text-white text-xs font-bold">ADM</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight">Control Center</h1>
        </div>
        <button 
          onClick={onClose}
          className="px-6 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm font-bold transition-all apple-button"
        >
          Exit System
        </button>
      </header>

      <main className="flex-1 overflow-y-auto p-10 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col gap-2">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Global Users</span>
            <span className="text-3xl font-black">{users.length}</span>
          </div>
          <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col gap-2">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Active Admins</span>
            <span className="text-3xl font-black text-blue-600">{users.filter(u => u.role === 'Admin').length}</span>
          </div>
          <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col gap-2">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Cloud Status</span>
            <span className="text-3xl font-black text-green-500 flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></span>
              Live
            </span>
          </div>
          <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col gap-2">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Last Action</span>
            <span className="text-sm font-bold truncate">Update Material v1.4</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-10 py-6 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-lg font-bold">User Management</h2>
              <span className="text-[11px] font-bold text-gray-400 uppercase">Directory</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-50 text-[10px] font-black text-gray-300 uppercase tracking-widest">
                    <th className="px-10 py-5">User</th>
                    <th className="px-10 py-5">Access Level</th>
                    <th className="px-10 py-5">Last Activity</th>
                    <th className="px-10 py-5 text-right">Settings</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {users.map(user => (
                    <tr key={user.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                      <td className="px-10 py-6">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs uppercase border border-blue-100">
                            {user.username.slice(0, 2)}
                          </div>
                          <span className="font-bold text-gray-900">{user.username}</span>
                        </div>
                      </td>
                      <td className="px-10 py-6">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter ${
                          user.role === 'Admin' ? 'bg-black text-white' : 
                          user.role === 'Moderator' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-10 py-6 text-gray-400 font-medium tabular-nums">
                        {new Date(user.lastLogin).toLocaleDateString()}
                      </td>
                      <td className="px-10 py-6 text-right">
                        <select 
                          value={user.role}
                          onChange={(e) => onUpdateRole(user.id, e.target.value as UserRole)}
                          className="bg-gray-50 border border-gray-100 rounded-lg px-3 py-1.5 text-xs font-bold outline-none cursor-pointer hover:border-blue-300 transition-all"
                        >
                          <option value="User">Standard</option>
                          <option value="Moderator">Moderator</option>
                          <option value="Admin">Administrator</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 p-8 flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-lg font-bold">System Logs</h2>
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
            </div>
            <div className="space-y-6 flex-1">
              {[1,2,3,4].map(i => (
                <div key={i} className="flex gap-4 group">
                  <div className="w-1 bg-gray-100 rounded-full group-hover:bg-blue-500 transition-colors"></div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[13px] font-bold text-gray-900">New Material Published</span>
                    <span className="text-[11px] text-gray-400 font-medium italic">Asset ID #8821{i} by System</span>
                    <span className="text-[10px] text-gray-300 font-black uppercase mt-1">2 hours ago</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
