import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import earningsReducer from './earnings.reducer';
import cpiReducer from './cpi.reducer';
const rootReducer = combineReducers({
  errors, 
  user, 
  earningsReducer,
  cpiReducer,
});

export default rootReducer;
