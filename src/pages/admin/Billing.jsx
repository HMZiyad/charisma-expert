import { Download, DollarSign, Users, TrendingDown, ChevronDown } from 'lucide-react';

const transactions = [
  { id: 1, date: 'Oct 1, 2023', name: 'Officer J. Miller', accountId: 'u1', plan: 'Patrol', amount: '$ 49.99', status: 'Paid' },
  { id: 2, date: 'Oct 5, 2023', name: 'Det. S. Carter', accountId: 'u2', plan: 'Detective', amount: '$ 299.0', status: 'Paid' },
  { id: 3, date: 'Oct 10, 2023', name: 'Capt. R. Vance', accountId: 'u3', plan: 'Department', amount: '$ 299.0', status: 'Paid' },
  { id: 4, date: 'Oct 10, 2023', name: 'Capt. R. Vance', accountId: 'u3', plan: 'Department', amount: '$ 299.0', status: 'Paid' },
  { id: 5, date: 'Oct 10, 2023', name: 'Capt. R. Vance', accountId: 'u3', plan: 'Department', amount: '$ 299.0', status: 'Paid' },
  { id: 6, date: 'Oct 10, 2023', name: 'Capt. R. Vance', accountId: 'u3', plan: 'Department', amount: '$ 299.0', status: 'Paid' },
  { id: 7, date: 'Oct 10, 2023', name: 'Capt. R. Vance', accountId: 'u3', plan: 'Department', amount: '$ 299.0', status: 'Paid' },
  { id: 8, date: 'Sep 10, 2023', name: 'Det. M. Rossi', accountId: 'u5', plan: 'Department', amount: '$ 299.0', status: 'Failed' },
];

const Billing = () => {
  return (
    <div className="animate-in fade-in duration-500 pb-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Subscriptions & Billing</h1>
        <button className="flex items-center px-4 py-2.5 bg-white border border-gray-300 rounded-md font-medium text-gray-700 hover:bg-gray-50 shadow-sm transition-colors">
          <Download className="w-5 h-5 mr-2" />
          Export Report
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-6">
          <div className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0">
            <DollarSign className="w-7 h-7 text-emerald-500" />
          </div>
          <div>
            <div className="text-sm font-medium text-gray-500 mb-1">Monthly Recurring Revenue</div>
            <div className="text-3xl font-bold text-gray-900">$42,500</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-6">
          <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
            <Users className="w-7 h-7 text-blue-500" />
          </div>
          <div>
            <div className="text-sm font-medium text-gray-500 mb-1">Active Subscriptions</div>
            <div className="text-3xl font-bold text-gray-900">842</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-6">
          <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0">
            <TrendingDown className="w-7 h-7 text-red-500" />
          </div>
          <div>
            <div className="text-sm font-medium text-gray-500 mb-1">Churn Rate (30d)</div>
            <div className="text-3xl font-bold text-gray-900">2.4%</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Transaction Log */}
        <div className="xl:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-gray-200 flex justify-between items-center bg-white">
            <h2 className="text-lg font-bold text-gray-900">Transaction Log</h2>
            <div className="relative">
              <select className="appearance-none bg-white border border-gray-300 rounded-md pl-4 pr-10 py-2 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                <option>All Statuses</option>
                <option>Paid</option>
                <option>Failed</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                <ChevronDown className="h-4 w-4" />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-white">
                <tr>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Account</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Plan</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Amount</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {transactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{tx.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-gray-900">{tx.name}</div>
                      <div className="text-sm text-gray-500">{tx.accountId}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{tx.plan}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{tx.amount}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-md ${
                        tx.status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Access Rules Matrix */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col h-full">
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Access Rules Matrix</h2>
            <p className="text-sm text-gray-500 mb-6">Tie AI modules to subscription plans globally.</p>
          </div>

          <div className="space-y-4 flex-1">
            <PlanRulesCard title="Patrol Plan" defaultChecked={[]} />
            <PlanRulesCard title="Detective Plan" defaultChecked={[]} />
            <PlanRulesCard title="Department Plan" defaultChecked={[]} />
          </div>

          <button className="w-full mt-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
            Save Rules
          </button>
        </div>
      </div>
    </div>
  );
};

const PlanRulesCard = ({ title, defaultChecked }) => (
  <div className="border border-gray-200 rounded-lg p-5">
    <h3 className="text-md font-bold text-gray-900 mb-4">{title}</h3>
    <div className="space-y-3">
      <label className="flex items-center space-x-3 cursor-pointer">
        <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" />
        <span className="text-sm text-gray-700">Incident Reports</span>
      </label>
      <label className="flex items-center space-x-3 cursor-pointer">
        <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" />
        <span className="text-sm text-gray-700">Search Warrants</span>
      </label>
      <label className="flex items-center space-x-3 cursor-pointer">
        <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" />
        <span className="text-sm text-gray-700">Arrest Warrants</span>
      </label>
    </div>
  </div>
);

export default Billing;
