import { fetchClient } from '../api/fetchClient';

// Delay artificial para testing de Suspense (remover en producción)
const SIMULATE_DELAY = 10000; // 10 segundos

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchAllCharacters = async () => {
  await delay(SIMULATE_DELAY);
  return fetchClient.get('/characters', {
    params: {
      pageSize: 200,
    },
  });
};
