// Local ENUM dependencies
import {
    MARKER_TYPES
} from "SpotmeDetached/src/helpers/settingHelpers.js"

import {
    SET_NEW_SETTINGS
} from "../actions/SettingActions"

const INITIAL_STATE = {
    markerType: MARKER_TYPES.CHECKMARKS
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case SET_NEW_SETTINGS:
            return {
                ...state,
                ...action.newSettings
            }
        default:
            return {
                ...state
            }
    }
}