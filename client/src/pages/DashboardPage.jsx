import React, { useState, useEffect } from 'react';
import { Users, CheckCircle, XCircle, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import api from '../api';
import { useNavigate } from 'react-router-dom';

const chartData = [
  { name: 'Jan', sales: 4000, target: 2400 },
  { name: 'Feb', sales: 3000, target: 1398 },
  { name: 'Mar', sales: 2000, target: 9800 },
  { name: 'Apr', sales: 2780, target: 3908 },
  { name: 'May', sales: 1890, target: 4800 },
  { name: 'Jun', sales: 2390, target: 3800 },
  { name: 'Jul', sales: 3490, target: 4300 },
];

const recentActivity = [
  { id: 1, user: 'Alex BDA', action: 'moved', lead: 'TechCorp', to: 'Negotiation', time: '2h ago' },
  { id: 2, user: 'Sarah Smith', action: 'won deal with', lead: 'Global Industries', to: '', time: '4h ago' },
  { id: 3, user: 'Mike Johnson', action: 'added new lead', lead: 'Nova Manufacturing', to: '', time: '5h ago' },
  { id: 4, user: 'Alex BDA', action: 'contacted', lead: 'SteelWorks Inc', to: '', time: '1d ago' },
];

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalLeads: 0,
    wonDeals: 0,
    lostDeals: 0,
    pendingFollowUps: 0
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get('/dashboard/stats');
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching stats:', error);
        if (error.response?.status === 401) {
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [navigate]);

  if (loading) {
    return <div className="flex justify-center items-center h-full">Loading...</div>;
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* KPI Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Leads</p>
              <p className="text-2xl font-bold text-slate-800 dark:text-white">{stats.totalLeads}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Won Deals</p>
              <p className="text-2xl font-bold text-slate-800 dark:text-white">{stats.wonDeals}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-red-50 flex items-center justify-center text-red-600">
              <XCircle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Lost Deals</p>
              <p className="text-2xl font-bold text-slate-800 dark:text-white">{stats.lostDeals}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Pending Follow-ups</p>
              <p className="text-2xl font-bold text-slate-800 dark:text-white">{stats.pendingFollowUps}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Sales Performance</CardTitle>
          </CardHeader>
          <CardContent className="px-2">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} dx={-10} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Area type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 flex items-center justify-center flex-shrink-0 text-slate-600 dark:text-slate-300 font-medium text-xs">
                    {activity.user.charAt(0)}
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm text-slate-800 dark:text-slate-200">
                      <span className="font-medium dark:text-white">{activity.user}</span> {activity.action} <span className="font-medium dark:text-white">{activity.lead}</span>
                      {activity.to && ` to ${activity.to}`}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
