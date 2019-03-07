import axios from "axios";

export const getMarkers = async () => {
    let result = await axios.get("http://192.168.42.108:3000/garages/getMarkers");
    return result;
}

export const getGarageData = async (searchName) => {
    let result = await axios.get('https://spotmeapi.herokuapp.com/garages/garage', {
        params: {
            keyName: searchName
        }
    });

    return result.data;
}

export const getColor = (percentage) => {
    if (percentage < 25) {
        return "#90ee90"; //green
    }
    else if (percentage < 50) {
        return "#ffff4d"; //yellow
    }
    else if (percentage < 75) {
        return "#ffa07a"; //orange
    }
    else {
        return "#f08080"; //red
    }
}