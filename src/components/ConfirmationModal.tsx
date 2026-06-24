import './ConfirmationModal.css'
import React, { useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useLocale } from '../i18n/LocaleContext';
import { useModalBehavior } from '../hooks/useModalBehavior';
interface ConfirmationModalProps {
  show: boolean;
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
  onConfirm: () => void;
  onCancel: () => void;
  isDanger?: boolean;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  show,
  title,
  message,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
  isDanger = false
}) => {
  const { t } = useLocale()
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  const handleCancel = useCallback(() => {
    onCancel()
  }, [onCancel])

  const { mounted } = useModalBehavior({
    isOpen: show,
    onClose: handleCancel,
    initialFocusRef: closeButtonRef,
  })

  if (!show) return null;
  
  // Portal the modal to the end of the body to ensure proper overlay
  return createPortal(
    <div className={`modal-overlay ${mounted ? 'modal-visible' : ''}`} onClick={handleCancel} role="presentation">
      <div
        className="modal-content confirmation-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirmation-modal-title"
        aria-describedby="confirmation-modal-message"
      >
        <div className="modal-header">
          <h2 className="modal-title" id="confirmation-modal-title">{title}</h2>
          <button
            ref={closeButtonRef}
            type="button"
            className="modal-close"
            onClick={handleCancel}
            aria-label={t('common.close')}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
              <path d="M14.7 1.3c-.4-.4-1-.4-1.4 0L8 6.6 2.7 1.3c-.4-.4-1-.4-1.4 0s-.4 1 0 1.4L6.6 8l-5.3 5.3c-.4.4-.4 1 0 1.4.2.2.4.3.7.3.3 0 .5-.1.7-.3L8 9.4l5.3 5.3c.2.2.5.3.7.3.2 0 .5-.1.7-.3.4-.4.4-1 0-1.4L9.4 8l5.3-5.3c.4-.4.4-1 0-1.4z"/>
            </svg>
          </button>
        </div>
        
        <div className="modal-body">
          <p className="confirmation-message" id="confirmation-modal-message">{message}</p>
        </div>
        
        <div className="modal-footer">
          <div className="button-group">
            <button type="button" className="btn-secondary" onClick={handleCancel}>
              {cancelText}
            </button>
            <button 
              type="button"
              className={isDanger ? "btn-danger" : "btn-primary"} 
              onClick={onConfirm}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ConfirmationModal;
