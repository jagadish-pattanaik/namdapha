import React from 'react';
import Layout from '../components/Layout';

function LandingPage() {
  return (
    <Layout>
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-8">Welcome to the Landing Page</h1>
        <p className="text-lg text-white/80">
          This is a simple landing page with consistent layout and styling.
        </p>
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl shadow-lg border border-white/20 transition-all hover:bg-white/20">
            <h2 className="text-2xl font-bold text-white mb-4">Explore Features</h2>
            <p className="text-white/80">
              Discover everything our platform has to offer through our intuitive navigation.
            </p>
            <button className="mt-4 px-6 py-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors">
              Get Started
            </button>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl shadow-lg border border-white/20 transition-all hover:bg-white/20">
            <h2 className="text-2xl font-bold text-white mb-4">Connect With Us</h2>
            <p className="text-white/80">
              Join our community and stay updated with the latest events and resources.
            </p>
            <button className="mt-4 px-6 py-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default LandingPage;