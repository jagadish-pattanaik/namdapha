import React, { useState } from 'react';
import Layout from '../components/Layout';
import Footer from '../components/Footer';
import { motion, AnimatePresence } from 'framer-motion';


interface CouncilMember {
  id: number;
  name: string;
  position: string;
  image: string;
  description: string;
  department: string;
}

interface RegionalCoordinator {
  id: number;
  name: string;
  region: string;
  image: string;
  description: string;
  department: string;
}

const HouseCouncil = () => {
  const [hoveredMember, setHoveredMember] = useState<number | null>(null);
  const [hoveredCoordinator, setHoveredCoordinator] = useState<number | null>(null);

  // Council members data
  const councilMembers: CouncilMember[] = [
    {
      id: 1,
      name: "Devansh Malhotra",
      position: "Secretary",
      image: "https://res.cloudinary.com/dogq9gvo8/image/upload/v1754402073/WhatsApp_Image_2025-08-05_at_19.18.21_lafgtv.jpg",
      description: "Leading the house with dedication and vision for academic excellence.",
      department: "Computer Science"
    },
    {
      id: 2,
      name: "Sanya N",
      position: "Deputy Secretary",
      image: "https://res.cloudinary.com/dogq9gvo8/image/upload/v1754402834/srav2_ozsrmg.jpg",
      description: "Supporting house activities and fostering community spirit among residents.",
      department: "Mechanical Engineering"
    },
    {
      id: 3,
      name: "Harshita Dudeja",
      position: "Web Admin",
      image: "https://res.cloudinary.com/dogq9gvo8/image/upload/v1754402074/IMG_20241013_185028_753_fa3olk.webp",
      description: "Managing digital presence and maintaining house website and resources.",
      department: "Information Technology"
    }
  ];



  // Regional coordinators data (5 columns x 2 rows = 10 coordinators)
  const regionalCoordinators: RegionalCoordinator[] = [
    // Row 1
    {
      id: 1,
      name: "Rahul Sharma",
      region: "North Zone",
      image: "https://res.cloudinary.com/dogq9gvo8/image/upload/v1754390919/1000073005-modified_a0ou2c.png",
      description: "Coordinating activities for northern region states and building community connections.",
      department: "Civil Engineering"
    },
    {
      id: 2,
      name: "Priya Singh",
      region: "South Zone",
      image: "https://res.cloudinary.com/dogq9gvo8/image/upload/v1754487754/20250728_1547_Group_Beach_Gathering_remix_01k188e475eezvtpq51c33z8c3-2_w85umz.png",
      description: "Managing southern region coordination and cultural exchange programs.",
      department: "Electronics Engineering"
    },
    {
      id: 3,
      name: "Amit Patel",
      region: "West Zone",
      image: "https://res.cloudinary.com/dogq9gvo8/image/upload/v1754394299/20250728_1415_Indian_Subcontinent_Trees_remix_01k1835p9df9a9pvr4h1dtftz4_xdzp1e.png",
      description: "Facilitating western region activities and inter-state collaborations.",
      department: "Mechanical Engineering"
    },
    {
      id: 4,
      name: "Sneha Das",
      region: "East Zone",
      image: "https://res.cloudinary.com/dogq9gvo8/image/upload/v1754402073/WhatsApp_Image_2025-08-05_at_19.18.21_lafgtv.jpg",
      description: "Leading eastern region coordination and fostering regional unity.",
      department: "Computer Science"
    },
    {
      id: 5,
      name: "Vikash Kumar",
      region: "Central Zone",
      image: "https://res.cloudinary.com/dogq9gvo8/image/upload/v1754402834/srav2_ozsrmg.jpg",
      description: "Organizing central region events and maintaining regional connections.",
      department: "Information Technology"
    },
    // Row 2
    {
      id: 6,
      name: "Ananya Reddy",
      region: "Northeast Zone",
      image: "https://res.cloudinary.com/dogq9gvo8/image/upload/v1754402074/IMG_20241013_185028_753_fa3olk.webp",
      description: "Coordinating northeast region activities and cultural celebrations.",
      department: "Chemical Engineering"
    },
    {
      id: 7,
      name: "Rohit Gupta",
      region: "Punjab Region",
      image: "https://res.cloudinary.com/dogq9gvo8/image/upload/v1754390919/1000073005-modified_a0ou2c.png",
      description: "Managing Punjab region coordination and student welfare programs.",
      department: "Electrical Engineering"
    },
    {
      id: 8,
      name: "Kavya Nair",
      region: "Kerala Region",
      image: "https://res.cloudinary.com/dogq9gvo8/image/upload/v1754487754/20250728_1547_Group_Beach_Gathering_remix_01k188e475eezvtpq51c33z8c3-2_w85umz.png",
      description: "Leading Kerala region initiatives and community building activities.",
      department: "Biotechnology"
    },
    {
      id: 9,
      name: "Arjun Mehta",
      region: "Gujarat Region",
      image: "https://res.cloudinary.com/dogq9gvo8/image/upload/v1754394299/20250728_1415_Indian_Subcontinent_Trees_remix_01k1835p9df9a9pvr4h1dtftz4_xdzp1e.png",
      description: "Coordinating Gujarat region events and fostering regional pride.",
      department: "Aerospace Engineering"
    },
    {
      id: 10,
      name: "Ritu Agarwal",
      region: "Rajasthan Region",
      image: "https://res.cloudinary.com/dogq9gvo8/image/upload/v1754402073/WhatsApp_Image_2025-08-05_at_19.18.21_lafgtv.jpg",
      description: "Managing Rajasthan region coordination and traditional celebrations.",
      department: "Architecture"
    }
  ];

  return (
    <div className="min-h-screen relative bg-black">
      {/* Main Content */}
      <div className="relative z-[2]">
        <Layout bgImage={null}>
          <div className="py-6 px-3 sm:px-4 md:px-6 lg:px-8">
            {/* Header Section */}
            <motion.div 
              className="text-center mb-8 sm:mb-10"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 sm:mb-4 md:mb-6">
                House Council
              </h1>
              <div className="w-16 sm:w-20 md:w-24 h-1 bg-purple-500 mx-auto mb-2 sm:mb-3 md:mb-4"></div>
              <div className="text-lg sm:text-xl md:text-2xl font-semibold text-purple-300 mb-2 sm:mb-3 md:mb-4">2025-26</div>
              <p className="text-white/70 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-2 sm:px-4">
                Meet the dedicated leaders who guide our house community.
              </p>
            </motion.div>

            {/* Council Members Grid */}
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {councilMembers.map((member, index) => (
                  <motion.div
                    key={member.id}
                    className="group"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.5, 
                      delay: index * 0.1
                    }}
                    onMouseEnter={() => setHoveredMember(member.id)}
                    onMouseLeave={() => setHoveredMember(null)}
                    whileHover={{ y: -8 }}
                    style={{ perspective: 1000 }}
                  >
                    {/* Modern Card - Optimized for mobile */}
                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden transition-all duration-300 hover:border-purple-500/30 hover:bg-white/8 max-w-sm mx-auto md:max-w-none">
                      {/* Profile Image - Maintain height, optimize width for mobile */}
                      <div className="p-4 pb-3">
                        <motion.div 
                          className="relative w-full h-64 sm:h-60 md:h-56 lg:h-60 mx-auto mb-3"
                          whileHover={{ 
                            rotateX: -20,
                            rotateY: 20,
                            scale: 1.15,
                            z: 80
                          }}
                          transition={{ 
                            type: "spring", 
                            stiffness: 400, 
                            damping: 25 
                          }}
                        >
                          <div className="w-full h-full rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500">
                            {/* Enhanced 3D Shadow Effects */}
                            <div className="absolute -inset-2 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-3xl blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:translate-y-2"></div>
                            <div className="absolute -inset-1 bg-black/30 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:translate-y-1"></div>
                            
                            {/* Main Image - Full width with maintained aspect ratio */}
                            <div className="relative w-full h-full">
                              <div 
                                className="w-full h-full bg-cover bg-center bg-purple-400 rounded-2xl"
                                style={{ backgroundImage: `url(${member.image})` }}
                              />
                              {/* Subtle gradient overlay */}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-2xl"></div>
                              
                              {/* Enhanced 3D depth effect */}
                              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                            </div>
                          </div>
                        </motion.div>
                      </div>

                      {/* Member Info - Compact but readable */}
                      <div className="px-4 pb-5 text-center">
                        <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                          {member.name}
                        </h3>
                        
                        <div className="space-y-1 mb-4">
                          <p className="text-purple-300 text-sm font-medium">{member.position}</p>
                          <p className="text-white/60 text-xs">{member.department}</p>
                        </div>

                        {/* Description on Hover */}
                        <AnimatePresence>
                          {hoveredMember === member.id && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <p className="text-white/70 text-sm leading-relaxed pt-2 border-t border-white/10">
                                {member.description}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Simple Contact Buttons */}
                        <div className={`flex justify-center gap-2 mt-4 transition-opacity duration-200 ${hoveredMember === member.id ? 'opacity-100' : 'opacity-0'}`}>
                          <button className="p-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg transition-colors text-xs">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                          </button>
                          <button className="p-2 bg-gray-600 hover:bg-gray-500 text-white rounded-lg transition-colors text-xs">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Regional Coordinators Section */}
            <motion.div
              className="mt-12 sm:mt-16 md:mt-20 -mx-3 sm:-mx-4 md:-mx-6 lg:-mx-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {/* Regional Coordinators Header */}
              <div className="text-center mb-8 sm:mb-10 px-3 sm:px-4 md:px-6 lg:px-8">
                <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
                  Regional Coordinators
                </h2>
                <div className="w-16 sm:w-20 md:w-24 h-1 bg-orange-500 mx-auto mb-3 sm:mb-4"></div>
                <p className="text-white/70 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-2 sm:px-4">
                  Connecting communities across different regions and fostering unity.
                </p>
              </div>

              {/* Regional Coordinators Grid - Remove horizontal padding for edge-to-edge layout */}
              <div className="w-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-8">
                  {regionalCoordinators.map((coordinator, index) => (
                    <motion.div
                      key={coordinator.id}
                      className="group"
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ 
                        duration: 0.5, 
                        delay: index * 0.04
                      }}
                      onMouseEnter={() => setHoveredCoordinator(coordinator.id)}
                      onMouseLeave={() => setHoveredCoordinator(null)}
                      whileHover={{ y: -8 }}
                    >
                      {/* Regional Coordinator Card */}
                      <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden transition-all duration-300 hover:border-orange-500/30 hover:bg-white/8">
                        {/* Profile Image */}
                        <div className="p-4 pb-3">
                          {/* Remove padding and margin for full-width image */}
                          <div className="relative h-64 sm:h-60 md:h-56 lg:h-60 xl:h-64 w-full">
                            <div className="w-full h-full rounded-2xl overflow-hidden shadow-2xl transition-all duration-500">
                              {/* Main Image */}
                              <div className="relative w-full h-full">
                                <div 
                                  className="w-full h-full bg-cover bg-center bg-orange-400 rounded-2xl"
                                  style={{ 
                                    backgroundImage: `url(${coordinator.image})`,
                                    width: '100%',
                                    minWidth: '0', // Remove minWidth restriction
                                    maxWidth: 'none', // Remove maxWidth restriction
                                    margin: 0 // Remove margin
                                  }}
                                />
                                {/* Subtle gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-2xl"></div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Coordinator Info */}
                        <div className="px-4 pb-5 text-center">
                          <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                            {coordinator.name}
                          </h3>
                          
                          <div className="space-y-1 mb-4">
                            <p className="text-orange-300 text-sm font-medium">{coordinator.region}</p>
                            <p className="text-white/60 text-xs">{coordinator.department}</p>
                          </div>

                          {/* Description on Hover */}
                          <AnimatePresence>
                            {hoveredCoordinator === coordinator.id && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden"
                              >
                                <p className="text-white/70 text-sm leading-relaxed pt-2 border-t border-white/10">
                                  {coordinator.description}
                                </p>
                              </motion.div>
                            )}
                          </AnimatePresence>

                          {/* Simple Contact Buttons */}
                          <div className={`flex justify-center gap-2 mt-4 transition-opacity duration-200 ${hoveredCoordinator === coordinator.id ? 'opacity-100' : 'opacity-0'}`}>
                            <button className="p-2 bg-orange-600 hover:bg-orange-500 text-white rounded-lg transition-colors text-xs">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                              </svg>
                            </button>
                            <button className="p-2 bg-gray-600 hover:bg-gray-500 text-white rounded-lg transition-colors text-xs">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Clean CTA Section */}
            <motion.div
              className="text-center mt-12 sm:mt-16 md:mt-20"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
            
            </motion.div>
          </div>
        </Layout>
        
        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default HouseCouncil;