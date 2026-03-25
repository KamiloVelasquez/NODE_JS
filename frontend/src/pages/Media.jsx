import React, { useState, useEffect } from 'react';
import MovieTable from '../components/movie-table';
import Pagination from '../components/pagination-control';
import ModalBase from '../components/modal-base';
import MediaForm from '../components/media-form';
import { useLanguage } from '../contexts/languageContext';
import { mediaAPI } from '../services/api';

/**
 * Media Page
 * Manages the display and interaction with the media collection.
 */
export default function Media() {
  const { t } = useLanguage();
  const [medias, setMedias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [formLoading, setFormLoading] = useState(false);

  const fetchMedias = async () => {
    setLoading(true);
    try {
      const response = await mediaAPI.getAll();
      const data = response?.data || response || [];
      setMedias(Array.isArray(data) ? data : []);
    } catch (err) {
      setError('Error loading media library');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedias();
  }, []);

  const handleOpenAdd = () => {
    setSelectedMedia(null);
    setShowModal(true);
  };

  const handleOpenEdit = (media) => {
    setSelectedMedia(media);
    setShowModal(true);
  };

  const handleFormSubmit = async (formData) => {
    setFormLoading(true);
    try {
      if (selectedMedia) {
        await mediaAPI.update(selectedMedia._id, formData);
      } else {
        await mediaAPI.create(formData);
      }
      setShowModal(false);
      fetchMedias(); // Refresh list
    } catch (err) {
      alert(err.response?.data?.msg || err.response?.data?.errors?.[0]?.msg || 'Error saving media');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      try {
        await mediaAPI.delete(id);
        fetchMedias();
      } catch (err) {
        alert('Error deleting media');
      }
    }
  };

  if (loading && medias.length === 0) return <div className="text-center text-light mt-5">Loading...</div>;

  return (
    <>
      <section className="d-flex justify-content-between align-items-start mb-5">
        <div>
          <h2 className="display-6 fw-bold text-light mb-2" style={{ letterSpacing: '-0.05em' }}>{t('media_management')}</h2>
          <p className="text-secondary fw-light" style={{ fontSize: '0.875rem' }}>{t('curate_library')}</p>
        </div>
        <button 
          onClick={handleOpenAdd}
          className="btn btn-success fw-bold d-flex align-items-center gap-2 px-4 py-2 shadow-sm neon-shadow-primary rounded-3"
        >
          <span className="material-symbols-outlined">add</span>
          {t('add_title')}
        </button>
      </section>

      <section className="row row-cols-1 row-cols-md-3 g-4 mb-5">
        {medias.slice(0, 3).map((media, idx) => (
          <article key={media._id} className="col animate-fade-in-up" style={{ animationDelay: `${idx * 0.1}s` }}>
            <div className="card h-100 bg-black border-secondary border-opacity-25 overflow-hidden custom-glass hover-lift">
              <div style={{ height: '200px', overflow: 'hidden' }}>
                <img
                  src={media.posterImage || `https://via.placeholder.com/400x200?text=${encodeURIComponent(media.title)}`}
                  className="card-img-top custom-poster h-100 w-100 object-fit-cover"
                  alt={media.title}
                />
              </div>
              <div className="card-body">
                <span className="badge bg-success bg-opacity-10 text-success mb-2" style={{ fontSize: '0.65rem' }}>{media.genre?.name}</span>
                <h5 className="card-title text-light mb-2 fw-bold">{media.title}</h5>
                <p className="card-text text-secondary mb-0" style={{ fontSize: '0.85rem' }}>
                  {media.synopsis?.substring(0, 80)}...
                </p>
              </div>
            </div>
          </article>
        ))}
      </section>

      <MovieTable medias={medias} onEdit={handleOpenEdit} onDelete={handleDelete} />
      <Pagination />

      {/* CRUD Modal */}
      <ModalBase 
        show={showModal} 
        onClose={() => setShowModal(false)} 
        title={selectedMedia ? `Edit: ${selectedMedia.title}` : t('add_title')}
        size="lg"
      >
        <MediaForm 
          initialData={selectedMedia} 
          onSubmit={handleFormSubmit} 
          loading={formLoading} 
        />
      </ModalBase>
    </>
  );
}
