import React, { useEffect, useRef, useState } from 'react';
import Layout from '../components/Layout';
import { motion, AnimatePresence } from 'framer-motion';

type ValueItem = {
  title: string;
  description: string;
  icon: string;
  image: string;
};

const AnimatedValueCard = () => {
  const [active, setActive] = useState(0);

  const values: ValueItem[] = [
    {
      title: "Excellence",
      description: "We strive for excellence in all our endeavors, pushing boundaries and setting high standards for academic and personal growth.",
      icon: "🏆",
      image: "https://res.cloudinary.com/dogq9gvo8/image/upload/v1754390919/1000073005-modified_a0ou2c.png"
    },
    {
      title: "Inclusivity", 
      description: "We celebrate diversity and create an environment where everyone feels welcome, valued, and empowered to contribute.",
      icon: "🤝",
      image: "https://res.cloudinary.com/dogq9gvo8/image/upload/v1754487754/20250728_1547_Group_Beach_Gathering_remix_01k188e475eezvtpq51c33z8c3-2_w85umz.png"
    },
    {
      title: "Innovation",
      description: "We encourage creative thinking and novel approaches to challenges, fostering a culture of continuous learning.",
      icon: "💡",
      image: "https://res.cloudinary.com/dogq9gvo8/image/upload/v1754394299/20250728_1415_Indian_Subcontinent_Trees_remix_01k1835p9df9a9pvr4h1dtftz4_xdzp1e.png"
    },
    {
      title: "Community",
      description: "We build strong bonds through shared experiences, mutual support, and collaborative endeavors that last a lifetime.",
      icon: "🌟",
      image: "https://res.cloudinary.com/dogq9gvo8/image/upload/v1754390919/1000073005-modified_a0ou2c.png"
    }
  ];

  const handleNext = () => {
    setActive((prev) => (prev + 1) % values.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + values.length) % values.length);
  };

  const isActive = (index: number) => {
    return index === active;
  };

  // Auto-play functionality
  useEffect(() => {
    const interval = setInterval(handleNext, 4000);
    return () => clearInterval(interval);
  }, []);

  const randomRotateY = () => {
    return Math.floor(Math.random() * 21) - 10;
  };

  return (
    <div className="flex flex-col items-center">
      {/* Free-floating Image Stack - No background, larger size */}
      <div className="relative h-96 w-full max-w-lg mb-8">
        <AnimatePresence>
          {values.map((value, index) => (
            <motion.div
              key={`${value.title}-${index}`}
              initial={{
                opacity: 0,
                scale: 0.9,
                z: -100,
                rotate: randomRotateY(),
              }}
              animate={{
                opacity: isActive(index) ? 1 : 0.85,
                scale: isActive(index) ? 1 : 0.95,
                z: isActive(index) ? 0 : -100,
                rotate: isActive(index) ? 0 : randomRotateY(),
                zIndex: isActive(index) ? 40 : values.length + 2 - index,
                y: isActive(index) ? [0, -20, 0] : 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.9,
                z: 100,
                rotate: randomRotateY(),
              }}
              transition={{
                duration: 0.4,
                ease: "easeInOut",
              }}
              className="absolute inset-0 origin-bottom"
            >
              {/* Removed background container, just the image */}
              <div className="h-full w-full rounded-3xl overflow-hidden shadow-2xl shadow-black/60">
                <div 
                  className="h-full w-full bg-cover bg-center"
                  style={{ 
                    backgroundImage: `url(${value.image})`,
                  }}
                />
                {/* Reduced gradient overlay for better image visibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between w-full max-w-lg">
        <div className="flex gap-4">
          <button
            onClick={handlePrev}
            className="group/button flex h-12 w-12 items-center justify-center rounded-full bg-black/60 backdrop-blur-md border border-white/30 hover:bg-black/80 hover:border-purple-400 transition-all duration-200 shadow-lg"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6 text-white transition-transform duration-300 group-hover/button:-translate-x-1" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={handleNext}
            className="group/button flex h-12 w-12 items-center justify-center rounded-full bg-black/60 backdrop-blur-md border border-white/30 hover:bg-black/80 hover:border-purple-400 transition-all duration-200 shadow-lg"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6 text-white transition-transform duration-300 group-hover/button:translate-x-1" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Progress Indicators */}
        <div className="flex gap-3">
          {values.map((_, index) => (
            <button
              key={index}
              onClick={() => setActive(index)}
              className={`h-3 rounded-full transition-all duration-300 ${
                isActive(index) 
                  ? 'w-10 bg-purple-500 shadow-lg shadow-purple-500/50' 
                  : 'w-3 bg-white/40 hover:bg-white/60 hover:w-6'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
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

    // Set canvas to full screen
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Call once to initialize
    resizeCanvas();
    
    // Resize canvas when window size changes
    window.addEventListener('resize', resizeCanvas);

    // Particle class
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 5 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        
        // Purple and blue hues for the particles
        const hue = Math.random() * 60 + 240; // Blue to purple range (240-300)
        this.color = `hsla(${hue}, 80%, 60%, 0.8)`;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Bounce off edges
        if (this.x > canvas.width || this.x < 0) {
          this.speedX = -this.speedX;
        }
        if (this.y > canvas.height || this.y < 0) {
          this.speedY = -this.speedY;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    // Create particle array
    const particleArray: Particle[] = [];
    const particleCount = 30; // Adjust for more or fewer particles

    for (let i = 0; i < particleCount; i++) {
      particleArray.push(new Particle());
    }

    // Animation function
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw connections between particles
      for (let a = 0; a < particleArray.length; a++) {
        for (let b = a; b < particleArray.length; b++) {
          const dx = particleArray[a].x - particleArray[b].x;
          const dy = particleArray[a].y - particleArray[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 200) {
            const opacity = 1 - distance / 200;
            ctx.strokeStyle = `rgba(150, 100, 255, ${opacity * 0.5})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particleArray[a].x, particleArray[a].y);
            ctx.lineTo(particleArray[b].x, particleArray[b].y);
            ctx.stroke();
          }
        }
      }
      
      // Update and draw particles
      particleArray.forEach(particle => {
        particle.update();
        particle.draw();
      });
      
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <div className="min-h-screen relative bg-black">
      {/* HERO SECTION - Tree background with center image */}
      <div className="relative min-h-screen">
        {/* Full background trees image - only for hero section */}
        <div 
          className="absolute inset-0 z-[1] transition-transform duration-100"
          style={{
            backgroundImage: `url(https://res.cloudinary.com/dogq9gvo8/image/upload/v1754394299/20250728_1415_Indian_Subcontinent_Trees_remix_01k1835p9df9a9pvr4h1dtftz4_xdzp1e.png)`,
            transform: `translateY(${scrollY * 0.3}px)`,
            backgroundPosition: 'center top',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            opacity: 0.4,
          }}
        />
        
        {/* Animated canvas background - only for hero section */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 z-[2] opacity-40"
          style={{ filter: 'blur(2px)' }}
        />
        
        <Layout bgImage={null}>
          <div className="relative z-[3]">
            {/* Header Section */}
            <div className="text-center mb-8 sm:mb-12 pt-16 sm:pt-20 px-4 sm:px-6 md:px-8 lg:px-12">
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4 animate-fadeIn">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-300">
                  Namdapha House
                </span>
              </h1>
              
              <p className="font-sans text-base sm:text-lg text-white/80 max-w-2xl mx-auto animate-fadeInUp" 
                  style={{ animationDelay: '0.2s' }}>
                General Student Body, IIT Madras
              </p>
            </div>

            {/* Center image - part of hero section */}
            <div className="relative w-[100vw] -ml-[50vw] left-[50%] overflow-hidden animate-fadeInUp"
                style={{ 
                  animationDelay: '0.3s',
                  height: 'clamp(250px, 50vw, 600px)',
                  marginTop: '-2rem',
                  marginBottom: '0' // Remove bottom margin
                }}>
                
              <div 
                className="absolute inset-0 bg-cover z-10 transition-transform duration-100"
                style={{ 
                  backgroundImage: `url(https://res.cloudinary.com/dogq9gvo8/image/upload/v1754487754/20250728_1547_Group_Beach_Gathering_remix_01k188e475eezvtpq51c33z8c3-2_w85umz.png)`,
                  transform: `translateY(${scrollY * 0.15}px)`,
                  backgroundPosition: 'center 35%',
                  backgroundSize: '100% auto',
                  mixBlendMode: 'normal',
                }}
              />
              
              {/* Bottom shadow gradient for smooth transition */}
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-20"></div>
              
              <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-0 right-0 text-center px-4 z-30">
                <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-display font-bold text-white mb-1 md:mb-2">
                  Meet Our Team
                </h3>
                <p className="text-sm sm:text-base text-white/80 font-sans">
                  The people who make Namdapha House possible
                </p>
              </div>
            </div>
          </div>
        </Layout>
      </div>

      {/* ABOUT US SECTION - Overlaps hero section with enhanced shadow */}
      <div className="relative bg-black -mt-48 sm:-mt-56 md:-mt-64 lg:-mt-72 z-[4]" style={{ paddingTop: '12rem' }}>
        {/* Top shadow effect for depth */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent via-black/60 to-black z-[4]"></div>
        
        {/* Enhanced shadow layer for better separation */}
        <div className="absolute top-0 left-0 right-0 h-16 shadow-2xl shadow-black/60 z-[3]"></div>
        
        {/* Main black background with subtle parallax */}
        <div 
          className="absolute inset-0 bg-black"
          style={{
            transform: `translateY(${scrollY * 0.01}px)`,
          }}
        />
        
        {/* Subtle inner shadow for depth */}
        <div className="absolute inset-0 shadow-inner shadow-black/40"></div>
        
        <div className="relative z-[5] py-16 sm:py-20 md:py-24 lg:py-28">
          <div className="px-4 sm:px-6 md:px-8 lg:px-12">
            {/* About Us Section */}
            <div className="mb-20 sm:mb-24 md:mb-28 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
              <div className="text-center mb-10 sm:mb-12">
                <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-300">
                    About Us
                  </span>
                </h2>
                <div className="w-24 sm:w-32 md:w-40 h-1 bg-gradient-to-r from-purple-400 to-purple-600 mx-auto mt-3"></div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 md:gap-16 max-w-7xl mx-auto">
                {/* Left content */}
                <div className="flex flex-col justify-start space-y-6">
                  <p className="text-white/80 text-base sm:text-lg leading-relaxed">
                    Namdapha House is more than just a residential community—it's a vibrant ecosystem where students from diverse backgrounds come together to learn, grow, and connect.
                  </p>
                  <p className="text-white/80 text-base sm:text-lg leading-relaxed">
                    Named after the Namdapha National Park in Arunachal Pradesh, our house embodies the spirit of biodiversity, resilience, and unity that the park represents.
                  </p>
                  <p className="text-white/80 text-base sm:text-lg leading-relaxed">
                    Our mission is to cultivate an inclusive environment that fosters academic excellence, personal development, and lifelong friendships among our residents.
                  </p>
                  
                  <div className="mt-8 flex justify-center lg:justify-start">
                    <a 
                      href="/about" 
                      className="group relative overflow-hidden px-8 py-4 bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-600 text-white rounded-full hover:from-purple-500 hover:via-purple-600 hover:to-indigo-500 transition-all duration-300 shadow-xl shadow-purple-600/30 hover:shadow-2xl hover:shadow-purple-500/40 text-lg font-semibold transform hover:scale-105 active:scale-95"
                    >
                      {/* Animated background overlay */}
                      <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      
                      {/* Shimmer effect */}
                      <div className="absolute inset-0 -top-2 -left-2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 w-0 group-hover:w-full transition-all duration-700"></div>
                      
                      {/* Button content */}
                      <span className="relative z-10 flex items-center gap-3">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-100 group-hover:from-white group-hover:to-cyan-100 transition-all duration-300">
                          Know More
                        </span>
                        
                        {/* Animated arrow */}
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className="h-5 w-5 text-white transition-all duration-300 group-hover:translate-x-1 group-hover:text-cyan-200" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </span>
                      
                      {/* Floating particles effect */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="absolute top-1 left-4 w-1 h-1 bg-cyan-300 rounded-full animate-ping"></div>
                        <div className="absolute top-3 right-6 w-1 h-1 bg-pink-300 rounded-full animate-ping" style={{ animationDelay: '0.2s' }}></div>
                        <div className="absolute bottom-2 left-8 w-1 h-1 bg-purple-300 rounded-full animate-ping" style={{ animationDelay: '0.4s' }}></div>
                        <div className="absolute bottom-1 right-4 w-1 h-1 bg-indigo-300 rounded-full animate-ping" style={{ animationDelay: '0.6s' }}></div>
                      </div>
                      
                      {/* Border glow effect */}
                      <div className="absolute inset-0 rounded-full border-2 border-transparent bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                    </a>
                  </div>
                </div>
                
                {/* Right content - Just the animated image stack */}
                <div className="flex flex-col justify-center">
                  <AnimatedValueCard />
                </div>
              </div>
            </div>
            
            
          </div>
        </div>
      </div>
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