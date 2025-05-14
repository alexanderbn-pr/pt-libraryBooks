import './navBar.scss';

import { NavLink } from 'react-router-dom';

import book from '@/resources/icons/book-icon.svg';
import character from '@/resources/icons/character-icon.svg';

const NavBar = () => {
  return (
    <nav className="navbar">
      <NavLink
        to="/books"
        className={({ isActive }) => `navbar-item ${isActive ? 'active' : ''}`}
        style={{ marginRight: '30px' }}
      >
        <img className="navbar-icon" alt="Libros" src={book} />
        <span>Libros</span>
      </NavLink>
      <NavLink
        to="/characters"
        className={({ isActive }) => `navbar-item ${isActive ? 'active' : ''}`}
      >
        <img className="navbar-icon" alt="Libros" src={character} />
        <span>Personajes</span>
      </NavLink>
    </nav>
  );
};

export default NavBar;
