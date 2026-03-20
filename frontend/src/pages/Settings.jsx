import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export default function Settings() {
  const { t } = useLanguage();
  return (
    <div className="d-flex flex-column justify-content-center align-items-center h-100 py-5">
      <span className="material-symbols-outlined text-secondary mb-3" style={{ fontSize: '4rem' }}>settings</span>
      <h2 className="text-light fw-bold">{t('settings')}</h2>
      <p className="text-secondary">Ajustes y preferencias de la cuenta.</p>
    </div>
  );
}
