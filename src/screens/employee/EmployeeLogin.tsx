import React, {useContext, useState} from 'react';
import Toast from 'react-native-toast-message';
import {Login} from '../../components/Login';
import {getUser} from '../../db';
import {AuthContext} from '../../context';

export const EmployeeLogin = () => {
  const {signIn} = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (data: any) => {
    setErrorMessage('');
    try {
      const user = await getUser(data);
      if (user.length) {
        signIn({fullName: user[0].fullname!, role: 'USER'});
      } else {
        setErrorMessage('El usuario/contraseña ingresado es incorrecto');
      }
    } catch (error) {
      console.log(error);
      Toast.show({
        position: 'bottom',
        type: 'error',
        text1: 'Hubo un error al iniciar sesión',
      });
    }
  };

  return <Login handleLogin={handleLogin} error={errorMessage} />;
};
