import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import About from './pages/About';
import ImpLinks from './pages/ImpLinks';
import Teams from './pages/Teams';
import HouseCouncil from './pages/HouseCouncil';
import Events from './pages/Events';
import ResourceHub from './pages/ResourceHub';

function App() {
  return (
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
    </Routes>
  );
}

export default App;