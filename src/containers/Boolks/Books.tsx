import { useNavigate, useParams } from 'react-router-dom';
import React, { useCallback, useEffect, useState } from 'react';
import axiosApiTravel from '../../axiosApiTravel';
import { BookOrder, TourBooks } from '../../types';

interface Props {
  userId: string;
}

const Books: React.FC<Props> = ({ userId }) => {
  const params = useParams();
  const navigate = useNavigate();
  const [bookOrder, setBookOrder] = useState<BookOrder>({
    guideId: '',
    userId: '',
    tourId: '',
    phone: '',
    name: '',
    date: '',
    amountPeople: '',
    statusFinish: false,
    statusPay: false,
  });
  const [tour, setTour] = useState<TourBooks>({
    id: '',
    guide: '',
    name: '',
    img: '',
    description: '',
    region: '',
    date: '',
    duration: '',
    price: '',
    maxPeople: '',
    amountPeople: '',
  });

  const clear = () => {
    setTour({
      id: '',
      guide: '',
      name: '',
      img: '',
      description: '',
      region: '',
      date: '',
      duration: '',
      price: '',
      maxPeople: '',
      amountPeople: '',
    });

    setBookOrder({
      guideId: '',
      userId: '',
      tourId: '',
      phone: '',
      name: '',
      date: '',
      amountPeople: '',
      statusFinish: false,
      statusPay: false,
    });

  };

  const fetchTour = useCallback(async (id: string) => {
    try {
      const responseTour = await axiosApiTravel.get<TourBooks | null>('tours/' + id + '.json');
      const tourData = responseTour.data;

      if (!tourData) {
        return;
      }

      setTour({
        ...tourData,
        id,
      });
    } catch (e) {
      console.log('fetch tour ', e);
    }
  }, []);

  useEffect(() => {
    if (params.id) {
      void fetchTour(params.id);
    }
  }, [params, fetchTour]);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBookOrder((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
      tourId: tour.id,
      userId,
      name: tour.name,
      date: tour.date,
      guideId: tour.guide,
    }));
  };

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      if (parseInt(tour.maxPeople) >= parseInt(bookOrder.amountPeople)) {
        await axiosApiTravel.post('books.json', bookOrder);
        const updatedTour = {
          ...tour,
          maxPeople: parseInt(tour.maxPeople) - parseInt(bookOrder.amountPeople),
          amountPeople: parseInt(tour.amountPeople) + parseInt(bookOrder.amountPeople),
        };
        await axiosApiTravel.put('tours/' + tour.id + '.json', updatedTour);
      } else {
        alert('Amount people to many!');
      }
    } catch (e) {
      console.log('Error in orders', e);
    } finally {
      clear();
      navigate('/home');
    }
  };

  return (
    <div className='row row-cols-md-2 row-cols-1'>
      <div className='col mb-2'>
        <div className='card'>
          <div className='card-header'>
            <h3 className='card-title'>{tour.name}</h3>
          </div>
          <div className='card-body'>
            <div className='row row-cols-1 row-cols-sm-2'>
              <div className='col'>
                <img src={tour.img} alt={tour.name} className='w-100' />
              </div>
              <div className='col'>
                <p><strong>Date: </strong>{tour.date}</p>
                <p><strong>Duration: </strong>{tour.duration} days</p>
                <p><strong>Price: </strong>{tour.price} som</p>
                <p><strong>Max People: </strong>{tour.maxPeople}</p>
              </div>
            </div>
            <h5 className='card-title'>{tour.region.toUpperCase()}</h5>
            <p className='card-text'>{tour.description}</p>
          </div>
          <div className='card-footer'>
            <button className='btn btn-warning' onClick={() => navigate('/home')}>Back to tours</button>
          </div>
        </div>
      </div>
      <div className='col'>
        <form onSubmit={onSubmit} className='card'>
          <div className='card-body'>
            <h3 className='mx-auto'>Form books</h3>
            <div className='mb-3 input-group'>
              <label htmlFor='amountPeople' className='input-group-text w-25'>
                Amount
              </label>
              <input
                type='number'
                name='amountPeople'
                id='amountPeople'
                className='form-control'
                required
                value={bookOrder.amountPeople}
                onChange={onChange}
              />
            </div>
            <div className='mb-3 input-group '>
              <label htmlFor='phone' className='input-group-text w-25'>
                Phone
              </label>
              <input
                type='tel'
                name='phone'
                id='phone'
                className='form-control'
                required
                value={bookOrder.phone}
                onChange={onChange}
              />
            </div>
          </div>
          <div className='card-footer'>
            <button className='btn btn-primary'>Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Books;