import React, { useCallback, useEffect, useState } from 'react';
import axiosApiTravel from '../../axiosApiTravel';
import { BookOrderApi, BooksOrders } from '../../types';

interface Props {
  guideBooksId: string;
}

const GuideOrder: React.FC<Props> = ({ guideBooksId }) => {
  const [books, setBooks] = useState<BooksOrders[]>([]);

  const fetchBooks = useCallback(async (guideBooksId: string) => {
    try {
      const response = await axiosApiTravel.get<BookOrderApi | null>(
        `books.json?orderBy="guideId"&equalTo="${guideBooksId}"`,
      );
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

      setBooks(myNewBooks);
    } catch (e) {
      console.log('Fetch my books', e);
    }
  }, []);

  useEffect(() => {
    void fetchBooks(guideBooksId);
  }, [guideBooksId, fetchBooks]);

  const onFinishTour = async (index: number, id: string) => {
    try {
      setBooks(prevOrders => prevOrders.map((order, idx) => {
        if (idx === index) {
          return {
            ...order,
            statusFinish: true,
          };
        }
        return order;
      }));

      await axiosApiTravel.put(`books/${id}.json`, {
        ...books[index],
        statusFinish: true,
      });
    } catch (e) {
      console.log('Finish', e);
    }
  };

  return (
    <div>
      {books.map((book, index) => {
        if (!book.statusFinish && book.statusPay && !book.statusFinish) {
          return (
            <div key={book.id} className='card mb-2'>
              <div className='card-header'>
                <h5>Name: {book.name}</h5>
              </div>
              <div className='card-body'>
                <h5>Date: {book.date}</h5>
                <p className='card-text'>Amount: {book.amountPeople}</p>
                <p className='card-text'>Phone: {book.phone}</p>
              </div>
              <div className='card-footer'>
                <button className='btn btn-success' onClick={() => onFinishTour(index, book.id)}>Finish</button>
              </div>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};

export default GuideOrder;