import { useState } from 'react'
import { Search, ChevronRight } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const categories = ['All', 'Law Enforcement Operations', 'AI Technology Integrations', 'Legal Updates & Policy']

const articles = [
  {
    id: 1,
    category: 'AI Technology Integrations',
    date: 'October 15, 2023',
    title: 'The Future of AI in Law Enforcement Documentation',
    excerpt:
      'How generative AI is reducing administrative burden and allowing officers to spend more time in the community.',
    author: 'Chief Robert Hayes (Ret.)',
    authorImg: null,
    image: '/assets/ai_law_enforcement_documentation_1781562252124.png',
  },
  {
    id: 2,
    category: 'Legal Updates & Policy',
    date: 'November 2, 2023',
    title: 'Navigating Search Warrant Policy Adjustments in 2024',
    excerpt:
      'A comprehensive review of recent Supreme Court decisions impacting digital search warrants and probable cause documentation.',
    author: 'Sarah Jenkins, Esq.',
    authorImg: null,
    image: '/assets/search_warrant_policy_1781562263887.png',
  },
  {
    id: 3,
    category: 'Law Enforcement Operations',
    date: 'November 20, 2023',
    title: 'Optimizing Patrol Operations with Rapid Reporting',
    excerpt:
      'Case study: How the Metro Police Department increased patrol visibility by 22% using AAAT reporting tools.',
    author: 'Lt. Marcus Thorne',
    authorImg: null,
    image: '/assets/patrol_operations_1781562276115.png',
  },
]

const categoryColors = {
  'AI Technology Integrations': 'bg-gray-900 text-white',
  'Legal Updates & Policy': 'bg-gray-800 text-white',
  'Law Enforcement Operations': 'bg-gray-700 text-white',
}

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [search, setSearch] = useState('')

  const filtered = articles.filter((a) => {
    const matchCat = activeCategory === 'All' || a.category === activeCategory
    const matchSearch =
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.excerpt.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Header */}
      <section className="pt-16 pb-8 bg-white text-center px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Resources & Insights</h1>
        <p className="text-gray-500 max-w-xl mx-auto">
          Expert perspectives on law enforcement operations, AI technology, and legal policy.
        </p>
      </section>

      {/* Filters */}
      <section className="bg-white pb-8">
        <div className="w-full px-6 lg:px-10 xl:px-16">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            {/* Category pills */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeCategory === cat
                      ? 'bg-gray-900 text-white'
                      : 'border border-gray-300 text-gray-700 hover:border-gray-500'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl w-56 focus:outline-none focus:ring-2 focus:ring-navy-400"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-8 bg-white flex-1">
        <div className="w-full px-6 lg:px-10 xl:px-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filtered.map((article) => (
              <div key={article.id} className="rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                {/* Image */}
                <div className="h-48 relative group-hover:opacity-90 transition-opacity overflow-hidden">
                  <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
                  <span className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full ${categoryColors[article.category] || 'bg-gray-800 text-white'} shadow-md`}>
                    {article.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5">
                  <p className="text-xs text-gray-400 mb-2">{article.date}</p>
                  <h3 className="font-bold text-gray-900 text-lg mb-2 leading-snug">{article.title}</h3>
                  <p className="text-sm text-gray-500 mb-4 leading-relaxed">{article.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-500">
                        {article.author.charAt(0)}
                      </div>
                      <span className="text-sm text-gray-600">{article.author}</span>
                    </div>
                    <button className="text-gray-400 hover:text-navy-800 transition-colors">
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="text-center text-gray-400 py-16">No articles found.</p>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
