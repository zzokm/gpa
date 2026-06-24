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
    <>
      <style jsx global>{`/* Modal Content - specific styles for confirmation modal */
.modal-content.confirmation-modal {
  background: var(--glass-bg);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border-radius: var(--radius-2xl);
  border: 1px solid var(--glass-border);
  max-width: 450px;
  width: 100%;
  overflow: hidden;
}

/* Modal body padding specifically for confirmation modal */
.confirmation-modal .modal-body {
  padding: var(--space-sm) var(--space-2xl) var(--space-xl);
}

/* Confirmation message styling */
.confirmation-message {
  margin: 0;
  font-size: var(--text-base);
  color: var(--text-color);
  line-height: 1.5;
  text-align: center;
  padding: var(--space-lg) 0;
}

/* Modal footer styling for confirmation modal */
.confirmation-modal .modal-footer {
  padding: var(--space-md) var(--space-2xl);
  border-top: 1px solid var(--border-light);
  margin-top: auto;
  display: flex;
  justify-content: flex-end;
}

/* Modal footer button group for confirmation modal */
.confirmation-modal .modal-footer .button-group {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: var(--space-md);
  margin: 0;
  min-height: 44px;
}

/* Same size for Cancel and Reset – equal width and height (44px includes border) */
.confirmation-modal .modal-footer .button-group button {
  min-width: 130px;
  width: 130px;
  height: 44px;
  min-height: 44px;
  max-height: 44px;
  padding: 0 var(--space-md);
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

/* Danger button for destructive actions - styled like btn-primary but with red colors */
.btn-danger {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-sm);
  padding: var(--space-sm) var(--space-xl);
  background: linear-gradient(135deg, #e53935, #c62828);
  color: var(--white);
  border: none;
  border-radius: var(--radius-md);
  font-size: var(--text-base);
  font-weight: 650;
  cursor: pointer;
  transition: var(--transition-base);
  text-decoration: none;
  letter-spacing: 0.025em;
  min-height: 44px; /* Touch target; match other modal buttons */
  position: relative;
  overflow: hidden;
  min-width: 120px; /* Match the min-width from .modal-footer .btn-primary */
}

.btn-danger::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: var(--transition-slow);
}

.btn-danger:hover::before {
  left: 100%;
}

.btn-danger:hover {
  background: linear-gradient(135deg, #d32f2f, #b71c1c);
  transform: translateY(-2px);
}

.btn-danger:active {
  transform: translateY(0);
}

.confirmation-modal .modal-footer .btn-danger {
  margin: 0;
}

.modal-footer .btn-danger {
  margin: var(--space-sm); /* Match margins with other modal footer buttons */
}

/* Responsive Design */
@media (max-width: 576px) {
  .confirmation-modal {
    width: 95%;
  }
  
  .confirmation-modal .button-group {
    flex-direction: column-reverse;
    width: 100%;
  }
  
  .confirmation-modal .button-group button,
  .confirmation-modal .modal-footer .btn-danger {
    width: 100%;
    min-height: 44px;
    margin-top: var(--space-sm);
    margin-bottom: var(--space-sm);
  }
}`}</style>
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
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
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
    </div>
    </>,
    document.body
  );
};

export default ConfirmationModal;
