import { type Book } from '../types.d';
import { useCallback, useEffect, useState } from 'react';

export const useUserInteractive = () => {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  
  const [recentBooks, setRecentBooks] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<any>(null);

  const [showBook, setShowBook] = useState<boolean>(false);

  useEffect(() => {
    const parsedFavorites = new Set(
      JSON.parse(localStorage.getItem('favorites') ?? '[]') as string,
    );
    setFavorites(parsedFavorites);
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify([...favorites]));
  }, [favorites]);

  const handleBook = useCallback((bk: Book) => {
    setSelectedBook(bk);
    //Utilizo el prev para no tener que añadir la dependencia de recentBooks
    setRecentBooks((prev) => {
      let booksVisited: Book[] = [];
      if (prev.findIndex((book) => book.url === bk.url) !== -1) {
        booksVisited = [bk, ...prev.filter((book) => book.url !== bk.url)];
      } else {
        booksVisited = [bk, ...prev];
        if (booksVisited.length > 5) booksVisited = booksVisited.slice(0, 5);
      }
      return booksVisited;
    });
    setShowBook(true);
  }, []);

  const handleFavorite = useCallback((bookUrl: string) => {
    setFavorites((prev) => {
      const newBook = new Set(prev);
      newBook.has(bookUrl) ? newBook.delete(bookUrl) : newBook.add(bookUrl);
      return newBook;
    });
  }, []);

  const isFavorite = useCallback(
    (bookUrl: string) => {
      return favorites.has(bookUrl);
    },
    [favorites],
  );

  return {
    selectedBook,
    showBook,
    recentBooks,
    setShowBook,
    handleBook,
    handleFavorite,
    isFavorite,
  };
};
