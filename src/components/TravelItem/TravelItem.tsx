import React from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  id: string;
  admin: boolean;
  name: string;
  price: number;
  img: string;
  onBook: () => void;
}

const TravelItem: React.FC<Props> = ({ id, admin, name, price, img, onBook }) => {
  const navigate = useNavigate();

  const onClick = () => {
    void onBook;

    if (admin) {
      navigate('/tours/' + id + '/edit');
    } else {
      navigate('/tours/' + id + '/book');
    }
  };

  /*type FlexDirection = 'row' | 'column' | 'row-reverse' | 'column-reverse';

  const cardStyle: {
    display: string;
    flexDirection: FlexDirection;
    width: string;
    minWidth: string;
    border: string;
    boxShadow: string;
    padding: string;
    borderRadius: string;
    marginBottom: string;
  } = {
    display: 'flex',
    flexDirection: 'column',
    width: '28.5%',
    minWidth: '280px',
    border: '1px solid #007198',
    boxShadow: '3px 3px 5px 0 #11111140',
    padding: '20px 15px',
    borderRadius: '10px',
    marginBottom: '20px',
  };
*/



  return (
    <div className='col'>
      <div className="card mb-2 h-100">
        <div className='card-body'>
        <div style={{ textAlign: 'center' }}>
          <img src={img} alt={name} className="w-100" style={{ height: '190px' }} />
        </div>
          <h5 className='card-title'>{name}</h5>
          <p className='card-text'>Price: <strong>{price}</strong></p>

        </div>
        <div className="card-footer">
          <button className='btn btn-primary' onClick={onClick}>
            {admin ? 'Edit' : 'Book'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TravelItem;
