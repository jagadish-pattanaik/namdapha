import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import { Toaster } from "sonner";
import LandingPage from './pages/LandingPage';
import About from './pages/About';
import ImpLinks from './pages/ImpLinks';
import Teams from './pages/Teams';
import HouseCouncil from './pages/HouseCouncil';
import Events from './pages/Events';
import ResourceHub from './pages/ResourceHub';
import WhatsappVerify from './pages/WhatsappVerify';
import AdminLogin from './adminpages/AdminLogin';
import AdminDashboard from './adminpages/AdminDashboard';
import AdminImportantLinks from './adminpages/AdminImportantLinks';
import AdminResourceHub from './adminpages/AdminResourceHub';
import AdminEvents from "./adminpages/AdminEvents";
import AdminSettings from './adminpages/AdminSetting'; // Import your settings page
import AdminHouseCouncil from './adminpages/AdminHouseCouncil';
import AdminTeams from './adminpages/AdminTeams';

function App() {
  return (
    <>
      <Routes>
        {/* Default route (Landing Page) */}
        <Route path="/home" element={<LandingPage />} />
        
        {/* Redirect from root to home */}
        <Route path="/" element={<Navigate replace to="/home" />} />

        {/* Other routes */}
        <Route path="/about" element={<About/>} />
        <Route path="/imp-links" element={<ImpLinks />} />
        
        {/* New routes */}
        <Route path="/teams" element={<Teams />} />
        <Route path="/house-council" element={<HouseCouncil />} />
        <Route path="/events" element={<Events />} />
        <Route path="/resource-hub" element={<ResourceHub />} />
        <Route path="/whatsapp-verify" element={<WhatsappVerify />} /> {/* Added route */}
        <Route path="/admin" element={<AdminLogin />} /> {/* Added Admin route */}
        <Route
          path="/admin/dashboard"
          element={
            <>
              <SignedIn>
                <AdminDashboard />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn redirectUrl="/admin" />
              </SignedOut>
            </>
          }
        />
        <Route path="/admin/important-links" element={<AdminImportantLinks />} />
        <Route path="/admin/resource-hub" element={<AdminResourceHub />} />
        <Route path="/admin/events" element={<AdminEvents />} />
        <Route path="/admin/settings" element={<AdminSettings />} />
        <Route path="/admin/house-council" element={<AdminHouseCouncil />} /> {/* Added House Council route */}
        <Route path="/admin/teams" element={<AdminTeams />} /> {/* Added Teams route */}
      </Routes>
      <Toaster richColors position="top-right" />
    </>
  );
}

export default App;