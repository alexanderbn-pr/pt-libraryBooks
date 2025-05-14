import './booksPage.scss';

import BookList from '../../components/book/bookList';
import SelectedBook from '../../components/selectedBook/selectedBook';
import SortFilters from '../../components/sortFilters/sortFilters';
import Search from '../../components/search/search';
import RecentBook from '../../components/recentBooks/recentBooks';

import { useBooksFilters } from '../../hooks/useBooksFilters';
import { useUserInteractive } from '../../hooks/useUserInteractive';

const BooksPage = () => {
  const bookLibrary = useBooksFilters();
  const {
    selectedBook,
    showBook,
    recentBooks,
    setShowBook,
    handleBook,
    handleFavorite,
    isFavorite,
  } = useUserInteractive();

  return (
    <main className="books-container">
      {bookLibrary.error && (
        <p className="error-message">{bookLibrary.error}</p>
      )}

      <Search
        valueSearch={bookLibrary.searchName}
        setValue={bookLibrary.setSearchName}
        search={bookLibrary.getBooks}
      />

      {bookLibrary.loading ? (
        <p>Cargando...</p>
      ) : (
        <>
          <div className="books-container-tools">
            <article>
              <h3>Libros encontrados: {bookLibrary.books.length}</h3>
              <SortFilters
                isSortedAsc={bookLibrary.isSortedAsc}
                sorting={bookLibrary.sorting}
                toggleSortBy={bookLibrary.toggleSortBy}
                sortOptions={bookLibrary.sortOptions}
              />
            </article>
            {recentBooks.length > 0 && (
              <RecentBook recentBooks={recentBooks} handleBook={handleBook} />
            )}
          </div>
          <article>
            <h3>Lista de libros</h3>
            <BookList
              books={bookLibrary.books}
              isFavorite={isFavorite}
              handleBook={handleBook}
              handleFavorite={handleFavorite}
            />
          </article>
        </>
      )}

      {selectedBook && showBook && (
        <SelectedBook
          selectedBook={selectedBook}
          isFavorite={isFavorite(selectedBook.url)}
          handleFavorite={handleFavorite}
          setShowBook={setShowBook}
        />
      )}
    </main>
  );
};
export default BooksPage;
