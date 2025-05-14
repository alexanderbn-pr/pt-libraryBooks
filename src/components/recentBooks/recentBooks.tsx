import './recentBooks.scss';

import PropTypes from 'prop-types';

import { Book } from '../../types';

interface Props {
  recentBooks: Book[];
  handleBook: (book: Book) => void;
}

const RecentBook = ({ recentBooks, handleBook }: Props) => {
  return (
    <section>
      <h3>Libros visitados recientemente: </h3>
      <ul className="recent-books">
        {recentBooks.map((book: Book) => (
          <li className="recent-books-item" key={book.url}>
            <button
              onClick={() => handleBook(book)}
              className="recent-books-button"
            >
              {book.name}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};

RecentBook.propTypes = {
  recentBooks: PropTypes.array.isRequired,
  handleBook: PropTypes.func.isRequired,
};

export default RecentBook;
