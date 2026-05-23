import React from 'react';

export function Table({ children, className = '' }) {
  return (
    <div className={`w-full overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm ${className}`}>
      <table className="w-full text-sm text-left">
        {children}
      </table>
    </div>
  );
}

export function TableHeader({ children }) {
  return (
    <thead className="text-xs text-slate-500 dark:text-slate-400 bg-slate-50/50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700">
      {children}
    </thead>
  );
}

export function TableRow({ children, className = '', hover = true }) {
  return (
    <tr className={`border-b border-slate-100 dark:border-slate-700/50 last:border-0 ${hover ? 'hover:bg-slate-50/50 dark:hover:bg-slate-700/50 transition-colors' : ''} ${className}`}>
      {children}
    </tr>
  );
}

export function TableHead({ children, className = '' }) {
  return (
    <th className={`px-6 py-4 font-semibold ${className}`}>
      {children}
    </th>
  );
}

export function TableCell({ children, className = '' }) {
  return (
    <td className={`px-6 py-4 whitespace-nowrap text-slate-700 ${className}`}>
      {children}
    </td>
  );
}
