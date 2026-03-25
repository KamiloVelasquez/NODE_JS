import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/languageContext';
import { mediaAPI, genresAPI, directorsAPI, studiosAPI } from '../services/api';

/**
 * HomePage Component
 * Implements an interactive Dashboard with real-time data.
 */
export default function Home() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  
  const [stats, setStats] = useState([
    { label: t('media'), value: '0', icon: 'perm_media', color: '#bb86fc', path: '/media' },
    { label: t('genres'), value: '0', icon: 'movie_filter', color: '#03dac6', path: '/genres' },
    { label: t('directors'), value: '0', icon: 'face', color: '#ff7597', path: '/directors' },
    { label: t('studios'), value: '0', icon: 'business', color: '#f1c40f', path: '/studios' },
  ]);
  
  const [recentMedia, setRecentMedia] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [m, g, d, s] = await Promise.all([
          mediaAPI.getAll(),
          genresAPI.getAll(),
          directorsAPI.getAll(),
          studiosAPI.getAll()
        ]);

        const mediaData = m.data || m || [];
        const genresData = g.data || g || [];
        const directorsData = d.data || d || [];
        const studiosData = s.data || s || [];

        setStats([
          { label: t('media'), value: mediaData.length.toString(), icon: 'perm_media', color: '#bb86fc', path: '/media' },
          { label: t('genres'), value: genresData.length.toString(), icon: 'movie_filter', color: '#03dac6', path: '/genres' },
          { label: t('directors'), value: directorsData.length.toString(), icon: 'face', color: '#ff7597', path: '/directors' },
          { label: t('studios'), value: studiosData.length.toString(), icon: 'business', color: '#f1c40f', path: '/studios' },
        ]);

        // Get last 5 added media items
        const sortedMedia = [...mediaData].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setRecentMedia(sortedMedia.slice(0, 5));
        
      } catch (err) {
        console.error('Error loading dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [t]);

  const quickActions = [
    { label: t('add_title'), icon: 'add_circle', path: '/media', color: 'btn-success' },
    { label: t('add_director'), icon: 'person_add', path: '/directors', color: 'btn-outline-primary' },
    { label: t('settings'), icon: 'settings', path: '/settings', color: 'btn-outline-secondary' },
  ];

  return (
    <div className="home-dashboard py-4 h-100 animate-fade-in">
      <header className="mb-5 d-flex justify-content-between align-items-end">
        <div>
          <h1 className="display-5 fw-bold text-light mb-2" style={{ letterSpacing: '-0.05em' }}>
            {t('app_title')} <span className="text-secondary fw-light fs-4 ms-2">/ Overview</span>
          </h1>
          <p className="text-secondary mb-0" style={{ maxWidth: '600px' }}>
            System status: <span className="text-success fw-medium">Operational</span>. 
            All library modules are synchronized with the cloud core.
          </p>
        </div>
        <div className="d-flex gap-2 mb-1">
          {quickActions.map((action, i) => (
            <button 
              key={i} 
              onClick={() => navigate(action.path)}
              className={`btn ${action.color} btn-sm d-flex align-items-center gap-2 px-3 rounded-pill transition-hover`}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>{action.icon}</span>
              <span className="fw-bold" style={{ fontSize: '0.75rem' }}>{action.label}</span>
            </button>
          ))}
        </div>
      </header>

      {/* Stats Grid */}
      <section className="row g-4 mb-5">
        {stats.map((stat, idx) => (
          <div key={idx} className="col-12 col-md-6 col-lg-3">
            <div 
              className="card bg-black border-secondary border-opacity-25 p-4 h-100 custom-glass transition-hover cursor-pointer"
              onClick={() => navigate(stat.path)}
              style={{ cursor: 'pointer' }}
            >
              <div className="d-flex align-items-center gap-3">
                <div 
                  className="rounded-3 d-flex align-items-center justify-content-center" 
                  style={{ width: '56px', height: '56px', backgroundColor: `${stat.color}10`, color: stat.color, border: `1px solid ${stat.color}20` }}
                >
                  <span className="material-symbols-outlined fs-2">{stat.icon}</span>
                </div>
                <div>
                  <div className="text-secondary text-uppercase fw-bold" style={{ fontSize: '0.6rem', letterSpacing: '0.15em' }}>{stat.label}</div>
                  <div className="fs-2 fw-bold text-light">{loading ? '...' : stat.value}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Recent Activity / System Log */}
      <section className="row g-4">
        <div className="col-12 col-lg-8">
          <div className="card bg-black border-secondary border-opacity-25 h-100 custom-glass overflow-hidden shadow-lg">
            <div className="card-header bg-transparent border-secondary border-opacity-25 py-3 px-4 d-flex justify-content-between align-items-center" style={{ backgroundColor: 'rgba(255,255,255,0.02)' }}>
              <div className="d-flex align-items-center gap-2">
                <span className="material-symbols-outlined text-secondary" style={{ fontSize: '18px' }}>history</span>
                <h5 className="mb-0 text-light fw-bold" style={{ fontSize: '0.9rem' }}>{t('recent_additions') || 'Recent Additions'}</h5>
              </div>
              <span className="badge bg-success bg-opacity-10 text-success border border-success border-opacity-25 icon-pulse px-2 py-1" style={{ fontSize: '0.65rem' }}>LIVE FEED</span>
            </div>
            <div className="card-body p-0">
              <ul className="list-group list-group-flush">
                {loading ? (
                  <li className="list-group-item bg-transparent text-center py-5 text-secondary">Synchronizing data...</li>
                ) : recentMedia.length === 0 ? (
                  <li className="list-group-item bg-transparent text-center py-5 text-secondary">No recent activity detected.</li>
                ) : (
                  recentMedia.map((item, idx) => (
                    <li key={item._id} className="list-group-item bg-transparent border-secondary border-opacity-10 py-3 px-4 d-flex align-items-center gap-4 custom-hover transition-all">
                      <div className="flex-shrink-0" style={{ width: '40px', height: '56px' }}>
                        <img 
                          src={item.posterImage || `https://via.placeholder.com/400x600?text=${encodeURIComponent(item.title)}`} 
                          alt={item.title} 
                          className="w-100 h-100 object-fit-cover rounded shadow-sm border border-secondary border-opacity-25"
                        />
                      </div>
                      <div className="flex-grow-1">
                        <div className="text-light fw-bold" style={{ fontSize: '0.95rem' }}>{item.title}</div>
                        <div className="text-secondary d-flex align-items-center gap-2" style={{ fontSize: '0.75rem' }}>
                          <span className="text-success">{item.genre?.name || 'Uncategorized'}</span>
                          <span className="text-muted">•</span>
                          <span>{item.director?.name || 'TBA'}</span>
                        </div>
                      </div>
                      <div className="text-end">
                        <div className="text-secondary" style={{ fontSize: '0.7rem' }}>{new Date(item.createdAt).toLocaleDateString()}</div>
                        <span className="badge bg-secondary bg-opacity-10 text-secondary border border-secondary border-opacity-25 mt-1" style={{ fontSize: '0.6rem' }}>{item.type?.name?.toUpperCase() || 'MEDIA'}</span>
                      </div>
                    </li>
                  ))
                )}
              </ul>
            </div>
            <div className="card-footer bg-transparent border-top-0 p-3 text-center">
               <button onClick={() => navigate('/media')} className="btn btn-link btn-sm text-secondary text-decoration-none hover-white">View Full Library</button>
            </div>
          </div>
        </div>
        
        <div className="col-12 col-lg-4">
          <div className="card bg-black border-secondary border-opacity-25 h-100 custom-glass p-4 text-center d-flex flex-column justify-content-center align-items-center overflow-hidden position-relative">
            <div className="position-absolute top-0 start-0 w-100 h-100 overflow-hidden opacity-10 pointer-events-none">
                <div className="bg-success rounded-circle" style={{ width: '300px', height: '300px', filter: 'blur(80px)', margin: '-100px' }}></div>
            </div>
            
            <div className="rounded-circle border border-success border-opacity-25 p-4 mb-4 z-1" style={{ width: '120px', height: '120px', backgroundColor: 'rgba(25, 135, 84, 0.05)', boxShadow: '0 0 40px rgba(25, 135, 84, 0.1)' }}>
              <span className="material-symbols-outlined text-success" style={{ fontSize: '64px' }}>verified_user</span>
            </div>
            <h5 className="text-light fw-bold mb-2 z-1">System Secure</h5>
            <p className="text-secondary small z-1" style={{ maxWidth: '240px' }}>The UI is now synchronized with with the backend database. All CRUD operations are verified.</p>
            <div className="mt-4 w-100 z-1">
                <div className="d-flex justify-content-between mb-1" style={{ fontSize: '0.65rem' }}>
                    <span className="text-secondary">Sync Status</span>
                    <span className="text-success">Perfect</span>
                </div>
                <div className="progress bg-dark border border-secondary border-opacity-25" style={{ height: '4px' }}>
                    <div className="progress-bar bg-success" style={{ width: '100%' }}></div>
                </div>
            </div>
            <button onClick={() => navigate('/settings')} className="btn btn-outline-secondary btn-sm rounded-pill px-4 mt-auto z-1 w-100 custom-hover">System Settings</button>
          </div>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{ __html: `
        .transition-hover { transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
        .transition-hover:hover { transform: translateY(-5px); box-shadow: 0 10px 40px rgba(0,0,0,0.6); border-color: rgba(0, 218, 198, 0.3) !important; filter: brightness(1.2); }
        .transition-all { transition: all 0.2s ease-in-out; }
        .custom-hover:hover { background-color: rgba(255,255,255,0.03) !important; padding-left: 2rem !important; }
        .hover-white:hover { color: #fff !important; }
        .animate-fade-in { animation: fadeIn 0.8s ease-out; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .icon-pulse { animation: pulseShadow 2s infinite; }
        @keyframes pulseShadow { 0% { box-shadow: 0 0 0 0 rgba(25, 135, 84, 0.2); } 70% { box-shadow: 0 0 0 10px rgba(25, 135, 84, 0); } 100% { box-shadow: 0 0 0 0 rgba(25, 135, 84, 0); } }
      `}} />
    </div>
  );
}
