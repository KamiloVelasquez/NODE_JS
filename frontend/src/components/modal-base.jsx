import React, { useEffect, useRef } from 'react';
import { Modal } from 'bootstrap';

/**
 * ModalBase Component
 * Reusable wrapper for Bootstrap Modals.
 * @param {boolean} show - Controls visibility.
 * @param {function} onClose - Callback when modal is closed.
 * @param {string} title - Modal header title.
 * @param {React.ReactNode} children - Form or content inside the modal.
 * @param {string} size - Bootstrap modal size (sm, lg, xl).
 */
export default function ModalBase({ show, onClose, title, children, size = 'md' }) {
  const modalRef = useRef(null);
  const modalInstance = useRef(null);

  useEffect(() => {
    if (modalRef.current) {
      modalInstance.current = new Modal(modalRef.current, {
        backdrop: 'static',
        keyboard: false
      });
    }
    return () => {
      if (modalInstance.current) {
        modalInstance.current.hide();
      }
    };
  }, []);

  useEffect(() => {
    if (show) {
      modalInstance.current?.show();
    } else {
      modalInstance.current?.hide();
    }
  }, [show]);

  return (
    <div className="modal fade" ref={modalRef} tabIndex="-1" aria-hidden="true">
      <div className={`modal-dialog modal-dialog-centered modal-${size}`}>
        <div className="modal-content bg-dark border-secondary border-opacity-25 shadow-lg text-light">
          <div className="modal-header border-secondary border-opacity-10 py-3">
            <h5 className="modal-title fw-bold" style={{ fontSize: '1rem' }}>{title}</h5>
            <button 
              type="button" 
              className="btn-close btn-close-white shadow-none" 
              onClick={onClose} 
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body p-4">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
