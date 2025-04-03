import { useState, useCallback, useMemo } from 'react';

interface SearchState {
  query: string;
  filters: Record<string, any>;
  sortBy: string | null;
  sortOrder: 'asc' | 'desc';
}

interface SearchResult<T> {
  items: T[];
  query: string;
  filters: Record<string, any>;
  sortBy: string | null;
  sortOrder: 'asc' | 'desc';
  setQuery: (query: string) => void;
  setFilter: (key: string, value: any) => void;
  removeFilter: (key: string) => void;
  clearFilters: () => void;
  setSort: (field: string, order: 'asc' | 'desc') => void;
  clearSort: () => void;
}

export function useSearch<T>(
  items: T[],
  searchFields: (keyof T)[],
  initialState: Partial<SearchState> = {}
): SearchResult<T> {
  const [state, setState] = useState<SearchState>({
    query: initialState.query || '',
    filters: initialState.filters || {},
    sortBy: initialState.sortBy || null,
    sortOrder: initialState.sortOrder || 'asc',
  });

  const filteredItems = useMemo(() => {
    let result = [...items];

    // Apply search query
    if (state.query) {
      const query = state.query.toLowerCase();
      result = result.filter(item => 
        searchFields.some(field => {
          const value = item[field];
          return value && String(value).toLowerCase().includes(query);
        })
      );
    }

    // Apply filters
    Object.entries(state.filters).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        result = result.filter(item => 
          item[key as keyof T] === value
        );
      }
    });

    // Apply sorting
    if (state.sortBy) {
      result.sort((a, b) => {
        const aValue = a[state.sortBy as keyof T];
        const bValue = b[state.sortBy as keyof T];

        if (aValue === bValue) return 0;
        if (aValue === null || aValue === undefined) return 1;
        if (bValue === null || bValue === undefined) return -1;

        const comparison = aValue < bValue ? -1 : 1;
        return state.sortOrder === 'asc' ? comparison : -comparison;
      });
    }

    return result;
  }, [items, state.query, state.filters, state.sortBy, state.sortOrder, searchFields]);

  const setQuery = useCallback((query: string) => {
    setState(prev => ({ ...prev, query }));
  }, []);

  const setFilter = useCallback((key: string, value: any) => {
    setState(prev => ({
      ...prev,
      filters: {
        ...prev.filters,
        [key]: value,
      },
    }));
  }, []);

  const removeFilter = useCallback((key: string) => {
    setState(prev => {
      const { [key]: _, ...rest } = prev.filters;
      return {
        ...prev,
        filters: rest,
      };
    });
  }, []);

  const clearFilters = useCallback(() => {
    setState(prev => ({
      ...prev,
      filters: {},
    }));
  }, []);

  const setSort = useCallback((field: string, order: 'asc' | 'desc') => {
    setState(prev => ({
      ...prev,
      sortBy: field,
      sortOrder: order,
    }));
  }, []);

  const clearSort = useCallback(() => {
    setState(prev => ({
      ...prev,
      sortBy: null,
      sortOrder: 'asc',
    }));
  }, []);

  return {
    items: filteredItems,
    query: state.query,
    filters: state.filters,
    sortBy: state.sortBy,
    sortOrder: state.sortOrder,
    setQuery,
    setFilter,
    removeFilter,
    clearFilters,
    setSort,
    clearSort,
  };
} 