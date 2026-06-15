import { useAuth } from '../../contexts/AuthContext';
import { User, Shield, CheckCircle2, XCircle, Key, Bell } from 'lucide-react';

export default function OfficerProfile() {
  const { user } = useAuth();

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 font-serif">Profile & Settings</h1>
        <p className="text-gray-500 mt-1 text-lg">Manage your officer credentials, security settings, and subscription.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Officer Information Card */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <User className="text-gray-500" size={24} />
                <h2 className="text-xl font-bold text-gray-900 font-serif">Officer Information</h2>
              </div>
              <button className="text-blue-600 text-sm font-semibold hover:text-blue-700">Edit</button>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                <div className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-lg text-gray-900">{user?.name || 'Detective Sarah Jenkins'}</div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Rank / Title</label>
                <div className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-lg text-gray-900">{user?.rank || 'Detective'}</div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Agency / Badge ID</label>
                <div className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-lg text-gray-900">{user?.badge || 'NYPD-7492'}</div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Official Email</label>
                <div className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-lg text-gray-900">{user?.email || 'sarah.jenkins@nypd.gov'}</div>
              </div>
            </div>
          </div>

          {/* Security Settings Card */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex items-center gap-3">
              <Shield className="text-gray-500" size={24} />
              <h2 className="text-xl font-bold text-gray-900 font-serif">Security Settings</h2>
            </div>
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between pb-6 border-b border-gray-100">
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Two-Factor Authentication (2FA)</h3>
                  <p className="text-gray-500 text-sm">Require a security code when logging in from a new device.</p>
                </div>
                <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
                  <input type="checkbox" name="toggle" id="toggle" defaultChecked className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 border-green-500 appearance-none cursor-pointer" style={{ right: 0, borderColor: '#fff' }}/>
                  <label htmlFor="toggle" className="toggle-label block overflow-hidden h-6 rounded-full bg-green-500 cursor-pointer"></label>
                </div>
              </div>
              
              <div>
                <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                  <Key size={16} className="mr-2" />
                  Change Password
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          
          {/* Subscription Status */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="bg-[#111625] p-6 text-white">
              <h2 className="text-xl font-bold font-serif">Subscription Status</h2>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-500 text-sm font-medium">Current Plan</span>
                <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">Active</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6 font-serif">{user?.plan || 'Detective Plan'}</h3>
              
              <div className="mb-4">
                <h4 className="text-sm font-bold text-gray-900 mb-3">Module Access</h4>
                <ul className="space-y-3">
                  <li className="flex items-center justify-between">
                    <span className="text-gray-600 text-sm">AI Incident Reports</span>
                    <CheckCircle2 className="text-green-500" size={20} />
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-gray-600 text-sm">AI Search Warrants</span>
                    <CheckCircle2 className="text-green-500" size={20} />
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">AI Arrest Warrants</span>
                    <XCircle className="text-gray-300" size={20} />
                  </li>
                </ul>
              </div>
              
              <div className="pt-6 mt-6 border-t border-gray-100">
                <button className="w-full py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30">
                  Upgrade Plan
                </button>
              </div>
            </div>
          </div>

          {/* System Notifications */}
          <div className="bg-gray-50 border border-gray-200 rounded-2xl shadow-sm overflow-hidden p-6 flex items-start gap-4">
            <div className="mt-0.5">
              <Bell className="text-gray-400" size={24} />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-2">System Notifications</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Your agency administrator manages global data retention policies. Documents are securely archived according to department standards.
              </p>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
