import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export default function MovieTable() {
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
            {/* Row 1 */}
            <tr className="custom-table-row">
              <td className="px-4 py-4 font-monospace text-secondary border-secondary border-opacity-10" style={{ fontSize: '0.75rem' }}>MOV-8842-X</td>
              <td className="px-4 py-4 border-secondary border-opacity-10">
                <div className="rounded overflow-hidden bg-dark shadow-sm position-relative custom-poster-container" style={{ width: '48px', height: '64px' }}>
                  <img alt="Movie Poster" className="w-100 h-100 object-fit-cover custom-poster" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCjpr5eBfWSH29RMXRm2jH0fG-B8oRBC8PMUtP7jLqz8N63nQMOx91bRB89UcnXwv2MTiTdhYqLbW12PDE9OjoA80dWEXocXafOLDbCsgJdCmZ8MGSCwpcmO__o1lGKp-CGBhgS664HJL0cdfMnvDUVKPu7GZFBGpuQ7etatWmO4u-Bjwl6xRV3V9Za2CcpZAz2xus4s1NbtClRk3IVci3HGc-14pmxg80K-pCQDfh6vUw2VMuwnLN6LObdtbsLiZDjPtLfZh5wV4Kb" />
                </div>
              </td>
              <td className="px-4 py-4 border-secondary border-opacity-10" style={{ maxWidth: '320px' }}>
                <div className="fw-bold text-light mb-1" style={{ fontSize: '1.125rem', letterSpacing: '-0.025em' }}>El Despertar de la Razón</div>
                <div className="text-secondary fw-light mb-2 text-truncate" style={{ fontSize: '0.75rem' }}>{t('curate_library')}...</div>
                <div className="d-flex gap-2">
                  <span className="badge bg-dark border border-secondary text-secondary" style={{ fontSize: '0.55rem', letterSpacing: '0.1em' }}>{t('film')}</span>
                  <span className="text-secondary fw-medium" style={{ fontSize: '0.65rem' }}>2023</span>
                </div>
              </td>
              <td className="px-4 py-4 border-secondary border-opacity-10">
                <span className="fw-semibold text-secondary" style={{ fontSize: '0.75rem' }}>{t('documentary')}</span>
              </td>
              <td className="px-4 py-4 border-secondary border-opacity-10">
                <div className="fw-medium text-light" style={{ fontSize: '0.875rem' }}>Dr. Julian Arndt</div>
                <div className="text-secondary text-uppercase mt-1" style={{ fontSize: '0.65rem', letterSpacing: '0.05em' }}>Independent Arts</div>
              </td>
              <td className="px-4 py-4 border-secondary border-opacity-10">
                <span className="badge rounded-pill border border-success border-opacity-25 text-success" style={{ backgroundColor: 'rgba(25, 135, 84, 0.1)', fontSize: '0.65rem', padding: '0.35rem 0.65rem' }}>{t('active')}</span>
              </td>
              <td className="px-4 py-4 text-end border-secondary border-opacity-10">
                <div className="d-flex justify-content-end gap-1">
                  <button className="btn btn-sm btn-link text-secondary custom-hover p-2">
                    <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>edit</span>
                  </button>
                  <button className="btn btn-sm btn-link text-secondary custom-hover-danger p-2">
                    <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>delete</span>
                  </button>
                </div>
              </td>
            </tr>
            {/* Row 2 */}
            <tr className="custom-table-row">
              <td className="px-4 py-4 font-monospace text-secondary border-secondary border-opacity-10" style={{ fontSize: '0.75rem' }}>SER-0129-Z</td>
              <td className="px-4 py-4 border-secondary border-opacity-10">
                <div className="rounded overflow-hidden bg-dark shadow-sm position-relative custom-poster-container" style={{ width: '48px', height: '64px' }}>
                  <img alt="Series Poster" className="w-100 h-100 object-fit-cover custom-poster" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAlaQSS9-ZrL_GqvzJsX4pLmiaKE67YB7ojLB2HPQUAgs7iOnM1dUcJ02uKfKAzYuHiACH_RkP2BC2GIRNUjKZwU6FLC-kIgPeQ8mnJR3-i_hy-iBoHNahv2Xjd4V85CIE4ImjS06jGBWw90nUp8X-3oQFhSQsQ2C7NxNQbqpwaR9zWWo_7qydMJV2AnGwe_LgmfGUIw1csJzmi-coiFTIrO8TEoJ2gjuwuPitQBqWRqi1xVZjC2FQlwtPDY8iVCdcK42lS4atpsQHR" />
                </div>
              </td>
              <td className="px-4 py-4 border-secondary border-opacity-10" style={{ maxWidth: '320px' }}>
                <div className="fw-bold text-light mb-1" style={{ fontSize: '1.125rem', letterSpacing: '-0.025em' }}>Mecánica Cuántica I</div>
                <div className="text-secondary fw-light mb-2 text-truncate" style={{ fontSize: '0.75rem' }}>12-episode educational series by the Theoretical Physics dept...</div>
                <div className="d-flex gap-2">
                  <span className="badge bg-dark border border-secondary text-secondary" style={{ fontSize: '0.55rem', letterSpacing: '0.1em' }}>{t('series')}</span>
                  <span className="text-secondary fw-medium" style={{ fontSize: '0.65rem' }}>2024</span>
                </div>
              </td>
              <td className="px-4 py-4 border-secondary border-opacity-10">
                <span className="fw-semibold text-secondary" style={{ fontSize: '0.75rem' }}>{t('science')}</span>
              </td>
              <td className="px-4 py-4 border-secondary border-opacity-10">
                <div className="fw-medium text-light" style={{ fontSize: '0.875rem' }}>Elena Vasquez</div>
                <div className="text-secondary text-uppercase mt-1" style={{ fontSize: '0.65rem', letterSpacing: '0.05em' }}>Science Media Lab</div>
              </td>
              <td className="px-4 py-4 border-secondary border-opacity-10">
                <span className="badge rounded-pill border border-warning border-opacity-25 text-warning" style={{ backgroundColor: 'rgba(255, 193, 7, 0.1)', fontSize: '0.65rem', padding: '0.35rem 0.65rem' }}>{t('pending')}</span>
              </td>
              <td className="px-4 py-4 text-end border-secondary border-opacity-10">
                <div className="d-flex justify-content-end gap-1">
                  <button className="btn btn-sm btn-link text-secondary custom-hover p-2">
                    <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>edit</span>
                  </button>
                  <button className="btn btn-sm btn-link text-secondary custom-hover-danger p-2">
                    <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>delete</span>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
