import React from 'react';
import { useLanguage } from '../contexts/language-context';

/**
 * HomePage Component
 * Implements a "Dashboard - Obsidian Minimalist" style.
 */
export default function Home() {
  const { t } = useLanguage();

  const stats = [
    { label: t('media'), value: '142', icon: 'perm_media', color: '#bb86fc' },
    { label: t('genres'), value: '12', icon: 'movie_filter', color: '#03dac6' },
    { label: t('directors'), value: '45', icon: 'face', color: '#ff7597' },
    { label: t('studios'), value: '8', icon: 'business', color: '#f1c40f' },
  ];

  return (
    <div className="home-dashboard py-4 h-100">
      <header className="mb-5">
        <h1 className="display-5 fw-bold text-light mb-2" style={{ letterSpacing: '-0.05em' }}>
          {t('home')} <span className="text-secondary fw-light fs-4 ms-2">/ Dashboard</span>
        </h1>
        <p className="text-secondary" style={{ maxWidth: '600px' }}>
          Welcome back. Here is a minimalist overview of the Cinematic Archivist system status and statistics.
        </p>
      </header>

      {/* Stats Grid */}
      <section className="row g-4 mb-5">
        {stats.map((stat, idx) => (
          <div key={idx} className="col-12 col-md-6 col-lg-3">
            <div className="card bg-black border-secondary border-opacity-25 p-4 h-100 custom-glass transition-hover">
              <div className="d-flex align-items-center gap-3">
                <div 
                  className="rounded-3 d-flex align-items-center justify-content-center" 
                  style={{ width: '48px', height: '48px', backgroundColor: `${stat.color}15`, color: stat.color }}
                >
                  <span className="material-symbols-outlined fs-3">{stat.icon}</span>
                </div>
                <div>
                  <div className="text-secondary text-uppercase fw-bold" style={{ fontSize: '0.65rem', letterSpacing: '0.1em' }}>{stat.label}</div>
                  <div className="fs-3 fw-bold text-light">{stat.value}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Recent Activity / System Log */}
      <section className="row g-4">
        <div className="col-12 col-lg-8">
          <div className="card bg-black border-secondary border-opacity-25 h-100 custom-glass overflow-hidden">
            <div className="card-header bg-transparent border-secondary border-opacity-25 py-3 px-4 d-flex justify-content-between align-items-center">
              <h5 className="mb-0 text-light fw-bold" style={{ fontSize: '0.9rem' }}>Recent System Events</h5>
              <span className="badge bg-success bg-opacity-10 text-success border border-success border-opacity-25">Live</span>
            </div>
            <div className="card-body p-0">
              <ul className="list-group list-group-flush">
                {[
                  { time: '2m ago', event: 'New Director added: Christopher Nolan', user: 'Admin' },
                  { time: '1h ago', event: 'Media entry "Inception" updated', user: 'Editor' },
                  { time: '3h ago', event: 'Backup completed successfully', user: 'System' },
                  { time: '5h ago', event: 'New User registered: camilo@test.com', user: 'System' },
                ].map((item, idx) => (
                  <li key={idx} className="list-group-item bg-transparent border-secondary border-opacity-10 py-3 px-4 d-flex align-items-center gap-3 custom-hover">
                    <span className="text-secondary font-monospace" style={{ fontSize: '0.7rem', minWidth: '60px' }}>{item.time}</span>
                    <div className="flex-grow-1 text-light" style={{ fontSize: '0.85rem' }}>{item.event}</div>
                    <span className="text-secondary" style={{ fontSize: '0.75rem' }}>{item.user}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-4">
          <div className="card bg-black border-secondary border-opacity-25 h-100 custom-glass p-4 text-center d-flex flex-column justify-content-center align-items-center">
            <div className="rounded-circle border border-success border-opacity-25 p-4 mb-4" style={{ width: '120px', height: '120px', backgroundColor: 'rgba(25, 135, 84, 0.05)' }}>
              <span className="material-symbols-outlined text-success" style={{ fontSize: '64px' }}>verified_user</span>
            </div>
            <h5 className="text-light fw-bold mb-2">System Secure</h5>
            <p className="text-secondary small">All layers of the Senior Architect architecture have been validated and are operating at 100% capacity.</p>
            <button className="btn btn-outline-secondary btn-sm rounded-pill px-4 mt-3 mt-auto">View Detailed Log</button>
          </div>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{ __html: `
        .transition-hover { transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .transition-hover:hover { transform: translateY(-5px); box-shadow: 0 10px 30px rgba(0,0,0,0.5); border-color: rgba(25, 135, 84, 0.4) !important; }
      `}} />
    </div>
  );
}
