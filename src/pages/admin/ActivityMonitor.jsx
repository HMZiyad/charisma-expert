import { Info, AlertTriangle } from 'lucide-react';

const activities = [
  { 
    id: 1, 
    timestamp: 'Oct 25, 15:15:22', 
    severity: 'Info', 
    actor: 'Det. S. Carter', 
    action: 'Generated Search Warrant', 
    details: 'Module: Search Warrant, Case: SW-2023-884' 
  },
  { 
    id: 2, 
    timestamp: 'Oct 25, 15:10:05', 
    severity: 'Info', 
    actor: 'System', 
    action: 'Dataset Processing Started', 
    details: 'File: county_arrest_records_batch7.txt' 
  },
  { 
    id: 3, 
    timestamp: 'Oct 25, 14:45:12', 
    severity: 'Warning', 
    actor: 'Officer J. Miller', 
    action: 'Failed Login Attempt', 
    details: 'Invalid credentials provided.' 
  },
  { 
    id: 4, 
    timestamp: 'Oct 25, 05:59:59', 
    severity: 'Info', 
    actor: 'System', 
    action: 'Daily Backup Completed', 
    details: 'All databases backed up successfully.' 
  },
  { 
    id: 5, 
    timestamp: 'Oct 24, 22:45:30', 
    severity: 'Info', 
    actor: 'Capt. R. Vance', 
    action: 'Exported Arrest Warrant (PDF)', 
    details: 'Module: Arrest Warrant, Case: AW-2023-102' 
  },
];

const ActivityMonitor = () => {
  return (
    <div className="animate-in fade-in duration-500 pb-10">
      <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-8">Activity Monitor</h1>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900">Diagnostic Feed</h2>
          <div className="flex items-center px-2.5 py-1 text-sm text-green-700 bg-green-100 rounded-md font-medium">
            <div className="w-1.5 h-1.5 mr-1.5 bg-green-500 rounded-full animate-pulse"></div>
            Live
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50/50">
              <tr>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider w-48">Timestamp</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider w-32">Severity</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider w-48">Actor</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Action / Details</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {activities.map((activity) => (
                <tr key={activity.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-500 font-mono">
                    {activity.timestamp}
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    {activity.severity === 'Info' ? (
                      <div className="flex items-center text-blue-600">
                        <Info className="w-4 h-4 mr-1.5" />
                        <span className="text-sm font-medium">Info</span>
                      </div>
                    ) : (
                      <div className="flex items-center text-amber-500">
                        <AlertTriangle className="w-4 h-4 mr-1.5" />
                        <span className="text-sm font-medium">Warning</span>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-sm font-semibold text-gray-900">
                    {activity.actor}
                  </td>
                  <td className="px-6 py-5">
                    <div className="text-sm font-semibold text-gray-900 mb-0.5">{activity.action}</div>
                    <div className="text-sm text-gray-500">{activity.details}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ActivityMonitor;
