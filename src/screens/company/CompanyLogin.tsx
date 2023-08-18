import React, {useContext, useState} from 'react';
import Toast from 'react-native-toast-message';
import {Login} from '../../components/Login';
import {AuthContext} from '../../context';
import {getUser} from '../../db';

export const CompanyLogin = () => {
  const {signIn} = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (data: any) => {
    setErrorMessage('');
    try {
      const user = await getUser(data, 'ADMIN');
      if (user.length) {
        signIn({fullName: user[0].fullname!, role: 'ADMIN'});
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
