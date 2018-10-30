import { combineReducers } from 'redux';

import authReducer from './auth';
import errorReducer from './error';
import requestsReducer from './requests';
import createRequestReducer from './createRequest';
import requestReducer from './request';
import processRequestReducer from './processRequest';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  requests: requestsReducer,
  request: createRequestReducer,
  singleRequest: requestReducer,
  processed: processRequestReducer
});
