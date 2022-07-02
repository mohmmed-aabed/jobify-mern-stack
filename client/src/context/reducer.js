import { DISPLAY_ALERT, CLEAR_ALERT } from './actions';

const reducer = (state, action) => {
  if (action.type === DISPLAY_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertText: 'Please provide all values!',
      alertType: 'danger',
    };
  } else if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      showAlert: false,
      alertText: '',
      alertType: '',
    };
  } else {
    throw new Error(`No such action: ${action.type}`);
  }
};

export default reducer;
