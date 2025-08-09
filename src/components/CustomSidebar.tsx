import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Link,
  Book,
  Users,
  Home,
  Calendar,
  Settings,
  User,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useUser, UserButton } from "@clerk/clerk-react";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card"; // Import Card components

const navLinks = [
  { name: "Dashboard", route: "/admin/dashboard", icon: <LayoutDashboard size={20} /> },
  { name: "Important Links", route: "/admin/important-links", icon: <Link size={20} /> },
  { name: "Resource Hub", route: "/admin/resource-hub", icon: <Book size={20} /> },
  { name: "Teams", route: "/admin/teams", icon: <Users size={20} /> },
  { name: "House Council", route: "/admin/house-council", icon: <Home size={20} /> },
  { name: "Events", route: "/admin/events", icon: <Calendar size={20} /> },
  { name: "Settings", route: "/admin/settings", icon: <Settings size={20} /> },
];

const CustomSidebar: React.FC<{ collapsed: boolean; setCollapsed: (c: boolean) => void }> = ({ collapsed, setCollapsed }) => {
  const [open, setOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useUser();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) setOpen(true);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isMobile) setOpen(false);
    else setOpen(true);
  }, [isMobile]);

  return (
    <>
      {isMobile && (
        <button
          className="fixed top-4 left-4 z-50 bg-muted p-2 rounded-lg shadow-lg"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      )}
      <aside
        className={`fixed top-0 left-0 h-full ${collapsed ? "w-20" : "w-64"} bg-sidebar text-sidebar-foreground border-r border-sidebar-border flex flex-col z-40
          transition-all duration-500 ease-in-out
          ${open ? "translate-x-0 opacity-100 scale-100" : "-translate-x-full opacity-0 scale-95"}
          ${isMobile ? "absolute" : ""}
        `}
      >
        <Card className="m-0 h-full rounded-none shadow-none border-none bg-sidebar flex flex-col">
          <CardHeader className={`flex flex-row items-center gap-4 px-6 pt-8 pb-6 border-b border-border relative`}>
            {/* Hide logo when collapsed */}
            {!collapsed && (
              <img
                src="https://res.cloudinary.com/dogq9gvo8/image/upload/v1754390919/1000073005-modified_a0ou2c.png"
                alt="Admin Profile"
                className="w-11 h-11 rounded-full border-2 border-border object-cover"
              />
            )}
            {/* Only show title if not collapsed */}
            <CardTitle className={`text-xl font-bold text-muted-foreground transition-all duration-300 ${collapsed ? "opacity-0 w-0" : "opacity-100 w-auto"}`}>
              Admin Panel
            </CardTitle>
            {/* Toggle button */}
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 rounded-full p-1 shadow hover:bg-purple-100 transition"
              onClick={() => setCollapsed(!collapsed)}
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
            </button>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col p-0">
            <nav className="flex-1">
              <ul className="py-4">
                {navLinks.map(link => (
                  <li key={link.name}>
                    <button
                      onClick={() => {
                        navigate(link.route);
                        if (isMobile) setOpen(false);
                      }}
                      className={`flex gap-3 items-center px-4 py-2 font-medium w-full transition text-left
                        ${location.pathname === link.route
                          ? "bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-bold shadow"
                          : "hover:bg-gray-200 text-muted-foreground"}
                      `}
                    >
                      {/* Icon always visible */}
                      {React.cloneElement(link.icon, {
                        className: location.pathname === link.route ? "text-white" : "text-muted-foreground",
                      })}
                      {/* Text hidden when collapsed */}
                      <span className={`text-base font-semibold whitespace-nowrap transition-all duration-300 ${collapsed ? "opacity-0 w-0" : "opacity-100 w-auto"}`}>
                        {link.name}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
            {/* User info stays at the very bottom, hide text when collapsed */}
            <div className="mt-auto px-6 py-4 border-t border-border flex items-center gap-3">
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-7 h-7 border-2 border-border",
                    userButtonPopoverCard: "rounded-xl shadow-lg",
                  },
                  variables: {
                    colorPrimary: "#8b5cf6", // purple
                  },
                }}
                afterSignOutUrl="/"
              />
              <span className={`text-sm text-muted-foreground font-medium transition-all duration-300 ${collapsed ? "opacity-0 w-0" : "opacity-100 w-auto"}`}>
                {user?.emailAddresses[0]?.emailAddress || "admin@example.com"}
              </span>
            </div>
          </CardContent>
        </Card>
      </aside>
    </>
  );
};

export default CustomSidebar;