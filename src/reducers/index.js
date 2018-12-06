import { combineReducers } from 'redux';
import LocationReducer from './LocationReducer';
import AuthReducer from './AuthReducer';
import MapPressReducer from "./MapPressReducer";
import SearchBarReducer from "./SearchBarReducer";

export default combineReducers({

    loc: LocationReducer,
    auth: AuthReducer,
    mapPress: MapPressReducer,
    searchBar: SearchBarReducer
});
