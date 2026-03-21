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
        // En caso de trabajar con axios o fetch, normalizamos
        const data = response?.data || response || [];
        setMedias(Array.isArray(data) ? data : []);
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

      <section className="row row-cols-1 row-cols-md-3 g-3 mb-4">
        {medias.slice(0, 6).map((media) => {
          const fallbackImage = `https://source.unsplash.com/featured/400x250/?${encodeURIComponent(media.titulo || 'movie')}`;
          const posterUrl = media.imagenPortada?.trim() ? media.imagenPortada : fallbackImage;

          return (
            <article key={media._id} className="col">
              <div className="card h-100 bg-black border-secondary border-opacity-25">
                <img
                  src={posterUrl}
                  className="card-img-top"
                  alt={media.titulo || 'Sin título'}
                  style={{ objectFit: 'cover', height: '180px' }}
                />
                <div className="card-body">
                  <h5 className="card-title text-light mb-1">{media.titulo}</h5>
                  <p className="card-text text-secondary mb-2" style={{ fontSize: '0.85rem' }}>
                    {media.genero?.nombre || 'Género no definido'} • {media.anoEstreno || 'N/A'}
                  </p>
                  <p className="card-text text-white-50" style={{ fontSize: '0.75rem', height: '2.5rem', overflow: 'hidden' }}>
                    {media.sinopsis}
                  </p>
                </div>
              </div>
            </article>
          );
        })}
      </section>

      <MovieTable medias={medias} />
      <Pagination />
    </>
  );
}
