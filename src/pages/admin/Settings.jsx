import { useState } from 'react';
import { User, Shield, Save, Key } from 'lucide-react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="animate-in fade-in duration-500 pb-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Admin Settings</h1>
        
        <button className="flex items-center px-5 py-2.5 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 shadow-sm transition-colors">
          <Save className="w-5 h-5 mr-2" />
          Save Changes
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Nav */}
        <div className="w-full md:w-64 flex-shrink-0 space-y-1">
          <button
            onClick={() => setActiveTab('profile')}
            className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
              activeTab === 'profile' 
                ? 'bg-blue-50 text-blue-700' 
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <User className="w-5 h-5 mr-3" />
            Profile Settings
          </button>
          
          <button
            onClick={() => setActiveTab('security')}
            className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
              activeTab === 'security' 
                ? 'bg-blue-50 text-blue-700' 
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Shield className="w-5 h-5 mr-3" />
            Security & Access
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1">
          {activeTab === 'profile' && (
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8">
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900">Profile Information</h2>
                <p className="text-sm text-gray-500 mt-1">Update your admin account details and public profile.</p>
              </div>

              <div className="flex items-center mb-8">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 font-bold text-2xl mr-6 border border-gray-200 shadow-sm">
                  SA
                </div>
                <div>
                  <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors mb-2">
                    Change Avatar
                  </button>
                  <p className="text-xs text-gray-500">JPG, GIF or PNG. Max size of 800K</p>
                </div>
              </div>

              <div className="space-y-6 max-w-2xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <input 
                      type="email" 
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
                  <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white">
                    <option></option>
                    <option>Pacific Time (PT)</option>
                    <option>Mountain Time (MT)</option>
                    <option>Central Time (CT)</option>
                    <option>Eastern Time (ET)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8">
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900">Security Settings</h2>
                <p className="text-sm text-gray-500 mt-1">Manage your password and multi-factor authentication.</p>
              </div>

              <div className="border border-gray-200 rounded-lg p-6 max-w-2xl">
                <div className="flex items-center mb-6">
                  <Key className="w-5 h-5 text-gray-500 mr-2" />
                  <h3 className="text-base font-bold text-gray-900">Change Password</h3>
                </div>

                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                    <input 
                      type="password" 
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                    <input 
                      type="password" 
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                    <input 
                      type="password" 
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                    />
                  </div>

                  <div className="pt-2">
                    <button className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-50 shadow-sm transition-colors">
                      Update Password
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
