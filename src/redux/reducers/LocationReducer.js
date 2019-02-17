import { getLocationAsync } from "../../functions"

const INITIAL_STATE = {
    coordinates: {
        latitude: 0,
        longitude: 0,
    },
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "ChangeLocation":
            return {
                ...state,
                coordinates: action.coordinates
            }

        default:
            return { ...state }
    }
};
