import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {Navigation} from './src/navigation/Navigation';
import {initDatabase} from './src/db';
import {AuthProvider} from './src/context/AuthContext';
import Toast from 'react-native-toast-message';

export const App = () => {
  useEffect(() => {
    const init = async () => {
      await initDatabase();
    };
    init();
  }, []);

  return (
    <>
      <NavigationContainer>
        <AuthProvider>
          <Navigation />
        </AuthProvider>
      </NavigationContainer>
      <Toast />
    </>
  );
};
