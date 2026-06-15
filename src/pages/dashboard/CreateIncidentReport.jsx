import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Clock, Trash2, ArrowRight } from 'lucide-react';

export default function CreateIncidentReport() {
  const navigate = useNavigate();
  const [entities, setEntities] = useState([
    { id: 1, type: 'Suspect', field1: '', field2: '' },
    { id: 2, type: 'Evidence', field1: '', field2: '' }
  ]);
  const [narrativeStyle, setNarrativeStyle] = useState('First-Person');

  const addEntity = (type) => {
    setEntities([...entities, { id: Date.now(), type, field1: '', field2: '' }]);
  };

  const removeEntity = (id) => {
    setEntities(entities.filter(e => e.id !== id));
  };

  const updateEntity = (id, field, value) => {
    setEntities(entities.map(e => e.id === id ? { ...e, [field]: value } : e));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, we would save the draft or submit for generation here.
    // For now, we mock the transition to the generated document workspace.
    navigate('/dashboard/document/draft-123');
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
    return ['Full Name', 'DOB / Address / Contact'];
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

      <form onSubmit={handleSubmit} className="space-y-8 pb-20">
        {/* Core Case Details */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          <div className="bg-gray-50/50 px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 font-serif">Core Case Details</h2>
          </div>
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Case / Incident Number *</label>
                <input type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors" placeholder="e.g. 2023-0842" required />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Incident Type *</label>
                <input type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors" placeholder="e.g. Burglary, Assault" required />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Date *</label>
                <input type="date" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors text-gray-500" required />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Time *</label>
                <input type="time" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors text-gray-500" required />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Location *</label>
              <input type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors" placeholder="123 Main St, City, State" required />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Raw Facts / Field Notes (Who, What, Why, How) *</label>
              <textarea 
                rows="5" 
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
                <div key={entity.id} className="flex items-center gap-4 p-4 bg-gray-50/50 border border-gray-100 rounded-xl">
                  <div className={`px-4 py-1.5 rounded-full text-xs font-bold w-24 text-center ${getEntityStyles(entity.type)}`}>
                    {entity.type}
                  </div>
                  <input 
                    type="text" 
                    value={entity.field1}
                    onChange={(e) => updateEntity(entity.id, 'field1', e.target.value)}
                    className="flex-1 px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm" 
                    placeholder={placeholders[0]} 
                  />
                  <input 
                    type="text" 
                    value={entity.field2}
                    onChange={(e) => updateEntity(entity.id, 'field2', e.target.value)}
                    className="flex-1 px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm" 
                    placeholder={placeholders[1]} 
                  />
                  <button type="button" onClick={() => removeEntity(entity.id)} className="p-2 text-gray-400 hover:text-red-500 transition-colors">
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
            <label className={`flex items-start p-4 border rounded-xl cursor-pointer transition-colors ${narrativeStyle === 'First-Person' ? 'border-blue-500 bg-blue-50/30' : 'border-gray-200 hover:bg-gray-50'}`}>
              <input 
                type="radio" 
                name="narrativeStyle" 
                value="First-Person" 
                checked={narrativeStyle === 'First-Person'} 
                onChange={() => setNarrativeStyle('First-Person')}
                className="mt-1 mr-4 w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500" 
              />
              <div>
                <div className="font-bold text-gray-900 mb-1">First-Person</div>
                <div className="text-sm text-gray-500">"I responded to the scene..."</div>
              </div>
            </label>

            <label className={`flex items-start p-4 border rounded-xl cursor-pointer transition-colors ${narrativeStyle === 'Third-Person' ? 'border-blue-500 bg-blue-50/30' : 'border-gray-200 hover:bg-gray-50'}`}>
              <input 
                type="radio" 
                name="narrativeStyle" 
                value="Third-Person" 
                checked={narrativeStyle === 'Third-Person'} 
                onChange={() => setNarrativeStyle('Third-Person')}
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
          <button type="submit" className="flex items-center bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors shadow-lg shadow-blue-500/30">
            One-Click AI Generation
            <ArrowRight className="ml-2" size={18} />
          </button>
        </div>
      </form>
    </div>
  );
}
