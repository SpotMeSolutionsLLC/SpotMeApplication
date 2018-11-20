import { combineReducers } from 'redux';
import LocationReducer from './LocationReducer';
import AuthReducer from './AuthReducer';

export default combineReducers({
    loc: LocationReducer,
    auth: AuthReducer
});
