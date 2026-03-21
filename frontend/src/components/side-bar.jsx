import React from 'react';
import { NavLink } from 'react-router-dom';
import { useLanguage } from '../contexts/language-context';

export default function Sidebar() {
  const { t } = useLanguage();

  const getNavLinkClass = ({ isActive }) => 
    `nav-link d-flex align-items-center gap-3 px-3 py-2 rounded-3 ${isActive ? 'active bg-success bg-opacity-10 text-success border-start border-3 border-success fw-bold' : 'text-secondary custom-hover fw-medium'}`;

  return (
    <aside className="d-flex flex-column flex-shrink-0 p-4 text-white custom-glass border-end border-secondary border-opacity-25" style={{ width: '280px', height: '100vh', position: 'fixed', left: 0, top: 0, zIndex: 1040 }}>
      <div className="mb-5 px-2">
        <h1 className="fs-5 fw-bold text-success mb-1" style={{ letterSpacing: '-0.5px' }}>{t('app_title')}</h1>
        <p className="text-secondary text-uppercase m-0" style={{ fontSize: '0.65rem', letterSpacing: '0.2em' }}>{t('university_admin')}</p>
      </div>
      <ul className="nav nav-pills flex-column mb-auto gap-2">
        <li className="nav-item">
          <NavLink to="/home" className={getNavLinkClass}>
            <span className="material-symbols-outlined fs-5">home</span>
            <span>{t('home')}</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/genres" className={getNavLinkClass}>
            <span className="material-symbols-outlined fs-5">movie_filter</span>
            <span>{t('genres')}</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/directors" className={getNavLinkClass}>
            <span className="material-symbols-outlined fs-5">face</span>
            <span>{t('directors')}</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/studios" className={getNavLinkClass}>
            <span className="material-symbols-outlined fs-5">business</span>
            <span>{t('studios')}</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/types" className={getNavLinkClass}>
            <span className="material-symbols-outlined fs-5">category</span>
            <span>{t('types') || 'Types'}</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/media" className={getNavLinkClass}>
            <span className="material-symbols-outlined fs-5">perm_media</span>
            <span>{t('media')}</span>
          </NavLink>
        </li>
      </ul>
      <div className="mt-auto pt-4 border-top border-secondary border-opacity-25">
        <ul className="nav flex-column gap-1">
          <li>
            <NavLink to="/settings" className={getNavLinkClass}>
              <span className="material-symbols-outlined fs-5">settings</span>
              <span style={{ fontSize: '0.875rem' }}>{t('settings')}</span>
            </NavLink>
          </li>
          <li>
            <button className="btn btn-link nav-link text-secondary custom-hover-danger d-flex align-items-center gap-3 w-100 text-start shadow-none" style={{textDecoration: 'none'}}>
              <span className="material-symbols-outlined fs-5">logout</span>
              <span className="fw-medium" style={{ fontSize: '0.875rem' }}>{t('sign_out')}</span>
            </button>
          </li>
        </ul>
      </div>
    </aside>
  );
}
