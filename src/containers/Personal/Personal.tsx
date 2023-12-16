import React from 'react';
import { UserDataInterface } from '../../types';

interface Props {
  user: UserDataInterface;
}

const Personal: React.FC<Props> = ({ user }) => {
  return (
    <div className='card'>
      <div className='card-body'>
        <p className='test'><strong>Name: </strong> {user.name}</p>
        <p className='test'><strong>Email: </strong> {user.email}</p>
        <p className='test'><strong>Role: </strong> {user.role}</p>
      </div>
    </div>
  );
};

export default Personal;
