import { BooksResponse } from '../types';

// Delay artificial para testing de Suspense (remover en producción)
const SIMULATE_DELAY = 3000; // 3 segundos

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchBooks = async (): Promise<BooksResponse> => {
  // Simular delay de red para ver los fallbacks
  await delay(SIMULATE_DELAY);
  
  return await fetch('https://anapioficeandfire.com/api/books').then((res) => {
    if (!res.ok) throw new Error('Error al obtener los libros');
    return res?.json();
  });
};
