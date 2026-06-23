import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FileText, RefreshCw, Download, AlertTriangle, Loader2 } from 'lucide-react';
import { getDocument, regenerateDocument, exportDocument } from '../../api/documents';

export default function GeneratedDocument() {
  const { id } = useParams();
  const [doc, setDoc] = useState(null);
  const [editedText, setEditedText] = useState('');
  const [loading, setLoading] = useState(true);
  const [exportingPdf, setExportingPdf] = useState(false);
  const [exportingDocx, setExportingDocx] = useState(false);
  const [regenerating, setRegenerating] = useState(false);
  const [error, setError] = useState('');

  const fetchDoc = async () => {
    try {
      const { data } = await getDocument(id);
      setDoc(data);
      setEditedText(data.ai_narrative || '');
    } catch (err) {
      setError('Could not load document.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoc();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleExport = async (format) => {
    if (format === 'pdf') setExportingPdf(true);
    else setExportingDocx(true);
    setError('');

    try {
      const response = await exportDocument(id, {
        format,
        edited_text: editedText !== doc.ai_narrative ? editedText : '',
      });

      // Trigger browser download of the binary blob
      const blob = new Blob([response.data]);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${doc.case_number || 'document'}.${format}`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      if (err?.response?.status === 403) {
        setError(`Your subscription plan does not support ${format.toUpperCase()} export.`);
      } else {
        setError(`Failed to export ${format.toUpperCase()}.`);
      }
    } finally {
      setExportingPdf(false);
      setExportingDocx(false);
    }
  };

  const handleRegenerate = async () => {
    setRegenerating(true);
    setError('');
    try {
      const { data } = await regenerateDocument(id);
      setDoc(data);
      setEditedText(data.ai_narrative || '');
    } catch (err) {
      if (err?.response?.status === 403) {
        setError('Your subscription plan does not support regeneration.');
      } else {
        setError('Failed to regenerate document.');
      }
    } finally {
      setRegenerating(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 max-w-6xl mx-auto flex flex-col items-center justify-center min-h-[500px]">
        <Loader2 className="w-12 h-12 text-gray-400 animate-spin mb-4" />
        <p className="text-gray-500 font-medium">Loading document...</p>
      </div>
    );
  }

  if (!doc) {
    return (
      <div className="p-8 max-w-6xl mx-auto">
        <div className="bg-red-50 p-6 rounded-xl border border-red-200 text-red-700">
          {error || 'Document not found.'}
        </div>
      </div>
    );
  }

  const hasLeakFlags = doc.leak_flags && doc.leak_flags.length > 0;

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
            <p className="text-gray-500 mt-1 capitalize">
              {doc.doc_type.replace('_', ' ')} • {doc.case_number || 'No Case #'} • {new Date(doc.created_at).toLocaleString()}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button 
            onClick={handleRegenerate}
            disabled={regenerating}
            className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            <RefreshCw size={16} className={`mr-2 ${regenerating ? 'animate-spin' : ''}`} />
            Regenerate
          </button>
          <button 
            onClick={() => handleExport('docx')}
            disabled={exportingDocx}
            className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            {exportingDocx ? <Loader2 size={16} className="mr-2 animate-spin" /> : <Download size={16} className="mr-2" />}
            DOCX
          </button>
          <button 
            onClick={() => handleExport('pdf')}
            disabled={exportingPdf}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-70"
          >
            {exportingPdf ? <Loader2 size={16} className="mr-2 animate-spin" /> : <Download size={16} className="mr-2" />}
            Export PDF
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm font-medium">
          {error}
        </div>
      )}

      {/* RAG Leak Warning */}
      {hasLeakFlags && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
          <AlertTriangle className="text-amber-500 shrink-0 mt-0.5" size={20} />
          <div>
            <h4 className="font-bold text-amber-900 text-sm">Potential Hallucination Detected</h4>
            <p className="text-amber-700 text-sm mt-1">
              The AI included proper nouns or specific details that were not found in your provided notes. 
              Please review carefully.
            </p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {doc.leak_flags.map((flag, i) => (
                <li key={i} className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded font-mono font-bold">
                  {flag.value}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Workspace Editor */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden flex flex-col h-[600px]">
        {/* Editor Toolbar */}
        <div className="bg-gray-50/80 px-6 py-3 border-b border-gray-200 flex items-center justify-between">
          <span className="text-sm font-semibold text-gray-600">Document Editor</span>
          <span className="text-xs text-gray-500">Model: {doc.model_used || 'Unknown'} • Generation time: {(doc.generation_time_ms / 1000).toFixed(1)}s</span>
        </div>

        {/* Editor Content */}
        <div className="flex-1 bg-gray-50/30 overflow-y-auto">
          <textarea
            className="w-full h-full p-12 bg-transparent text-gray-800 text-lg leading-relaxed font-serif resize-none focus:outline-none"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
