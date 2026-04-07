import { type Book } from '../types';
import { fetchBooks } from '../services/get-books';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useSuspenseBooks = () => {
  const { data, refetch } = useSuspenseQuery<Book[]>({
    queryKey: ['books'],
    queryFn: fetchBooks,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  const books = data || [];

  return {
    books,
    getBooks: refetch,
  };
};
