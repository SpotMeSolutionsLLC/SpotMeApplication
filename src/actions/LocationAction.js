// NOTE: need to be enabled in google api for places
//import RNGooglePlaces from 'react-native-google-places';

import {
    LOCATION_CHANGED,
    CURRENT_LOCATION,
    GET_INPUT,
    GET_ADDRESS_PREDICTIONS,
    GET_SELECTED_ADDRESS,
    GET_SJ_API
  } from './types';

  import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
  import React from 'react';
  
const places = <GooglePlacesAutocomplete query={{ key: 'AIzaSyDrm8FcLd_izqNH7fYeG3RQs_tuswHtUrM' }} />;  

export const locationChange = text => {
    return {
        type: LOCATION_CHANGED,
        payload: text
    };
};


//Gets current gps location of the user
// NOTE: if doesnt work , go to: simulator menu -> debug -> location -> apple
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
        payload
    };
}

//New functions with React Native Google Places Autocomplete
export function getAddressPredictions(query) {
    return dispatch => {
        places.fetchDetails(query)
        .then(results => dispatch({
            type: GET_ADDRESS_PREDICTIONS,
            payload: results
        })).catch(error => console.log(error.message));
    };
}

export function getSelectedAddress(payload) {
    return dispatch => {
        places.fetchDetails(payload)
        .then(results => dispatch({
            type: GET_SELECTED_ADDRESS,
            payload: results
        })).catch(error => console.log(error.message));
    };
}


/*
//Gets the place predictions from Google Places API
export function getAddressPredictions(text) {
    return dispatch => {
        RNGooglePlaces.getAutocompletePredictions(text, { country: 'USA' })
        .then(results => dispatch({
            type: GET_ADDRESS_PREDICTIONS,
            payload: results
        })).catch(error => console.log(error.message));
    };
}

//Gets the User-Selected place from the Google Places API and translates it into GPS coordinates
export function getSelectedAddress(payload) {
    return (dispatch) => {
        RNGooglePlaces.lookUpPlaceByID(payload)
        .then(results => {
            dispatch({
                type: GET_SELECTED_ADDRESS,
                payload: results
            });
        }).catch(error => console.log(error.message));
    };
}*/

//Gets realtime data from San Jose Public Garage APIs
export function fetchSanJoseAPI(garageNameFullText) {
    return (dispatch) => {
        fetch('http://api.data.sanjoseca.gov/api/v2/datastreams/PARKI-GARAG-DATA/data.json/?auth_key=974e8db20c97825c8fe806dcbeaa3889c7b8c921&limit=50')
        .then((response) => response.json())
        .then((responseJson) => {
            dispatch({
                type: GET_SJ_API,
                payload: sjAPIFilter(responseJson.result.fArray, garageNameFullText)
            });
        }).catch(error => console.log(error.message));
    };
}

// sjData :  SJ API array of data objects
// garageNameFullText : google search garage names
// sjAPIFilter() : function will return garage detail objects if the name matches with google search
const sjAPIFilter = (sjData, garageNameFullText) => {
    const stripHeaderArr = sjData.slice(4); //array of objects from San Jose Garage API
    const arrOfString = garageNameFullText.split(',');
    const garageName = arrOfString[0];  //Garage name taken from google API

    //initializes garage detail object for search
    const garageDetail = {
        garageName: 'no information',
        garageStatus: 'no information',
        garageAvailable: 'no information',
    };

    //If google search matches the name of the SJ API garage name => it is the correct data
    //Gets the garage details by breaking down the string and then displaying specific chunks of data
    for (let i = 0; i < stripHeaderArr.length(); i++) {
        if (isSameName(stripHeaderArr[i].fStr, garageName)) {
            garageDetail.garageName = stripHeaderArr[i].fStr;
            garageDetail.garageStatus = stripHeaderArr[i + 1].fStr;
            garageDetail.garageAvailable = stripHeaderArr[i + 2].fStr + '/' + stripHeaderArr[i + 3].fStr;
        }
    }
    //returns object to reducer
    return garageDetail;
};

//Function to compare San Jose API garage name to Google Search garage name 
// RULE : if google garage name can match every word to SJ API => then it is TRUE
const isSameName = (sjAPIName, googleMapName) => {
    let isSame = 0;
    let count = 0;
    //Splits string of array to compare
    const arrOfsjAPIName = sjAPIName.split(' ');
    const arrOfgoogleMapName = googleMapName.split(' ');
    const lengthOfsjAPIName = arrOfsjAPIName.length;
    const lengthOfgoogleMapName = arrOfgoogleMapName.length;

    for (let i = 0; i < lengthOfsjAPIName; i++) {
        const tempOfsjAPIName = arrOfgoogleMapName[i];
        for (let j = 0; j < lengthOfgoogleMapName; j++) {
            if (tempOfsjAPIName === arrOfgoogleMapName[j]) {
                count++;
            }
        }
    }
    if (count === lengthOfsjAPIName) {
        isSame = 1;
    }
    return isSame;
};
