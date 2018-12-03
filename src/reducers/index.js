import { combineReducers } from 'redux';
import LocationReducer from './LocationReducer';
import AuthReducer from './AuthReducer';
import MapPressReducer from "./MapPressReducer";

export default combineReducers({

    loc: LocationReducer,
    auth: AuthReducer,
    mapPress: MapPressReducer
});
