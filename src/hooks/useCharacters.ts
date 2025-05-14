import { fetchCharacters } from '../services/get-characters';
import { useInfiniteQuery } from '@tanstack/react-query';

export const useCharacters = () => {
  const {
    isLoading,
    isFetchingNextPage,
    isError,
    data,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['characters'],
    queryFn: fetchCharacters,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: 1,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 3,
    retry: 5,
  });

  return {
    fetchNextPage,
    isLoading,
    isError,
    characters: data?.pages.flatMap((page) => page.characters) ?? [],
    hasNextPage,
    isFetchingNextPage,
  };
};
