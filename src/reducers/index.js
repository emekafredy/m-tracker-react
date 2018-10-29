import { combineReducers } from 'redux';

import authReducer from './auth';
import errorReducer from './error';
import requestsReducer from './requests';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  requests: requestsReducer
});
