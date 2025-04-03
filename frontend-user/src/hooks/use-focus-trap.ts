import { useEffect, useRef, useCallback } from 'react';

interface FocusTrapOptions {
  enabled?: boolean;
  autoFocus?: boolean;
  returnFocus?: boolean;
  escapeDeactivates?: boolean;
  allowOutsideClick?: boolean;
  preventScroll?: boolean;
}

export function useFocusTrap(options: FocusTrapOptions = {}) {
  const {
    enabled = true,
    autoFocus = true,
    returnFocus = true,
    escapeDeactivates = true,
    allowOutsideClick = false,
    preventScroll = true,
  } = options;

  const containerRef = useRef<HTMLElement | null>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const getFocusableElements = useCallback(() => {
    if (!containerRef.current) return [];
    
    return Array.from(
      containerRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
    ).filter(
      element => 
        element.offsetParent !== null && // Check if element is visible
        !element.hasAttribute('disabled') &&
        !element.getAttribute('aria-hidden')
    );
  }, []);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (!enabled || !containerRef.current) return;

    const focusableElements = getFocusableElements();
    if (focusableElements.length === 0) return;

    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement = focusableElements[focusableElements.length - 1];

    if (event.key === 'Tab') {
      if (event.shiftKey) {
        if (document.activeElement === firstFocusableElement) {
          event.preventDefault();
          lastFocusableElement.focus();
        }
      } else {
        if (document.activeElement === lastFocusableElement) {
          event.preventDefault();
          firstFocusableElement.focus();
        }
      }
    } else if (event.key === 'Escape' && escapeDeactivates) {
      event.preventDefault();
      if (returnFocus && previousFocusRef.current) {
        previousFocusRef.current.focus();
      }
    }
  }, [enabled, escapeDeactivates, returnFocus, getFocusableElements]);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (!enabled || !containerRef.current || allowOutsideClick) return;

    if (!containerRef.current.contains(event.target as Node)) {
      event.preventDefault();
      event.stopPropagation();
    }
  }, [enabled, allowOutsideClick]);

  useEffect(() => {
    if (!enabled) return;

    // Store the previously focused element
    previousFocusRef.current = document.activeElement as HTMLElement;

    // Add event listeners
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);

    // Focus the first focusable element
    if (autoFocus) {
      const focusableElements = getFocusableElements();
      if (focusableElements.length > 0) {
        focusableElements[0].focus();
      }
    }

    // Prevent scrolling if needed
    if (preventScroll) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      // Remove event listeners
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);

      // Restore scrolling
      if (preventScroll) {
        document.body.style.overflow = '';
      }

      // Return focus to the previous element
      if (returnFocus && previousFocusRef.current) {
        previousFocusRef.current.focus();
      }
    };
  }, [
    enabled,
    autoFocus,
    preventScroll,
    returnFocus,
    handleKeyDown,
    handleClickOutside,
    getFocusableElements,
  ]);

  return containerRef;
} 