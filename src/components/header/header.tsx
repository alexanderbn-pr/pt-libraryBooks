import './header.scss';

import logo from '@/resources/icons/logo.png';

import NavBar from '../navBar/navBar';

const Header = () => {
  return (
    <header className="header">
      <img src={logo} alt="Logo" className="header-logo" />
      <NavBar />
    </header>
  );
};

export default Header;
