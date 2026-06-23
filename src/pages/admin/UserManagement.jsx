import { useEffect, useState, useRef, useCallback } from 'react';
import { Search, Shield, ShieldOff, MoreVertical, ShieldCheck, Mail, Building, Loader2 } from 'lucide-react';
import { listAdminUsers, updateAdminUser } from '../../api/adminPanel';
import { verifyOfficer } from '../../api/auth';

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  const [actionLoadingId, setActionLoadingId] = useState(null);

  const searchTimeout = useRef(null);

  const fetchUsers = useCallback(async (p, q, role) => {
    setLoading(true);
    try {
      const params = { page: p };
      if (q) params.q = q;
      if (role) params.role = role;
      
      const { data } = await listAdminUsers(params);
      const results = data.results || data;
      setUsers(results);
      setHasMore(!!data.next);
    } catch (err) {
      console.error('Failed to fetch users', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers(page, query, roleFilter);
  }, [fetchUsers, page, roleFilter]);

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    if (searchTimeout.current) clearTimeout(searchTimeout.current);
    searchTimeout.current = setTimeout(() => {
      setPage(1);
      fetchUsers(1, val, roleFilter);
    }, 500);
  };

  const handleToggleStatus = async (user) => {
    setActionLoadingId(user.id);
    try {
      const { data } = await updateAdminUser(user.id, { is_active: !user.is_active });
      setUsers(users.map(u => u.id === user.id ? data : u));
    } catch (err) {
      alert('Failed to update user status.');
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleVerifyOfficer = async (user) => {
    setActionLoadingId(user.id);
    try {
      const { data } = await updateAdminUser(user.id, { is_verified: true });
      setUsers(users.map(u => u.id === user.id ? data : u));
    } catch (err) {
      alert('Failed to verify officer.');
    } finally {
      setActionLoadingId(null);
    }
  };

  return (
    <div className="animate-in fade-in duration-500 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Officer Management</h1>
          <p className="text-gray-500 mt-1">Manage platform access, roles, and verifications.</p>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        {/* Filters */}
        <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row items-center gap-4 bg-gray-50/50">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input 
              type="text" 
              placeholder="Search by name, email or badge..." 
              value={query}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <select 
            value={roleFilter}
            onChange={(e) => { setRoleFilter(e.target.value); setPage(1); }}
            className="w-full sm:w-48 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Roles</option>
            <option value="officer">Officer</option>
            <option value="admin">Administrator</option>
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-100 text-xs uppercase tracking-wider text-gray-500 font-semibold">
                <th className="px-6 py-4">Officer Details</th>
                <th className="px-6 py-4">Department & Role</th>
                <th className="px-6 py-4">Status & Verification</th>
                <th className="px-6 py-4">Plan / Usage</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading && users.length === 0 ? (
                <tr><td colSpan="5" className="py-10 text-center"><Loader2 className="animate-spin text-gray-400 mx-auto" size={24} /></td></tr>
              ) : users.length === 0 ? (
                <tr><td colSpan="5" className="py-10 text-center text-gray-500">No users found.</td></tr>
              ) : (
                users.map(user => (
                  <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                    {/* User Details */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">
                          {user.first_name?.[0]}{user.last_name?.[0]}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900 flex items-center gap-1.5">
                            {user.first_name} {user.last_name}
                            {user.role === 'admin' && <span className="bg-purple-100 text-purple-700 text-[10px] px-2 py-0.5 rounded uppercase font-bold tracking-wide">Admin</span>}
                          </div>
                          <div className="text-sm text-gray-500 flex items-center gap-1 mt-0.5">
                            <Mail size={12} /> {user.email}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Department */}
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 font-medium flex items-center gap-1.5">
                        <Building size={14} className="text-gray-400" />
                        {user.department_name || 'N/A'}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">Badge: {user.badge_number || 'N/A'}</div>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1.5 items-start">
                        {user.is_active ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> Active
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">
                            <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div> Suspended
                          </span>
                        )}
                        
                        {user.is_verified ? (
                          <span className="inline-flex items-center gap-1 text-xs font-medium text-blue-600">
                            <ShieldCheck size={14} /> Verified ID
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-600">
                            <Shield size={14} /> Unverified
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Usage */}
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 font-medium">
                        {user.subscription?.plan_display || 'Free'}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {user.subscription?.documents_generated_this_month || 0} / {user.subscription?.document_limit === -1 ? '∞' : (user.subscription?.document_limit || 0)} docs
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 text-right">
                      {actionLoadingId === user.id ? (
                        <Loader2 className="animate-spin text-gray-400 inline-block" size={18} />
                      ) : (
                        <div className="flex items-center justify-end gap-3">
                          {!user.is_verified && (
                            <button 
                              onClick={() => handleVerifyOfficer(user)}
                              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                              title="Verify Officer ID"
                            >
                              Verify
                            </button>
                          )}
                          <button 
                            onClick={() => handleToggleStatus(user)}
                            className={`text-sm font-medium ${user.is_active ? 'text-red-600 hover:text-red-800' : 'text-emerald-600 hover:text-emerald-800'}`}
                          >
                            {user.is_active ? 'Suspend' : 'Activate'}
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Controls */}
        {!loading && (page > 1 || hasMore) && (
          <div className="p-4 border-t border-gray-100 flex justify-between items-center bg-gray-50/30">
            <button 
              disabled={page === 1}
              onClick={() => setPage(p => p - 1)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            <span className="text-sm text-gray-600 font-medium">Page {page}</span>
            <button 
              disabled={!hasMore}
              onClick={() => setPage(p => p + 1)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
