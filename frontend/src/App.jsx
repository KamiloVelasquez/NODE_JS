import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Sidebar from './components/side-bar';
import Header from './components/header-nav';
import ProtectedRoute from './components/protected-route';
import Login from './pages/login';
import Register from './pages/register';
import Home from './pages/home';
import Genres from './pages/genres';
import Directors from './pages/directors';
import Studios from './pages/studios';
import Media from './pages/Media';
import MediaTypes from './pages/media-types';
import Settings from './pages/settings';

export default function App() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
  const token = localStorage.getItem('token');

  if (isAuthPage) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    );
  }

  return (
    <div className="bg-black text-light min-vh-100" style={{ backgroundColor: '#020617' }}>
      <ProtectedRoute>
        <Sidebar />
        <Header />
        <main style={{ marginLeft: '280px', paddingTop: '110px', paddingBottom: '40px', paddingLeft: '40px', paddingRight: '40px' }}>
          <Routes>
            <Route path="/" element={<Navigate to="/media" replace />} />
            <Route path="/home" element={<Home />} />
            <Route path="/genres" element={<Genres />} />
            <Route path="/directors" element={<Directors />} />
            <Route path="/studios" element={<Studios />} />
            <Route path="/types" element={<MediaTypes />} />
            <Route path="/media" element={<Media />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </ProtectedRoute>
    </div>
  );
}
