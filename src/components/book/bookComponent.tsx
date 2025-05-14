import React, { useState } from 'react';
import PropTypes from 'prop-types';

import loading from '@/resources/icons/loadign.gif';

import { Book } from '../../types';

interface Props {
  book: Book;
  isFavorite: boolean;
  handleBook: (book: Book) => void;
  handleFavorite: (bookUrl: string) => void;
}
const BookComponent = ({
  book,
  isFavorite,
  handleBook,
  handleFavorite,
}: Props) => {
  console.log('Renderizando BookComponent', book.name);
  const [imgLoaded, setImgLoaded] = useState(false);

  const addFavorite = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    handleFavorite(book.url);
  };

  return (
    <div
      onClick={() => handleBook(book)}
      className="book-card"
      aria-label="Ver detalles del libro"
    >
      <section className="book-card-info">
        <h3 className="book-card-name">{book.name}</h3>
        <button
          onClick={(e) => {
            addFavorite(e);
          }}
          className="favorite-button"
          aria-label={isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
        >
          {isFavorite ? '★' : '☆'}
        </button>
      </section>
      {!imgLoaded && (
        <img
          className="book-card-image"
          alt="loading de carga"
          src={loading}
        ></img>
      )}
      <img
        className="book-card-image"
        alt="imagen del libro"
        src={`https://covers.openlibrary.org/b/isbn/${book.isbn}-M.jpg`}
        loading="lazy"
        onLoad={() => setImgLoaded(true)}
      />
    </div>
  );
};

BookComponent.propTypes = {
  book: PropTypes.object.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  handleFavorite: PropTypes.func.isRequired,
  handleBook: PropTypes.func.isRequired,
};

export default React.memo(BookComponent);
