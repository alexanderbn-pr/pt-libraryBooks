import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { lazy, Suspense } from 'react';

import Header from './components/header/header';
import { ErrorBoundary } from 'react-error-boundary';

const BooksContainer = lazy(() => import('./pages/booksList/BooksContainer'));
const BooksContainerSuspense = lazy(() => import('./pages/booksSuspense/BooksContainerSuspense'));
const CharacterList = lazy(() => import('./pages/charactersList/charactersList'));

const LoadingFallback = () => (
  <div>
    Cargando Libros skelleton libros
  </div>
);

function App() {
  return (
    <ErrorBoundary fallback={<div>
        Ocurrió un error al cargar la aplicación
      </div>}>
    <Router>
      <Header />
        <Routes>
          <Route path="/" element={<Navigate to="/booksPageSuspense" replace />} />
          <Route path="/booksPageSuspense" element={
            <ErrorBoundary fallback={<div>
              Ocurrió un error al cargar los libros con suspense
            </div>}>
            <Suspense fallback={<div>
                Cargando Libros skelleton libros Suspense individual
              </div>}>
              <BooksContainerSuspense />
            </Suspense>
            </ErrorBoundary>
          } />
          <Route path="/booksContainer" element={
            <Suspense fallback={<LoadingFallback />}>
              <BooksContainer />
            </Suspense>} 
          />
          <Route path="/characters" element={<CharacterList />} />
        </Routes>
    </Router>
    </ErrorBoundary>
  );
}

export default App;
