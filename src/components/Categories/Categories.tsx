import { NavLink } from 'react-router-dom';
import React, { useState } from 'react';
import { regionsEng } from '../../constant';

interface Props {
  onClick: (category: string) => void;
}

const Categories: React.FC<Props> = ({ onClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const onLiClick = (category: string) => {
    setIsOpen(!isOpen);
    onClick(category);
  };

  return (
    <nav className='navbar navbar-expand-lg mb-2'>
      <button
        className='navbar-toggler'
        onClick={toggleMenu}
      >
        Show Categories
      </button>
      <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`}>
        <ul className='navbar-nav w-100 d-flex flex-md-row flex-sm-column align-items-start justify-content-between'>
          {regionsEng.map((category, index) => (
            <li className='nav-item my-2 mb-lg-0 ' key={index} onClick={() => onLiClick(category.toLocaleLowerCase())}>
              <NavLink
                to={category === 'All' ? '/home' : '/home/' + category}
                className='nav-link rounded-5 border px-4 py-2'
              >
                {category}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Categories;
