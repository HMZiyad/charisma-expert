import { UploadCloud, FileText, Database, ChevronDown } from 'lucide-react';

const recentFiles = [
  { id: 1, name: 'metro_pd_incident_archives_2022.pdf', date: 'Oct 20, 2023 16:00', repo: 'Incident Report', size: '45 MB' },
  { id: 2, name: 'state_search_warrants_q1.docx', date: 'Oct 22, 2023 20:30', repo: 'Search Warrant', size: '12 MB' },
  { id: 3, name: 'county_arrest_records_batch7.txt', date: 'Oct 25, 2023 15:00', repo: 'Arrest Warrant', size: '8 MB' },
];

const DatasetManagement = () => {
  return (
    <div className="animate-in fade-in duration-500 pb-10">
      <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-8">AI Dataset & Training Management</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Upload Training Data */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Upload Training Data</h2>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Target Engine Repository</label>
              <div className="relative">
                <select className="appearance-none block w-full bg-gray-50 border border-gray-300 text-gray-900 py-3 px-4 pr-8 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                  <option>Incident Report Engine</option>
                  <option>Search Warrant Engine</option>
                  <option>Arrest Warrant Engine</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                  <ChevronDown className="h-5 w-5" />
                </div>
              </div>
            </div>

            <div className="mt-6 border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:bg-gray-50 transition-colors cursor-pointer group">
              <UploadCloud className="mx-auto h-12 w-12 text-gray-400 group-hover:text-blue-500 transition-colors" />
              <div className="mt-4 flex text-sm justify-center leading-6 text-gray-600">
                <span className="relative rounded-md bg-transparent font-semibold text-gray-900 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 hover:text-blue-500">
                  Click to upload or drag and drop
                </span>
              </div>
              <p className="text-xs leading-5 text-gray-500 mt-1">PDF, Word, or Text files (Max 50MB per file)</p>
            </div>
          </div>

          {/* Recent Training Files */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Recent Training Files</h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50/50">
                  <tr>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">File</th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Repository</th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Size</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {recentFiles.map((file) => (
                    <tr key={file.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-5 whitespace-nowrap">
                        <div className="flex items-center">
                          <FileText className="h-6 w-6 text-gray-400 mr-4 flex-shrink-0" />
                          <div>
                            <div className="text-sm font-semibold text-gray-900">{file.name}</div>
                            <div className="text-sm text-gray-500">{file.date}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-500">
                        {file.repo}
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-500">
                        {file.size}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* Right Column: Data Volumetrics */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center">
          <div className="w-full flex items-center mb-8 gap-3">
             <Database className="w-6 h-6 text-gray-700" />
             <h2 className="text-xl font-bold text-gray-900">Data Volumetrics</h2>
          </div>

          <div className="flex-1 flex flex-col justify-center items-center py-12 w-full">
            <div className="text-center mb-12">
              <div className="flex items-baseline justify-center">
                <span className="text-6xl font-bold text-gray-900 tracking-tight">4.2</span>
                <span className="text-3xl font-bold text-gray-500 ml-1">TB</span>
              </div>
              <p className="text-sm text-gray-500 mt-2">of 10TB limit used</p>
            </div>

            <div className="w-full space-y-6">
              <div>
                <div className="flex justify-between text-sm font-medium mb-2">
                  <span className="text-gray-700">Incident Reports</span>
                  <span className="text-gray-900">2.1 TB</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className="bg-[#111827] h-2 rounded-full" style={{ width: '50%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm font-medium mb-2">
                  <span className="text-gray-700">Search Warrants</span>
                  <span className="text-gray-900">1.5 TB</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '35%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm font-medium mb-2">
                  <span className="text-gray-700">Arrest Warrants</span>
                  <span className="text-gray-900">0.6 TB</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className="bg-amber-500 h-2 rounded-full" style={{ width: '15%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DatasetManagement;
