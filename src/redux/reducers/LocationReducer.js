const INITIAL_STATE = {
    coordinates: {
        latitude: 37.33521769484834,
        longitude: -121.88601158559324,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02
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
