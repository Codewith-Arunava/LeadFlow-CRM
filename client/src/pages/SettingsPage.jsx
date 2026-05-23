import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Save } from 'lucide-react';

export default function SettingsPage() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [isDarkMode, setIsDarkMode] = useState(
    document.documentElement.classList.contains('dark')
  );

  const toggleDarkMode = () => {
    const root = document.documentElement;
    if (root.classList.contains('dark')) {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDarkMode(false);
    } else {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDarkMode(true);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h2 className="text-xl font-bold text-slate-800">Account Settings</h2>
        <p className="text-sm text-slate-500 mt-1">Manage your profile and preferences.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input 
                    label="Full Name" 
                    defaultValue={user.name || 'Arunava Chakraborty'} 
                  />
                  <Input 
                    label="Email Address" 
                    type="email"
                    defaultValue={user.email || 'arunavachakraborty170@gmail.com'} 
                  />
                </div>
                <Input 
                  label="Role" 
                  defaultValue={user.role || 'Administrator'} 
                  disabled
                />
                
                <div className="pt-4 flex justify-end">
                  <Button type="button" icon={Save}>Save Changes</Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <Input 
                  label="Current Password" 
                  type="password"
                  placeholder="••••••••"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input 
                    label="New Password" 
                    type="password"
                    placeholder="••••••••"
                  />
                  <Input 
                    label="Confirm New Password" 
                    type="password"
                    placeholder="••••••••"
                  />
                </div>
                
                <div className="pt-4 flex justify-end">
                  <Button type="button" variant="secondary">Update Password</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-slate-700">Email Notifications</h4>
                  <p className="text-xs text-slate-500">Receive alerts for new leads</p>
                </div>
                <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-slate-700 dark:text-slate-200">Dark Mode</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Toggle dark UI theme</p>
                </div>
                <input 
                  type="checkbox" 
                  checked={isDarkMode}
                  onChange={toggleDarkMode}
                  className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" 
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
