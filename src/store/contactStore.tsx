import {makeStore} from './makeStore';
interface IInitialState {
  contacts: any;
}

const initial_state: IInitialState = {
  contacts: null,
};

const reducer = (state: any, action: any) => {
  switch (action.type) {

    case actions.SET_CONTACTS:
      return {
        ...state,
        contact: action.payload
      };

    default:
      return state;
  }
};

export const {Provider, useStore, useDispatch} = makeStore(
  'ContactStore',
  initial_state,
  reducer,
);

export const actions = {
  SET_CONTACTS: 'SET_CONTACTS',
};
