import { combineReducers } from 'redux';
import LocationReducer from './LocationReducer';
import GarageInfoReducer from "./garageInfoReducer";
import SearchBarReducer from "./SearchBarReducer";
import speechReducer from "./speechReducer"

export default combineReducers({
    loc: LocationReducer,
    garageInfo: GarageInfoReducer,
    searchBar: SearchBarReducer,
    speech: speechReducer
});
