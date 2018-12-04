export const focusClick = (isClicked) => {
    return {
        type: "focusClick", 
        click: isClicked
    }
}

export const blurClick = (isClicked) => {
    // console.log("blurClick fired");
    return {
        type: "blurClick", 
        click: isClicked
    }
}

export const sendLocData = (lat, lng) => {
    // console.log("sendLocData fired");
    // console.log("Lat: " + lat + " Lng: " + lng);
    return {
        type: "sendLocData",
        latitude: lat,
        longitude: lng
    }
}