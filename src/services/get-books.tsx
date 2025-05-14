import { BooksResponse } from '../types';
export const fetchBooks = async (): Promise<BooksResponse> => {
  return await fetch('https://anapioficeandfire.com/api/books').then((res) => {
    if (!res.ok) throw new Error('Error al obtener los libros');
    return res?.json();
  });
};
