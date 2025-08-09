import React from "react";
import { useUser, UserButton } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { FaLink, FaBook, FaUsers, FaHome, FaCalendarAlt } from "react-icons/fa";

const allowedEmails = ["shivangk512@gmail.com", "namdapha-webad@ds.study.iitm.ac.in"];

const sectionCards = [
  { title: "Important Links", route: "/admin/important-links", icon: <FaLink size={40} /> },
  { title: "Resource Hub", route: "/admin/resource-hub", icon: <FaBook size={40} /> },
  { title: "Teams", route: "/admin/teams", icon: <FaUsers size={40} /> },
  { title: "House Council", route: "/admin/house-council", icon: <FaHome size={40} /> },
  { title: "Events", route: "/admin/events", icon: <FaCalendarAlt size={40} /> },
];

const AdminDashboard: React.FC = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  // Block access if not allowed
  if (!user || !allowedEmails.includes(user.emailAddresses[0]?.emailAddress)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-gray-100 to-gray-200">
        <div className="backdrop-blur-lg bg-white/70 p-10 rounded-2xl shadow-2xl border border-gray-200 w-full max-w-sm text-center animate-fade-in">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Access Denied</h2>
          <p className="text-gray-700 mb-6">You do not have permission to view this page.</p>
          <button
            onClick={() => window.Clerk?.signOut(() => window.location.href = "/admin")}
            className="bg-gradient-to-r from-black to-gray-700 hover:from-gray-700 hover:to-black text-white font-semibold px-6 py-2 rounded-lg shadow transition-all duration-200"
          >
            Sign Out & Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-100 to-gray-200 flex flex-col">
      {/* Navbar with logo (hidden on small screens) and left-side dashboard title */}
      <nav className="backdrop-blur-lg bg-white/80 shadow-lg flex items-center justify-between px-6 py-2 mb-8 rounded-b-2xl animate-slide-down w-full fixed top-0 left-0 right-0 border-b border-gray-200 z-10">
        {/* Left: Admin Dashboard title */}
        <span className="text-xl font-extrabold text-gray-900 tracking-wide drop-shadow-lg">Admin Dashboard</span>
        {/* Center: Logo (hidden on small screens) */}
        <div className="hidden md:flex flex-shrink-0 items-center justify-center">
          <img
            src="https://res.cloudinary.com/dogq9gvo8/image/upload/v1754390919/1000073005-modified_a0ou2c.png"
            alt="Logo"
            className="w-12 h-12 rounded-full border-2 border-gray-300 shadow-lg bg-white/60"
            style={{ objectFit: "cover" }}
          />
        </div>
        {/* Right: User info and Clerk button */}
        <div className="flex items-center gap-3">
          <span className="text-gray-900 font-semibold text-base">{user.fullName || user.emailAddresses[0]?.emailAddress}</span>
          <UserButton afterSignOutUrl="/admin" />
        </div>
      </nav>

      {/* Animated Heading */}
      <div className="w-full flex justify-center mt-32 mb-6 px-2">
        <h1
          className="animate-gradient-text text-center text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight"
          style={{
            fontFamily: "'Montserrat', 'Poppins', 'Segoe UI', Arial, sans-serif",
            background: "linear-gradient(90deg, #6366f1, #a78bfa, #818cf8, #6366f1)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Namdapha House Website Content Management System
        </h1>
      </div>

      {/* Cards Section */}
      <div className="flex-1 flex items-center justify-center pt-4 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-4xl px-4 sm:px-6 md:px-8 py-8">
          {sectionCards.map((card, idx) => (
            <div
              key={card.title}
              className="relative bg-white/60 backdrop-blur-lg border border-gray-200 shadow-xl rounded-2xl p-6 sm:p-8 m-2 flex flex-col items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-105 hover:bg-white/80 animate-fade-in"
              style={{ animationDelay: `${idx * 0.1}s` }}
              onClick={() => navigate(card.route)}
            >
              <div className="mb-4 text-indigo-600 drop-shadow-lg">{card.icon}</div>
              <h2 className="text-lg font-bold text-gray-900 mb-2 text-center">{card.title}</h2>
              <p className="text-gray-700 text-center mb-4">Update or manage {card.title.toLowerCase()} here.</p>
              <span className="absolute top-4 right-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg animate-pulse">Admin</span>
            </div>
          ))}
        </div>
      </div>

      {/* Animations */}
      <style>
        {`
          .animate-fade-in {
            animation: fadeIn 0.7s ease both;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px);}
            to { opacity: 1; transform: translateY(0);}
          }
          .animate-slide-down {
            animation: slideDown 0.7s cubic-bezier(.68,-0.55,.27,1.55) both;
          }
          @keyframes slideDown {
            from { opacity: 0; transform: translateY(-40px);}
            to { opacity: 1; transform: translateY(0);}
          }
          .animate-pulse {
            animation: pulse 1.5s infinite;
          }
          @keyframes pulse {
            0% { box-shadow: 0 0 0 0 rgba(99,102,241,0.7);}
            70% { box-shadow: 0 0 0 10px rgba(99,102,241,0);}
            100% { box-shadow: 0 0 0 0 rgba(99,102,241,0);}
          }
          .animate-gradient-text {
            background-size: 200% 200%;
            animation: gradientMove 3s ease-in-out infinite;
          }
          @keyframes gradientMove {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>
    </div>
  );
};

export default AdminDashboard;