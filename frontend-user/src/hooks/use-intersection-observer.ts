import { useEffect, useRef, useState, useCallback } from 'react';

interface IntersectionObserverOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
  enabled?: boolean;
}

interface IntersectionObserverResult {
  ref: React.RefObject<Element>;
  isIntersecting: boolean;
  intersectionRatio: number;
  intersectionRect: DOMRectReadOnly | null;
  boundingClientRect: DOMRectReadOnly | null;
  rootBounds: DOMRectReadOnly | null;
}

export function useIntersectionObserver(
  options: IntersectionObserverOptions = {}
): IntersectionObserverResult {
  const {
    root = null,
    rootMargin = '0px',
    threshold = 0,
    enabled = true,
  } = options;

  const [state, setState] = useState<Omit<IntersectionObserverResult, 'ref'>>({
    isIntersecting: false,
    intersectionRatio: 0,
    intersectionRect: null,
    boundingClientRect: null,
    rootBounds: null,
  });

  const ref = useRef<Element>(null);

  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    const entry = entries[0];
    if (!entry) return;

    setState({
      isIntersecting: entry.isIntersecting,
      intersectionRatio: entry.intersectionRatio,
      intersectionRect: entry.intersectionRect,
      boundingClientRect: entry.boundingClientRect,
      rootBounds: entry.rootBounds,
    });
  }, []);

  useEffect(() => {
    if (!enabled || !ref.current) return;

    const observer = new IntersectionObserver(handleIntersection, {
      root,
      rootMargin,
      threshold,
    });

    observer.observe(ref.current);

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
      observer.disconnect();
    };
  }, [enabled, root, rootMargin, threshold, handleIntersection]);

  return {
    ref,
    ...state,
  };
}

// Common use cases
export function useInView(options: IntersectionObserverOptions = {}) {
  const { isIntersecting, ref } = useIntersectionObserver({
    threshold: 0.1,
    ...options,
  });

  return { isInView: isIntersecting, ref };
}

export function useLazyLoad(options: IntersectionObserverOptions = {}) {
  const { isIntersecting, ref } = useIntersectionObserver({
    rootMargin: '50px',
    ...options,
  });

  return { isLoaded: isIntersecting, ref };
}

export function useInfiniteScroll(
  callback: () => void,
  options: IntersectionObserverOptions = {}
) {
  const { isIntersecting, ref } = useIntersectionObserver({
    rootMargin: '100px',
    ...options,
  });

  useEffect(() => {
    if (isIntersecting) {
      callback();
    }
  }, [isIntersecting, callback]);

  return { ref };
} 