import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import earningsReducer from './earnings.reducer';

const rootReducer = combineReducers({
  errors, 
  user, 
  earningsReducer,
});

export default rootReducer;
