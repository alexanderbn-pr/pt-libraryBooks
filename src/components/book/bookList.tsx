import './bookList.scss';

import React from 'react';
import PropTypes from 'prop-types';

import { Book } from '../../types.d';
import BookComponent from '../book/bookComponent';

interface BooksGridProps {
  books: Book[];
  isFavorite: (url: string) => boolean;
  handleBook: (book: Book) => void;
  handleFavorite: (url: string) => void;
}

const BookList = ({
  books,
  isFavorite,
  handleBook,
  handleFavorite,
}: BooksGridProps) => {
  console.log('Renderizando BookList', books.length);
  return (
    <div className="books-list">
      {books.length > 0 &&
        books.map((book: Book) => (
          <BookComponent
            book={book}
            key={book.url}
            isFavorite={isFavorite(book.url)}
            handleBook={handleBook}
            handleFavorite={handleFavorite}
          />
        ))}
    </div>
  );
};

BookList.propTypes = {
  books: PropTypes.array.isRequired,
  isFavorite: PropTypes.func.isRequired,
  handleFavorite: PropTypes.func.isRequired,
  handleBook: PropTypes.func.isRequired,
};

export default React.memo(BookList);
