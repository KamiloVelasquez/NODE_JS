import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export default function Studios() {
  const { t } = useLanguage();
  return (
    <div className="d-flex flex-column justify-content-center align-items-center h-100 py-5">
      <span className="material-symbols-outlined text-success mb-3" style={{ fontSize: '4rem' }}>business</span>
      <h2 className="text-light fw-bold">{t('studios')}</h2>
      <p className="text-secondary">Productoras y estudios cinematográficos.</p>
    </div>
  );
}
