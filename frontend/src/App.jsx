import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Home from './pages/Home';
import Genres from './pages/Genres';
import Directors from './pages/Directors';
import Studios from './pages/Studios';
import Media from './pages/Media';
import Settings from './pages/Settings';

export default function App() {
  return (
    <div className="bg-black text-light min-vh-100" style={{ backgroundColor: '#020617' }}>
      <Sidebar />
      <Header />
      <main style={{ marginLeft: '280px', paddingTop: '110px', paddingBottom: '40px', paddingLeft: '40px', paddingRight: '40px' }}>
        <Routes>
          <Route path="/" element={<Navigate to="/media" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/genres" element={<Genres />} />
          <Route path="/directors" element={<Directors />} />
          <Route path="/studios" element={<Studios />} />
          <Route path="/media" element={<Media />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </main>
    </div>
  );
}
