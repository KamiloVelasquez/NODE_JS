import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/language-context';
import { genresAPI, directorsAPI, studiosAPI, typesAPI } from '../services/api';

/**
 * MediaForm Component
 * Handles creation and editing of Media records.
 */
export default function MediaForm({ initialData = null, onSubmit, loading = false }) {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    serialNumber: '',
    title: '',
    synopsis: '',
    link: '',
    posterImage: '',
    releaseYear: new Date().getFullYear(),
    genre: '',
    director: '',
    productionCompany: '',
    type: ''
  });

  const [options, setOptions] = useState({
    genres: [],
    directors: [],
    studios: [],
    types: []
  });

  useEffect(() => {
    // Load options for selects
    const loadOptions = async () => {
      try {
        const [g, d, s, t] = await Promise.all([
          genresAPI.getAll(),
          directorsAPI.getAll(),
          studiosAPI.getAll(),
          typesAPI.getAll()
        ]);
        setOptions({
          genres: g.data || g || [],
          directors: d.data || d || [],
          studios: s.data || s || [],
          types: t.data || t || []
        });
      } catch (err) {
        console.error('Error loading form options:', err);
      }
    };
    loadOptions();

    if (initialData) {
      setFormData({
        ...initialData,
        genre: initialData.genre?._id || initialData.genre || '',
        director: initialData.director?._id || initialData.director || '',
        productionCompany: initialData.productionCompany?._id || initialData.productionCompany || '',
        type: initialData.type?._id || initialData.type || ''
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleFormSubmit} className="row g-3">
      <div className="col-md-6">
        <label className="form-label small text-secondary fw-bold text-uppercase">{t('serial')}</label>
        <input 
          type="text" name="serialNumber" className="form-control bg-black text-light border-secondary border-opacity-25" 
          value={formData.serialNumber} onChange={handleChange} required 
        />
      </div>
      <div className="col-md-6">
        <label className="form-label small text-secondary fw-bold text-uppercase">{t('title_details')}</label>
        <input 
          type="text" name="title" className="form-control bg-black text-light border-secondary border-opacity-25" 
          value={formData.title} onChange={handleChange} required 
        />
      </div>
      <div className="col-12">
        <label className="form-label small text-secondary fw-bold text-uppercase">Sinopsis</label>
        <textarea 
          name="synopsis" className="form-control bg-black text-light border-secondary border-opacity-25" 
          rows="3" value={formData.synopsis} onChange={handleChange} required
        ></textarea>
      </div>
      <div className="col-md-6">
        <label className="form-label small text-secondary fw-bold text-uppercase">Link / URL</label>
        <input 
          type="url" name="link" className="form-control bg-black text-light border-secondary border-opacity-25" 
          value={formData.link} onChange={handleChange} 
        />
      </div>
      <div className="col-md-6">
        <label className="form-label small text-secondary fw-bold text-uppercase">Poster Image URL</label>
        <input 
          type="url" name="posterImage" className="form-control bg-black text-light border-secondary border-opacity-25" 
          value={formData.posterImage} onChange={handleChange} 
        />
      </div>
      <div className="col-md-4">
        <label className="form-label small text-secondary fw-bold text-uppercase">Año</label>
        <input 
          type="number" name="releaseYear" className="form-control bg-black text-light border-secondary border-opacity-25" 
          value={formData.releaseYear} onChange={handleChange} required 
        />
      </div>
      <div className="col-md-4">
        <label className="form-label small text-secondary fw-bold text-uppercase">{t('genre')}</label>
        <select name="genre" className="form-select bg-black text-light border-secondary border-opacity-25 shadow-none" value={formData.genre} onChange={handleChange} required>
          <option value="">Select...</option>
          {options.genres.map(opt => <option key={opt._id} value={opt._id}>{opt.name}</option>)}
        </select>
      </div>
      <div className="col-md-4">
        <label className="form-label small text-secondary fw-bold text-uppercase">{t('director')}</label>
        <select name="director" className="form-select bg-black text-light border-secondary border-opacity-25 shadow-none" value={formData.director} onChange={handleChange} required>
          <option value="">Select...</option>
          {options.directors.map(opt => <option key={opt._id} value={opt._id}>{opt.name}</option>)}
        </select>
      </div>
      <div className="col-md-6">
        <label className="form-label small text-secondary fw-bold text-uppercase">{t('studios')}</label>
        <select name="productionCompany" className="form-select bg-black text-light border-secondary border-opacity-25 shadow-none" value={formData.productionCompany} onChange={handleChange} required>
          <option value="">Select...</option>
          {options.studios.map(opt => <option key={opt._id} value={opt._id}>{opt.name}</option>)}
        </select>
      </div>
      <div className="col-md-6">
        <label className="form-label small text-secondary fw-bold text-uppercase">Tipo</label>
        <select name="type" className="form-select bg-black text-light border-secondary border-opacity-25 shadow-none" value={formData.type} onChange={handleChange} required>
          <option value="">Select...</option>
          {options.types.map(opt => <option key={opt._id} value={opt._id}>{opt.name}</option>)}
        </select>
      </div>
      <div className="col-12 mt-4 d-flex justify-content-end gap-2">
        <button type="submit" className="btn btn-success px-4 fw-bold" disabled={loading}>
          {loading ? '...' : (initialData ? 'Update' : 'Create')}
        </button>
      </div>
    </form>
  );
}
