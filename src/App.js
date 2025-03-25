import React from 'react';
import './App.css';
import SoloMovie from './pages/SoloMovie';
import PageTemplate from './pages/PageTemplate';
import SeatSelection from './pages/SeatSelection';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import ErrorBoundary from './components/ErrorBoundary';
import Header from './components/ui/Header';
import AnimatedNavbar from './components/ui/AnimatedNavbar';

function App() {
  return (
    <div className="App">
      <ErrorBoundary>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<PageTemplate url="discover/movie" />} />
            <Route path="/tv" element={<PageTemplate url="discover/tv" type="tv" />} />
            <Route path="/upcoming" element={<PageTemplate url="movie/upcoming" />} />
            <Route path="/movies/:id" element={<SoloMovie url="/movie" />} />
            <Route path="/tv/:id" element={<SoloMovie url="/tv" type="tv" />} />
            <Route path="/buy-tickets/:id" element={<SeatSelection />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <AnimatedNavbar />
      </ErrorBoundary>
    </div>
  );
}

export default App;
