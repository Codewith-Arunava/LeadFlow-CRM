import React from 'react';
import { Bell, Search } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Topbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const userName = user.name || 'Arunava Chakraborty';
  const userEmail = user.email || 'arunavachakraborty170@gmail.com';
  const initials = userName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  const getTitle = () => {
    if (location.pathname === '/') return 'Dashboard';
    const path = location.pathname.substring(1);
    return path.charAt(0).toUpperCase() + path.slice(1);
  };

  return (
    <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-6 sticky top-0 z-10">
      <div className="flex items-center">
        <h1 className="text-xl font-semibold text-slate-800 dark:text-white">{getTitle()}</h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative hidden md:block">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search leads, companies..."
            className="pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border border-transparent dark:border-slate-700 rounded-lg text-sm text-slate-700 dark:text-slate-200 placeholder-slate-400 focus:bg-white dark:focus:bg-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all w-64"
          />
        </div>

        <button className="relative p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white dark:border-slate-900"></span>
        </button>

        <div className="h-8 w-px bg-slate-200 dark:bg-slate-700 mx-1"></div>

        <button
          onClick={() => navigate('/settings')}
          className="flex items-center gap-2.5 hover:bg-slate-50 dark:hover:bg-slate-800 p-1.5 rounded-xl transition-colors"
        >
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-white font-semibold text-xs shadow-sm">
            {initials}
          </div>
          <div className="hidden md:block text-left">
            <div className="text-sm font-medium text-slate-700 dark:text-slate-200">{userName}</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">{userEmail}</div>
          </div>
        </button>
      </div>
    </header>
  );
}

