import Axios from "axios"

export const changeLocation = (coordinates) => {
    return {
        type: "ChangeLocation",
        coordinates: coordinates
    }
}

export const refreshMarkers = async (selectedMarker = null) => {
    let { data } = await Axios.get("https://spotmeapi.herokuapp.com/garages/getMarkers");
    console.log(data);

    if (selectedMarker) {
        let updatedSelectedMarker = data.filter(value => {
            return value.keyName == selectedMarker.keyName
        })[0];
        return {
            type: "UpdateMarkers",
            markers: data,
            selected: updatedSelectedMarker
        }
    }
    else {
        return {
            type: "UpdateMarkers",
            markers: data,
            selected: null,
        };
    }

}

export const selectMarker = (marker) => {
    return {
        type: "SelectMarker",
        selected: marker,
    }
}