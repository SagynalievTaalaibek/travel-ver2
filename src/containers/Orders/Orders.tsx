import { useCallback, useEffect, useState } from 'react';
import axiosApiTravel from '../../axiosApiTravel';
import { BookOrderApi, BooksOrders } from '../../types';

const Orders = () => {
  const [orders, setOrders] = useState<BooksOrders[]>([]);

  const fetchBooks = useCallback(async () => {
    try {
      const response = await axiosApiTravel.get<BookOrderApi | null>('books.json');
      const myBooks = response.data;

      if (!myBooks) {
        return;
      }

      const myNewBooks = Object.keys(myBooks).map((id) => {
        const book = myBooks[id];

        return {
          ...book,
          id,
        };
      });

      setOrders(myNewBooks);
    } catch (e) {
      console.log('Fetch my books', e);
    }
  }, []);

  useEffect(() => {
    void fetchBooks();
  }, [fetchBooks]);

  const onPayed = async (index: number, id: string) => {
    try {
      setOrders(prevOrders => prevOrders.map((order, idx) => {
        if (idx === index) {
          return {
            ...order,
            statusPay: true,
          };
        }
        return order;
      }));

      await axiosApiTravel.put(`books/${id}.json`, {
        ...orders[index],
        statusPay: true,
      });
    } catch (e) {
      console.log('Payed', e);
    }
  };


  return (
    <div>
      {orders.map((order, index) => (
        <div key={order.id} className='card'>
          <div className='card-header'>Name: {order.name}</div>
          <div className='card-body'>Date: {order.date}</div>
          <div className='card-footer'>
            {order.statusPay ? (
              <h4>Payed</h4>
            ) : (
              <button className='btn btn-primary' onClick={() => onPayed(index, order.id)}>Payed</button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Orders;
