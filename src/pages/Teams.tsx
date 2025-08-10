import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { motion } from 'framer-motion';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
  description: string;
  email: string;
}

const Teams = () => {
  const [webOps, setWebOps] = useState<TeamMember[]>([]);
  const [prTeam, setPrTeam] = useState<TeamMember[]>([]);
  const [outreach, setOutreach] = useState<TeamMember[]>([]);

  useEffect(() => {
    fetch("/api/web-ops-team")
      .then(res => res.json())
      .then(data => setWebOps(data));
    fetch("/api/pr-team")
      .then(res => res.json())
      .then(data => setPrTeam(data));
    fetch("/api/outreach-team")
      .then(res => res.json())
      .then(data => setOutreach(data));
  }, []);

  return (
    <div className="min-h-screen relative bg-black">
      {/* Optional background image, similar to HouseCouncil */}
      <div 
        className="fixed inset-0 z-[1]"
        style={{
          backgroundImage: `url(https://res.cloudinary.com/dogq9gvo8/image/upload/v1754394299/20250728_1415_Indian_Subcontinent_Trees_remix_01k1835p9df9a9pvr4h1dtftz4_xdzp1e.png)`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          opacity: 0.4,
        }}
      />
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
                Web-ops Team
              </h1>
              <div className="w-16 sm:w-20 md:w-24 h-1 bg-blue-500 mx-auto mb-2 sm:mb-3 md:mb-4"></div>
              <div className="text-lg sm:text-xl md:text-2xl font-semibold text-blue-300 mb-2 sm:mb-3 md:mb-4">2025-26</div>
              <p className="text-white/70 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-2 sm:px-4">
                The tech backbone of our house, building and maintaining our digital presence.
              </p>
            </motion.div>

            {/* Web-ops Team */}
            <motion.div
              className="max-w-7xl mx-auto mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 justify-items-center">
                {webOps.map((member, index) => (
                  <motion.div
                    key={member.id}
                    className="individual-team-member"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.1
                    }}
                    whileHover={{
                      y: -16,
                      scale: 1.05,
                      boxShadow: "0 12px 32px -8px rgba(140,80,255,0.25)"
                    }}
                  >
                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden transition-all duration-300 max-w-xl w-full mx-auto">
                      {/* Profile Image */}
                      <div className="p-4 pb-3">
                        <div className="relative w-full h-64 sm:h-60 md:h-56 lg:h-60 mx-auto mb-3">
                          <div className="w-full h-full rounded-2xl overflow-hidden shadow-2xl transition-all duration-500">
                            <div className="relative w-full h-full">
                              <div 
                                className="w-full h-full bg-cover bg-center bg-purple-400 rounded-2xl"
                                style={{ backgroundImage: `url(${member.image})` }}
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-2xl"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Member Info */}
                      <div className="px-4 pb-5 text-center">
                        <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                          {member.name}
                        </h3>
                        <div className="space-y-1 mb-4">
                          <p className="text-purple-300 text-sm font-medium">{member.role}</p>
                        </div>
                        <p className="text-white/70 text-sm leading-relaxed pt-2 border-t border-white/10">
                          {member.description}
                        </p>
                        <div className="flex justify-center gap-2 mt-4">
                          <a
                            href={`mailto:${member.email}`}
                            className="p-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg transition-colors text-xs"
                            title={`Email ${member.name}`}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                          </a>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* PR Team */}
            <motion.div
              className="max-w-7xl mx-auto mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="text-center mb-8 px-0">
                <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
                  PR Team
                </h2>
                <div className="w-16 h-1 bg-pink-500 mx-auto mb-3"></div>
                <p className="text-white/70 text-sm sm:text-base max-w-xl mx-auto">
                  The voice of our house, handling communications and public relations.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 justify-items-center">
                {prTeam.map((member, index) => (
                  <motion.div
                    key={member.id}
                    className="individual-team-member"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.1
                    }}
                    whileHover={{
                      y: -16,
                      scale: 1.05,
                      boxShadow: "0 12px 32px -8px rgba(255,80,180,0.18)"
                    }}
                  >
                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden transition-all duration-300 max-w-lg mx-auto">
                      {/* Profile Image */}
                      <div className="p-4 pb-3">
                        <div className="relative w-full h-64 mx-auto mb-3">
                          <div className="w-full h-full rounded-2xl overflow-hidden shadow-2xl transition-all duration-500">
                            <div className="relative w-full h-full">
                              <div
                                className="w-full h-full bg-cover bg-center bg-pink-400 rounded-2xl"
                                style={{ backgroundImage: `url(${member.image})` }}
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-2xl"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Member Info */}
                      <div className="px-4 pb-5 text-center">
                        <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                          {member.name}
                        </h3>
                        <div className="space-y-1 mb-4">
                          <p className="text-pink-300 text-sm font-medium">{member.role}</p>
                        </div>
                        <p className="text-white/70 text-sm leading-relaxed pt-2 border-t border-white/10">
                          {member.description}
                        </p>
                        <div className="flex justify-center gap-2 mt-4">
                          <a
                            href={`mailto:${member.email}`}
                            className="p-2 bg-pink-600 hover:bg-pink-500 text-white rounded-lg transition-colors text-xs"
                            title={`Email ${member.name}`}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                          </a>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Outreach Team */}
            <motion.div
              className="max-w-7xl mx-auto mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="text-center mb-8 px-0">
                <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
                  Outreach Team
                </h2>
                <div className="w-16 h-1 bg-orange-500 mx-auto mb-3"></div>
                <p className="text-white/70 text-sm sm:text-base max-w-xl mx-auto">
                  The connectors, building relationships and expanding our reach.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 justify-items-center">
                {outreach.map((member, index) => (
                  <motion.div
                    key={member.id}
                    className="individual-team-member"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.1
                    }}
                    whileHover={{
                      y: -16,
                      scale: 1.05,
                      boxShadow: "0 12px 32px -8px rgba(255,140,40,0.18)"
                    }}
                  >
                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden transition-all duration-300 max-w-lg mx-auto">
                      {/* Profile Image */}
                      <div className="p-4 pb-3">
                        <div className="relative w-full h-64 mx-auto mb-3">
                          <div className="w-full h-full rounded-2xl overflow-hidden shadow-2xl transition-all duration-500">
                            <div className="relative w-full h-full">
                              <div
                                className="w-full h-full bg-cover bg-center bg-orange-400 rounded-2xl"
                                style={{ backgroundImage: `url(${member.image})` }}
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-2xl"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Member Info */}
                      <div className="px-4 pb-5 text-center">
                        <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                          {member.name}
                        </h3>
                        <div className="space-y-1 mb-4">
                          <p className="text-orange-300 text-sm font-medium">{member.role}</p>
                        </div>
                        <p className="text-white/70 text-sm leading-relaxed pt-2 border-t border-white/10">
                          {member.description}
                        </p>
                        <div className="flex justify-center gap-2 mt-4">
                          <a
                            href={`mailto:${member.email}`}
                            className="p-2 bg-orange-600 hover:bg-orange-500 text-white rounded-lg transition-colors text-xs"
                            title={`Email ${member.name}`}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                          </a>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </Layout>
      </div>
    </div>
  );
};

export default Teams;