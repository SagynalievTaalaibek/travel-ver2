import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

interface Props {
  userIn: boolean;
  userIdentify: string;
}


const Navbar: React.FC<Props> = ({ userIn, userIdentify }) => {
  const [isOpen, setIsOpen] = useState(false);
  const adminNav = ['Home', 'New-Tour', 'Users', 'Orders', 'Personal'];
  const userNav = ['Home', 'Personal'];

  const singAndLog = ['/', 'log-in'];
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    console.log('Navbar', userIdentify);
  }, [userIdentify]);

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
    <nav className='navbar navbar-expand-lg'>
      <a className='navbar-brand text-warning' href='/home'>
        Travel
      </a>
      <button className='navbar-toggler' type='button' onClick={toggleMenu}>
        <span className='navbar-toggler-icon'></span>
      </button>
      <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`}>
        <ul className='navbar-nav'>
          {navShow}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;