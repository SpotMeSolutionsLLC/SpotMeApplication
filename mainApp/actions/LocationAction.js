import store from "../../redux"
import { Location, Permissions } from "expo";

export const getCurrentLocation = async () => {
    console.log("getCurrentLocation called");
    const { status } = await Permissions.askAsync(Permissions.LOCATION);

    //Changes the location to be current location
    const location = await Location.getCurrentPositionAsync();
    // console.log(location);

    //Needed for current location marker to get updated
    console.log("location");
    console.log(location);

    store.dispatch({
        type: "getLoc",
        lat: location.coords.latitude,
        lng: location.coords.longitude
    })
}