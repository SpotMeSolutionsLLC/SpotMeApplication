import { Permissions, Location } from "expo";
import axios from "axios";

export const getLocationAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
        this.setState({
            errorMessage: 'Permission to access location was denied',
        });
    }
    //Changes the location to be current location
    const location = await Location.getCurrentPositionAsync();

    //Needed for current location marker to get updated

    return location;
}

export const getGarageData = async (searchName) => {
    let result = await axios.get('https://spotmeapi.herokuapp.com/garages/garage', {
        params: {
            name: searchName
        }
    });

    return result.data;
}