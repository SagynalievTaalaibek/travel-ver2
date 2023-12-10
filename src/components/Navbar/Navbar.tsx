import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

interface Props {
  userIn: boolean;
}


const Navbar: React.FC<Props> = ({ userIn }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const singAndLog = ['/', 'log-in'];

  let navShow = null;

  if (!userIn) {
    navShow = singAndLog.map((item) => (
      <li className='nav-item' key={item}>
        <NavLink
          to={item}
          className={({ isActive, isPending }) =>
            `nav-link ${
              isPending ? 'pending' : isActive ? 'active text-primary' : ''
            }`
          }
        >
          {item === '/' ? 'Sing Up' : 'Log In'}
        </NavLink>
      </li>
    ));
  } else {
    navShow = (
      <li className='nav-item'>
        <NavLink
          to={'/home'}
          className={({ isActive, isPending }) =>
            `nav-link ${
              isPending ? 'pending' : isActive ? 'active text-primary' : ''
            }`
          }
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