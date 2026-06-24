import { useEffect, useRef, useState, type RefObject } from 'react';
import {
  isTopModal,
  lockBodyForModal,
  registerModal,
  unregisterModal,
  unlockBodyForModal,
} from './modalStack';

interface UseModalBehaviorOptions {
  isOpen: boolean;
  onClose: () => void;
  initialFocusRef?: RefObject<HTMLElement | null>;
}

export function useModalBehavior({ isOpen, onClose, initialFocusRef }: UseModalBehaviorOptions) {
  const [mounted, setMounted] = useState(false);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const modalIdRef = useRef(Symbol('modal'));

  useEffect(() => {
    if (!isOpen) {
      setMounted(false);
      const focusTarget = previousFocusRef.current;
      if (focusTarget && typeof focusTarget.focus === 'function') {
        focusTarget.focus();
      }
      previousFocusRef.current = null;
      return;
    }

    lockBodyForModal();
    const modalId = modalIdRef.current;
    registerModal(modalId, onClose);
    previousFocusRef.current = document.activeElement as HTMLElement | null;
    setMounted(true);

    const focusTimer = setTimeout(() => initialFocusRef?.current?.focus(), 50);

    return () => {
      clearTimeout(focusTimer);
      unregisterModal(modalId);
      unlockBodyForModal();
    };
  }, [isOpen, onClose, initialFocusRef]);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isTopModal(modalIdRef.current)) {
        event.preventDefault();
        onClose();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  return { mounted };
}
