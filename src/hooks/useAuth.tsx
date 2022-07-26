import { useEffect } from 'react';
import { actions, useDispatch, useStore } from '../store/authStore';
import { getUserFromStorage, setToken } from '../utils/common';


export const useAuth = () => {
  const store = useStore();
  const dispatch = useDispatch();

    useEffect(() => {
    getUserFromStorage().then((user) => {
        if(user)dispatch({type: actions.LOGIN, payload: user});
    })
  }, [dispatch]);

  // login function
  const login = async (token: string) => {
    await setToken(token);
    const user = await getUserFromStorage()
    dispatch({type: actions.LOGIN, payload: user});
  };

  // Logout
  const logout = async () => {
    dispatch({type: actions.LOGOUT});
  };


  // Clear Errors
  const clearErrors = () => dispatch({type: actions.CLEAR_ERRORS});

  return {
    token: store.token,
    isAuthenticated: store.isAuthenticated,
    user: store.user,
    error: store.error,
    logout,
    clearErrors,
    login,
  };
};

export default useAuth;
