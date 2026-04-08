import { fetchClient } from '../api/fetchClient';

export const fetchCharacters = async ({
  pageParam = 1,
  numCharacters = 20,
}) => {
  return fetchClient.get('/characters', {
    params: {
      page: pageParam,
      pageSize: numCharacters,
    },
  }).then((res: any[]) => {
    const nextCursor = pageParam > 5 ? undefined : pageParam + 1;
    return {
      nextCursor,
      characters: res,
    };
  });
};
