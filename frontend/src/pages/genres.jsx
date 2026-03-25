import React, { useState, useEffect } from 'react';
import ModalBase from '../components/modal-base';
import EntityForm from '../components/entity-form';
import { useLanguage } from '../contexts/language-context';
import { genresAPI } from '../services/api';

/**
 * Genres Page
 */
export default function Genres() {
  const { t } = useLanguage();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedEntity, setSelectedEntity] = useState(null);
  const [formLoading, setFormLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const resp = await genresAPI.getAll();
      setData(resp.data || resp || []);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchData(); }, []);

  const handleOpenAdd = () => { setSelectedEntity(null); setShowModal(true); };
  const handleOpenEdit = (entity) => { setSelectedEntity(entity); setShowModal(true); };

  const handleSubmit = async (formData) => {
    setFormLoading(true);
    try {
      if (selectedEntity) await genresAPI.update(selectedEntity._id, formData);
      else await genresAPI.create(formData);
      setShowModal(false);
      fetchData();
    } catch (err) { alert(err.response?.data?.msg || 'Error saving genre'); }
    finally { setFormLoading(false); }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete genre?')) {
      try { await genresAPI.delete(id); fetchData(); }
      catch (err) { alert('Error deleting'); }
    }
  };

  return (
    <div className="container-fluid">
      <header className="d-flex justify-content-between align-items-center mb-5">
        <div>
          <h2 className="text-light fw-bold mb-0">{t('genres')}</h2>
          <p className="text-secondary small">Classify your media library.</p>
        </div>
        <button onClick={handleOpenAdd} className="btn btn-success d-flex align-items-center gap-2 px-4 shadow-sm">
          <span className="material-symbols-outlined">add_box</span>
          Add Genre
        </button>
      </header>

      {loading ? <div className="text-center text-secondary py-5">Loading...</div> : (
        <div className="row g-4">
          {data.map(item => (
            <div key={item._id} className="col-12 col-md-6 col-lg-4">
              <div className="card bg-dark border-secondary border-opacity-10 custom-glass p-3 h-100">
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="text-light fw-bold mb-0">{item.name || item.nombre || 'Genre'}</h5>
                  <div className="d-flex gap-2">
                    <button onClick={() => handleOpenEdit(item)} className="btn btn-sm btn-link text-secondary custom-hover p-1">
                      <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>edit</span>
                    </button>
                    <button onClick={() => handleDelete(item._id)} className="btn btn-sm btn-link text-secondary custom-hover-danger p-1">
                      <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>delete</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <ModalBase show={showModal} onClose={() => setShowModal(false)} title={selectedEntity ? 'Edit Genre' : 'Add Genre'}>
        <EntityForm initialData={selectedEntity} onSubmit={handleSubmit} loading={formLoading} />
      </ModalBase>
    </div>
  );
}
