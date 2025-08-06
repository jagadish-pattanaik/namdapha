import React, { useEffect, useRef, useState } from 'react';
import Layout from '../components/Layout';

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
                  
                  <div className="mt-8 flex flex-wrap gap-4">
                    <div className="bg-black/40 backdrop-blur-xl p-4 rounded-xl border border-white/10 flex items-center gap-3">
                      <div className="w-12 h-12 bg-purple-600/50 rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                        </svg>
                      </div>
                      <span className="text-white font-display font-semibold">Diverse Community</span>
                    </div>
                    
                    <div className="bg-black/40 backdrop-blur-xl p-4 rounded-xl border border-white/10 flex items-center gap-3">
                      <div className="w-12 h-12 bg-purple-600/50 rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                      </div>
                      <span className="text-white font-display font-semibold">Innovation Hub</span>
                    </div>
                    
                    <div className="bg-black/40 backdrop-blur-xl p-4 rounded-xl border border-white/10 flex items-center gap-3">
                      <div className="w-12 h-12 bg-purple-600/50 rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      </div>
                      <span className="text-white font-display font-semibold">Community Support</span>
                    </div>
                  </div>
                </div>
                
                {/* Right content - glass card */}
                <div className="bg-black/30 backdrop-blur-xl rounded-3xl overflow-hidden shadow-xl shadow-black/40 border border-white/10 p-8">
                  <h3 className="font-display text-2xl font-bold text-white mb-6">Our Core Values</h3>
                  
                  <ul className="space-y-6">
                    <li className="flex items-start gap-4">
                      <div className="mt-1 text-purple-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-white font-display font-semibold text-lg mb-1">Excellence</h4>
                        <p className="text-white/70 text-sm leading-relaxed">We strive for excellence in all our endeavors, pushing boundaries and setting high standards.</p>
                      </div>
                    </li>
                    
                    <li className="flex items-start gap-4">
                      <div className="mt-1 text-purple-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-white font-display font-semibold text-lg mb-1">Inclusivity</h4>
                        <p className="text-white/70 text-sm leading-relaxed">We celebrate diversity and create an environment where everyone feels welcome and valued.</p>
                      </div>
                    </li>
                    
                    <li className="flex items-start gap-4">
                      <div className="mt-1 text-purple-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-white font-display font-semibold text-lg mb-1">Innovation</h4>
                        <p className="text-white/70 text-sm leading-relaxed">We encourage creative thinking and novel approaches to challenges and opportunities.</p>
                      </div>
                    </li>
                    
                    <li className="flex items-start gap-4">
                      <div className="mt-1 text-purple-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-white font-display font-semibold text-lg mb-1">Responsibility</h4>
                        <p className="text-white/70 text-sm leading-relaxed">We take ownership of our actions and contribute positively to our community and environment.</p>
                      </div>
                    </li>
                  </ul>
                  
                  <button className="mt-8 px-6 py-3 bg-purple-600/70 text-white rounded-full hover:bg-purple-600 transition-colors shadow-md shadow-purple-600/30 border border-purple-500/50 text-lg">
                    Learn More About Us
                  </button>
                </div>
              </div>
            </div>
            
            {/* Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto animate-fadeInUp"
                style={{ animationDelay: '0.5s' }}>
              
              <div className="bg-black/50 backdrop-blur-md p-8 rounded-3xl shadow-lg border border-white/10 transition-all hover:border-purple-500/30 hover:shadow-purple-500/20 duration-300">
                <h2 className="font-display text-2xl font-bold text-white mb-4">
                  Discover Resources
                </h2>
                <p className="font-sans text-white/80 text-lg leading-relaxed">
                  Access a curated collection of tools, guides, and materials to enhance your learning experience.
                </p>
                <button className="mt-6 px-6 py-3 bg-purple-600 text-white rounded-full hover:bg-purple-500 transition-colors shadow-lg shadow-purple-600/30">
                  Explore
                </button>
              </div>
              
              <div className="bg-black/50 backdrop-blur-md p-8 rounded-3xl shadow-lg border border-white/10 transition-all hover:border-purple-500/30 hover:shadow-purple-500/20 duration-300">
                <h2 className="font-display text-2xl font-bold text-white mb-4">
                  Join the Community
                </h2>
                <p className="font-sans text-white/80 text-lg leading-relaxed">
                  Connect with fellow members, participate in events, and be part of our vibrant ecosystem.
                </p>
                <button className="mt-6 px-6 py-3 bg-purple-600 text-white rounded-full hover:bg-purple-500 transition-colors shadow-lg shadow-purple-600/30">
                  Get Started
                </button>
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