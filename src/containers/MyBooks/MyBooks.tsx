import React, { useCallback, useEffect, useState } from 'react';
import axiosApiTravel from '../../axiosApiTravel';
import { BookOrderApi, BooksOrders } from '../../types';

interface Props {
  userBooksId: string;
}

const MyBooks: React.FC<Props> = ({ userBooksId }) => {
  const [books, setBooks] = useState<BooksOrders[]>([]);

  const fetchBooks = useCallback(async (userBooksId: string) => {
    try {
      const response = await axiosApiTravel.get<BookOrderApi | null>(
        `books.json?orderBy="userId"&equalTo="${userBooksId}"`,
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
    void fetchBooks(userBooksId);
  }, [userBooksId, fetchBooks]);

  return (
    <div>
      {books.map((book) => {
        if (!book.statusFinish) {
          return (
            <div key={book.id} className='card mb-2'>
              <div className='card-body'>
                <h5>Name: {book.name}</h5>
                <h5>Date: {book.date}</h5>
                <h5>Status: {book.statusPay ? 'Paid' : 'Not paid'}</h5>
                <p className='card-text'>Amount: {book.amountPeople}</p>
              </div>
            </div>
          );
        }
        return <h4 key={book.id}>Nothing on My books</h4>;
      })}
    </div>
  );
};

export default MyBooks;
