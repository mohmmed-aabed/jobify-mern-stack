import { initialState } from './appContext';
import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  TOGGLE_SIDEBAR,
  LOGOUT_USER,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  HANDLE_CHANGE,
  CLEAR_VALUES,
  CREATE_JOB_BEGIN,
  CREATE_JOB_SUCCESS,
  CREATE_JOB_ERROR,
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
  if (action.type === TOGGLE_SIDEBAR) {
    return {
      ...state,
      showSidebar: !state.showSidebar,
    };
  }
  if (action.type === LOGOUT_USER) {
    return {
      ...initialState,
      user: null,
      token: null,
      userLocation: '',
      jobLocation: '',
    };
  }
  if (action.type === UPDATE_USER_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === UPDATE_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      user: action.payload.user,
      token: action.payload.token,
      userLocation: action.payload.location,
      jobLocation: action.payload.location,
      showAlert: true,
      alertText: 'User profile updated!',
      alertType: 'success',
    };
  }
  if (action.type === UPDATE_USER_ERROR) {
    return {
      ...state,
      showAlert: true,
      isLoading: false,
      alertText: action.payload.msg,
      alertType: 'danger',
    };
  }
  if (action.type === HANDLE_CHANGE) {
    return {
      ...state,
      [action.payload.name]: action.payload.value,
    };
  }
  if (action.type === CLEAR_VALUES) {
    return {
      ...state,
      isEditing: false,
      editJobId: '',
      position: '',
      company: '',
      jobType: 'full-time',
      status: 'pending',
      jobLocation: state.userLocation,
    };
  }
  if (action.type === CREATE_JOB_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === CREATE_JOB_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertText: 'New job created!',
      alertType: 'success',
    };
  }
  if (action.type === CREATE_JOB_ERROR) {
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
