import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMessageCircle, FiX, FiSend } from 'react-icons/fi';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatbotData {
  [key: string]: string;
}

const FloatingChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm the Namdapha House assistant. Ask me about our house, events, council members, or anything else!",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Chatbot knowledge base
  const chatbotData: ChatbotData = {
    'house': "Namdapha House is a vibrant residential community at IIT Madras, named after the Namdapha National Park in Arunachal Pradesh. We embody the spirit of biodiversity, resilience, and unity.",
    'secretary': "Our House Secretary is Devansh Malhotra from Computer Science department. He leads the house with dedication and vision for academic excellence.",
    'deputy secretary': "Sravya N is our Deputy Secretary from Mechanical Engineering, supporting house activities and fostering community spirit among residents.",
    'web admin': "Harshita Dudeja is our Web Admin from Information Technology, managing our digital presence and maintaining house website and resources.",
    'council': "Our House Council consists of Secretary (Devansh Malhotra), Deputy Secretary (Sravya N), and Web Admin (Harshita Dudeja). We also have 10 regional coordinators covering different zones across India.",
    'events': "We organize various events including Cultural Festivals, Tech Symposiums, Sports Tournaments, and Career Fairs. Check our Events page for upcoming activities!",
    'values': "Our core values are Excellence, Inclusivity, Innovation, and Community. We strive for academic excellence while celebrating diversity and fostering innovation.",
    'contact': "You can contact our leadership team - Secretary: namdapha-sec@ds.study.iitm.ac.in, Deputy Secretary: namdapha-ds@ds.study.iitm.ac.in, Web Admin: namdapha-webad@ds.study.iitm.ac.in",
    'resources': "Our Resource Hub provides access to academic calendars, student handbooks, library resources, career information, and wellness materials.",
    'join': "To join Namdapha House, you can contact our House Secretary or visit our Important Links page for more information about the application process.",
    'location': "Namdapha House is located at IIT Madras campus, Chennai. We're part of the General Student Body residential community.",
    'activities': "We organize cultural festivals, academic symposiums, sports tournaments, career fairs, wellness programs, and regional coordination activities.",
    'regional coordinators': "We have 10 regional coordinators covering North Zone, South Zone, West Zone, East Zone, Central Zone, Northeast Zone, Punjab, Kerala, Gujarat, and Rajasthan regions.",
    'about': "Namdapha House is more than just a residential community—it's a vibrant ecosystem where students from diverse backgrounds come together to learn, grow, and connect."
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const findBestMatch = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    
    // Direct keyword matches
    for (const [key, value] of Object.entries(chatbotData)) {
      if (lowerQuery.includes(key)) {
        return value;
      }
    }
    
    // Fallback responses for common patterns
    if (lowerQuery.includes('hello') || lowerQuery.includes('hi') || lowerQuery.includes('hey')) {
      return "Hello! Welcome to Namdapha House. How can I help you today?";
    }
    
    if (lowerQuery.includes('thank')) {
      return "You're welcome! Is there anything else you'd like to know about Namdapha House?";
    }
    
    if (lowerQuery.includes('help')) {
      return "I can help you with information about our house, council members, events, values, contact details, and resources. What would you like to know?";
    }
    
    // Default response
    return "I'm not sure about that specific question, but I can help you with information about Namdapha House, our council members, events, values, or contact details. Could you try rephrasing your question?";
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse = findBestMatch(inputValue);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.button
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-lg transition-all duration-300 ${
          isOpen 
            ? 'bg-red-500 hover:bg-red-600' 
            : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500'
        }`}
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{
          rotate: isOpen ? 180 : 0,
        }}
      >
        {isOpen ? (
          <FiX className="w-6 h-6 text-white" />
        ) : (
          <FiMessageCircle className="w-6 h-6 text-white" />
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-24 right-6 z-40 w-80 h-96 bg-black/90 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden"
          >
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-3">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <FiMessageCircle className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm">Namdapha Assistant</h3>
                  <p className="text-white/80 text-xs">Always here to help</p>
                </div>
              </div>
            </div>

            {/* Messages Container */}
            <div className="flex-1 p-4 h-64 overflow-y-auto space-y-3 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-purple-600/50">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                      message.sender === 'user'
                        ? 'bg-purple-600 text-white'
                        : 'bg-white/10 text-white border border-white/10'
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
              
              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/10 border border-white/10 px-3 py-2 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t border-white/10 p-3">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything..."
                  className="flex-1 bg-white/10 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-white/60 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  className="p-2 bg-purple-600 hover:bg-purple-500 disabled:bg-purple-600/50 text-white rounded-lg transition-colors"
                >
                  <FiSend className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingChatbot;
