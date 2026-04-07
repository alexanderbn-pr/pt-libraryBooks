import { useQuery } from '@tanstack/react-query';
import { Book } from '../types';

export const useBooks = () => {
  return useQuery<Book[]>({
    queryKey: ['books'],
    queryFn: async () => {
      const response = await fetch('https://api.example.com/books');
      if (!response.ok) throw new Error('Failed to fetch books');
      return response.json();
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes (formerly cacheTime)
  });
};
