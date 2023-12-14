import { useCallback, useEffect, useState } from 'react';
import axiosApiTravel from '../../axiosApiTravel';
import { UserData, UserGet } from '../../types';
import { useNavigate } from 'react-router-dom';

const Users = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const navigate = useNavigate();
  const fetchUsers = useCallback(async () => {
    try {
      const responseUsers = await axiosApiTravel<UserGet | null>('users.json');
      const usersData = responseUsers.data;

      if (!usersData) {
        return;
      }

      const newUsers = Object.keys(usersData).map((id) => {
        const user = usersData[id];
        return {
          ...user,
          id,
        };
      });

      setUsers(newUsers);
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    void fetchUsers();
  }, [fetchUsers]);

  const deleteUser = async (id: string) => {
    try {
      await axiosApiTravel.delete('users/' + id + '.json');
      setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
    } catch (e) {
      alert('Delete id error' + e);
    }
  };

  return (
    <>
      <h1 className="my-4">User List</h1>
      <div className="table-responsive">
        <table className='table table-striped'>
          <thead>
          <tr>
            <th scope='col'>#</th>
            <th scope='col'>Email</th>
            <th scope='col'>Actions</th>
          </tr>
          </thead>
          <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.email}</td>
              <td>
                <button className='btn btn-primary me-md-2 btn-sm' onClick={() => navigate('/users/' + user.id)}>Edit</button>
                <button className='btn btn-danger btn-sm' onClick={() => deleteUser(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Users;