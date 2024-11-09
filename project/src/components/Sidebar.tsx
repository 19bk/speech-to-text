import React from 'react';
import { BarChart2, Cpu, Volume2 } from 'lucide-react';

interface SidebarProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

export default function Sidebar({ currentView, onViewChange }: SidebarProps) {
  return (
    <aside className="w-20 bg-gray-900 flex flex-col items-center py-6">
      <div className="mb-8">
        <Volume2 className="h-8 w-8 text-blue-500" />
      </div>
      
      <nav className="flex-1 space-y-6">
        <SidebarIcon 
          icon={<Cpu />} 
          label="Devices"
          active={currentView === 'devices'} 
          onClick={() => onViewChange('devices')}
        />
        <SidebarIcon 
          icon={<BarChart2 />}
          label="Analytics"
          active={currentView === 'harassment'} 
          onClick={() => onViewChange('harassment')}
        />
      </nav>
    </aside>
  );
}

interface SidebarIconProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

function SidebarIcon({ icon, label, active, onClick }: SidebarIconProps) {
  return (
    <button
      onClick={onClick}
      className={`p-3 rounded-lg transition-colors duration-200 group relative ${
        active
          ? 'text-white bg-blue-600'
          : 'text-gray-400 hover:text-white hover:bg-gray-800'
      }`}
    >
      {icon}
      <span className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">
        {label}
      </span>
    </button>
  );
}