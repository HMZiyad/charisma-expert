import { useState } from 'react';
import { FileText, Video, LayoutTemplate, Plus, Edit, Trash2, X, UploadCloud } from 'lucide-react';

const blogArticles = [
  { id: 1, title: 'The Future of AI in Law Enforcement', category: 'AI Technology Integrations', status: 'Published', date: 'Oct 24, 2023' },
  { id: 2, title: 'Maintaining Chain of Custody with Digital Evidence', category: 'Law Enforcement Operations', status: 'Draft', date: 'Oct 20, 2023' },
];

const videoLibrary = [
  { id: 1, title: 'Platform Overview & Training', category: 'Training', duration: '15:24', status: 'Published' },
  { id: 2, title: 'Advanced Search Warrant Generation', category: 'Tutorials', duration: '08:45', status: 'Published' },
];

const ContentManagement = () => {
  const [activeTab, setActiveTab] = useState('blog');
  const [isArticleDialogOpen, setIsArticleDialogOpen] = useState(false);
  const [isVideoDialogOpen, setIsVideoDialogOpen] = useState(false);

  return (
    <div className="animate-in fade-in duration-500 pb-10">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Content Management System</h1>
        
        {activeTab === 'blog' && (
          <button 
            onClick={() => setIsArticleDialogOpen(true)}
            className="w-full sm:w-auto flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 shadow-md hover:shadow-lg transition-all active:scale-[0.98]"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create New Article
          </button>
        )}
        {(activeTab === 'video' || activeTab === 'homepage') && (
          <button 
            onClick={() => setIsVideoDialogOpen(true)}
            className="w-full sm:w-auto flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 shadow-md hover:shadow-lg transition-all active:scale-[0.98]"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create New Video
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-8 space-x-8 overflow-x-auto whitespace-nowrap hide-scrollbar pb-1">
        <button
          onClick={() => setActiveTab('blog')}
          className={`flex items-center pb-3 text-sm font-medium transition-colors border-b-2 ${
            activeTab === 'blog' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          <FileText className="w-5 h-5 mr-2 shrink-0" />
          Blog Manager
        </button>
        <button
          onClick={() => setActiveTab('video')}
          className={`flex items-center pb-3 text-sm font-medium transition-colors border-b-2 ${
            activeTab === 'video' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          <Video className="w-5 h-5 mr-2 shrink-0" />
          Video Library
        </button>
        <button
          onClick={() => setActiveTab('homepage')}
          className={`flex items-center pb-3 text-sm font-medium transition-colors border-b-2 ${
            activeTab === 'homepage' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          <LayoutTemplate className="w-5 h-5 mr-2 shrink-0" />
          Homepage Customizer
        </button>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden min-h-[400px]">
        {activeTab === 'blog' && (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50/50">
                <tr>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Article Title</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {blogArticles.map((article) => (
                  <tr key={article.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-5 whitespace-nowrap text-sm font-semibold text-gray-900">{article.title}</td>
                    <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-500">{article.category}</td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <span className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-md ${
                        article.status === 'Published' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {article.status}
                      </span>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-500">{article.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'video' && (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50/50">
                <tr>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Video Title</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Duration</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {videoLibrary.map((video) => (
                  <tr key={video.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-5 whitespace-nowrap text-sm font-semibold text-gray-900">{video.title}</td>
                    <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-500">{video.category}</td>
                    <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-500">{video.duration}</td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <span className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-md ${
                        video.status === 'Published' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {video.status}
                      </span>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-3">
                         <button className="text-gray-400 hover:text-blue-600 transition-colors">
                            <Edit className="w-5 h-5" />
                         </button>
                         <button className="text-gray-400 hover:text-red-600 transition-colors">
                            <Trash2 className="w-5 h-5" />
                         </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'homepage' && (
          <div className="p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Hero Section Copy</h2>
            
            <div className="space-y-6 max-w-4xl">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Headline</label>
                <input 
                  type="text" 
                  defaultValue="Secure, AI-Powered Law Enforcement Documentation"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subheadline</label>
                <textarea 
                  rows={4}
                  defaultValue="Streamline your agency's reporting workflow with enterprise-grade AI designed specifically for modern policing."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 resize-none"
                />
              </div>

              <div className="pt-6 border-t border-gray-100">
                <button className="px-6 py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 shadow-sm transition-colors">
                  Save Homepage Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Article Dialog */}
      {isArticleDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200 shrink-0">
              <h2 className="text-xl font-bold text-gray-900">Create New Article</h2>
              <button 
                onClick={() => setIsArticleDialogOpen(false)}
                className="text-gray-400 hover:text-gray-500 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Article Title</label>
                <input 
                  type="text" 
                  placeholder="Enter Article Title..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-gray-50">
                    <option>Enforcement Operations</option>
                    <option>AI Technology Integrations</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-gray-50">
                    <option>Drafts</option>
                    <option>Published</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Excerpt / Summary</label>
                <textarea 
                  rows={3}
                  placeholder="Brief Summary For The Blog Listing Page..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Article Content</label>
                <textarea 
                  rows={8}
                  placeholder="Write Your Article Content Here..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 resize-none font-mono text-sm"
                />
              </div>
            </div>

            <div className="px-6 py-4 border-t border-gray-200 shrink-0 flex justify-end gap-3 bg-gray-50/50 rounded-b-xl">
              <button 
                onClick={() => setIsArticleDialogOpen(false)}
                className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-white shadow-sm transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => setIsArticleDialogOpen(false)}
                className="px-5 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 shadow-sm transition-colors"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Video Dialog */}
      {isVideoDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200 shrink-0">
              <h2 className="text-xl font-bold text-gray-900">Create New Video</h2>
              <button 
                onClick={() => setIsVideoDialogOpen(false)}
                className="text-gray-400 hover:text-gray-500 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Video Title</label>
                <input 
                  type="text" 
                  placeholder="Enter video title..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-gray-50">
                    <option>Training</option>
                    <option>Tutorials</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-gray-50">
                    <option>Draft</option>
                    <option>Published</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Video File</label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:bg-gray-50 transition-colors cursor-pointer group">
                  <UploadCloud className="mx-auto h-10 w-10 text-gray-400 group-hover:text-blue-500 transition-colors mb-3" />
                  <p className="text-sm font-semibold text-gray-900">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-500 mt-1">MP4, MOV or WebM (max 2GB)</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                <input 
                  type="text" 
                  placeholder="e.g. 15:24"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea 
                  rows={4}
                  placeholder="Video description..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 resize-none"
                />
              </div>
            </div>

            <div className="px-6 py-4 border-t border-gray-200 shrink-0 flex justify-end gap-3 bg-gray-50/50 rounded-b-xl">
              <button 
                onClick={() => setIsVideoDialogOpen(false)}
                className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-white shadow-sm transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => setIsVideoDialogOpen(false)}
                className="px-5 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 shadow-sm transition-colors"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentManagement;
