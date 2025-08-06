import React, { useState, useEffect, useRef } from 'react';
import { FiClock, FiMapPin, FiChevronRight, FiChevronLeft, FiChevronDown, FiChevronUp, FiCalendar } from 'react-icons/fi';
import Layout from '../components/Layout';

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  imageUrl: string;
  category: string;
}

const Events = () => {
  // Sample event data - in a real application, this would come from an API
  const [events] = useState<Event[]>([
    {
      id: 1,
      title: "Annual Cultural Festival",
      date: "August 15, 2025",
      time: "6:00 PM - 10:00 PM",
      location: "Main Auditorium",
      description: "Join us for a night of music, dance, and cultural performances celebrating diversity.",
      imageUrl: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&auto=format&fit=crop&q=60",
      category: "Cultural"
    },
    {
      id: 2,
      title: "Tech Symposium",
      date: "September 5, 2025",
      time: "10:00 AM - 4:00 PM",
      location: "Conference Center",
      description: "Explore the latest innovations in technology with industry experts and hands-on workshops.",
      imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=60",
      category: "Academic"
    },
    {
      id: 3,
      title: "Sports Tournament",
      date: "October 12, 2025",
      time: "9:00 AM - 6:00 PM",
      location: "Sports Complex",
      description: "Compete in various sports categories and show your athletic prowess.",
      imageUrl: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&auto=format&fit=crop&q=60",
      category: "Sports"
    },
    {
      id: 4,
      title: "Career Fair",
      date: "October 25, 2025",
      time: "11:00 AM - 5:00 PM",
      location: "Student Union",
      description: "Meet recruiters from top companies and explore career opportunities across various industries.",
      imageUrl: "https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?w=800&auto=format&fit=crop&q=60",
      category: "Career"
    }
  ]);

  // Past events data
  const pastEvents = [
    {
      id: 101,
      title: "Alumni Reunion",
      date: "June 12, 2025",
      location: "Main Campus",
      imageUrl: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800&auto=format&fit=crop&q=60",
      category: "Networking"
    },
    {
      id: 102,
      title: "Spring Music Festival",
      date: "April 25, 2025",
      location: "University Amphitheater",
      imageUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&auto=format&fit=crop&q=60",
      category: "Entertainment"
    },
    {
      id: 103,
      title: "Research Symposium",
      date: "March 18, 2025",
      location: "Science Building",
      imageUrl: "https://images.unsplash.com/photo-1503428593586-e225b39bddfe?w=800&auto=format&fit=crop&q=60",
      category: "Academic"
    },
    {
      id: 104,
      title: "Graduation Ceremony",
      date: "May 15, 2025",
      location: "University Stadium",
      imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format&fit=crop&q=60",
      category: "Ceremony"
    },
    {
      id: 105,
      title: "Career Workshop",
      date: "February 22, 2025",
      location: "Business School",
      imageUrl: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&auto=format&fit=crop&q=60",
      category: "Career"
    },
    {
      id: 106,
      title: "Winter Ball",
      date: "January 15, 2025",
      location: "Grand Hall",
      imageUrl: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=800&auto=format&fit=crop&q=60",
      category: "Social"
    },
  ];

  // State to track which event is currently displayed
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  // State to track view mode (single event or all events)
  const [viewAllEvents, setViewAllEvents] = useState(false);
  // State for transition animation
  const [isAnimating, setIsAnimating] = useState(false);
  // Interval timer ref
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Navigation functions
  const nextEvent = () => {
    if (isAnimating) return; // Prevent interaction during animation
    
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentEventIndex((prevIndex) => 
        prevIndex === events.length - 1 ? 0 : prevIndex + 1
      );
      
      // Reset animation state after a brief delay
      setTimeout(() => {
        setIsAnimating(false);
      }, 100);
    }, 300); // Match this with the CSS transition duration
  };
  
  const prevEvent = () => {
    if (isAnimating) return; // Prevent interaction during animation
    
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentEventIndex((prevIndex) => 
        prevIndex === 0 ? events.length - 1 : prevIndex - 1
      );
      
      // Reset animation state after a brief delay
      setTimeout(() => {
        setIsAnimating(false);
      }, 100);
    }, 300); // Match this with the CSS transition duration
  };

  // Toggle view between single event and all events
  const toggleViewAll = () => {
    setViewAllEvents(!viewAllEvents);
    
    // Stop auto-scroll when in all events view
    if (!viewAllEvents) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    } else {
      // Restart auto-scroll when returning to single event view
      startAutoScroll();
    }
  };

  // Auto-scroll function
  const startAutoScroll = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    
    timerRef.current = setInterval(() => {
      nextEvent();
    }, 6000); // Change event every 6 seconds
  };

  // Start auto-scroll on component mount and clean up on unmount
  useEffect(() => {
    startAutoScroll();
    
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Get the current event to display
  const currentEvent = events[currentEventIndex];

  return (
    <Layout>
      {/* Complete glassmorphism background wrapper for Upcoming Events */}
      <div className="relative mx-4 mb-12 rounded-3xl overflow-hidden">
        {/* Background glass effect */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-md border border-white/20 rounded-3xl shadow-xl shadow-black/30"></div>
        
        {/* Purple glow effects */}
        <div className="absolute -top-20 right-1/4 w-1/2 h-40 bg-purple-600/20 blur-3xl rounded-full"></div>
        <div className="absolute bottom-20 left-1/4 w-1/3 h-40 bg-purple-600/15 blur-3xl rounded-full"></div>
        
        {/* Content container with proper padding */}
        <div className="relative z-10 p-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">Upcoming Events</h1>
            <p className="text-lg text-white/80">Join us for these exciting events happening soon!</p>
          </div>

          {!viewAllEvents ? (
            // Single Event View
            <>
              {/* Event Navigation - Simplified */}
              <div className="flex justify-between items-center mb-6">
                <button 
                  onClick={prevEvent}
                  className="bg-black/40 hover:bg-black/60 p-2 rounded-full text-white transition-colors"
                  disabled={isAnimating}
                >
                  <FiChevronLeft size={24} />
                </button>
                
                <div className="text-center">
                  <span className="text-white/70">Event {currentEventIndex + 1} of {events.length}</span>
                </div>
                
                <button 
                  onClick={nextEvent}
                  className="bg-black/40 hover:bg-black/60 p-2 rounded-full text-white transition-colors"
                  disabled={isAnimating}
                >
                  <FiChevronRight size={24} />
                </button>
              </div>

              {/* Single Event Row with Animation */}
              <div 
                key={currentEvent.id} 
                className={`bg-black/40 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 shadow-lg shadow-black/20 transition-all duration-500 ease-in-out ${
                  isAnimating ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'
                }`}
              >
                <div className="flex flex-col md:flex-row">
                  {/* Event Image (left side on desktop) */}
                  <div className="w-full md:w-1/3 h-48 md:h-auto">
                    <img 
                      src={currentEvent.imageUrl} 
                      alt={currentEvent.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Event Content (right side on desktop) */}
                  <div className="w-full md:w-2/3 p-6 flex flex-col md:flex-row">
                    {/* Date Column */}
                    <div className="flex md:flex-col items-center justify-center md:justify-start md:border-r md:border-white/10 md:pr-6 md:mr-6">
                      <div className="text-center mb-4 md:mb-0 md:mr-0 mr-4">
                        <span className="block text-4xl font-bold text-purple-400">
                          {currentEvent.date.split(' ')[1]?.replace(',', '') || ''}
                        </span>
                        <span className="block uppercase text-sm text-white/70">
                          {currentEvent.date.split(' ')[0]}
                        </span>
                        <span className="block text-white/50 text-xs mt-1">
                          {currentEvent.date.split(' ')[2]}
                        </span>
                      </div>
                    </div>
                    
                    {/* Details */}
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-2xl font-bold text-white">{currentEvent.title}</h3>
                        <span className="bg-purple-600/70 px-3 py-1 rounded-full text-sm text-white">
                          {currentEvent.category}
                        </span>
                      </div>
                      
                      <div className="flex flex-wrap gap-4 text-sm mb-4">
                        <span className="flex items-center text-white/70">
                          <FiClock className="mr-1" size={16} />
                          {currentEvent.time}
                        </span>
                        <span className="flex items-center text-white/70">
                          <FiMapPin className="mr-1" size={16} />
                          {currentEvent.location}
                        </span>
                      </div>
                      
                      <p className="text-white/80 mb-6">
                        {currentEvent.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <button className="px-6 py-2 bg-purple-600/80 hover:bg-purple-600 text-white rounded-full transition-colors shadow-md shadow-purple-500/20">
                          Register Now
                        </button>
                        
                        <button className="flex items-center text-purple-400 hover:text-purple-300">
                          Full Details
                          <FiChevronRight size={18} className="ml-1" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            // All Events View - no changes here
            <div className="grid grid-cols-1 gap-6">
              {events.map((event) => (
                <div 
                  key={event.id} 
                  className="bg-black/40 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 shadow-lg shadow-black/20 transition-all hover:shadow-xl hover:bg-black/50"
                >
                  <div className="flex flex-col md:flex-row h-auto">
                    {/* Event Image */}
                    <div className="w-full md:w-1/6 h-32 md:h-auto">
                      <img 
                        src={event.imageUrl} 
                        alt={event.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Event Content */}
                    <div className="w-full md:w-5/6 p-4 flex flex-col md:flex-row md:items-center">
                      {/* Date Column */}
                      <div className="flex md:flex-col items-center md:items-start md:border-r md:border-white/10 md:pr-4 md:mr-4 mb-3 md:mb-0">
                        <div className="flex md:flex-col items-center md:items-start">
                          <span className="text-2xl font-bold text-purple-400 md:mb-1">
                            {event.date.split(' ')[1]?.replace(',', '') || ''}
                          </span>
                          <span className="uppercase text-xs text-white/70 ml-2 md:ml-0">
                            {event.date.split(' ')[0]}
                          </span>
                        </div>
                      </div>
                      
                      {/* Details */}
                      <div className="flex-1 flex flex-col md:flex-row md:items-center">
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-white">{event.title}</h3>
                          
                          <div className="flex flex-wrap gap-3 text-xs my-1">
                            <span className="flex items-center text-white/70">
                              <FiClock className="mr-1" size={12} />
                              {event.time}
                            </span>
                            <span className="flex items-center text-white/70">
                              <FiMapPin className="mr-1" size={12} />
                              {event.location}
                            </span>
                            <span className="bg-purple-600/70 px-2 py-0.5 rounded-full text-white">
                              {event.category}
                            </span>
                          </div>
                        </div>
                        
                        <button className="mt-3 md:mt-0 px-4 py-1.5 bg-purple-600/80 hover:bg-purple-600 text-white text-sm rounded-full transition-colors shadow-sm shadow-purple-500/20 whitespace-nowrap">
                          Register
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Toggle View Button */}
          <div className="mt-10 flex justify-center">
            <button 
              onClick={toggleViewAll}
              className="flex items-center px-6 py-2.5 bg-purple-600/60 hover:bg-purple-600/80 text-white rounded-full transition-colors border border-purple-400/30 shadow-lg shadow-purple-500/20"
            >
              {viewAllEvents ? (
                <>
                  Single View
                  <FiChevronUp className="ml-2" />
                </>
              ) : (
                <>
                  View All Events
                  <FiChevronDown className="ml-2" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Past Events Section */}
      <div className="relative mx-4 mb-8 rounded-3xl overflow-hidden">
        {/* Background glass effect */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-md border border-white/20 rounded-3xl shadow-xl shadow-black/30"></div>
        
        {/* Purple glow effects */}
        <div className="absolute -top-20 left-1/3 w-1/3 h-40 bg-purple-600/15 blur-3xl rounded-full"></div>
        <div className="absolute bottom-10 right-1/4 w-1/4 h-30 bg-purple-600/10 blur-3xl rounded-full"></div>
        
        {/* Content container */}
        <div className="relative z-10 p-8">
          {/* Header */}
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white mb-3">Past Events</h2>
            <p className="text-lg text-white/70">Explore our recently concluded events</p>
          </div>

          {/* Three-column grid for past events */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastEvents.map((event) => (
              <div
                key={event.id}
                className="bg-black/30 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 shadow-lg shadow-black/20 transition-all hover:shadow-xl hover:bg-black/40 hover:scale-[1.02] group"
              >
                {/* Event Image */}
                <div className="h-48 relative overflow-hidden">
                  <img
                    src={event.imageUrl}
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-3 left-3 bg-purple-600/70 px-2.5 py-1 rounded-full text-xs text-white font-medium">
                    {event.category}
                  </div>
                </div>

                {/* Event Details */}
                <div className="p-5">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                    {event.title}
                  </h3>
                  
                  <div className="flex flex-wrap gap-3 text-sm mb-4">
                    <span className="flex items-center text-white/70">
                      <FiCalendar className="mr-1.5" size={14} />
                      {event.date}
                    </span>
                    <span className="flex items-center text-white/70">
                      <FiMapPin className="mr-1.5" size={14} />
                      {event.location}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <button className="text-sm text-purple-400 hover:text-purple-300 flex items-center transition-colors">
                      View highlights
                      <FiChevronRight size={16} className="ml-1" />
                    </button>
                    
                    <span className="text-xs text-white/50 italic">Event completed</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View More Button */}
          <div className="mt-8 flex justify-center">
            <button className="flex items-center px-6 py-2 bg-black/50 hover:bg-black/60 text-white rounded-full transition-colors border border-white/10 shadow-md shadow-black/20">
              View Archive
              <FiChevronRight className="ml-2" />
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Events;