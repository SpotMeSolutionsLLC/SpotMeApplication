import Axios from "axios"

export const changeLocation = (coordinates) => {
    return {
        type: "ChangeLocation",
        coordinates: coordinates
    }
}

export const refreshMarkers = async () => {
    let { data } = await Axios.get("https://spotmeapi.herokuapp.com/garages/getMarkers");
    console.log(data);
    return {
        type: "UpdateMarkers",
        markers: data
    };
}