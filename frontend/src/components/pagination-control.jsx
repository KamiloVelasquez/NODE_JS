import React from 'react';
import { useLanguage } from '../contexts/languageContext';

export default function Pagination() {
  const { t } = useLanguage();

  return (
    <div className="d-flex justify-content-between align-items-center mt-5 px-2">
      <div className="text-secondary fw-medium" style={{ fontSize: '0.75rem' }}>
        {t('showing')} <span className="text-light">2</span> {t('of')} <span className="text-light">142</span> {t('records')}
      </div>
      <div className="d-flex gap-3">
        <button className="btn btn-link text-secondary text-decoration-none d-flex align-items-center gap-1 fw-bold p-0 custom-hover btn-sm disabled" style={{ fontSize: '0.75rem' }}>
          <span className="material-symbols-outlined fs-6">chevron_left</span>
          {t('previous')}
        </button>
        <button className="btn btn-link text-secondary text-decoration-none d-flex align-items-center gap-1 fw-bold p-0 custom-hover btn-sm" style={{ fontSize: '0.75rem' }}>
          {t('next')}
          <span className="material-symbols-outlined fs-6">chevron_right</span>
        </button>
      </div>
    </div>
  );
}
