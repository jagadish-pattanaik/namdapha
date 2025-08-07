import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import Footer from '../components/Footer';
import { FiDownload, FiBook, FiVideo, FiLink, FiSearch } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';

interface Resource {
  id: number;
  title: string;
  description: string;
  type: 'document' | 'video' | 'link' | 'book';
  url: string;
  dateAdded: string;
  category: string;
  isInternalLink?: boolean;
  internalPath?: string;
}

const ResourceHub: React.FC = () => {
  const navigate = useNavigate();
  
  // Sample resource data - in a real app, this would come from an API
  const allResources: Resource[] = [
    {
      id: 1,
      title: "Academic Calendar 2025-26",
      description: "Complete academic calendar with important dates, holidays, and exam schedules.",
      type: "document",
      url: "#",
      dateAdded: "July 15, 2025",
      category: "Academic"
    },
    // Link tree resources - now with internal navigation
    {
      id: 7,
      title: "Important Links",
      description: "Find each and every link at one place",
      type: "link",
      url: "#",
      dateAdded: "June 10, 2025",
      category: "Link tree",
      isInternalLink: true,
      internalPath: "/imp-links" // This will navigate to your ImpLinks page
    },
    {
      id: 2,
      title: "Introduction to Campus Facilities",
      description: "Video tour of all major facilities available on campus for students.",
      type: "video",
      url: "#",
      dateAdded: "June 28, 2025",
      category: "Campus Life"
    },
    {
      id: 3,
      title: "Student Handbook",
      description: "Comprehensive guide covering rules, regulations, and student resources.",
      type: "book",
      url: "#",
      dateAdded: "July 1, 2025",
      category: "Academic"
    },
    {
      id: 4,
      title: "Career Center Website",
      description: "Access the career center portal for job postings and internship opportunities.",
      type: "link",
      url: "#",
      dateAdded: "July 10, 2025",
      category: "Career"
    },
    {
      id: 5,
      title: "Library Resources Guide",
      description: "How to access online journals, books, and research materials.",
      type: "document",
      url: "#",
      dateAdded: "June 15, 2025",
      category: "Academic"
    },
    {
      id: 6,
      title: "Student Wellness Resources",
      description: "Information on health services, counseling, and wellness programs.",
      type: "book",
      url: "#",
      dateAdded: "July 5, 2025",
      category: "Health"
    },
    
  ];

  // State for filtering and searching
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredResources, setFilteredResources] = useState<Resource[]>(allResources);

  // Get unique categories for filtering
  const categories = Array.from(new Set(allResources.map(resource => resource.category)));

  // Function to handle category filter
  const handleCategoryFilter = (category: string | null) => {
    setActiveCategory(category);
  };

  // Handle search input changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Function to handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is already applied via useEffect
  };

  // Apply filters when category or search query changes
  useEffect(() => {
    let result = allResources;
    
    // Apply category filter
    if (activeCategory) {
      result = result.filter(resource => resource.category === activeCategory);
    }
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        resource => 
          resource.title.toLowerCase().includes(query) || 
          resource.description.toLowerCase().includes(query)
      );
    }
    
    setFilteredResources(result);
  }, [activeCategory, searchQuery]);

  // Function to render icon based on resource type
  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'document':
        return <FiDownload className="text-white text-xl" />;
      case 'video':
        return <FiVideo className="text-white text-xl" />;
      case 'book':
        return <FiBook className="text-white text-xl" />;
      case 'link':
        return <FiLink className="text-white text-xl" />;
      default:
        return <FiLink className="text-white text-xl" />;
    }
  };

  return (
    <div>
      <Layout>
      <div className="w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Resource Hub</h1>
          <p className="text-lg text-white/80">Access important resources for students and faculty</p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          <button 
            className={`px-4 py-2 rounded-full transition-colors border ${
              activeCategory === null 
                ? "bg-purple-600 text-white shadow-md shadow-purple-600/30 border-purple-500/50" 
                : "bg-black/30 backdrop-blur-xl text-white hover:bg-black/50 border-white/10 shadow-md shadow-black/20"
            }`}
            onClick={() => handleCategoryFilter(null)}
          >
            All Resources
          </button>
          {categories.map(category => (
            <button 
              key={category}
              className={`px-4 py-2 rounded-full transition-colors border ${
                activeCategory === category 
                  ? "bg-purple-600 text-white shadow-md shadow-purple-600/30 border-purple-500/50" 
                  : "bg-black/30 backdrop-blur-xl text-white hover:bg-black/50 border-white/10 shadow-md shadow-black/20"
              }`}
              onClick={() => handleCategoryFilter(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Search Box */}
        <div className="mb-10">
          <div className="max-w-lg mx-auto">
            <form onSubmit={handleSearch} className="relative">
              <input 
                type="text" 
                placeholder="Search resources..." 
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full px-6 py-3 bg-black/40 backdrop-blur-xl border border-white/10 rounded-full text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-md shadow-black/20"
              />
              <button 
                type="submit"
                className="absolute right-3 top-2.5 px-3 py-1 bg-purple-600 text-white rounded-full hover:bg-purple-500 transition-colors shadow-sm shadow-purple-600/30"
              >
                <FiSearch className="inline mr-1" />
                Search
              </button>
            </form>
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.length > 0 ? (
            filteredResources.map(resource => (
              <div 
                key={resource.id} 
                className="bg-black/40 backdrop-blur-xl rounded-2xl overflow-hidden shadow-xl shadow-black/40 border border-white/10 transition-all duration-300 hover:border-purple-500/30 hover:shadow-purple-500/20 group"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-white">{resource.title}</h3>
                    <div className="p-2 bg-purple-600/50 rounded-full shadow-md shadow-purple-600/20">
                      {getResourceIcon(resource.type)}
                    </div>
                  </div>
                  
                  <p className="text-white/80 mb-4 text-sm">
                    {resource.description}
                  </p>
                  
                  <div className="flex justify-between items-center mt-6">
                    <span className="text-xs text-white/60">Added: {resource.dateAdded}</span>
                    <span className="bg-purple-600/30 px-3 py-1 rounded-full text-xs text-white shadow-sm shadow-purple-600/20">
                      {resource.category}
                    </span>
                  </div>
                  
                  {resource.isInternalLink ? (
                    <button 
                      onClick={() => navigate(resource.internalPath || "/")}
                      className="mt-4 w-full block text-center px-4 py-2 bg-purple-600/70 text-white rounded-full transition-colors shadow-md shadow-purple-600/30 border border-purple-500/50 hover:bg-purple-500 group-hover:shadow-lg group-hover:shadow-purple-500/30"
                    >
                      <span className="inline-block px-2">Access Resource</span>
                    </button>
                  ) : (
                    <a 
                      href={resource.url}
                      className="mt-4 w-full block text-center px-4 py-2 bg-purple-600/70 text-white rounded-full transition-colors shadow-md shadow-purple-600/30 border border-purple-500/50 hover:bg-purple-500 group-hover:shadow-lg group-hover:shadow-purple-500/30"
                    >
                      <span className="inline-block px-2">Access Resource</span>
                    </a>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-white text-xl">No resources found matching your criteria.</p>
              <button 
                onClick={() => {
                  setActiveCategory(null);
                  setSearchQuery('');
                }}
                className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {/* Add Resource Button (for admin functionality) */}
        <div className="mt-12 text-center">
          <button className="px-8 py-3 bg-purple-600 text-white rounded-full hover:bg-purple-500 transition-colors shadow-xl shadow-purple-600/30 border border-purple-500/50">
            Request New Resource
          </button>
        </div>
      </div>
    </Layout>
    
    {/* Footer */}
    <Footer />
    </div>
  );
};

export default ResourceHub;