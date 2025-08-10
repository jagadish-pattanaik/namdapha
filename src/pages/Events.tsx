import React, { useState, useEffect, useRef } from 'react';
import { FiClock, FiMapPin, FiChevronRight, FiChevronLeft, FiChevronDown, FiChevronUp, FiCalendar } from 'react-icons/fi';
import Layout from '../components/Layout';
import { differenceInHours, parseISO } from "date-fns";

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  imageUrl: string;
  category: string;
  meetLink?: string;
}

const defaultForm: Partial<Event> = {
  title: "",
  description: "",
  date: "",
  location: "",
  category: "",
  addedBy: "",
  visible: true,
};

const Events = () => {
  // State for upcoming and past events
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [pastEvents, setPastEvents] = useState<Event[]>([]);

  // Fetch events data from API
  useEffect(() => {
    fetch("http://localhost:5050/api/upcoming-events")
      .then(res => res.json())
      .then(data => {
        const now = new Date();
        // Only show events whose date and time are in the future
        setUpcomingEvents(data.filter(ev => {
          const eventDateTime = new Date(`${ev.date}T${ev.time || "00:00"}`);
          return eventDateTime >= now && ev.visible !== false;
        }));
      });

    fetch("http://localhost:5050/api/past-events")
      .then(res => res.json())
      .then(data => {
        const now = new Date();
        // Show events whose date and time are in the past
        setPastEvents(data.filter(ev => {
          const eventDateTime = new Date(`${ev.date}T${ev.time || "00:00"}`);
          return eventDateTime < now && ev.visible !== false;
        }));
      });
  }, []);

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
        prevIndex === upcomingEvents.length - 1 ? 0 : prevIndex + 1
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
        prevIndex === 0 ? upcomingEvents.length - 1 : prevIndex - 1
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
    if (upcomingEvents.length > 1) {
      startAutoScroll();
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [upcomingEvents.length]);

  // Get the current event to display
  const currentEvent = upcomingEvents[currentEventIndex];

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
            upcomingEvents.length === 0 ? (
              <div className="text-center text-white/70 py-12">No upcoming events available.</div>
            ) : upcomingEvents.length === 1 ? (
              // Only one event, show without navigation or animation
              <div 
                key={upcomingEvents[0].id} 
                className="bg-black/40 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 shadow-lg shadow-black/20"
              >
                <div className="flex flex-col md:flex-row">
                  {/* Event Image (left side on desktop) */}
                  <div className="w-full md:w-1/3 h-48 md:h-auto flex items-center justify-center bg-black/30 p-0 m-0">
                    <img
                      src={upcomingEvents[0].imageUrl}
                      alt={upcomingEvents[0].title}
                      className="w-full h-full object-contain"
                      style={{ background: "#222", borderRadius: "1rem", maxHeight: "12rem" }}
                    />
                  </div>
                  
                  {/* Event Content (right side on desktop) */}
                  <div className="w-full md:w-2/3 p-6 flex flex-col md:flex-row">
                    {/* Date Column */}
                    <div className="flex md:flex-col items-center justify-center md:justify-start md:border-r md:border-white/10 md:pr-6 md:mr-6">
                      <div className="text-center mb-4 md:mb-0 md:mr-0 mr-4">
                        <span className="block text-4xl font-bold text-purple-400">
                          {upcomingEvents[0].date.split(' ')[1]?.replace(',', '') || ''}
                        </span>
                        <span className="block uppercase text-sm text-white/70">
                          {upcomingEvents[0].date.split(' ')[0]}
                        </span>
                        <span className="block text-white/50 text-xs mt-1">
                          {upcomingEvents[0].date.split(' ')[2]}
                        </span>
                      </div>
                    </div>
                    
                    {/* Details */}
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-2xl font-bold text-white">{upcomingEvents[0].title}</h3>
                        <span className="bg-purple-600/70 px-4 py-1 rounded-full text-xs text-white font-medium flex items-center whitespace-nowrap">
                          {upcomingEvents[0].category}
                        </span>
                      </div>
                      
                      <div className="flex flex-wrap gap-4 text-sm mb-4">
                        <span className="flex items-center text-white/70">
                          <FiClock className="mr-1" size={16} />
                          {upcomingEvents[0].time}
                        </span>
                        <span className="flex items-center text-white/70">
                          <FiMapPin className="mr-1" size={16} />
                          Google Meet
                        </span>
                      </div>
                      
                      <p className="text-white/80 mb-6">
                        {upcomingEvents[0].description}
                      </p>
                      
                      <div className="flex items-center justify-end">
                        {upcomingEvents[0].meetLink ? (
                          <a
                            href={upcomingEvents[0].meetLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 py-2 bg-purple-600/80 hover:bg-purple-600 text-white rounded-full transition-colors shadow-md shadow-purple-500/20 font-semibold"
                          >
                            Join Now
                          </a>
                        ) : (
                          <button
                            className="px-6 py-2 bg-gray-400 text-white rounded-full cursor-not-allowed opacity-60"
                            disabled
                            title="Meeting link not available"
                          >
                            Join Now
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              // More than one event, show navigation and animation
              <>
                {/* Event Navigation */}
                <div className="flex justify-between items-center mb-6">
                  <button 
                    onClick={prevEvent}
                    className="bg-black/40 hover:bg-black/60 p-2 rounded-full text-white transition-colors"
                    disabled={isAnimating}
                  >
                    <FiChevronLeft size={24} />
                  </button>
                  <div className="text-center">
                    <span className="text-white/70">Event {currentEventIndex + 1} of {upcomingEvents.length}</span>
                  </div>
                  <button 
                    onClick={nextEvent}
                    className="bg-black/40 hover:bg-black/60 p-2 rounded-full text-white transition-colors"
                    disabled={isAnimating}
                  >
                    <FiChevronRight size={24} />
                  </button>
                </div>
                {/* Animated Event Card */}
                <div 
                  key={currentEvent.id} 
                  className={`bg-black/40 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 shadow-lg shadow-black/20 transition-all duration-500 ease-in-out ${
                    isAnimating ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'
                  }`}
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Event Image (left side on desktop) */}
                    <div className="w-full md:w-1/3 h-48 md:h-auto flex items-center justify-center bg-black/30 p-0 m-0">
                      <img
                        src={currentEvent.imageUrl}
                        alt={currentEvent.title}
                        className="w-full h-full object-contain"
                        style={{ background: "#222", borderRadius: "1rem", maxHeight: "12rem" }}
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
                          <span className="bg-purple-600/70 px-4 py-1 rounded-full text-xs text-white font-medium flex items-center whitespace-nowrap">
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
                            Google Meet
                          </span>
                        </div>
                        
                        <p className="text-white/80 mb-6">
                          {currentEvent.description}
                        </p>
                        
                        <div className="flex items-center justify-end">
                          {currentEvent.meetLink ? (
                            <a
                              href={currentEvent.meetLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-6 py-2 bg-purple-600/80 hover:bg-purple-600 text-white rounded-full transition-colors shadow-md shadow-purple-500/20 font-semibold"
                            >
                              Join Now
                            </a>
                          ) : (
                            <button
                              className="px-6 py-2 bg-gray-400 text-white rounded-full cursor-not-allowed opacity-60"
                              disabled
                              title="Meeting link not available"
                            >
                              Join Now
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )
          ) : (
            // All Events View - no changes needed
            <div className="grid grid-cols-1 gap-6">
              {upcomingEvents.map((event) => (
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
                              Google Meet
                            </span>
                            <span className="bg-purple-600/70 px-4 py-1 rounded-full text-xs text-white font-medium flex items-center whitespace-nowrap">
                              {event.category}
                            </span>
                          </div>
                        </div>
                        
                        {event.meetLink ? (
                          <a
                            href={event.meetLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-3 md:mt-0 px-4 py-1.5 bg-purple-600/80 hover:bg-purple-600 text-white text-sm rounded-full transition-colors shadow-sm shadow-purple-500/20 whitespace-nowrap font-semibold"
                          >
                            Join Now
                          </a>
                        ) : (
                          <button
                            className="mt-3 md:mt-0 px-4 py-1.5 bg-gray-400 text-white text-sm rounded-full cursor-not-allowed opacity-60 whitespace-nowrap"
                            disabled
                            title="Meeting link not available"
                          >
                            Join Now
                          </button>
                        )}
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
      <div className="relative w-full mx-auto mb-8 rounded-3 overflow-visible px- md:px-16">
        {/* Background glass effect  */}
        <div className="absolute inset-0 w-full h-full bg-black/40 backdrop-blur-md border border-white/20 shadow-xl shadow-black/30 rounded-none"></div>
        
        {/* Purple glow effects */}
        <div className="absolute -top-32 left-0 w-full h-56 bg-purple-600/15 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-full h-40 bg-purple-600/10 blur-3xl"></div>
        
        {/* Content container */}
        <div className="relative z-10 px-0 py-12">
          {/* Header */}
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white mb-3">Past Events</h2>
            <p className="text-lg text-white/70">Explore our recently concluded events</p>
          </div>

          {/* Three-column grid for past events, */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full px-0">
            {pastEvents.map((event, idx) => {
              // Check if event is newly added (within 48 hours)
              const isNew = event.createdAt && differenceInHours(new Date(), parseISO(event.createdAt)) < 48;
              // Calculate row and column for each card
              const columns = 3;
              const row = Math.floor(idx / columns);
              const col = idx % columns;
              const totalRows = Math.ceil(pastEvents.length / columns);

              return (
                <div
                  key={event.id}
                  className="relative bg-black/30 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 shadow-lg shadow-black/20 transition-all hover:shadow-xl hover:bg-black/40 hover:scale-[1.02] group"
                >
                  {/* Newly Added Badge */}
                  {isNew && (
                    <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-green-500 text-white text-xs font-bold shadow-lg z-10 animate-pulse">
                      Newly Added
                    </span>
                  )}
                  {/* Left Slide Icon for first column in each row */}
                  {col === 0 && (
                    <button
                      className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black/60 hover:bg-purple-600/80 text-white rounded-full p-2 shadow transition-colors"
                      aria-label="Slide Left"
                      onClick={() => {
                        // Custom logic for sliding left for this row
                      }}
                    >
                      <FiChevronLeft size={22} />
                    </button>
                  )}

                  {/* Right Slide Icon for last column in each row */}
                  {col === columns - 1 && (idx < row * columns + columns && idx < pastEvents.length) && (
                    <button
                      className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black/60 hover:bg-purple-600/80 text-white rounded-full p-2 shadow transition-colors"
                      aria-label="Slide Right"
                      onClick={() => {
                        // Custom logic for sliding right for this row
                      }}
                    >
                      <FiChevronRight size={22} />
                    </button>
                  )}

                  {/* Event Image */}
                  <div className="h-72 relative overflow-hidden">
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
                        View Details
                        <FiChevronRight size={16} className="ml-1" />
                      </button>
                      <span className="text-xs text-white/50 italic">Event completed</span>
                    </div>

                    
                  </div>
                </div>
              );
            })}
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