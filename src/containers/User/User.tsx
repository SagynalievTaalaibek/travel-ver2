import { useNavigate, useParams } from 'react-router-dom';
import React, { useCallback, useEffect, useState } from 'react';
import axiosApiTravel from '../../axiosApiTravel';
import { UserData } from '../../types';

const User = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState<UserData>({
    name: '',
    email: '',
    role: '',
    password: '',
    id: '',
  });

  const fetchUser = useCallback(async (id: string) => {
    try {
      const responseUser = await axiosApiTravel.get<UserData | null>(`users/${id}.json`);
      const userData = responseUser.data;

      if (!userData) {
        return;
      }

      setUser(userData);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  }, []);

  useEffect(() => {
    if (params.id) {
      void fetchUser(params.id);
    }
  }, [params, fetchUser]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await axiosApiTravel.put(`users/${params.id}.json`, user);
      alert('User updated successfully!');
      navigate('/users');
    } catch (error) {
      console.error('Error updating user:', error);
      alert('Failed to update user.');
    }
  };

  return (
    <div>
      <h1>Edit User</h1>
      <form onSubmit={handleFormSubmit}>
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
            onChange={handleInputChange}
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
            onChange={handleInputChange}
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='role' className='form-label'>
            Role
          </label>
          <select
            name='role'
            id='role'
            className='form-control'
            required
            value={user.role}
            onChange={handleSelectChange}
          >
            <option value=''>Select Role</option>
            <option value='admin'>Admin</option>
            <option value='user'>User</option>
            <option value='guide'>Guide</option>
          </select>
        </div>
        <button type='submit' className='btn btn-primary'>Save Changes</button>
      </form>
    </div>
  );
};

export default User;
