import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, Kanban, TrendingUp, Settings, LogOut } from 'lucide-react';

export default function Sidebar() {
  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { name: 'Leads', icon: Users, path: '/leads' },
    { name: 'Pipeline', icon: Kanban, path: '/pipeline' },
    { name: 'Performance', icon: TrendingUp, path: '/performance' },
  ];

  return (
    <aside className="fixed inset-y-0 left-0 w-64 bg-slate-900 text-slate-300 flex flex-col z-20">
      <div className="h-16 flex items-center px-6 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">L</span>
          </div>
          <span className="text-white font-semibold text-lg tracking-wide">LeadFlow CRM</span>
        </div>
      </div>
      
      <div className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
        <div className="px-2 mb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Main Menu
        </div>
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                isActive 
                  ? 'bg-blue-600/10 text-blue-400 font-medium' 
                  : 'hover:bg-slate-800 hover:text-white'
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span>{item.name}</span>
          </NavLink>
        ))}
      </div>

      <div className="p-4 border-t border-slate-800 space-y-1">
        <NavLink 
          to="/settings"
          className={({ isActive }) =>
            `w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-left ${
              isActive 
                ? 'bg-blue-600/10 text-blue-400 font-medium' 
                : 'hover:bg-slate-800 hover:text-white'
            }`
          }
        >
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </NavLink>
        <button 
          onClick={() => {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
          }}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors hover:bg-slate-800 hover:text-white text-left text-red-400 hover:text-red-300"
        >
          <LogOut className="w-5 h-5" />
          <span>Log out</span>
        </button>
      </div>
    </aside>
  );
}
