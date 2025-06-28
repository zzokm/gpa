import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './ConfirmationModalStyles.css';

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
  // To handle modal open/close animations
  const [mounted, setMounted] = useState(false);
  
  // Handle modal mounting
  useEffect(() => {
    if (show) {
      // Add body class to prevent scrolling
      document.body.classList.add('modal-open');
      // Slight delay to ensure animation works properly
      setTimeout(() => setMounted(true), 10);
    } else {
      document.body.classList.remove('modal-open');
      setMounted(false);
    }
    
    // Cleanup function
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [show]);

  if (!show) return null;
  
  // Portal the modal to the end of the body to ensure proper overlay
  return ReactDOM.createPortal(
    <div className={`modal-overlay ${mounted ? 'modal-visible' : ''}`} onClick={onCancel}>
      <div className="modal-content confirmation-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">{title}</h2>
          <button className="modal-close" onClick={onCancel} aria-label="Close">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M14.7 1.3c-.4-.4-1-.4-1.4 0L8 6.6 2.7 1.3c-.4-.4-1-.4-1.4 0s-.4 1 0 1.4L6.6 8l-5.3 5.3c-.4.4-.4 1 0 1.4.2.2.4.3.7.3.3 0 .5-.1.7-.3L8 9.4l5.3 5.3c.2.2.5.3.7.3.2 0 .5-.1.7-.3.4-.4.4-1 0-1.4L9.4 8l5.3-5.3c.4-.4.4-1 0-1.4z"/>
            </svg>
          </button>
        </div>
        
        <div className="modal-body">
          <p className="confirmation-message">{message}</p>
        </div>
        
        <div className="modal-footer">
          <div className="button-group">
            <button className="btn-secondary" onClick={onCancel}>
              {cancelText}
            </button>
            <button 
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
