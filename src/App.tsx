import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import About from './pages/About';
import ImpLinks from './pages/ImpLinks';

function App() {
  return (
    <Routes>
      {/* Default route (Landing Page) */}
      <Route path="/home" element={<LandingPage />} />

      {/* Other routes */}
      <Route path="/about" element={<div>hi</div>} />
      <Route path="/imp-links" element={<ImpLinks />} />
    </Routes>
  );
}

export default App;