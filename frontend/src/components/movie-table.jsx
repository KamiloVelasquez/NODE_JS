import React from 'react';
import { useLanguage } from '../contexts/language-context';

/**
 * MovieTable Component
 * Renders a list of media records in a Bootstrap table.
 */
export default function MovieTable({ medias = [], onEdit, onDelete }) {
  const { t } = useLanguage();

  return (
    <div className="card bg-dark border-secondary border-opacity-25 shadow-lg overflow-hidden" style={{ borderRadius: '0.75rem' }}>
      <div className="table-responsive">
        <table className="table table-dark table-hover mb-0 align-middle">
          <thead>
            <tr className="border-bottom border-secondary border-opacity-25" style={{ backgroundColor: 'rgba(15, 23, 42, 0.5)' }}>
              <th className="py-3 px-4 text-secondary fw-bold text-uppercase border-0" style={{ fontSize: '0.65rem', letterSpacing: '0.2em' }}>{t('serial')}</th>
              <th className="py-3 px-4 text-secondary fw-bold text-uppercase border-0" style={{ fontSize: '0.65rem', letterSpacing: '0.2em' }}>{t('poster')}</th>
              <th className="py-3 px-4 text-secondary fw-bold text-uppercase border-0" style={{ fontSize: '0.65rem', letterSpacing: '0.2em' }}>{t('title_details')}</th>
              <th className="py-3 px-4 text-secondary fw-bold text-uppercase border-0" style={{ fontSize: '0.65rem', letterSpacing: '0.2em' }}>{t('genre')}</th>
              <th className="py-3 px-4 text-secondary fw-bold text-uppercase border-0" style={{ fontSize: '0.65rem', letterSpacing: '0.2em' }}>{t('director')}</th>
              <th className="py-3 px-4 text-secondary fw-bold text-uppercase border-0" style={{ fontSize: '0.65rem', letterSpacing: '0.2em' }}>{t('status')}</th>
              <th className="py-3 px-4 text-secondary fw-bold text-uppercase text-end border-0" style={{ fontSize: '0.65rem', letterSpacing: '0.2em' }}>{t('actions')}</th>
            </tr>
          </thead>
          <tbody className="border-top-0">
            {medias.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center text-secondary py-4">No records found</td>
              </tr>
            ) : (
              medias.map((media) => (
                <tr key={media._id} className="custom-table-row">
                  <td className="px-4 py-4 font-monospace text-secondary border-secondary border-opacity-10" style={{ fontSize: '0.75rem' }}>{media.serialNumber}</td>
                  <td className="px-4 py-4 border-secondary border-opacity-10">
                    <div className="rounded overflow-hidden bg-dark shadow-sm position-relative custom-poster-container" style={{ width: '48px', height: '64px' }}>
                      <img alt="Movie Poster" className="w-100 h-100 object-fit-cover custom-poster" src={media.posterImage || 'https://via.placeholder.com/48x64'} />
                    </div>
                  </td>
                  <td className="px-4 py-4 border-secondary border-opacity-10" style={{ maxWidth: '320px' }}>
                    <div className="fw-bold text-light mb-1" style={{ fontSize: '1.125rem', letterSpacing: '-0.025em' }}>{media.title}</div>
                    <div className="text-secondary fw-light mb-2 text-truncate" style={{ fontSize: '0.75rem' }}>{media.synopsis}</div>
                    <div className="d-flex gap-2">
                      <span className="badge bg-dark border border-secondary text-secondary" style={{ fontSize: '0.55rem', letterSpacing: '0.1em' }}>{media.type?.name || 'Type'}</span>
                      <span className="text-secondary fw-medium" style={{ fontSize: '0.65rem' }}>{media.releaseYear}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 border-secondary border-opacity-10">
                    <span className="fw-semibold text-secondary" style={{ fontSize: '0.75rem' }}>{media.genre?.name || 'Genre'}</span>
                  </td>
                  <td className="px-4 py-4 border-secondary border-opacity-10">
                    <div className="fw-medium text-light" style={{ fontSize: '0.875rem' }}>{media.director?.name || 'Director'}</div>
                    <div className="text-secondary text-uppercase mt-1" style={{ fontSize: '0.65rem', letterSpacing: '0.05em' }}>{media.productionCompany?.name || 'Studio'}</div>
                  </td>
                  <td className="px-4 py-4 border-secondary border-opacity-10">
                    {media.isActive ? (
                      <span className="badge rounded-pill border border-success border-opacity-25 text-success" style={{ backgroundColor: 'rgba(25, 135, 84, 0.1)', fontSize: '0.65rem', padding: '0.35rem 0.65rem' }}>ACTIVE</span>
                    ) : (
                      <span className="badge rounded-pill border border-danger border-opacity-25 text-danger" style={{ backgroundColor: 'rgba(220, 53, 69, 0.1)', fontSize: '0.65rem', padding: '0.35rem 0.65rem' }}>INACTIVE</span>
                    )}
                  </td>
                  <td className="px-4 py-4 text-end border-secondary border-opacity-10">
                    <div className="d-flex justify-content-end gap-1">
                      <button 
                        onClick={() => onEdit(media)}
                        className="btn btn-sm btn-link text-secondary custom-hover p-2 shadow-none"
                      >
                        <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>edit</span>
                      </button>
                      <button 
                        onClick={() => onDelete(media._id)}
                        className="btn btn-sm btn-link text-secondary custom-hover-danger p-2 shadow-none"
                      >
                        <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
