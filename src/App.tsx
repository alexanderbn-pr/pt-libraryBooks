import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import BooksPage from './pages/booksList/booksPage';
import CharacterList from './pages/charactersList/charactersList';
import Header from './components/header/header';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/books" replace />} />
        <Route path="/books" element={<BooksPage />} />
        <Route path="/characters" element={<CharacterList />} />
      </Routes>
    </Router>
  );
}

export default App;
