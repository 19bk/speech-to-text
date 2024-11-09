import React from 'react';
import { Activity, Battery, Signal, Volume2 } from 'lucide-react';

export default function DeviceGrid() {
  const devices = [
    {
      id: 1,
      name: 'ESP32-A1',
      location: 'Main Hall',
      status: 'Active',
      battery: 85,
      signal: 92,
      lastUpdate: '2 mins ago',
    },
    {
      id: 2,
      name: 'ESP32-B2',
      location: 'Conference Room',
      status: 'Active',
      battery: 72,
      signal: 88,
      lastUpdate: '5 mins ago',
    },
    {
      id: 3,
      name: 'ESP32-C3',
      location: 'Lobby',
      status: 'Warning',
      battery: 15,
      signal: 45,
      lastUpdate: '1 min ago',
    },
    {
      id: 4,
      name: 'ESP32-D4',
      location: 'Meeting Room 1',
      status: 'Inactive',
      battery: 0,
      signal: 0,
      lastUpdate: '1 hour ago',
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold">Device Status</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        {devices.map((device) => (
          <DeviceCard key={device.id} device={device} />
        ))}
      </div>
    </div>
  );
}

interface DeviceCardProps {
  device: {
    name: string;
    location: string;
    status: string;
    battery: number;
    signal: number;
    lastUpdate: string;
  };
}

function DeviceCard({ device }: DeviceCardProps) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      case 'inactive':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold">{device.name}</h3>
          <p className="text-sm text-gray-500">{device.location}</p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
            device.status
          )}`}
        >
          {device.status}
        </span>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-2">
          <Battery className="h-5 w-5 text-gray-400" />
          <span className="text-sm">{device.battery}%</span>
        </div>
        <div className="flex items-center gap-2">
          <Signal className="h-5 w-5 text-gray-400" />
          <span className="text-sm">{device.signal}%</span>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-blue-500" />
            <span className="text-sm font-medium">Processing</span>
          </div>
          <span className="text-sm text-gray-500">Updated {device.lastUpdate}</span>
        </div>
      </div>
    </div>
  );
}