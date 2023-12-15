import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserInterface } from '../../types';
import axiosApiTravel from '../../axiosApiTravel';

interface Props {
  userRegisterLog: (user: boolean) => void;
}

const Register: React.FC<Props> = ({ userRegisterLog }) => {
  const [user, setUser] = useState<UserInterface>({
    name: '',
    email: '',
    password: '',
    role: 'user',
  });

  const navigate = useNavigate();

  const userReg = () => {
    setTimeout(() => {
      void userRegisterLog(true);
      navigate('/home');
    }, 3000);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await axiosApiTravel.post('users.json', user);
    } catch (e) {
      alert('Post Form Register error ' + e);
    } finally {
      userReg();
    }
  };

  return (
    <form className='w-50 card p-3 mx-auto mt-5' onSubmit={onSubmit}>
      <h3 className='mx-auto'>Register</h3>
      <div className='mb-3'>
        <label htmlFor='name' className='form-label'>
          Name
        </label>
        <input
          type='text'
          name='name'
          id='name'
          className='form-control'
          required
          value={user.name}
          onChange={onChange}
        />
      </div>
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
      <button className='btn btn-primary'>Register</button>
    </form>
  );
};

export default Register;