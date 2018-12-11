const INITIAL_STATE = {
    location: {
        latitude: 0,
        longitude: 0
    }
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "getLoc":
            return {
                ...state, location: {
                    latitude: action.lat,
                    longitude: action.lng
                }
            }
        default:
            return { ...state }
    }
};
