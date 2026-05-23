import React from 'react';
import { Trophy, Target, TrendingUp, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';

const employees = [
  {
    id: 1,
    name: 'Alex BDA',
    role: 'Senior Business Development',
    avatar: 'A',
    metrics: {
      conversionRate: '24%',
      leadsHandled: 156,
      wonDeals: 38,
      revenue: '$450k',
      trend: '+12%'
    }
  },
  {
    id: 2,
    name: 'Sarah Smith',
    role: 'Business Development Rep',
    avatar: 'S',
    metrics: {
      conversionRate: '18%',
      leadsHandled: 142,
      wonDeals: 25,
      revenue: '$280k',
      trend: '+5%'
    }
  },
  {
    id: 3,
    name: 'Mike Johnson',
    role: 'Business Development Rep',
    avatar: 'M',
    metrics: {
      conversionRate: '21%',
      leadsHandled: 128,
      wonDeals: 27,
      revenue: '$310k',
      trend: '+8%'
    }
  }
];

export default function TeamPerformancePage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-800">Team Performance</h2>
        <p className="text-sm text-slate-500 mt-1">Overview of BDA team metrics and conversion rates</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-blue-100 font-medium">Top Performer</p>
                <h3 className="text-2xl font-bold mt-1">Alex BDA</h3>
                <p className="text-blue-100 text-sm mt-2">38 Won Deals this month</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                <Trophy className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
              <Target className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Avg Conversion Rate</p>
              <p className="text-2xl font-bold text-slate-800">21%</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Total Team Revenue</p>
              <p className="text-2xl font-bold text-slate-800">$1.04M</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {employees.map(employee => (
          <Card key={employee.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-full bg-slate-100 border-2 border-white shadow-sm flex items-center justify-center text-xl font-bold text-blue-600">
                  {employee.avatar}
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 text-lg">{employee.name}</h3>
                  <p className="text-sm text-slate-500">{employee.role}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 rounded-lg p-3">
                  <p className="text-xs font-medium text-slate-500 mb-1">Conversion Rate</p>
                  <div className="flex items-end gap-2">
                    <span className="text-lg font-bold text-slate-800">{employee.metrics.conversionRate}</span>
                    <span className="text-xs font-medium text-emerald-600 mb-1">{employee.metrics.trend}</span>
                  </div>
                </div>
                <div className="bg-slate-50 rounded-lg p-3">
                  <p className="text-xs font-medium text-slate-500 mb-1">Total Revenue</p>
                  <p className="text-lg font-bold text-slate-800">{employee.metrics.revenue}</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-3">
                  <p className="text-xs font-medium text-slate-500 mb-1">Leads Handled</p>
                  <p className="text-lg font-bold text-slate-800">{employee.metrics.leadsHandled}</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-3">
                  <p className="text-xs font-medium text-slate-500 mb-1">Won Deals</p>
                  <p className="text-lg font-bold text-slate-800">{employee.metrics.wonDeals}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
