import React from "react";
import { SignIn, useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

const AdminLogin: React.FC = () => {
  const { isSignedIn } = useUser();

  if (isSignedIn) {
    return <Navigate to="/admin/dashboard" />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <SignIn
        path="/admin"
        routing="path"
        redirectUrl="/admin/dashboard"
        signUpUrl=""
      />
    </div>
  );
};

export default AdminLogin;