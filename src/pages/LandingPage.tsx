import React, { useEffect, useRef, useState } from 'react';
import Layout from '../components/Layout';
import { motion, AnimatePresence } from 'framer-motion';

type ValueItem = {
  title: string;
  description: string;
  icon: string;
  image: string;
};



function LandingPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scrollY, setScrollY] = useState(0);
  
  // Handle scroll for parallax
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <div className="min-h-screen w-full relative flex flex-col bg-hero-radial">
      {/* Grid and circles overlay */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <svg
          className="absolute inset-0 w-full h-full"
          width="100%"
          height="100%"
          viewBox="0 0 1440 900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ opacity: 0.15 }}
        >
          <defs>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="white"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          {/* Radial circles for lighting */}
          <circle cx="720" cy="320" r="320" fill="none" stroke="#a78bfa" strokeWidth="2" opacity="0.22" />
          <circle cx="720" cy="320" r="220" fill="none" stroke="#a78bfa" strokeWidth="2" opacity="0.16" />
          <circle cx="720" cy="320" r="120" fill="none" stroke="#a78bfa" strokeWidth="2" opacity="0.09" />
        </svg>
      </div>

      {/* Hero Content */}
      <Layout bgImage={null}>
        <div className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] pt-24">
          {/* Your icon */}
          <img
            src="https://res.cloudinary.com/dogq9gvo8/image/upload/v1754390919/1000073005-modified_a0ou2c.png"
            alt="Namdapha House Logo"
            className="w-32 h-32 mb-8 rounded-full shadow-xl"
          />
          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white text-center mb-6">
            Maximize your efficiency with <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-purple-500">Namdapha House</span>
          </h1>
          {/* Subheading */}
          <p className="text-lg sm:text-xl text-white/80 text-center max-w-2xl mx-auto mb-8">
            With powerful features designed to boost efficiency and streamline workflows, Namdapha House is the key to unlocking your team's full potential.
          </p>
          {/* Buttons */}
          <div className="flex gap-4 justify-center">
            <a
              href="#get-started"
              className="px-6 py-3 rounded-full bg-purple-600 text-white font-semibold shadow-lg hover:bg-purple-700 transition"
            >
              Get Started
            </a>
            <a
              href="#community"
              className="px-6 py-3 rounded-full bg-black/60 text-white font-semibold shadow-lg hover:bg-black/80 transition"
            >
              Community
            </a>
          </div>
        </div>
      </Layout>
    </div>
  );
}

// Add CSS animations
const styles = `
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes scroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

.animate-fadeIn {
  animation: fadeIn 1s ease-out forwards;
}

.animate-fadeInUp {
  animation: fadeInUp 1s ease-out forwards;
}

.animate-slideInRight {
  animation: slideInRight 0.7s ease-out forwards;
}

.animate-scroll {
  animation: scroll 10s linear infinite;
}
`;

// Add the styles to the document head
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default LandingPage;