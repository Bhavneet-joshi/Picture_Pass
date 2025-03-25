import './App.css';
import Home from './pages/Home';
import Header from './components/ui/Header';
import AnimatedNavbar from './components/ui/AnimatedNavbar';
import SoloMovie from './pages/SoloMovie';
import Pagetemplate from './pages/PageTemplate';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SeatSelection from './pages/SeatSelection';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<PageTemplate />} />
            <Route path="/movie/:id" element={<SoloMovie />} />
            <Route path="/buy-tickets/:id" element={<SeatSelection />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <AnimatedNavbar />
      </div>
    </Router>
  );
}

export default App;
