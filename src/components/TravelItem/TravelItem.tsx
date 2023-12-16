import React from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  id: string;
  admin: boolean;
  name: string;
  price: string;
  img: string;
  onBook: () => void;
  deleteTour: (id: string) => void;
}

const TravelItem: React.FC<Props> = ({ id, admin, name, price, img, onBook, deleteTour }) => {
  const navigate = useNavigate();

  const onClick = () => {
    void onBook;

    if (admin) {
      navigate('/tours/' + id + '/edit');
    } else {
      navigate('/tours/' + id + '/book');
    }
  };

  return (
    <div className='col mb-2'>
      <div className='card h-100'>
        <div className='card-body'>
          <div style={{ textAlign: 'center' }}>
            <img src={img} alt={name} className='w-100' style={{ height: '190px' }} />
          </div>
          <h5 className='card-title'>{name}</h5>
          <p className='card-text'>Price: <strong>{price}</strong></p>

        </div>
        <div className='card-footer'>
          <button className='btn btn-primary' onClick={onClick}>
            {admin ? 'Edit' : 'Book'}
          </button>
          {admin ? (
            <button className='btn btn-danger ms-2' onClick={() => deleteTour(id)}>Delete</button>
          ) : ''}
        </div>
      </div>
    </div>
  );
};

export default TravelItem;
