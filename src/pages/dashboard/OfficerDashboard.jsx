import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  ShieldAlert, 
  FileSearch, 
  UserPlus, 
  Lock, 
  FileText, 
  ArrowRight,
  User,
  ShieldCheck,
  Clock
} from 'lucide-react';

export default function OfficerDashboard() {
  const { user } = useAuth();

  const recentDocuments = [
    {
      id: 1,
      title: 'Incident Report - Downtown Robbery',
      identifier: 'CASE-2023-0842',
      date: 'Jun 7, 2026',
      status: 'Saved',
      type: 'Incident Report'
    },
    {
      id: 2,
      title: 'Search Warrant - 404 Elm St',
      identifier: 'WARR-2023-0192',
      date: 'Jun 5, 2026',
      status: 'Exported',
      type: 'Search Warrant'
    },
    {
      id: 3,
      title: 'Arrest Warrant - John Doe',
      identifier: 'WARR-2023-0195',
      date: 'Jun 3, 2026',
      status: 'Draft',
      type: 'Arrest Warrant'
    }
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Saved':
        return <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">Saved</span>;
      case 'Exported':
        return <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">Exported</span>;
      case 'Draft':
        return <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">Draft</span>;
      default:
        return null;
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Welcome Banner */}
      <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2 font-serif">Welcome, {user?.name || 'Detective Sarah Jenkins'}</h1>
          <p className="text-gray-500 text-lg">Select a module below to begin drafting secure documentation.</p>
        </div>
        <div className="bg-gray-50 rounded-xl p-5 border border-gray-100 min-w-[300px]">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm text-gray-500 font-medium">Current Plan: <span className="text-gray-900 font-bold">{user?.plan || 'Detective Plan'}</span></span>
          </div>
          <div className="flex justify-between items-center text-xs text-gray-500 mb-2 font-medium">
            <span>14 / 50 Documents Generated This Month</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full" style={{ width: '28%' }}></div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-6 font-serif">Document Generation Modules</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Module 1 */}
          <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-200">
              <ShieldAlert className="text-white" size={28} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3 font-serif">AI Incident Reports</h3>
            <p className="text-gray-500 text-sm mb-8 leading-relaxed">
              Generate comprehensive, structured incident narratives from raw field notes and facts.
            </p>
            <Link to="/dashboard/create/incident-report" className="text-blue-600 font-semibold text-sm flex items-center hover:text-blue-700">
              Launch Module <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Module 2 */}
          <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-200">
              <FileSearch className="text-white" size={28} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3 font-serif">AI Search Warrants</h3>
            <p className="text-gray-500 text-sm mb-8 leading-relaxed">
              Draft legally sound search warrant affidavits with proper probable cause structuring.
            </p>
            <button className="text-blue-600 font-semibold text-sm flex items-center hover:text-blue-700">
              Launch Module <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Module 3 (Locked) */}
          <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm relative opacity-70">
            <div className="absolute top-6 right-6 text-gray-400">
              <Lock size={20} />
            </div>
            <div className="w-14 h-14 bg-gray-100 border-2 border-gray-200 rounded-2xl flex items-center justify-center mb-6">
              <UserPlus className="text-gray-400" size={28} />
            </div>
            <h3 className="text-xl font-bold text-gray-400 mb-3 font-serif">AI Arrest Warrants</h3>
            <p className="text-gray-400 text-sm mb-8 leading-relaxed">
              Create detailed arrest warrant applications based on suspect and case entity data.
            </p>
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50">
              Upgrade to Access
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Documents */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-50 rounded-lg">
                <Clock className="text-gray-500" size={20} />
              </div>
              <h2 className="text-xl font-bold text-gray-900 font-serif">Recent Documents</h2>
            </div>
            <Link to="/dashboard/history" className="text-sm font-medium text-gray-500 hover:text-gray-900">
              View All
            </Link>
          </div>
          <div className="divide-y divide-gray-100">
            {recentDocuments.map((doc) => (
              <div key={doc.id} className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="mt-1 text-gray-400">
                    <FileText size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-1">{doc.title}</h4>
                    <div className="text-xs text-gray-500 flex items-center gap-2">
                      <span>{doc.identifier}</span>
                      <span>•</span>
                      <span>{doc.date}</span>
                    </div>
                  </div>
                </div>
                <div>
                  {getStatusBadge(doc.status)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 font-serif">Quick Actions</h2>
          </div>
          <div className="p-6 space-y-4">
            <Link to="/dashboard/profile" className="flex items-start gap-4 p-4 border border-gray-100 rounded-xl hover:border-gray-300 transition-colors group">
              <div className="p-3 bg-gray-50 rounded-lg group-hover:bg-white transition-colors">
                <User className="text-gray-600" size={20} />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-1">Update Profile</h4>
                <p className="text-xs text-gray-500">Manage credentials & security</p>
              </div>
            </Link>
            
            <Link to="/dashboard/profile" className="flex items-start gap-4 p-4 border border-gray-100 rounded-xl hover:border-gray-300 transition-colors group">
              <div className="p-3 bg-orange-50 rounded-lg group-hover:bg-white transition-colors">
                <ShieldCheck className="text-orange-600" size={20} />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-1">Manage Subscription</h4>
                <p className="text-xs text-gray-500">View billing & upgrade</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
