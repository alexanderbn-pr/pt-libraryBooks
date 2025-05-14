import { type Book, SortBy, SortOption } from '../types.d';
import { useState, useMemo } from 'react';
import { useDebounce } from '@uidotdev/usehooks';
import { fetchBooks } from '../services/get-books';
import { useQuery } from '@tanstack/react-query';
import { SORT_OPTIONS } from '../constants/books';

export const useBooksFilters = () => {
  const [searchName, setSearchName] = useState<string>('');
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE);
  const [isSortedAsc, setIsSortedAsc] = useState<boolean>(true);
  const debouncedFilterName = useDebounce(searchName, 250);

  const { data, isLoading, isError, refetch } = useQuery<Book[]>({
    queryKey: ['books'],
    queryFn: fetchBooks,
    //Por si el cliente se marcha y los datos se quedan obsoletos
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  const books = data || [];

  const filteredBooks: Book[] = useMemo(() => {
    console.log('Filtrado de libros');
    return searchName != '' && searchName.length > 0
      ? books.filter((book: Book) => {
          return book.name.toLowerCase().includes(searchName.toLowerCase());
        })
      : books;
  }, [books, debouncedFilterName]);

  const sortedBooks: Book[] = useMemo(() => {
    console.log('Ordenación de libros');
    if (sorting === SortBy.NONE) return filteredBooks;

    const compareProperties: Record<string, (book: Book) => any> = {
      [SortBy.NAME]: (book) => book.name,
      [SortBy.CHARACTERS]: (book) => book.characters.length,
      [SortBy.PAGES]: (book) => book.numberOfPages,
    };
    return filteredBooks.toSorted((a, b) => {
      const extractProperty = compareProperties[sorting];
      const valueA = extractProperty(a);
      const valueB = extractProperty(b);

      if (typeof valueA === 'string') {
        return isSortedAsc
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }

      return isSortedAsc ? valueA - valueB : valueB - valueA;
    });
  }, [filteredBooks, sorting, isSortedAsc]);

  const toggleSortBy = (newSortingValue: SortBy) => {
    if (sorting === newSortingValue) {
      setIsSortedAsc((prev) => !prev);
    } else {
      setIsSortedAsc(true);
      setSorting(newSortingValue);
    }
  };

  return {
    books: sortedBooks,
    searchName,
    sorting,
    isSortedAsc,
    sortOptions: SORT_OPTIONS,
    loading: isLoading,
    error: isError,
    getBooks: refetch,
    toggleSortBy,
    setSearchName,
  };
};
