import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FreeTextHumanizer from './FreeTextHumanizer';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Disclaimer from './pages/Disclaimer';
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FreeTextHumanizer />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/disclaimer" element={<Disclaimer />} />
      </Routes>
    </Router>
  );
}

export default App;