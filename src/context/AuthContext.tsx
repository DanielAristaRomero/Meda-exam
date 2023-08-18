import React, {createContext, useReducer} from 'react';
import {AuthState, authReducer} from './';

type AuthContextProps = {
  isAuth: boolean;
  fullName: string;
  role: string;
  signIn: (user: SignInProps) => void;
  logOut: () => void;
};

interface SignInProps {
  fullName: string;
  role: string;
}

const initialState: AuthState = {
  isAuth: false,
  fullName: '',
  role: '',
};

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({children}: any) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const signIn = (user: SignInProps) => {
    dispatch({
      type: 'signIn',
      payload: {
        fullname: user.fullName,
        role: user.role,
      },
    });
  };

  const logOut = () => {
    dispatch({
      type: 'logOut',
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signIn,
        logOut,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
