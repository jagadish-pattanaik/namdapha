import React, { useState, useEffect, useRef } from 'react';
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
    <div className="bg-black/30 backdrop-blur-xl rounded-3xl overflow-hidden shadow-xl shadow-black/40 border border-white/10 p-8">
      <div className="grid grid-cols-1 gap-8">
        {/* Image Stack Section */}
        <div className="relative h-64 w-full">
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
                  opacity: isActive(index) ? 1 : 0.7,
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
                <div className="h-full w-full rounded-2xl bg-gradient-to-br from-purple-900/50 to-blue-900/50 backdrop-blur-sm border border-white/20 overflow-hidden">
                  <div 
                    className="h-full w-full bg-cover bg-center opacity-60"
                    style={{ 
                      backgroundImage: `url(${value.image})`,
                      backgroundBlendMode: 'overlay'
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="text-4xl mb-2">{value.icon}</div>
                    <h4 className="text-white font-bold text-xl">{value.title}</h4>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Content Section */}
        <div className="flex flex-col justify-between">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{
                y: 20,
                opacity: 0,
              }}
              animate={{
                y: 0,
                opacity: 1,
              }}
              exit={{
                y: -20,
                opacity: 0,
              }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
              }}
            >
              <h3 className="font-display text-2xl font-bold text-white mb-2">
                Our Core Values
              </h3>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{values[active].icon}</span>
                <h4 className="text-white font-display font-semibold text-xl">
                  {values[active].title}
                </h4>
              </div>
              <motion.p className="text-white/80 text-base leading-relaxed">
                {values[active].description.split(" ").map((word, index) => (
                  <motion.span
                    key={index}
                    initial={{
                      filter: "blur(10px)",
                      opacity: 0,
                      y: 5,
                    }}
                    animate={{
                      filter: "blur(0px)",
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.2,
                      ease: "easeInOut",
                      delay: 0.02 * index,
                    }}
                    className="inline-block"
                  >
                    {word}&nbsp;
                  </motion.span>
                ))}
              </motion.p>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-6">
            <div className="flex gap-3">
              <button
                onClick={handlePrev}
                className="group/button flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-200"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 text-white transition-transform duration-300 group-hover/button:-translate-x-1" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={handleNext}
                className="group/button flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-200"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 text-white transition-transform duration-300 group-hover/button:translate-x-1" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Progress Indicators */}
            <div className="flex gap-2">
              {values.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActive(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    isActive(index) 
                      ? 'w-8 bg-purple-500' 
                      : 'w-2 bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <button className="mt-6 px-6 py-3 bg-purple-600/70 text-white rounded-full hover:bg-purple-600 transition-colors shadow-md shadow-purple-600/30 border border-purple-500/50 text-base font-medium backdrop-blur-md">
            Learn More About Us
          </button>
        </div>
      </div>
    </div>
  );
};

function AboutUs() {
  const [scrollY, setScrollY] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Particle system (same as LandingPage)
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
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      color: string;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 1;
        this.opacity = Math.random() * 0.5 + 0.1;
        const colors = ['#8B5CF6', '#A855F7', '#9333EA', '#7C3AED'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

        this.opacity += (Math.random() - 0.5) * 0.01;
        this.opacity = Math.max(0.1, Math.min(0.6, this.opacity));
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color + Math.floor(this.opacity * 255).toString(16).padStart(2, '0');
        ctx.fill();
      }
    }

    // Create particles
    const particles: Particle[] = [];
    for (let i = 0; i < 50; i++) {
      particles.push(new Particle());
    }

    // Animation loop
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <div className="min-h-screen relative bg-black">
      {/* Background Image with Parallax */}
      <div 
        className="fixed inset-0 z-[1] transition-transform duration-100"
        style={{
          backgroundImage: `url(https://res.cloudinary.com/dogq9gvo8/image/upload/v1754394299/20250728_1415_Indian_Subcontinent_Trees_remix_01k1835p9df9a9pvr4h1dtftz4_xdzp1e.png)`,
          transform: `translateY(${scrollY * 0.3}px)`,
          backgroundPosition: 'center top',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          opacity: 0.4,
        }}
      />

      {/* Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-[2] opacity-40"
        style={{ filter: 'blur(2px)' }}
      />

      {/* Main Content */}
      <div className="relative z-[3]">
        <Layout bgImage={null}>
          {/* Hero Section */}
          <div className="relative py-20 px-4 sm:px-6 md:px-8 lg:px-12">            
            <div className="relative z-10">
              {/* Page Header */}
              <div className="text-center mb-16">
                <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-300">
                    About Us
                  </span>
                </h1>
                <div className="w-32 sm:w-40 md:w-48 h-1 bg-gradient-to-r from-purple-400 to-purple-600 mx-auto"></div>
                <p className="font-sans text-lg sm:text-xl text-white/80 max-w-3xl mx-auto mt-6">
                  Discover the story, values, and community that make Namdapha House a unique home away from home.
                </p>
              </div>

              {/* Main About Us Content */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 max-w-7xl mx-auto">
                {/* Left content */}
                <div className="flex flex-col justify-start space-y-8">
                  <div className="space-y-6">
                    <p className="text-white/80 text-lg leading-relaxed">
                      Namdapha House is more than just a residential community—it's a vibrant ecosystem where students from diverse backgrounds come together to learn, grow, and connect.
                    </p>
                    <p className="text-white/80 text-lg leading-relaxed">
                      Named after the Namdapha National Park in Arunachal Pradesh, our house embodies the spirit of biodiversity, resilience, and unity that the park represents.
                    </p>
                    <p className="text-white/80 text-lg leading-relaxed">
                      Our mission is to cultivate an inclusive environment that fosters academic excellence, personal development, and lifelong friendships among our residents.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-black/40 backdrop-blur-xl p-6 rounded-xl border border-white/10">
                      <div className="w-12 h-12 bg-purple-600/50 rounded-full flex items-center justify-center mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                        </svg>
                      </div>
                      <h4 className="text-white font-display font-semibold text-lg mb-2">Diverse Community</h4>
                      <p className="text-white/70 text-sm">Students from all walks of life</p>
                    </div>
                    
                    <div className="bg-black/40 backdrop-blur-xl p-6 rounded-xl border border-white/10">
                      <div className="w-12 h-12 bg-purple-600/50 rounded-full flex items-center justify-center mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                      </div>
                      <h4 className="text-white font-display font-semibold text-lg mb-2">Innovation Hub</h4>
                      <p className="text-white/70 text-sm">Fostering creative solutions</p>
                    </div>
                    
                    <div className="bg-black/40 backdrop-blur-xl p-6 rounded-xl border border-white/10">
                      <div className="w-12 h-12 bg-purple-600/50 rounded-full flex items-center justify-center mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      </div>
                      <h4 className="text-white font-display font-semibold text-lg mb-2">Community Support</h4>
                      <p className="text-white/70 text-sm">Always here for each other</p>
                    </div>
                    
                    <div className="bg-black/40 backdrop-blur-xl p-6 rounded-xl border border-white/10">
                      <div className="w-12 h-12 bg-purple-600/50 rounded-full flex items-center justify-center mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <h4 className="text-white font-display font-semibold text-lg mb-2">Academic Excellence</h4>
                      <p className="text-white/70 text-sm">Striving for the best</p>
                    </div>
                  </div>
                </div>
                
                {/* Right content - Animated Values Card */}
                <div className="flex flex-col justify-center">
                  <AnimatedValueCard />
                </div>
              </div>

              {/* Additional Sections */}
              <div className="mt-20">
                {/* Our Story Section */}
                <div className="bg-black/30 backdrop-blur-xl rounded-3xl p-8 lg:p-12 mb-12 border border-white/10">
                  <h2 className="font-display text-3xl font-bold text-white mb-6 text-center">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-blue-300">
                      Our Story
                    </span>
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="font-display text-xl font-semibold text-white mb-4">The Beginning</h3>
                      <p className="text-white/80 leading-relaxed">
                        Founded with the vision of creating a harmonious living environment, Namdapha House has grown from a simple residential space to a thriving community hub where innovation meets tradition.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-semibold text-white mb-4">Our Growth</h3>
                      <p className="text-white/80 leading-relaxed">
                        Over the years, we've expanded our programs, enhanced our facilities, and most importantly, strengthened the bonds that make our house a true home for every resident.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Call to Action Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                  <div className="bg-black/50 backdrop-blur-md p-8 rounded-3xl shadow-lg border border-white/10 transition-all hover:border-purple-500/30 hover:shadow-purple-500/20 duration-300">
                    <h2 className="font-display text-2xl font-bold text-white mb-4">
                      Discover Resources
                    </h2>
                    <p className="font-sans text-white/80 text-lg leading-relaxed mb-6">
                      Access a curated collection of tools, guides, and materials to enhance your learning experience.
                    </p>
                    <button className="px-6 py-3 bg-purple-600 text-white rounded-full hover:bg-purple-500 transition-colors shadow-lg shadow-purple-600/30">
                      Explore Resources
                    </button>
                  </div>
                  
                  <div className="bg-black/50 backdrop-blur-md p-8 rounded-3xl shadow-lg border border-white/10 transition-all hover:border-purple-500/30 hover:shadow-purple-500/20 duration-300">
                    <h2 className="font-display text-2xl font-bold text-white mb-4">
                      Join the Community
                    </h2>
                    <p className="font-sans text-white/80 text-lg leading-relaxed mb-6">
                      Connect with fellow members, participate in events, and be part of our vibrant ecosystem.
                    </p>
                    <button className="px-6 py-3 bg-purple-600 text-white rounded-full hover:bg-purple-500 transition-colors shadow-lg shadow-purple-600/30">
                      Get Started
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Layout>
      </div>
    </div>
  );
}

export default AboutUs;