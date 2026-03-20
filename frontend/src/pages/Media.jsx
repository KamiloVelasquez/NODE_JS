import React from 'react';
import MovieTable from '../components/MovieTable';
import Pagination from '../components/Pagination';
import { useLanguage } from '../contexts/LanguageContext';

export default function Media() {
  const { t } = useLanguage();

  return (
    <>
      <section className="d-flex justify-content-between align-items-start mb-5">
        <div>
          <h2 className="display-6 fw-bold text-light mb-2" style={{ letterSpacing: '-0.05em' }}>{t('media_management')}</h2>
          <p className="text-secondary fw-light" style={{ fontSize: '0.875rem' }}>{t('curate_library')}</p>
        </div>
        <button className="btn btn-success fw-bold d-flex align-items-center gap-2 px-4 py-2 shadow-sm neon-shadow-primary rounded-3">
          <span className="material-symbols-outlined">add</span>
          {t('add_title')}
        </button>
      </section>
      <MovieTable />
      <Pagination />
    </>
  );
}
