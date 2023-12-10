import React from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  userRegisterLog: (user: boolean) => void;
}

const LogIn: React.FC<Props> = ({ userRegisterLog }) => {
  const navigate = useNavigate();

  const userLog = () => {
    void userRegisterLog(true);
    navigate('/home');
  };


  return (
    <div>
      <button onClick={userLog}>Log in</button>
    </div>
  );
};

export default LogIn;