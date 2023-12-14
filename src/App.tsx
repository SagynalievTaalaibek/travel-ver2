import { Route, Routes, useNavigate } from 'react-router-dom';
import Register from './containers/Register/Register';
import LogIn from './containers/LogIn/LogIn';
import Home from './containers/Home/Home';
import Navbar from './components/Navbar/Navbar';
import { useEffect, useState } from 'react';
import { UserData } from './types';
import Users from './containers/Users/Users';
import User from './containers/User/User';

const App = () => {
  const navigate = useNavigate();
  const [userIn, setUserIn] = useState(false);
  const [userData, setUserData] = useState<UserData>({
    email: '',
    password: '',
    role: '',
    id: '',
  });

  const userRegisterLog = (user: boolean) => {
    setUserIn(user);
    localStorage.setItem('userIn', JSON.stringify(user));
  };

  const logOut = () => {
    setUserIn(false);
    setUserData({
      email: '',
      password: '',
      role: '',
      id: '',
    });

    localStorage.removeItem('user');
    localStorage.removeItem('userIn');
    navigate('/');
  };

  useEffect(() => {
    const savedValueUserInOut: string | null = localStorage.getItem('userIn');
    const savedValueUserIdentify: string | null = localStorage.getItem('user');

    if (savedValueUserInOut) {
      setUserIn(JSON.parse(savedValueUserInOut));
    }

    if (savedValueUserIdentify) {
      const userData = JSON.parse(savedValueUserIdentify);
      setUserData(userData[0]);
    }
  }, [userIn]);

  let routes = null;

  if (userData.role === 'admin') {
    routes = (
      <>
        <Route path={'/users'} element={<Users />} />
        <Route path={'/new-tour'} element={<h1>New Tour</h1>} />
        <Route path={'/orders'} element={<h1>Orders</h1>} />
        <Route path={'/users/:id'} element={<User />} />
      </>
    );
  }

  return (
    <>
      <header className='bg-body-secondary mb-2'>
        <div className='container'>
          <Navbar userIn={userIn} userIdentify={userData.role.length > 0 ? userData.role : 'user'} />
        </div>
      </header>
      <main className='container'>
        <Routes>
          {!userIn && (
            <>
              <Route path={'/'} element={<Register userRegisterLog={userRegisterLog} />} />
              <Route path={'/log-in'} element={(
                <LogIn userRegisterLog={userRegisterLog} />
              )} />
            </>
          )}
          {userIn && (
            <>
              <Route path={'/home'} element={<Home />} />
              <Route path={'/personal'} element={<h1>Personal</h1>} />
            </>
          )}
          {routes}
          <Route path={'*'} element={<h1>Not found</h1>} />
        </Routes>
      </main>
      <footer className='container mt-5'>
        {userIn && (
          <button onClick={logOut} className='mt-5'>
            Log out
          </button>
        )}
      </footer>
    </>
  );
};

export default App;