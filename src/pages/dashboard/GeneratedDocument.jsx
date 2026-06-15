import { FileText, RefreshCw, Copy, Download, Save } from 'lucide-react';

export default function GeneratedDocument() {
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="mt-1 text-gray-500">
            <FileText size={28} strokeWidth={1.5} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 font-serif">Generated Document</h1>
            <p className="text-gray-500 mt-1">Unsaved Draft • Generated Jun 8, 2026 12:24 PM</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            <RefreshCw size={16} className="mr-2" />
            Regenerate
          </button>
          <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            <Copy size={16} className="mr-2" />
            Copy
          </button>
          <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            <Download size={16} className="mr-2" />
            PDF
          </button>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm">
            <Save size={16} className="mr-2" />
            Save to History
          </button>
        </div>
      </div>

      {/* Workspace Editor */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden flex flex-col h-[600px]">
        {/* Editor Toolbar */}
        <div className="bg-gray-50/80 px-6 py-3 border-b border-gray-200 flex items-center justify-between">
          <span className="text-sm font-semibold text-gray-600">Rich Text Editor</span>
          <span className="text-xs text-gray-500">Auto-saving disabled</span>
        </div>

        {/* Editor Content */}
        <div className="flex-1 p-10 bg-gray-50/30 overflow-y-auto">
          <div className="bg-white border border-gray-200 shadow-sm rounded max-w-4xl mx-auto min-h-full p-12">
            <p className="text-gray-800 text-lg leading-relaxed font-serif">
              On October 24th, 2023, at approximately 14:30 hours, I, Officer Smith, responded to a reported robbery at 123 Main St. Upon arrival, I made contact with the victim...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
