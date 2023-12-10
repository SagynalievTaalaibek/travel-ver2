import React from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  userRegisterLog: (user: boolean) => void;
}

const Register: React.FC<Props> = ({ userRegisterLog }) => {
  //todo нужно через useEffect проверить зарегалься или нет

  const navigate = useNavigate();

  const userReg = () => {
    void userRegisterLog(true);
    navigate('/home');
  };

  return (
    <div>

      <button onClick={userReg}>Register</button>
    </div>
  );
};

export default Register;