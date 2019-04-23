import {
    combineReducers
} from "redux";

import MapReducer from "./MapReducer.js"
import SettingsReducer from "./SettingsReducer"

export default combineReducers({
    MapReducer,
    Settings: SettingsReducer
});