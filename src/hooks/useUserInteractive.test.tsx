import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useUserInteractive } from './useUserInteractive';
import { type Book } from '../types.d';
const mockBook: Book = {
  url: '1',
  name: 'A Game of Thrones',
  isbn: '123',
  authors: ['George R. R. Martin'],
  characters: [],
  country: 'Westeros',
  mediaType: 'Hardcover',
  numberOfPages: 100,
  povCharacters: [],
  publisher: 'Bantam Books',
  released: '1996-08-06T00:00:00',
};
describe('useUserInteractive', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('Añadir y elimar favoritos de la lista', () => {
    const { result } = renderHook(() => useUserInteractive());

    act(() => {
      result.current.handleFavorite(mockBook.url);
    });
    expect(result.current.isFavorite(mockBook.url)).toBe(true);

    act(() => {
      result.current.handleFavorite(mockBook.url);
    });
    expect(result.current.isFavorite(mockBook.url)).toBe(false);
  });

  it('Añadir a reciente los libros seleccionados', () => {
    const { result } = renderHook(() => useUserInteractive());

    act(() => {
      result.current.handleBook(mockBook);
    });
    expect(result.current.recentBooks[0]).toEqual(mockBook);
    expect(result.current.showBook).toBe(true);
    expect(result.current.selectedBook).toEqual(mockBook);
  });

  it('Manejo del localstorage', () => {
    localStorage.setItem('favorites', JSON.stringify([mockBook.url]));
    const { result } = renderHook(() => useUserInteractive());
    expect(result.current.isFavorite(mockBook.url)).toBe(true);
  });
});
