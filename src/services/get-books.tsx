import { BooksResponse } from '../types';
import { fetchClient } from '../api/fetchClient';

// Delay artificial para testing de Suspense (remover en producción)
const SIMULATE_DELAY = 3000; // 3 segundos

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchBooks = async (): Promise<BooksResponse> => {
  await delay(SIMULATE_DELAY);
  return fetchClient.get<BooksResponse>('/books');
};
