import React from "react";
import CustomSidebar from "../components/CustomSidebar";

const AdminSettings: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <CustomSidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />
      <main className={`flex-1 flex flex-col py-12 px-2 transition-all duration-500 ${sidebarCollapsed ? "ml-24" : "ml-72"}`}>
        <div className="w-full max-w-7xl">
          <h1 className="text-3xl font-extrabold mb-8 text-muted-foreground text-left">Settings</h1>
          <div className="max-w-xl mx-auto mt-16 p-8 rounded-2xl border border-border bg-white/80 shadow-lg">
           
            <div className="flex items-center gap-4">
              <span className="font-semibold">Theme:</span>
              <span className="text-muted-foreground">Dark Theme is currently not available.</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminSettings;