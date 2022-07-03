import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
} from './actions';

const reducer = (state, action) => {
  if (action.type === DISPLAY_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertText: 'Please provide all values!',
      alertType: 'danger',
    };
  }
  if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      showAlert: false,
      alertText: '',
      alertType: '',
    };
  }
  if (action.type === SETUP_USER_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === SETUP_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      user: action.payload.user,
      token: action.payload.token,
      userLocation: action.payload.location,
      jobLocation: action.payload.location,
      showAlert: true,
      alertText: `${
        action.payload.setupType === 'register'
          ? 'User created!'
          : 'Login successfully!'
      } Redirecting...`,
      alertType: 'success',
    };
  }
  if (action.type === SETUP_USER_ERROR) {
    return {
      ...state,
      showAlert: true,
      isLoading: false,
      alertText: action.payload.msg,
      alertType: 'danger',
    };
  }
  throw new Error(`No such action: ${action.type}`);
};

export default reducer;
