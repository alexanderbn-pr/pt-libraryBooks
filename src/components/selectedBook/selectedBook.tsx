import './selectedBook.scss';

import React from 'react';
import PropTypes from 'prop-types';

import cross from '../../resources/icons/cross-icon.svg';

import { Book } from '../../types';

interface Props {
  selectedBook: Book;
  isFavorite: boolean;
  handleFavorite: (bookUrl: string) => void;
  setShowBook: React.Dispatch<React.SetStateAction<boolean>>;
}
const SelectedBook = ({
  selectedBook,
  isFavorite,
  setShowBook,
  handleFavorite,
}: Props) => {
  console.log('Renderizando BookComponent', selectedBook.name);
  return (
    <section className="selected-book">
      <div className="selected-book-close">
        <button onClick={() => setShowBook(false)}>
          <img alt="Cerrar modal" src={cross} />
        </button>
      </div>
      <img
        className="book-card-image"
        alt="imagen del libro seleccionado"
        src={`https://covers.openlibrary.org/b/isbn/${selectedBook.isbn}-M.jpg`}
      />
      <article className="selected-book-container">
        <h2>{selectedBook.name}</h2>
        <button
          onClick={() => handleFavorite(selectedBook.url)}
          className="favorite-button"
          aria-label={isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
        >
          {isFavorite ? '★' : '☆'}
        </button>
      </article>
      <div className="selected-book-info">
        <p>
          <strong>Autor:</strong> {selectedBook.authors.join(', ')}
        </p>
        <p>
          <strong>Editorial:</strong> {selectedBook.publisher}
        </p>
        <p>
          <strong>Páginas:</strong> {selectedBook.numberOfPages}
        </p>
        <p>
          <strong>Año:</strong> {selectedBook.released}
        </p>
        <a
          href={selectedBook.url}
          className="selected-book-btn"
          target="_blank"
        >
          Abrir API en el navegador
        </a>
      </div>
    </section>
  );
};

SelectedBook.propTypes = {
  selectedBook: PropTypes.object.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  handleFavorite: PropTypes.func.isRequired,
  setShowBook: PropTypes.func.isRequired,
};
export default React.memo(SelectedBook);
