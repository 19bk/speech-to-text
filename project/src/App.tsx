import React, { useState } from 'react';
import { BellRing, Cpu, Shield } from 'lucide-react';
import Sidebar from './components/Sidebar';
import DeviceGrid from './components/DeviceGrid';
import AlertsPanel from './components/AlertsPanel';
import Header from './components/Header';
import HarassmentDashboard from './components/HarassmentDashboard';

function App() {
  const [currentView, setCurrentView] = useState('devices');

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar currentView={currentView} onViewChange={setCurrentView} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          {currentView === 'devices' ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <StatCard
                  title="Active Devices"
                  value="12"
                  icon={<Cpu className="h-6 w-6 text-blue-500" />}
                  trend="+2 from last week"
                />
                <StatCard
                  title="Active Alerts"
                  value="3"
                  icon={<BellRing className="h-6 w-6 text-red-500" />}
                  trend="5 resolved today"
                />
                <StatCard
                  title="System Status"
                  value="Optimal"
                  icon={<Shield className="h-6 w-6 text-green-500" />}
                  trend="98% uptime"
                />
              </div>
              
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <div className="xl:col-span-2">
                  <DeviceGrid />
                </div>
                <div>
                  <AlertsPanel />
                </div>
              </div>
            </>
          ) : (
            <HarassmentDashboard />
          )}
        </main>
      </div>
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend: string;
}

function StatCard({ title, value, icon, trend }: StatCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-semibold mt-2">{value}</p>
        </div>
        <div className="bg-gray-50 p-3 rounded-lg">{icon}</div>
      </div>
      <p className="text-sm text-gray-500 mt-4">{trend}</p>
    </div>
  );
}

export default App;