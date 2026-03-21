import React, { useState, useEffect } from 'react';
import MovieTable from '../components/MovieTable';
import Pagination from '../components/Pagination';
import { useLanguage } from '../contexts/LanguageContext';
import { mediaAPI } from '../services/api';

export default function Media() {
  const { t } = useLanguage();
  const [medias, setMedias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMedias = async () => {
      try {
        const response = await mediaAPI.getAll();
        setMedias(response.data);
      } catch (err) {
        setError('Error al cargar las medias');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMedias();
  }, []);

  if (loading) return <div className="text-center text-light">Cargando...</div>;
  if (error) return <div className="text-center text-danger">{error}</div>;

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
      <MovieTable medias={medias} />
      <Pagination />
    </>
  );
}
