import { useEffect, useRef, useState, type RefObject } from 'react';

interface UseModalBehaviorOptions {
  isOpen: boolean;
  onClose: () => void;
  initialFocusRef?: RefObject<HTMLElement | null>;
}

export function useModalBehavior({ isOpen, onClose, initialFocusRef }: UseModalBehaviorOptions) {
  const [mounted, setMounted] = useState(false);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('modal-open');
      previousFocusRef.current = document.activeElement as HTMLElement | null;
      setMounted(true);
      const focusTimer = setTimeout(() => initialFocusRef?.current?.focus(), 50);
      return () => {
        clearTimeout(focusTimer);
      };
    }

    document.body.classList.remove('modal-open');
    setMounted(false);
    const focusTarget = previousFocusRef.current;
    if (focusTarget && typeof focusTarget.focus === 'function') {
      focusTarget.focus();
    }
    previousFocusRef.current = null;
  }, [isOpen, initialFocusRef]);

  useEffect(() => {
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  return { mounted };
}
