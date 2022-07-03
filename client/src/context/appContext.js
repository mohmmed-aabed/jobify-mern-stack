import React, { useReducer, useContext } from 'react';
import axios from 'axios';

import reducer from './reducer';
import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
} from './actions';

const user = localStorage.getItem('user');
const token = localStorage.getItem('token');
const location = localStorage.getItem('location');

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '',
  user: JSON.parse(user) || null,
  token: token || null,
  userLocation: location || '',
  jobLocation: location || '',
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 2000);
  };

  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };

  const addUserToLocalStorage = ({ user, token, location }) => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
    localStorage.setItem('location', location);
  };

  // const removeUserFromLocalStorage = () => {
  //   localStorage.removeItem('user');
  //   localStorage.removeItem('token');
  //   localStorage.removeItem('location');
  // };

  const setupUser = async (currentUser, setupType) => {
    dispatch({ type: SETUP_USER_BEGIN });
    try {
      const response = await axios.post(
        `/api/v1/auth/${setupType}`,
        currentUser
      );
      const { user, location, token } = response.data;
      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: { user, location, token, setupType },
      });
      addUserToLocalStorage({ user, location, token });
    } catch (error) {
      dispatch({
        type: SETUP_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        setupUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => useContext(AppContext);

export { initialState, AppProvider, useAppContext };
