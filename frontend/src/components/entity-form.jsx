import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/languageContext';

/**
 * EntityForm Component
 * Generic form for simple entities (Director, Genre, Studio, Type).
 * Fields: name (string), isActive (boolean)
 */
export default function EntityForm({ initialData = null, onSubmit, loading = false }) {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    isActive: true
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || initialData.nombre || '', // Fallback for old data
        isActive: initialData.isActive ?? true
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleFormSubmit} className="row g-3">
      <div className="col-12">
        <label className="form-label small text-secondary fw-bold text-uppercase">Name</label>
        <input 
          type="text" name="name" className="form-control bg-black text-light border-secondary border-opacity-25 shadow-none" 
          value={formData.name} onChange={handleChange} required 
        />
      </div>
      <div className="col-12 d-flex align-items-center gap-3">
        <div className="form-check form-switch mt-2">
          <input 
            className="form-check-input bg-dark border-secondary bg-opacity-10" 
            type="checkbox" 
            name="isActive" 
            id="isActiveSwitch"
            checked={formData.isActive}
            onChange={handleChange}
          />
          <label className="form-check-label text-secondary small" htmlFor="isActiveSwitch">
            {formData.isActive ? 'Active' : 'Inactive'}
          </label>
        </div>
      </div>
      <div className="col-12 mt-4 d-flex justify-content-end">
        <button type="submit" className="btn btn-success px-4 fw-bold" disabled={loading}>
          {loading ? '...' : (initialData ? 'Update' : 'Create')}
        </button>
      </div>
    </form>
  );
}
