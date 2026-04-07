import { useBooks } from '../../hooks/useBooks';
import BookList from '../../components/book/bookList';
import { BookSkeleton } from '../../components/book/bookSkeleton';

interface BooksContainerProps {
  isFavorite?: (url: string) => boolean;
  handleBook?: (book: any) => void;
  handleFavorite?: (url: string) => void;
}

export const BooksContainer = ({ 
  isFavorite = () => false, 
  handleBook = () => {}, 
  handleFavorite = () => {} 
}: BooksContainerProps) => {
  const { data: books = [], isLoading, error } = useBooks();

  if (error) {
    return <div className="error-message">Error loading books</div>;
  }

  if (isLoading) {
    return (
      <div className="books-skeleton-list">
        {Array.from({ length: 5 }).map((_, i) => (
          <BookSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <BookList 
      books={books}
      isFavorite={isFavorite}
      handleBook={handleBook}
      handleFavorite={handleFavorite}
    />
  );
};

export default BooksContainer;
