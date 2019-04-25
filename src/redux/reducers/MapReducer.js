const INITIAL_STATE = {
    coordinates: {
        latitude: 37.330318358466485,
        longitude: -121.88207309693097,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02
    },
    markers: [],
    selectedMarker: null
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case "ChangeLocation":
            return {
                ...state,
                coordinates: action.coordinates
            }
        case "UpdateMarkers":
            return {
                ...state,
                markers: action.markers,
                selectedMarker: action.selected
            }
        case "SelectMarker":
            return {
                ...state,
                selectedMarker: action.selected
            }
        default:
            return {
                ...state
            }
    }
}