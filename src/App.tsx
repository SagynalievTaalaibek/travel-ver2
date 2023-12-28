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
import Books from './containers/Boolks/Books';
import MyBooks from './containers/MyBooks/MyBooks';
import Orders from './containers/Orders/Orders';
import GuideOrder from './containers/GuideOrder/GuideOrder';
import Personal from './containers/Personal/Personal';
import { UserDataInterface } from './types';

const App = () => {
  const navigate = useNavigate();
  const [userIn, setUserIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isGuide, setIsGuide] = useState(false);
  const [userData, setUserData] = useState<UserDataInterface>({
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
    setIsAdmin(false);
    setIsGuide(false);
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
      const useData = JSON.parse(savedValueUserIdentify);
      setUserData(useData[0]);

      if (useData[0].role === 'admin') {
        setIsAdmin(true);
      }

      if (useData[0].role === 'guide') {
        setIsGuide(true);
      }
    }

  }, [userIn]);

  let routes = null;


  if (isAdmin) {
    routes = (
      <>
        <Route path={'/users'} element={<Users />} />
        <Route path={'/tours'} element={<NewTourForm />} />
        <Route path={'/tours/:id/edit'} element={<NewTourForm />} />
        <Route path={'/orders'} element={<Orders />} />
        <Route path={'/users/:id'} element={<User />} />
      </>
    );
  }

  return (
    <div className='d-flex flex-column vh-100'>
      <header className='bg-body-secondary'>
        <div className='container mb-2'>
          <Navbar userIn={userIn} logOut={logOut} userIdentify={userData.role.length > 0 ? userData.role : 'user'} />
        </div>
      </header>
      <main className='container my-3'>
        <Routes>
          {!userIn && (
            <>
              <Route path={'/'} element={<Register userRegisterLog={userRegisterLog} />} />
              <Route path={'/log-in'} element={(
                <LogIn userRegisterLog={userRegisterLog} />
              )} />
            </>
          )}
          {isGuide ? (
            <Route path={'/guide-orders'} element={<GuideOrder guideBooksId={userData.id} />} />
          ) : null}
          {userIn && (
            <>
              <Route path={'/'} element={<Home isAdmin={isAdmin} />} />
              <Route path={'/home'} element={<Home isAdmin={isAdmin} />} />
              <Route path={'tours/:id/book'} element={<Books userId={userData.id} />} />
              {regionsEng.map((region) => (
                <Route path={'/home/' + region} element={<Home isAdmin={isAdmin} />} key={region} />
              ))}
              <Route path={'/my-books'} element={<MyBooks userBooksId={userData.id} />} />
              <Route path={'/personal'} element={<Personal user={userData} />} />
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