import {makeStore} from './makeStore';
interface IInitialState {
  isAuthenticated: boolean;
  user: any;
}

const initial_state: IInitialState = {
  isAuthenticated: false,
  user: null,
};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case actions.LOGIN:
      return {
        isAuthenticated: true,
        user: action.payload
      };

    case actions.LOGOUT:
      localStorage.removeItem('token')
      return {
        ...initial_state,
      };

    case actions.CLEAR_ERRORS:
      return {
        ...state,
      };

    default:
      return state;
  }
};

export const {Provider, useStore, useDispatch} = makeStore(
  'AuthStore',
  initial_state,
  reducer,
);

export const actions = {
  LOGOUT: 'LOGOUT',
  LOGIN: 'LOGIN',
  CLEAR_ERRORS: 'CLEAR_ERRORS',
};
