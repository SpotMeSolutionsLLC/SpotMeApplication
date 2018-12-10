import { combineReducers } from 'redux';
import LocationReducer from './LocationReducer';
import MapPressReducer from "./MapPressReducer";
import SearchBarReducer from "./SearchBarReducer";
import speechReducer from "./speechReducer"

export default combineReducers({
    loc: LocationReducer,
    mapPress: MapPressReducer,
    searchBar: SearchBarReducer,
    speech: speechReducer
});
