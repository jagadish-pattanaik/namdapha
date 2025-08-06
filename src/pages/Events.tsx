import React, { useState } from 'react';
import Layout from '../components/Layout';

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  imageUrl: string;
}

const Events: React.FC = () => {
  // Sample event data - in a real application, this would come from an API
  const [events] = useState<Event[]>([
    {
      id: 1,
      title: "Annual Cultural Festival",
      date: "August 15, 2025",
      time: "6:00 PM - 10:00 PM",
      location: "Main Auditorium",
      description: "Join us for a night of music, dance, and cultural performances celebrating diversity.",
      imageUrl: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&auto=format&fit=crop&q=60"
    },
    {
      id: 2,
      title: "Tech Symposium",
      date: "September 5, 2025",
      time: "10:00 AM - 4:00 PM",
      location: "Conference Center",
      description: "Explore the latest innovations in technology with industry experts and hands-on workshops.",
      imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=60"
    },
    {
      id: 3,
      title: "Sports Tournament",
      date: "October 12, 2025",
      time: "9:00 AM - 6:00 PM",
      location: "Sports Complex",
      description: "Compete in various sports categories and show your athletic prowess.",
      imageUrl: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&auto=format&fit=crop&q=60"
    }
  ]);

  return (
    <Layout>
      <div className="w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Upcoming Events</h1>
          <p className="text-lg text-white/80">Join us for these exciting events happening soon!</p>
        </div>

        {/* Events List */}
        <div className="space-y-8">
          {events.map((event) => (
            <div 
              key={event.id} 
              className="bg-white/10 backdrop-blur-md rounded-3xl overflow-hidden shadow-lg border border-white/20 transition-all hover:bg-white/20"
            >
              <div className="md:flex">
                <div className="md:w-1/3">
                  <img 
                    src={event.imageUrl} 
                    alt={event.title} 
                    className="w-full h-64 md:h-full object-cover"
                  />
                </div>
                <div className="p-8 md:w-2/3">
                  <h2 className="text-2xl font-bold text-white mb-2">{event.title}</h2>
                  
                  <div className="flex flex-wrap gap-4 mb-4">
                    <div className="bg-purple-600/30 px-3 py-1 rounded-full text-sm text-white">
                      {event.date}
                    </div>
                    <div className="bg-purple-600/30 px-3 py-1 rounded-full text-sm text-white">
                      {event.time}
                    </div>
                    <div className="bg-purple-600/30 px-3 py-1 rounded-full text-sm text-white">
                      {event.location}
                    </div>
                  </div>
                  
                  <p className="text-white/80 mb-6">
                    {event.description}
                  </p>
                  
                  <button className="px-6 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors">
                    Register Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Event Button (for future functionality) */}
        <div className="mt-12 text-center">
          <button className="px-8 py-3 bg-white/20 backdrop-blur-md text-white rounded-full hover:bg-white/30 transition-colors border border-white/20">
            View All Events
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Events;