import { useState } from 'react';
import Layout from '../components/Layout';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiPhone, FiMessageSquare, FiSend } from 'react-icons/fi';

const JoinUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
    year: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        department: '',
        year: '',
        message: ''
      });
    }, 3000);
  };

  return (
    <div>
      <Layout>
      <div className="min-h-screen py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
                Join Namdapha House
              </span>
            </h1>
            <div className="w-32 sm:w-40 h-1 bg-gradient-to-r from-blue-400 to-indigo-600 mx-auto mb-6"></div>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              Become part of our vibrant community and experience the spirit of unity, excellence, and innovation at IIT Madras.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Side - Why Join Us */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-black/30 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
                <h2 className="text-2xl font-bold text-white mb-6">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-cyan-300">
                    Why Join Us?
                  </span>
                </h2>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-blue-600/50 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm">🏆</span>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-2">Excellence</h3>
                      <p className="text-white/70 text-sm">Strive for academic and personal excellence in a supportive environment.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-blue-600/50 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm">🤝</span>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-2">Community</h3>
                      <p className="text-white/70 text-sm">Build lifelong friendships and connections with diverse peers.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-blue-600/50 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm">💡</span>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-2">Innovation</h3>
                      <p className="text-white/70 text-sm">Engage in creative projects and innovative thinking.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-blue-600/50 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm">🌟</span>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-2">Leadership</h3>
                      <p className="text-white/70 text-sm">Develop leadership skills through various house activities and events.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="bg-black/30 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-4">Have Questions?</h3>
                <p className="text-white/70 mb-4">Feel free to reach out to our team for any queries about joining Namdapha House.</p>
                <div className="space-y-2 text-sm">
                  <p className="text-white/80">📧 namdapha-sec@ds.study.iitm.ac.in</p>
                  <p className="text-white/80">📧 namdapha-ds@ds.study.iitm.ac.in</p>
                </div>
              </div>
            </motion.div>

            {/* Right Side - Application Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="bg-black/30 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
                <h2 className="text-2xl font-bold text-white mb-6">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-cyan-300">
                    Application Form
                  </span>
                </h2>

                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-white/80 text-sm font-medium mb-2">
                        <FiUser className="inline mr-2" />
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div>
                      <label className="block text-white/80 text-sm font-medium mb-2">
                        <FiMail className="inline mr-2" />
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your email"
                      />
                    </div>

                    <div>
                      <label className="block text-white/80 text-sm font-medium mb-2">
                        <FiPhone className="inline mr-2" />
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your phone number"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-white/80 text-sm font-medium mb-2">
                          Department *
                        </label>
                        <select
                          name="department"
                          value={formData.department}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="" className="bg-gray-800">Select Department</option>
                          <option value="Computer Science" className="bg-gray-800">Computer Science</option>
                          <option value="Mechanical Engineering" className="bg-gray-800">Mechanical Engineering</option>
                          <option value="Electrical Engineering" className="bg-gray-800">Electrical Engineering</option>
                          <option value="Civil Engineering" className="bg-gray-800">Civil Engineering</option>
                          <option value="Other" className="bg-gray-800">Other</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-white/80 text-sm font-medium mb-2">
                          Year *
                        </label>
                        <select
                          name="year"
                          value={formData.year}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="" className="bg-gray-800">Select Year</option>
                          <option value="1st Year" className="bg-gray-800">1st Year</option>
                          <option value="2nd Year" className="bg-gray-800">2nd Year</option>
                          <option value="3rd Year" className="bg-gray-800">3rd Year</option>
                          <option value="4th Year" className="bg-gray-800">4th Year</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-white/80 text-sm font-medium mb-2">
                        <FiMessageSquare className="inline mr-2" />
                        Why do you want to join Namdapha House?
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        placeholder="Tell us why you'd like to be part of our community..."
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-blue-600/30 hover:shadow-xl hover:shadow-blue-500/40 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Submitting...
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <FiSend className="mr-2" />
                          Submit Application
                        </div>
                      )}
                    </button>
                  </form>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Application Submitted!</h3>
                    <p className="text-white/70">
                      Thank you for your interest in joining Namdapha House. We'll get back to you soon!
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
    
    {/* Footer */}
    <Footer />
    </div>
  );
};

export default JoinUs;
