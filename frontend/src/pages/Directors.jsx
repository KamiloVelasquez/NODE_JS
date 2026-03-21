import React, { useState, useEffect } from 'react';
import ModalBase from '../components/modal-base';
import EntityForm from '../components/entity-form';
import { useLanguage } from '../contexts/language-context';
import { directorsAPI } from '../services/api';

/**
 * Directors Page
 * Manages the list of directors with full CRUD support.
 */
export default function Directors() {
  const { t } = useLanguage();
  const [directors, setDirectors] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [showModal, setShowModal] = useState(false);
  const [selectedEntity, setSelectedEntity] = useState(null);
  const [formLoading, setFormLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const resp = await directorsAPI.getAll();
      setDirectors(resp.data || resp || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenAdd = () => {
    setSelectedEntity(null);
    setShowModal(true);
  };

  const handleOpenEdit = (entity) => {
    setSelectedEntity(entity);
    setShowModal(true);
  };

  const handleSubmit = async (formData) => {
    setFormLoading(true);
    try {
      if (selectedEntity) {
        await directorsAPI.update(selectedEntity._id, formData);
      } else {
        await directorsAPI.create(formData);
      }
      setShowModal(false);
      fetchData();
    } catch (err) {
      alert(err.response?.data?.msg || err.response?.data?.errors?.[0]?.msg || 'Error saving director');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this director?')) {
      try {
        await directorsAPI.delete(id);
        fetchData();
      } catch (err) {
        alert('Error deleting');
      }
    }
  };

  return (
    <div className="container-fluid">
      <header className="d-flex justify-content-between align-items-center mb-5">
        <div>
          <h2 className="text-light fw-bold mb-0">{t('directors')}</h2>
          <p className="text-secondary small">Manage filmmaking talent.</p>
        </div>
        <button onClick={handleOpenAdd} className="btn btn-success d-flex align-items-center gap-2 px-4 shadow-sm">
          <span className="material-symbols-outlined">person_add</span>
          Add Director
        </button>
      </header>

      {loading ? (
        <div className="text-center text-secondary py-5">Loading data...</div>
      ) : (
        <div className="row g-4">
          {directors.map(dir => (
            <div key={dir._id} className="col-12 col-md-6 col-lg-4">
              <div className="card bg-dark border-secondary border-opacity-10 custom-glass p-3 h-100">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <h5 className="text-light fw-bold mb-1">{dir.name || dir.nombre || 'Director'}</h5>
                    <span className={`badge ${dir.isActive ? 'bg-success bg-opacity-10 text-success' : 'bg-danger bg-opacity-10 text-danger'}`}>
                      {dir.isActive ? 'ACTIVE' : 'INACTIVE'}
                    </span>
                  </div>
                  <div className="d-flex gap-2">
                    <button onClick={() => handleOpenEdit(dir)} className="btn btn-sm btn-link text-secondary custom-hover p-1">
                      <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>edit</span>
                    </button>
                    <button onClick={() => handleDelete(dir._id)} className="btn btn-sm btn-link text-secondary custom-hover-danger p-1">
                      <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>delete</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <ModalBase 
        show={showModal} 
        onClose={() => setShowModal(false)} 
        title={selectedEntity ? 'Edit Director' : 'Add New Director'}
      >
        <EntityForm initialData={selectedEntity} onSubmit={handleSubmit} loading={formLoading} />
      </ModalBase>
    </div>
  );
}
