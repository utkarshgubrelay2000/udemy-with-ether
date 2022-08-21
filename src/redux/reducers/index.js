import { combineReducers } from 'redux';
import authReducer from './auth';
import hydraReducer from './hydra';

const rootReducer = combineReducers({
  auth: authReducer,
  hydra: hydraReducer,
});

export default rootReducer;
