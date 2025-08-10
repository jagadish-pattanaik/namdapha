import React from "react";
import { SignIn, useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";
import { Meteors } from "../components/magicui/meteors";

const AdminLogin: React.FC = () => {
  const { isSignedIn } = useUser();

  if (isSignedIn) {
    return <Navigate to="/admin/dashboard" />;
  }

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-white relative overflow-hidden">
      {/* Meteors animation as full-page background */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <Meteors /> {/* Black meteors */}
      </div>
      {/* Main content above animation */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 px-6 py-10 md:px-10 md:py-16 relative z-10">
        <img
          src="https://res.cloudinary.com/dogq9gvo8/image/upload/v1754390919/1000073005-modified_a0ou2c.png"
          alt="Admin Logo"
          className="w-20 h-20 rounded-full border-2 border-purple-300 mb-6 md:mb-8 shadow-lg"
        />
        <h1 className="text-2xl md:text-3xl font-extrabold text-purple-700 mb-3 md:mb-4 text-center">
          Login into Admin Dashboard
        </h1>
        <p className="text-base md:text-lg text-muted-foreground text-center max-w-md">
          Welcome to the admin panel. Please sign in to manage events, resources, and users.
        </p>
      </div>
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-4 py-8 md:px-6 md:py-0 relative z-10">
        <div className="bg-white/80 rounded-2xl shadow-xl p-6 md:p-8 w-full max-w-md backdrop-blur-lg">
          <SignIn
            path="/admin"
            routing="path"
            redirectUrl="/admin/dashboard"
            signUpUrl=""
          />
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;