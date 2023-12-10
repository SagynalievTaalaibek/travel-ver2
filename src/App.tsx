import { Route, Routes } from 'react-router-dom';
import Register from './containers/Register/Register';
import LogIn from './containers/LogIn/LogIn';
import Home from './containers/Home/Home';
import Navbar from './components/Navbar/Navbar';
import { useEffect, useState } from 'react';

const App = () => {
  const [userIn, setUserIn] = useState(false);

  const userRegisterLog = (user: boolean) => {
    setUserIn(user);
    localStorage.setItem('userIn', JSON.stringify(user));
    console.log('User Sing Up or Log in');
  };

  useEffect(() => {
    const savedValue: string | null = localStorage.getItem('userIn');

    if (savedValue) {
      setUserIn(JSON.parse(savedValue));
    }
  }, [userIn]);

  if (userIn) {
    console.log('Reg or Log');

  }

  return (
    <>
      <header className='bg-body-secondary mb-2'>
        <div className='container'>
          <Navbar userIn={userIn} />
        </div>
      </header>
      <main className='container'>
        <Routes>
          {!userIn && (
            <>
              <Route path={'/'} element={<Register userRegisterLog={userRegisterLog} />} />
              <Route path={'/log-in'} element={<LogIn userRegisterLog={userRegisterLog} />} />
            </>
          )}
          {userIn && <Route path={'/home'} element={<Home />} />}
          <Route path={'*'} element={<h1>Not found</h1>} />
        </Routes>
      </main>
      <footer className='container mt-5'>
        {userIn && (
          <button
            onClick={() => {
              setUserIn(false);
              localStorage.removeItem('userIn'); // Очистка информации о входе пользователя из localStorage при выходе
            }}
          >
            Log out
          </button>
        )}
      </footer>
    </>

  );
};

export default App;