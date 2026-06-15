import { 
  Users, 
  Database, 
  FileText, 
  TrendingUp,
  Clock,
  AlertCircle
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';

// Dummy data for the line chart
const lineData = [
  { name: 'Mon', incident: 42, warrant: 22, arrest: 15 },
  { name: 'Tue', incident: 28, warrant: 12, arrest: 22 },
  { name: 'Wed', incident: 18, warrant: 45, arrest: 8 },
  { name: 'Thu', incident: 25, warrant: 36, arrest: 19 },
  { name: 'Fri', incident: 16, warrant: 50, arrest: 21 },
  { name: 'Sat', incident: 18, warrant: 35, arrest: 25 },
  { name: 'Sun', incident: 33, warrant: 42, arrest: 20 },
];

// Dummy data for the bar chart
const barData = [
  { name: 'Incident Reports', value: 250, color: '#111827' },
  { name: 'Search Warrants', value: 160, color: '#3b82f6' },
  { name: 'Arrest Warrants', value: 120, color: '#f59e0b' },
];

const AdminDashboard = () => {
  return (
    <div className="animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex justify-between items-end mb-8">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Platform Overview</h1>
        <span className="text-sm text-gray-500">Last updated: Just now</span>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Active Accounts" 
          value="1,248" 
          trend="+12%" 
          trendLabel="vs last month"
          icon={<Users className="text-blue-500 w-6 h-6" />}
          iconBg="bg-blue-100"
        />
        <StatCard 
          title="Dataset Volume" 
          value="4.2 TB" 
          trend="+5%" 
          trendLabel="vs last month"
          icon={<Database className="text-indigo-500 w-6 h-6" />}
          iconBg="bg-indigo-100"
        />
        <StatCard 
          title="AI Generations (Today)" 
          value="8,432" 
          trend="+24%" 
          trendLabel="vs last month"
          icon={<FileText className="text-yellow-500 w-6 h-6" />}
          iconBg="bg-yellow-100"
        />
        <StatCard 
          title="Monthly Revenue" 
          value="$124.5k" 
          trend="+8%" 
          trendLabel="vs last month"
          icon={<TrendingUp className="text-emerald-500 w-6 h-6" />}
          iconBg="bg-emerald-100"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart Area */}
        <div className="lg:col-span-2 space-y-6">
          {/* AI Generation Activity Chart */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-6">AI Generation Activity (7 Days)</h2>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lineData} margin={{ top: 5, right: 20, bottom: 5, left: -20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} ticks={[0, 15, 30, 50]} />
                  <RechartsTooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }}
                  />
                  <Line type="monotone" dataKey="incident" stroke="#111827" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
                  <Line type="monotone" dataKey="warrant" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, strokeWidth: 2, fill: 'white' }} activeDot={{ r: 6 }} />
                  <Line type="monotone" dataKey="arrest" stroke="#f59e0b" strokeWidth={3} dot={{ r: 4, strokeWidth: 2, fill: 'white' }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            {/* Chart Legend */}
            <div className="flex justify-center gap-8 mt-6">
              <div className="flex items-center text-sm font-medium text-gray-900">
                <div className="w-3 h-3 rounded-full bg-gray-900 mr-2 flex items-center justify-center">
                   <div className="w-1 h-1 bg-white rounded-full"></div>
                </div>
                Incident Reports
              </div>
              <div className="flex items-center text-sm font-medium text-blue-500">
                <div className="w-3 h-3 rounded-full bg-blue-500 mr-2 flex items-center justify-center">
                   <div className="w-1 h-1 bg-white rounded-full"></div>
                </div>
                Search Warrants
              </div>
              <div className="flex items-center text-sm font-medium text-amber-500">
                <div className="w-3 h-3 rounded-full bg-amber-500 mr-2 flex items-center justify-center">
                   <div className="w-1 h-1 bg-white rounded-full"></div>
                </div>
                Arrest Warrants
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Generations by Module */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-6">Generations by Module</h2>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData} layout="vertical" margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e5e7eb" />
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 13 }} width={120} />
                  <RechartsTooltip cursor={{fill: 'transparent'}} />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={24}>
                    {barData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-between text-xs text-gray-500 px-2 mt-2">
              <span className="ml-[120px]">0</span>
              <span>100</span>
              <span>300</span>
            </div>
          </div>

          {/* System Alerts */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-6">System Alerts</h2>
            <div className="space-y-4">
              <div className="bg-[#fffbeb] border border-[#fde68a] rounded-lg p-4 flex items-start gap-3">
                <Clock className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-amber-900">High API Latency</h4>
                  <p className="text-sm text-amber-700 mt-1 leading-snug">OpenAI endpoint response time exceeded 2s threshold.</p>
                </div>
              </div>
              
              <div className="bg-[#eff6ff] border border-[#bfdbfe] rounded-lg p-4 flex items-start gap-3">
                <Database className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-blue-900">Dataset Processing Complete</h4>
                  <p className="text-sm text-blue-700 mt-1 leading-snug">Batch 7 arrest records successfully vectorized.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Sub-component for Stats Cards
const StatCard = ({ title, value, trend, trendLabel, icon, iconBg }) => (
  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start mb-4">
      <h3 className="text-sm font-medium text-gray-500 tracking-wide">{title}</h3>
      <div className={`${iconBg} w-10 h-10 rounded-full flex items-center justify-center`}>
        {icon}
      </div>
    </div>
    <div>
      <div className="text-3xl font-bold text-gray-900 tracking-tight">{value}</div>
      <div className="mt-2 flex items-center text-sm">
        <span className="text-emerald-500 font-semibold">{trend}</span>
        <span className="text-gray-400 ml-2">{trendLabel}</span>
      </div>
    </div>
  </div>
);

export default AdminDashboard;
