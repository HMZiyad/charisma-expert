import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Clock, Trash2, ArrowRight, Loader2 } from 'lucide-react';
import { generateDocument } from '../../api/documents';

export default function CreateIncidentReport() {
  const navigate = useNavigate();
  
  // Form State
  const [caseNumber, setCaseNumber] = useState('');
  const [incidentType, setIncidentType] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [rawNotes, setRawNotes] = useState('');
  const [narrativeStyle, setNarrativeStyle] = useState('third_person'); // match API enum
  
  const [entities, setEntities] = useState([
    { id: 1, type: 'Suspect', field1: '', field2: '' },
    { id: 2, type: 'Evidence', field1: '', field2: '' }
  ]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const addEntity = (type) => {
    setEntities([...entities, { id: Date.now(), type, field1: '', field2: '' }]);
  };

  const removeEntity = (id) => {
    setEntities(entities.filter(e => e.id !== id));
  };

  const updateEntity = (id, field, value) => {
    setEntities(entities.map(e => e.id === id ? { ...e, [field]: value } : e));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Transform form state into API shape
    const involved_parties = [];
    const property_items = [];

    entities.forEach(ent => {
      if (!ent.field1 && !ent.field2) return;
      if (ent.type === 'Evidence') {
        property_items.push({
          type: 'other',
          value: null,
          status: 'unknown',
          description: `${ent.field1} - ${ent.field2}`.trim()
        });
      } else {
        const roleMap = {
          'Suspect': 'alleged',
          'Victim': 'victim',
          'Witness': 'witness'
        };
        involved_parties.push({
          role: roleMap[ent.type] || 'other',
          full_name: ent.field1,
          phone: ent.field2
        });
      }
    });

    const payload = {
      doc_type: 'incident_report',
      narrative_style: narrativeStyle,
      form_data: {
        case_number: caseNumber || null,
        incident: {
          categories: [incidentType],
          urgency: 'normal',
          date,
          time,
          location
        },
        involved_parties,
        property_items,
        notifications: { weapon_involved: false, alcohol_drugs: false, is_hazing: false },
        facts: {
          what: `Incident: ${incidentType}`,
          where: location,
          when: `${date} ${time}`,
          officer_actions: rawNotes
        },
        attachments: []
      }
    };

    try {
      const { data } = await generateDocument(payload);
      // Navigate to the generated document view
      navigate(`/dashboard/document/${data.id}`);
    } catch (err) {
      const msg = err?.response?.data?.error?.detail || err?.response?.data?.detail || 'Failed to generate document. Please try again.';
      if (err?.response?.status === 403) {
         setError('Your subscription plan does not allow generating this document type, or you have exceeded your limit.');
      } else if (err?.response?.status === 503) {
         setError('AI Engine is currently unavailable or loading. Please wait a moment and try again.');
      } else {
         setError(msg);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setLoading(false);
    }
  };

  const getEntityStyles = (type) => {
    switch (type) {
      case 'Suspect': return 'bg-red-50 text-red-700';
      case 'Victim': return 'bg-purple-50 text-purple-700';
      case 'Witness': return 'bg-blue-50 text-blue-700';
      case 'Evidence': return 'bg-yellow-50 text-yellow-700';
      default: return 'bg-gray-50 text-gray-700';
    }
  };

  const getEntityPlaceholders = (type) => {
    if (type === 'Evidence') return ['Item Description', 'Location found / Serial #'];
    return ['Full Name', 'DOB / Contact Details'];
  };

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="bg-[#111625] w-12 h-12 rounded-xl flex items-center justify-center shadow-md">
           <Shield className="text-white absolute" size={24} />
           <Clock className="text-[#111625] relative" size={12} fill="white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 font-serif">AI Incident Report Generator</h1>
          <p className="text-gray-500 mt-1">Enter the raw facts and field notes below. The AI will structure them into a professional incident narrative.</p>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm">
          {error}
        </div>
      )}

      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-white/80 z-50 flex flex-col items-center justify-center backdrop-blur-sm">
          <Loader2 className="w-16 h-16 text-blue-600 animate-spin mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Generating Document...</h2>
          <p className="text-gray-500">The AI is structuring your narrative and performing leak checks. This may take up to a minute.</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8 pb-20">
        {/* Core Case Details */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          <div className="bg-gray-50/50 px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 font-serif">Core Case Details</h2>
          </div>
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Case / Incident Number</label>
                <input 
                  type="text" 
                  value={caseNumber}
                  onChange={(e) => setCaseNumber(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors" 
                  placeholder="e.g. 2023-0842 (Optional)" 
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Incident Type *</label>
                <input 
                  type="text" 
                  value={incidentType}
                  onChange={(e) => setIncidentType(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors" 
                  placeholder="e.g. Burglary, Assault" 
                  required 
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Date *</label>
                <input 
                  type="date" 
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors text-gray-700" 
                  required 
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Time *</label>
                <input 
                  type="time" 
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors text-gray-700" 
                  required 
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Location *</label>
              <input 
                type="text" 
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors" 
                placeholder="123 Main St, City, State" 
                required 
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Raw Facts / Field Notes (Who, What, Why, How) *</label>
              <textarea 
                rows="5" 
                value={rawNotes}
                onChange={(e) => setRawNotes(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors resize-none" 
                placeholder="Enter raw notes here. The AI will structure them into a formal narrative..."
                required
              ></textarea>
            </div>
          </div>
        </div>

        {/* Entity Profiles */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          <div className="bg-gray-50/50 px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900 font-serif">Entity Profiles</h2>
            <div className="flex gap-2">
              <button type="button" onClick={() => addEntity('Suspect')} className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">+ Suspect</button>
              <button type="button" onClick={() => addEntity('Victim')} className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">+ Victim</button>
              <button type="button" onClick={() => addEntity('Witness')} className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">+ Witness</button>
              <button type="button" onClick={() => addEntity('Evidence')} className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">+ Evidence</button>
            </div>
          </div>
          <div className="p-6 space-y-4">
            {entities.map((entity) => {
              const placeholders = getEntityPlaceholders(entity.type);
              return (
                <div key={entity.id} className="flex flex-col md:flex-row items-center gap-4 p-4 bg-gray-50/50 border border-gray-100 rounded-xl">
                  <div className={`px-4 py-1.5 rounded-full text-xs font-bold w-full md:w-24 text-center ${getEntityStyles(entity.type)}`}>
                    {entity.type}
                  </div>
                  <input 
                    type="text" 
                    value={entity.field1}
                    onChange={(e) => updateEntity(entity.id, 'field1', e.target.value)}
                    className="flex-1 w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm" 
                    placeholder={placeholders[0]} 
                  />
                  <input 
                    type="text" 
                    value={entity.field2}
                    onChange={(e) => updateEntity(entity.id, 'field2', e.target.value)}
                    className="flex-1 w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm" 
                    placeholder={placeholders[1]} 
                  />
                  <button type="button" onClick={() => removeEntity(entity.id)} className="p-2 text-gray-400 hover:text-red-500 transition-colors md:ml-auto">
                    <Trash2 size={20} />
                  </button>
                </div>
              );
            })}
            {entities.length === 0 && (
              <div className="text-center py-6 text-gray-400 text-sm">
                No entities added yet. Use the buttons above to add suspects, victims, witnesses, or evidence.
              </div>
            )}
          </div>
        </div>

        {/* Narrative Style */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          <div className="bg-gray-50/50 px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 font-serif">Narrative Style</h2>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <label className={`flex items-start p-4 border rounded-xl cursor-pointer transition-colors ${narrativeStyle === 'first_person' ? 'border-blue-500 bg-blue-50/30' : 'border-gray-200 hover:bg-gray-50'}`}>
              <input 
                type="radio" 
                name="narrativeStyle" 
                value="first_person" 
                checked={narrativeStyle === 'first_person'} 
                onChange={() => setNarrativeStyle('first_person')}
                className="mt-1 mr-4 w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500" 
              />
              <div>
                <div className="font-bold text-gray-900 mb-1">First-Person</div>
                <div className="text-sm text-gray-500">"I responded to the scene..."</div>
              </div>
            </label>

            <label className={`flex items-start p-4 border rounded-xl cursor-pointer transition-colors ${narrativeStyle === 'third_person' ? 'border-blue-500 bg-blue-50/30' : 'border-gray-200 hover:bg-gray-50'}`}>
              <input 
                type="radio" 
                name="narrativeStyle" 
                value="third_person" 
                checked={narrativeStyle === 'third_person'} 
                onChange={() => setNarrativeStyle('third_person')}
                className="mt-1 mr-4 w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500" 
              />
              <div>
                <div className="font-bold text-gray-900 mb-1">Third-Person</div>
                <div className="text-sm text-gray-500">"Officer Smith responded to..."</div>
              </div>
            </label>
          </div>
        </div>

        <div className="flex justify-end">
          <button 
            type="submit" 
            disabled={loading}
            className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors shadow-lg shadow-blue-500/30 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            One-Click AI Generation
            <ArrowRight className="ml-2" size={18} />
          </button>
        </div>
      </form>
    </div>
  );
}
