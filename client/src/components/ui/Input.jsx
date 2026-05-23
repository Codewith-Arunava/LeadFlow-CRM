import React from 'react';

export const Input = React.forwardRef(({ label, error, className = '', ...props }, ref) => {
  return (
    <div className={`flex flex-col space-y-1.5 ${className}`}>
      {label && (
        <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={`flex h-10 w-full rounded-lg border bg-white dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50 transition-colors ${
          error 
            ? 'border-red-500 focus:ring-red-500' 
            : 'border-slate-300 dark:border-slate-600'
        }`}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-500 mt-1">{error}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';
