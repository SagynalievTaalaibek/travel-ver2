import { Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Register from './containers/Register/Register';
import LogIn from './containers/LogIn/LogIn';
import Home from './containers/Home/Home';
import Navbar from './components/Navbar/Navbar';
import Users from './containers/Users/Users';
import User from './containers/User/User';
import NewTourForm from './containers/NewTourForm/NewTourForm';
import { regionsEng } from './constant';
import { UserData } from './types';

const App = () => {
  const navigate = useNavigate();
  const [userIn, setUserIn] = useState(false);
  const [userData, setUserData] = useState<UserData>({
    name: '',
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
      name: '',
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
        <Route path={'/tours'} element={<NewTourForm />} />
        <Route path={'/tours/:id/edit'} element={<NewTourForm />} />
        <Route path={'/orders'} element={<h1>Orders</h1>} />
        <Route path={'/users/:id'} element={<User />} />
      </>
    );
  }

  return (
    <div className="d-flex flex-column vh-100">
      <header className='bg-body-secondary'>
        <div className='container'>
          <Navbar userIn={userIn} logOut={logOut} userIdentify={userData.role.length > 0 ? userData.role : 'user'} />
        </div>
      </header>
      <main className='container mt-3'>
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
              {regionsEng.map((region) => (
                <Route path={'/home/' + region} element={<Home />} key={region}/>
              ))}
              <Route path={'/personal'} element={<h1>Personal</h1>} />
            </>
          )}
          {routes}
          <Route path={'*'} element={<h1>Not found</h1>} />
        </Routes>
      </main>
      <footer className='mt-auto bg-body-secondary'>
        <div className='container mt-auto py-3'>
          Footer
        </div>
      </footer>
    </div>
  );
};

export default App;