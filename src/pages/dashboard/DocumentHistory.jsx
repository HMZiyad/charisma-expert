import { FileText, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function DocumentHistory() {
  const documents = [
    {
      id: 1,
      title: 'Incident Report - Downtown Robbery',
      type: 'Incident Report',
      identifier: 'CASE-2023-0842',
      date: 'Jun 7, 2026',
      time: '12:24 PM',
      status: 'Saved',
      link: '/dashboard/document/1'
    },
    {
      id: 2,
      title: 'Search Warrant - 404 Elm St',
      type: 'Search Warrant',
      identifier: 'WARR-2023-0192',
      date: 'Jun 5, 2026',
      time: '12:24 PM',
      status: 'Exported',
      link: '/dashboard/document/2'
    },
    {
      id: 3,
      title: 'Arrest Warrant - John Doe',
      type: 'Arrest Warrant',
      identifier: 'WARR-2023-0195',
      date: 'Jun 3, 2026',
      time: '12:24 PM',
      status: 'Draft',
      link: '/dashboard/document/3'
    },
    {
      id: 4,
      title: 'Incident Report - Vehicle Collision',
      type: 'Incident Report',
      identifier: 'CASE-2023-0850',
      date: 'Jun 1, 2026',
      time: '12:24 PM',
      status: 'Saved',
      link: '/dashboard/document/4'
    }
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Saved':
        return <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">Saved</span>;
      case 'Exported':
        return <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">Exported</span>;
      case 'Draft':
        return <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-bold rounded-full">Draft</span>;
      default:
        return null;
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 font-serif">Document History</h1>
        <p className="text-gray-500 mt-1 text-lg">View, search, and manage your previously generated documentation.</p>
      </div>

      {/* Main Card */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row gap-4 items-center justify-between bg-gray-50/30">
          <input 
            type="text" 
            placeholder="Search by case number or title..." 
            className="w-full md:max-w-md px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
          />
          <div className="relative w-full md:w-auto">
            <select className="w-full md:w-48 px-4 py-2.5 bg-gray-100 border border-transparent rounded-lg text-gray-700 appearance-none focus:outline-none focus:ring-2 focus:ring-gray-200 font-medium cursor-pointer">
              <option>All Types</option>
              <option>Incident Report</option>
              <option>Search Warrant</option>
              <option>Arrest Warrant</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            {/* Table Head */}
            <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-gray-100 text-sm font-semibold text-gray-500 bg-gray-50/50">
              <div className="col-span-4">Document</div>
              <div className="col-span-3">Case Identifier</div>
              <div className="col-span-2">Generation Date</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-1 flex justify-end text-gray-900 font-bold">Open</div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-gray-100">
              {documents.map((doc) => (
                <Link key={doc.id} to={doc.link} className="grid grid-cols-12 gap-4 px-6 py-5 items-center hover:bg-gray-50 transition-colors group cursor-pointer">
                  <div className="col-span-4 flex items-start gap-4">
                    <div className="mt-1 text-gray-400 shrink-0">
                      <FileText size={22} strokeWidth={1.5} />
                    </div>
                    <div>
                      <h4 className="text-[15px] font-semibold text-gray-900 mb-0.5 group-hover:text-blue-600 transition-colors">{doc.title}</h4>
                      <div className="text-[13px] text-gray-500">{doc.type}</div>
                    </div>
                  </div>
                  <div className="col-span-3 text-[14px] text-gray-700 font-medium truncate">
                    {doc.identifier}
                  </div>
                  <div className="col-span-2">
                    <div className="text-[14px] text-gray-900">{doc.date}</div>
                    <div className="text-[13px] text-gray-500">{doc.time}</div>
                  </div>
                  <div className="col-span-2">
                    {getStatusBadge(doc.status)}
                  </div>
                  <div className="col-span-1 flex justify-end text-gray-400 group-hover:text-blue-600 transition-colors">
                    <ChevronRight size={20} />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
