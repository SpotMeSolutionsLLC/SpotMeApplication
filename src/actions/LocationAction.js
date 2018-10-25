import {
  LOCATION_CHANGED,
  CURRENT_LOCATION,
  GET_INPUT,
  GET_ADDRESS_PREDICTIONS,
  GET_SELECTED_ADDRESS,
  GET_SJ_API
} from "./types";
import firebase from 'firebase';

// NOTE: need to be enabled in google api for places
import RNGooglePlaces from "react-native-google-places";

export const locationChanged = text => {
  return {
    type: LOCATION_CHANGED,
    payload: text
  };
};

// get current gps location of the user
//NOTE: if doesnt work , go to: simulator menu -> debug -> location -> apple 
export function getCurrentLocation() {
  return dispatch => {
    navigator.geolocation.getCurrentPosition(
      position => {
        dispatch({
          type: CURRENT_LOCATION,
          payload: position
        });
      },
      error => console.log(error.message), {
        enableHighAccuracy: true,
        maximumAge: 60000,
        timeout: 15000
      }
    );
  };
}

export function getInputData(payload) {
  return {
    type: GET_INPUT,
    payload: payload
  };
}

// get places prediction from google place API
export function getAddressPredictions(text) {
  return dispatch => {
    RNGooglePlaces.getAutocompletePredictions(text, {
        country: "USA"
      })
      .then(results =>
        dispatch({
          type: GET_ADDRESS_PREDICTIONS,
          payload: results
        })
      )
      .catch(error => console.log(error.message));
  };
}

// get user-selected place from google place API and translate it into gps coordinate 
export function getSelectedAddress(payload) {

  return (dispatch) => {

    RNGooglePlaces.lookUpPlaceByID(payload)
      .then(results => {
        dispatch({
          type: GET_SELECTED_ADDRESS,
          payload: results
        });
      })
      .catch(error => console.log(error.message));
  };
}

//get realtime San Jose Public Garage Information from their public API
export function fetchSanJoseAPI(garageNameFullText) {

  return (dispatch) => {
    fetch('http://api.data.sanjoseca.gov/api/v2/datastreams/PARKI-GARAG-DATA/data.json/?auth_key=974e8db20c97825c8fe806dcbeaa3889c7b8c921&limit=50')
      .then((response) => response.json())
      .then((responseJson) => {
        dispatch({
          type: GET_SJ_API,
          payload: sjAPIFilter(responseJson.result.fArray, garageNameFullText)
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };
}

// sjData :  SJ API array of data object 
// garageNameFullText : google search garage name 
//  sjAPIFilter() : funtion will return garage detail object if match with google search
const sjAPIFilter = (sjData, garageNameFullText) => {
  var stripHeaderArr = sjData.slice(4); // array of objects from san jose api garage
  var arrOfString = garageNameFullText.split(',');
  var garageName = arrOfString[0]; // garage name got from google api

  var garageDetail = { // initialize garage detail object for each search
    garageName: 'no information',
    garageStatus: 'no information',
    garageAvailable: 'no information',
  };

  for (var i = 0; i < stripHeaderArr.length; i++) {
    if (isSameName(stripHeaderArr[i].fStr, garageName)) { // if google search name match the name of sj api garage name => it is the correct data
      garageDetail.garageName = stripHeaderArr[i].fStr;
      garageDetail.garageStatus = stripHeaderArr[i + 1].fStr;
      garageDetail.garageAvailable = stripHeaderArr[i + 2].fStr + '/' + stripHeaderArr[i + 3].fStr;
    }
  }
  return garageDetail; // return object to reducer
};

// function to compare san jose garage name vs google garage name
// RULE: if google garage name can match every word to san jose api => then it is TRUE
const isSameName = (sjAPIName, googleMapName) => {
  var isSame = 0;
  var count = 0;
  var arrOfsjAPIName = sjAPIName.split(' '); // split string to array to compare
  var arrOfgoogleMapName = googleMapName.split(' '); // split string to array to compare
  var lengOfsjAPIName = arrOfsjAPIName.length;
  var lengOfgoogleMapName = arrOfgoogleMapName.length;

  for (var i = 0; i < lengOfsjAPIName; i++) {
    var tempOfsjAPIName = arrOfsjAPIName[i];
    for (var j = 0; j < lengOfgoogleMapName; j++) {
      if (tempOfsjAPIName === arrOfgoogleMapName[j]) {
        count++;
      }
    }
  }
  if (count === lengOfsjAPIName) {
    isSame = 1;
  }
  return isSame;
};