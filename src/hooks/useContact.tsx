import { actions, useDispatch, useStore } from '../store/contactStore';


export const useAuth = () => {
  const store = useStore();
  const dispatch = useDispatch();

  const setContacts =  (contacts: any) => {
    dispatch({type: actions.SET_CONTACTS, payload: contacts});
  };

  return {
    setContacts,
    contacts: store.contacts
  };
};

export default useAuth;
