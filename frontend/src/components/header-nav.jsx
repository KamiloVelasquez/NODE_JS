import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/language-context';

export default function Header() {
  const { t, toggleLanguage } = useLanguage();
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const btnClass = "btn btn-link text-secondary p-0 custom-hover d-flex align-items-center hover-lift";

  return (
    <header className="fixed-top custom-glass border-bottom border-secondary border-opacity-25 d-flex justify-content-between align-items-center px-4" style={{ height: '80px', left: '280px', zIndex: 1030 }}>
      <div className="flex-grow-1 d-flex align-items-center">
        <div className="d-flex align-items-center bg-dark bg-opacity-50 border border-secondary border-opacity-50 rounded-pill px-3 py-2 w-100 animate-fade-in" style={{ maxWidth: '400px', transition: 'all 0.3s' }}>
          <span className="material-symbols-outlined text-secondary me-2">search</span>
          <input className="bg-transparent border-0 text-light w-100 shadow-none" style={{ outline: 'none', fontSize: '0.875rem' }} placeholder={t('search_placeholder')} type="text" />
        </div>
      </div>
      <div className="d-flex align-items-center gap-4">
        <button onClick={toggleLanguage} className="btn btn-outline-success btn-sm fw-bold px-3 rounded-pill d-flex align-items-center hover-lift" title="Cambiar Idioma">
          <span className="material-symbols-outlined me-1" style={{ fontSize: '18px' }}>language</span>
          {t('lang_btn')}
        </button>
        <button className={btnClass}>
          <span className="material-symbols-outlined fs-4">notifications</span>
          <span className="position-absolute top-0 start-100 translate-middle p-1 bg-success border border-dark rounded-circle neon-shadow-primary icon-pulse" style={{ marginTop: '0.5rem', marginLeft: '-0.3rem' }}>
            <span className="visually-hidden">New alerts</span>
          </span>
        </button>
        <button onClick={handleSignOut} className={`${btnClass} text-danger opacity-75`} title={t('sign_out')}>
          <span className="material-symbols-outlined fs-4">logout</span>
        </button>
        <div className="rounded-circle border border-success border-opacity-25 p-1 ms-2 hover-lift cursor-pointer" style={{ width: '40px', height: '40px' }}>
          <img alt="User Profile" className="w-100 h-100 rounded-circle object-fit-cover" src="https://ui-avatars.com/api/?name=Admin&background=198754&color=fff" />
        </div>
      </div>
    </header>
  );
}
