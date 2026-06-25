import { useState, useEffect } from 'react';
import { Outlet, NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  Shield, 
  LayoutGrid, 
  FileText, 
  Clock, 
  FileSearch, 
  UserPlus, 
  History, 
  User, 
  LogOut,
  ChevronDown,
  ChevronUp,
  Menu,
  X
} from 'lucide-react';
import logoImg from '../assets/logo.png';

export default function OfficerLayout() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isCreateOpen, setIsCreateOpen] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false);

  const handleRestrictedNav = (e) => {
    if (!user?.is_verified && user?.role !== 'admin') {
      e.preventDefault();
      setShowVerificationModal(true);
    }
  };

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => {
    if (path === '/dashboard' && location.pathname === '/dashboard') return true;
    if (path !== '/dashboard' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`w-[280px] bg-[#111625] text-gray-300 flex flex-col shrink-0 fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {/* Logo Area */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <img src={logoImg} alt="AAAT Logo" className="h-8 w-auto" />
            <span className="text-white font-bold text-lg tracking-wide">AAAT Console</span>
          </div>
          <button className="lg:hidden text-gray-400 hover:text-white" onClick={() => setIsSidebarOpen(false)}>
            <X size={20} />
          </button>
        </div>

        {/* User Info */}
        <div className="p-6 border-b border-gray-800">
          <div className="text-white font-medium text-sm mb-1">{user ? `${user.first_name} ${user.last_name}` : 'Loading...'}</div>
          <div className="text-gray-500 text-xs">Badge: {user?.badge_number || '---'}</div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1">
            <li>
              <Link 
                to="/dashboard" 
                className={`flex items-center px-6 py-3 text-sm transition-colors ${
                  isActive('/dashboard') ? 'bg-blue-600 text-white' : 'hover:bg-gray-800 hover:text-white'
                }`}
              >
                <LayoutGrid size={18} className="mr-3" />
                Dashboard
              </Link>
            </li>

            {/* Create Document Section */}
            <li>
              <button 
                onClick={() => setIsCreateOpen(!isCreateOpen)}
                className="w-full flex items-center justify-between px-6 py-3 text-sm hover:bg-gray-800 hover:text-white transition-colors"
              >
                <div className="flex items-center">
                  <FileText size={18} className="mr-3" />
                  Create Document
                </div>
                {isCreateOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              
              {isCreateOpen && (
                <ul className="bg-[#0b0e17] py-2 space-y-1">
                  <li>
                    <Link 
                      to="/dashboard/create/incident-report" 
                      onClick={handleRestrictedNav}
                      className={`flex items-center pl-14 pr-6 py-2.5 text-sm transition-colors ${
                        isActive('/dashboard/create/incident-report') ? 'text-white' : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      <Clock size={16} className="mr-3" />
                      Incident Report
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/dashboard/create/search-warrant" 
                      onClick={handleRestrictedNav}
                      className={`flex items-center pl-14 pr-6 py-2.5 text-sm transition-colors ${
                        isActive('/dashboard/create/search-warrant') ? 'text-white' : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      <FileSearch size={16} className="mr-3" />
                      Search Warrant
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/dashboard/create/arrest-warrant" 
                      onClick={handleRestrictedNav}
                      className={`flex items-center pl-14 pr-6 py-2.5 text-sm transition-colors ${
                        isActive('/dashboard/create/arrest-warrant') ? 'text-white' : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      <UserPlus size={16} className="mr-3" />
                      Arrest Warrant
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            <li>
              <Link 
                to="/dashboard/history" 
                className={`flex items-center px-6 py-3 text-sm transition-colors ${
                  isActive('/dashboard/history') ? 'bg-blue-600 text-white' : 'hover:bg-gray-800 hover:text-white'
                }`}
              >
                <History size={18} className="mr-3" />
                Document History
              </Link>
            </li>

            <li>
              <Link 
                to="/dashboard/profile" 
                className={`flex items-center px-6 py-3 text-sm transition-colors ${
                  isActive('/dashboard/profile') ? 'bg-blue-600 text-white' : 'hover:bg-gray-800 hover:text-white'
                }`}
              >
                <User size={18} className="mr-3" />
                Profile Settings
              </Link>
            </li>
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-6 border-t border-gray-800 mt-auto">
          <button 
            onClick={handleLogout}
            className="flex items-center text-sm text-gray-400 hover:text-white transition-colors w-full"
          >
            <LogOut size={18} className="mr-3" />
            Secure Sign Out
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-white border-l border-gray-200">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between lg:justify-end px-4 lg:px-8 shrink-0">
          <div className="flex items-center lg:hidden">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 -ml-2 mr-2 text-gray-600 hover:text-gray-900 rounded-md"
            >
              <Menu size={24} />
            </button>
            <span className="font-bold text-gray-900 text-lg sm:hidden">AAAT</span>
          </div>

          <div className="flex items-center gap-2 lg:gap-4">
            <div className="flex items-center bg-gray-50 px-3 py-1.5 rounded-full border border-gray-200">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              <span className="text-xs font-medium text-gray-700">System Secure</span>
            </div>
            <div className="flex items-center bg-orange-50 px-3 py-1.5 rounded-full border border-orange-100">
              <span className="text-xs font-medium text-orange-600 uppercase tracking-wide">{user?.role || 'Officer'}</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <Outlet context={{ handleRestrictedNav }} />
        </main>
      </div>

      {/* Verification Modal */}
      {showVerificationModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 relative">
            <button 
              onClick={() => setShowVerificationModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <Shield className="text-orange-600" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Verification Required</h3>
              <p className="text-gray-600 mb-6">
                Your account is currently pending admin verification. Please wait for an administrator to verify your credentials before accessing document generation services.
              </p>
              <button 
                onClick={() => setShowVerificationModal(false)}
                className="w-full bg-gray-900 text-white font-medium py-2.5 rounded-lg hover:bg-gray-800 transition-colors"
              >
                Understood
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
