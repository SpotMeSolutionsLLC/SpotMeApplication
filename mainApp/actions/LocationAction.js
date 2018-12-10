export const getCurrentLocation = async (callbackFunc) => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);

    //Changes the location to be current location
    const location = await Location.getCurrentPositionAsync();
    // console.log(location);

    //Needed for current location marker to get updated

    return location;
}