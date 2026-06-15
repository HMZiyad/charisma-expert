import { Search, ChevronDown, Edit, Shield, ShieldOff, MoreHorizontal } from 'lucide-react';

const users = [
  { id: 'u1', name: 'Officer J. Miller', avatar: 'OJ', role: 'Officer', agency: 'Metro PD', badge: 'MPD-4521', plan: 'Patrol', status: 'Active', lastActive: 'Oct 25, 2023 14:30' },
  { id: 'u2', name: 'Det. S. Carter', avatar: 'DS', role: 'Detective', agency: 'State Police', badge: 'SP-8902', plan: 'Detective', status: 'Active', lastActive: 'Oct 25, 2023 15:15' },
  { id: 'u3', name: 'Capt. R. Vance', avatar: 'CR', role: 'Captain', agency: 'County Sheriff', badge: 'CSO-1105', plan: 'Department', status: 'Active', lastActive: 'Oct 24, 2023 22:45' },
  { id: 'u4', name: 'Officer L. Chen', avatar: 'OL', role: 'Officer', agency: 'Metro PD', badge: 'MPD-4588', plan: 'Patrol', status: 'Inactive', lastActive: 'Oct 10, 2023 17:20' },
  { id: 'u5', name: 'Det. M. Rossi', avatar: 'DM', role: 'Detective', agency: 'Federal Bureau', badge: 'FB-9942', plan: 'Department', status: 'Suspended', lastActive: 'Sep 15, 2023 20:00' },
];

const UserManagement = () => {
  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">User & Permission Management</h1>
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2.5 rounded-md font-medium transition-colors shadow-sm">
          Invite New User
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center gap-4 bg-gray-50/50">
          <div className="relative flex-1 max-w-2xl">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Search by name, agency, or badge ID..."
            />
          </div>
          <div className="relative w-48">
            <select className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md appearance-none bg-white">
              <option>All Plans</option>
              <option>Patrol</option>
              <option>Detective</option>
              <option>Department</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
              <ChevronDown className="h-4 w-4" />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-white">
              <tr>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider w-1/4">
                  Officer
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider w-1/4">
                  Agency / Badge
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider w-1/6">
                  Plan
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider w-1/6">
                  Status
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider w-1/6">
                  Last Active
                </th>
                <th scope="col" className="px-6 py-4 text-right text-xs font-bold text-gray-900 uppercase tracking-wider w-32">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-gray-100 text-gray-600 font-bold flex items-center justify-center border border-gray-200">
                          {user.avatar}
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-semibold text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.agency}</div>
                    <div className="text-sm text-gray-500">{user.badge}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-md bg-gray-100 text-gray-800">
                      {user.plan}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-md ${
                      user.status === 'Active' ? 'bg-green-100 text-green-800' : 
                      user.status === 'Inactive' ? 'bg-gray-100 text-gray-800' : 
                      'bg-red-100 text-red-800'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.lastActive}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-3">
                      {user.status !== 'Suspended' ? (
                        <button className="text-red-500 hover:text-red-700 transition-colors" title="Suspend User">
                          <ShieldOff className="h-5 w-5" />
                        </button>
                      ) : (
                        <button className="text-green-500 hover:text-green-700 transition-colors" title="Activate User">
                          <Shield className="h-5 w-5" />
                        </button>
                      )}
                      <button className="text-gray-500 hover:text-gray-900 transition-colors" title="Edit User">
                        <Edit className="h-5 w-5" />
                      </button>
                    </div>
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

export default UserManagement;
