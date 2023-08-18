export interface AuthState {
  isAuth: boolean;
  fullName: string;
  role: string;
}

type AuthAction =
  | {type: 'signIn'; payload: {fullname: string, role: string}}
  | {type: 'logOut'};

export const authReducer = (
  state: AuthState,
  action: AuthAction,
): AuthState => {
  switch (action.type) {
    case 'signIn':
      return {
        isAuth: true,
        fullName: action.payload.fullname,
        role: action.payload.role,
      };
    case 'logOut':
      return {
        isAuth: false,
        fullName: '',
        role: '',
      };

    default:
      return state;
  }
};
