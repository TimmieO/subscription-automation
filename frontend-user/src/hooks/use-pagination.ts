import { useState, useCallback, useMemo } from 'react';

interface PaginationState {
  currentPage: number;
  pageSize: number;
  totalItems: number;
}

interface PaginationResult<T> {
  items: T[];
  currentPage: number;
  pageSize: number;
  totalPages: number;
  totalItems: number;
  goToPage: (page: number) => void;
  goToNextPage: () => void;
  goToPreviousPage: () => void;
  goToFirstPage: () => void;
  goToLastPage: () => void;
  setPageSize: (size: number) => void;
  isFirstPage: boolean;
  isLastPage: boolean;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export function usePagination<T>(
  items: T[],
  initialState: Partial<PaginationState> = {}
): PaginationResult<T> {
  const [state, setState] = useState<PaginationState>({
    currentPage: initialState.currentPage || 1,
    pageSize: initialState.pageSize || 10,
    totalItems: initialState.totalItems || items.length,
  });

  const totalPages = useMemo(() => 
    Math.ceil(state.totalItems / state.pageSize),
    [state.totalItems, state.pageSize]
  );

  const paginatedItems = useMemo(() => {
    const start = (state.currentPage - 1) * state.pageSize;
    const end = start + state.pageSize;
    return items.slice(start, end);
  }, [items, state.currentPage, state.pageSize]);

  const goToPage = useCallback((page: number) => {
    if (page >= 1 && page <= totalPages) {
      setState(prev => ({ ...prev, currentPage: page }));
    }
  }, [totalPages]);

  const goToNextPage = useCallback(() => {
    if (state.currentPage < totalPages) {
      setState(prev => ({ ...prev, currentPage: prev.currentPage + 1 }));
    }
  }, [state.currentPage, totalPages]);

  const goToPreviousPage = useCallback(() => {
    if (state.currentPage > 1) {
      setState(prev => ({ ...prev, currentPage: prev.currentPage - 1 }));
    }
  }, [state.currentPage]);

  const goToFirstPage = useCallback(() => {
    setState(prev => ({ ...prev, currentPage: 1 }));
  }, []);

  const goToLastPage = useCallback(() => {
    setState(prev => ({ ...prev, currentPage: totalPages }));
  }, [totalPages]);

  const setPageSize = useCallback((size: number) => {
    setState(prev => ({
      ...prev,
      pageSize: size,
      currentPage: 1, // Reset to first page when changing page size
    }));
  }, []);

  return {
    items: paginatedItems,
    currentPage: state.currentPage,
    pageSize: state.pageSize,
    totalPages,
    totalItems: state.totalItems,
    goToPage,
    goToNextPage,
    goToPreviousPage,
    goToFirstPage,
    goToLastPage,
    setPageSize,
    isFirstPage: state.currentPage === 1,
    isLastPage: state.currentPage === totalPages,
    hasNextPage: state.currentPage < totalPages,
    hasPreviousPage: state.currentPage > 1,
  };
} 