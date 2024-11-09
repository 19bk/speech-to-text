import React from 'react';
import { AlertTriangle, Volume2, MessageSquare, Shield } from 'lucide-react';

export default function AlertsPanel() {
  const alerts = [
    {
      id: 1,
      type: 'warning',
      device: 'ESP32-C3',
      message: 'Low battery warning',
      time: '2 mins ago',
    },
    {
      id: 2,
      type: 'error',
      device: 'ESP32-D4',
      message: 'Device disconnected',
      time: '1 hour ago',
    },
    {
      id: 3,
      type: 'info',
      device: 'ESP32-A1',
      message: 'Speech detection active',
      time: 'Just now',
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold">Recent Alerts</h2>
      </div>
      <div className="divide-y divide-gray-200">
        {alerts.map((alert) => (
          <AlertItem key={alert.id} alert={alert} />
        ))}
      </div>
    </div>
  );
}

interface AlertItemProps {
  alert: {
    type: string;
    device: string;
    message: string;
    time: string;
  };
}

function AlertItem({ alert }: AlertItemProps) {
  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'error':
        return <Shield className="h-5 w-5 text-red-500" />;
      case 'info':
        return <MessageSquare className="h-5 w-5 text-blue-500" />;
      default:
        return <Volume2 className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="p-4 hover:bg-gray-50">
      <div className="flex items-center gap-4">
        {getAlertIcon(alert.type)}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900">{alert.device}</p>
          <p className="text-sm text-gray-500 truncate">{alert.message}</p>
        </div>
        <span className="text-sm text-gray-500">{alert.time}</span>
      </div>
    </div>
  );
}