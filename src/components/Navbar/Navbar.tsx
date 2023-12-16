import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

interface Props {
  userIn: boolean;
  userIdentify: string;
  logOut: React.MouseEventHandler;
}


const Navbar: React.FC<Props> = ({ userIn, userIdentify, logOut }) => {
  const [isOpen, setIsOpen] = useState(false);
  const adminNav = ['Home', 'Tours', 'Users', 'Orders', 'Personal'];
  const userNav = ['Home', 'My-books', 'Personal'];
  const guideNav = ['Home', 'My-books', 'Guide-Orders', 'Personal'];

  const singAndLog = ['/', 'log-in'];
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  let navShow;

  if (!userIn) {
    navShow = singAndLog.map((item) => (
      <li className='nav-item' key={item}>
        <NavLink
          to={item}
          className='nav-link'
        >
          {item === '/' ? 'Sign Up' : 'Log In'}
        </NavLink>
      </li>
    ));
  } else if (userIdentify === 'admin') {
    navShow = adminNav.map((nav) => (
      <li className='nav-item' key={nav}>
        <NavLink
          to={'/' + nav.toLocaleLowerCase()}
          className={({ isActive, isPending }) =>
            `nav-link ${
              isPending ? 'pending' : isActive ? 'active text-primary' : ''
            }`
          }
        >
          {nav}
        </NavLink>
      </li>
    ));
  } else if (userIdentify === 'user') {
    navShow = userNav.map((nav) => (
      <li className='nav-item' key={nav}>
        <NavLink
          to={'/' + nav.toLocaleLowerCase()}
          className={({ isActive, isPending }) =>
            `nav-link ${
              isPending ? 'pending' : isActive ? 'active text-primary' : ''
            }`
          }
        >
          {nav}
        </NavLink>
      </li>
    ));
  } else if (userIdentify === 'guide') {
    navShow = guideNav.map((nav) => (
      <li className='nav-item' key={nav}>
        <NavLink
          to={'/' + nav.toLocaleLowerCase()}
          className={({ isActive, isPending }) =>
            `nav-link ${
              isPending ? 'pending' : isActive ? 'active text-primary' : ''
            }`
          }
        >
          {nav}
        </NavLink>
      </li>
    ));
  } else {
    navShow = (
      <li className='nav-item'>
        <NavLink
          to={'/home'}
          className='nav-link'
        >
          Home
        </NavLink>
      </li>
    );
  }

  return (
    <nav className='navbar'>
      <a className='navbar-brand text-warning  fw-bolder' href='/home'>Travel</a>
      <button
        className='navbar-toggler'
        type='button'
        onClick={toggleMenu}
        aria-expanded={isOpen ? 'true' : 'false'}
      >
        <span className='navbar-toggler-icon'></span>
      </button>
      <div
        className={`offcanvas offcanvas-end ${isOpen ? 'show' : ''}`}
        id='offcanvasNavbar'
        aria-labelledby='offcanvasNavbarLabel'
      >
        <div className='offcanvas-header'>
          <h5 className='offcanvas-title' id='offcanvasNavbarLabel'>Navbar</h5>
          <button type='button' className='btn-close' onClick={toggleMenu} aria-label='Close'></button>
        </div>
        <div className='offcanvas-body'>
          <ul className='navbar-nav justify-content-end flex-grow-1 pe-3'>
            <ul className='navbar-nav'>
              {navShow}
            </ul>
          </ul>
        </div>
        <div className='px-3 py-5'>
          {userIn && (
            <button className='btn btn-primary' onClick={logOut}>Log out</button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;