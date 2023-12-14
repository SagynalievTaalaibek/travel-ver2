import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosApiTravel from '../../axiosApiTravel';
import { UserGet } from '../../types';

interface Props {
  userRegisterLog: (user: boolean) => void;
}

const LogIn: React.FC<Props> = ({ userRegisterLog }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ email: '', password: '' });

  const userLog = () => {
    userRegisterLog(true);
    navigate('/home');
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const responseUser = await axiosApiTravel.get<UserGet>(`/users.json?orderBy="email"&equalTo="${user.email}"`);
      const data: UserGet = responseUser.data;

      if (Object.keys(data).length !== 0) {
        const userData = Object.keys(data).map((id) => data[id])[0];
        const existingUser = Object.keys(data).map((id) => {
          const user = data[id];
          return {
            ...user,
            id,
          };
        });

        localStorage.setItem('user', JSON.stringify(existingUser));

        if (userData.password === user.password) {
          userLog();
        } else {
          alert('Password is not correct!');
        }
      } else {
        alert('Users not found');
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      alert('An error occurred while fetching user data');
    }
  };


  return (
    <form className='w-50 card p-3 mx-auto mt-5' onSubmit={onSubmit}>
      <h3 className='mx-auto'>Log in</h3>
      <div className='mb-3'>
        <label htmlFor='email' className='form-label'>
          Email
        </label>
        <input
          type='email'
          name='email'
          id='email'
          className='form-control'
          required
          value={user.email}
          onChange={onChange}
        />
      </div>
      <div className='mb-3'>
        <label htmlFor='password' className='form-label'>
          Password
        </label>
        <input
          type='password'
          name='password'
          id='password'
          className='form-control'
          required
          value={user.password}
          onChange={onChange}
        />
      </div>
      <button className='btn btn-primary'>Log in</button>
    </form>
  );
};

export default LogIn;
