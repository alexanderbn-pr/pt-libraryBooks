import '../booksList/booksPage.scss';
import BookList from '../../components/book/bookList';
import BookListSkeleton from '../../components/book/bookSkeleton';
import { useBooksFilters } from '../../hooks/useBooksFilters';
import { useBooks } from '../../hooks/useBooks';
import { useCharacters } from '../../hooks/useCharacters';
import { useUserInteractive } from '../../hooks/useUserInteractive';
import Search from '../../components/search/search';
import CharacterCountSkeleton from '../../components/characters/characterCountSkeleton';
import { Suspense, useState, useEffect } from 'react';


const BookListContent = ({ 
  handleBook, 
  handleFavorite, 
  isFavorite, 
  searchName 
}: {
  handleBook: any;
  handleFavorite: any;
  isFavorite: any;
  searchName: string;
}) => {
  const { books } = useBooks();
  const bookLibrary = useBooksFilters(books);
  useEffect(() => {
    bookLibrary.setSearchName(searchName);
  }, [searchName, bookLibrary]);

  return (
    <BookList
      books={bookLibrary.books}
      isFavorite={isFavorite}
      handleBook={handleBook}
      handleFavorite={handleFavorite}
    />
  );
};

const BooksListSection = () => {
  const [searchName, setSearchName] = useState<string>('');
  const { handleBook, handleFavorite, isFavorite } = useUserInteractive();

  return (
    <>
      <Search
        valueSearch={searchName}
        setValue={setSearchName}
        search={() => {}}
      />
      <article>
        <h3>Lista de libros</h3>
        <Suspense fallback={<BookListSkeleton />}>
          <BookListContent
            searchName={searchName}
            handleBook={handleBook}
            handleFavorite={handleFavorite}
            isFavorite={isFavorite}
          />
        </Suspense>
      </article>
    </>
  )
};

const CharactersCountSection = () => {
  const { allCharacters } = useCharacters();
  return <p>Cantidad de personajes totales: {allCharacters.length}</p>
};

const BooksContainerSuspense = () => {
  return (
    <main className="books-container">
      <h4>Carga asyn con suspense de componentes</h4>
      <BooksListSection />
      <Suspense fallback={<CharacterCountSkeleton />}>
        <CharactersCountSection />
      </Suspense>
    </main>
  );
};
export default BooksContainerSuspense;
