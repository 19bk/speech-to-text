import React, { useState } from 'react';
import { AlertTriangle, BarChart3, Clock, MapPin, Shield, Users, BookOpen } from 'lucide-react';
import IncidentTrends from './IncidentTrends';

export default function HarassmentDashboard() {
  const [timeRange, setTimeRange] = useState('7');

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          title="Total Incidents"
          value="47"
          change="+12%"
          trend="up"
          description="vs. last month"
          icon={<AlertTriangle className="h-6 w-6 text-red-500" />}
        />
        <StatCard
          title="Response Rate"
          value="92%"
          change="+5%"
          trend="up"
          description="vs. last month"
          icon={<Clock className="h-6 w-6 text-green-500" />}
        />
        <StatCard
          title="Active Classes"
          value="12"
          change="+2"
          trend="up"
          description="new classes added"
          icon={<BookOpen className="h-6 w-6 text-blue-500" />}
        />
        <StatCard
          title="At-Risk Students"
          value="15"
          change="-3"
          trend="down"
          description="vs. last month"
          icon={<Users className="h-6 w-6 text-purple-500" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ClassAnalytics />
        <IncidentTrends timeRange={timeRange} setTimeRange={setTimeRange} />
      </div>

      <RecentIncidents />
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  description: string;
  icon: React.ReactNode;
}

function StatCard({ title, value, change, trend, description, icon }: StatCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-semibold mt-2">{value}</p>
        </div>
        <div className="bg-gray-50 p-3 rounded-lg">{icon}</div>
      </div>
      <div className="mt-4 flex items-center">
        <span className={`text-sm font-medium ${
          trend === 'up' ? 'text-green-600' : 'text-red-600'
        }`}>
          {change}
        </span>
        <span className="text-sm text-gray-500 ml-2">{description}</span>
      </div>
    </div>
  );
}

function ClassAnalytics() {
  const classes = [
    { name: 'Class 10A', incidents: 12, trend: 'up', riskLevel: 'High' },
    { name: 'Class 9B', incidents: 8, trend: 'down', riskLevel: 'Medium' },
    { name: 'Class 11C', incidents: 15, trend: 'up', riskLevel: 'High' },
    { name: 'Class 8A', incidents: 5, trend: 'down', riskLevel: 'Low' },
    { name: 'Class 12B', incidents: 7, trend: 'up', riskLevel: 'Medium' },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold mb-6">Class Risk Analysis</h3>
      <div className="space-y-4">
        {classes.map((classItem) => (
          <div key={classItem.name} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">{classItem.name}</h4>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  classItem.riskLevel === 'High' 
                    ? 'bg-red-100 text-red-800'
                    : classItem.riskLevel === 'Medium'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-green-100 text-green-800'
                }`}>
                  {classItem.riskLevel} Risk
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">{classItem.incidents} incidents</span>
                <span className={`${
                  classItem.trend === 'up' 
                    ? 'text-red-600' 
                    : 'text-green-600'
                }`}>
                  {classItem.trend === 'up' ? '↑' : '↓'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RecentIncidents() {
  const incidents = [
    {
      id: 1,
      class: 'Class 10A',
      type: 'Verbal Harassment',
      time: '10 minutes ago',
      status: 'Active',
      severity: 'High',
    },
    {
      id: 2,
      class: 'Class 9B',
      type: 'Threatening Behavior',
      time: '25 minutes ago',
      status: 'Resolved',
      severity: 'Medium',
    },
    {
      id: 3,
      class: 'Class 11C',
      type: 'Verbal Abuse',
      time: '1 hour ago',
      status: 'Under Review',
      severity: 'High',
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold">Recent Incidents</h3>
      </div>
      <div className="divide-y divide-gray-200">
        {incidents.map((incident) => (
          <div key={incident.id} className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="font-medium">{incident.type}</h4>
                <p className="text-sm text-gray-500">{incident.class}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                incident.status === 'Active'
                  ? 'bg-red-100 text-red-800'
                  : incident.status === 'Resolved'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {incident.status}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-4">
                <span className={`px-2 py-1 rounded ${
                  incident.severity === 'High'
                    ? 'bg-red-50 text-red-700'
                    : 'bg-yellow-50 text-yellow-700'
                }`}>
                  {incident.severity} Severity
                </span>
                <span className="text-gray-500">{incident.time}</span>
              </div>
              <button className="text-blue-600 hover:text-blue-800">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}