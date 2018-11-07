import React, { Component } from 'react';
import {
    Dimensions,
    StyleSheet,
    View,
    Text,
    TouchableHighlight,
    Image,
    Platform
} from 'react-native';
import { connect } from 'react-redux';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {
    locationChanged,
    getCurrentLocation,
    getInputData,
    getAddressPredictions,
    getSelectedAddress,
    fetchSanJoseAPI
} from '../actions';

import MapContainer from "./MapContainer";
import DataTable from "./DataTable";
import GarList from "./GarList";




class MapScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            garageList: null,
            garageListLoaded: false
        }
    }

    //Gets the current location and changes the state of current location
    // getLocationAsync = async () => {
    //   const { status } = await Permissions.askAsync(Permissions.LOCATION);
    //   if (status !== 'granted') {
    //     this.setState({
    //       errorMessage: 'Permission to access location was denied',
    //     });
    //   }

    //   let location = await Location.getCurrentPositionAsync({});
    //   console.log(location);

    //   this.state.currentLocation = location;

    //   this.changeLoc(location.coords.latitude, location.coords.longitude);

    // };


    render() {

        return (
            <View style={styles.outerContainer}>
                <View style={styles.navigationBar}>
                    <TouchableHighlight
                        onPress={() => this.props.navigation.openDrawer()}
                        underlayColor={'white'}
                    >
                        <Image source={require('../images/menu.png')} />

                    </TouchableHighlight>

                    <Text style={styles.companyText}>SpotMeSolutions</Text>

                    <Image source={require('../images/icon.jpg')} />
                </View>

                <View style={styles.container}>


                    { this.state.garageListLoaded && <MapContainer
                        ref={instance => {
                            this.mapRef = instance;
                        }}
                        onMarkerPress = {this.state.garageList.slideUp}
                        onMapPress = {this.state.garageList.slideDown}
                    />
                    }

                    <GooglePlacesAutocomplete
                        placeholder='Search a location or garage!'
                        minLength={2} //Minimum length of text entered for autocomplete results
                        autoFocus={false}
                        listViewDisplayed='false'
                        returnKeyType={'default'}
                        fetchDetails
                        renderDescription={row => row.description}
                        onPress={(data, details = null) => {
                            this.mapRef.changeLocation(details.geometry.location.lat, details.geometry.location.lng);
                            return details;
                        }}
                        getDefaultValue={() => ''}
                        query={{ key: 'AIzaSyAknyin7pzbkZ89IRg6QeQ0gC2sVjSKRpY' }}
                        styles={{
                            textInputContainer: {
                                width: '100%',
                                backgroundColor: '#42b8ba',
                                //backgroundColor: 'transparent'
                                zIndex: 99
                            },
                            listView: {
                                position: 'absolute',
                                backgroundColor: 'white',
                                //backgroundColor: 'transparent',
                                // height: Dimensions.get('window').height,
                                zIndex: 99,
                                top: 40
                            },
                            description: {
                                fontWeight: 'bold',
                                fontSize: 18,
                                height: 40
                                //color: 'white'
                            },
                        }}
                    />

                    <GarList
                        ref = {(instance) => {
                            console.log("GarList has loaded");
                            if(!this.state.garageListLoaded){
                                this.setState({
                                    garageList: instance,
                                    garageListLoaded: true
                                });
                            }
                        }}
                    ></GarList>
                </View>

                {/* <DataTable ref={instance => {
            this.dataBox = instance;
          }}/> */}

            </View>
        );
    }
}

const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        zIndex: 99,
    },
    outerContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        borderRadius: 2,
        borderWidth: 2,
        borderColor: '#d6d7da'
    },
    companyText: {
        fontSize: 30,
        color: '#42b8ba',
        fontWeight: '900',
        alignItems: 'center',
        width: 380,
        textAlign: 'center'
    },
    navigationBar: {
        marginTop: 20,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    mapAndSearchBarContainer: {
        alignItems: 'center',

        height: '90%',
        width: '100%'
    },
    inputContainer: {
        //height: 40,
        elevation: 1,
        backgroundColor: 'white',
        width: '90%',
        height: '10%',
        top: 40,
        borderRadius: 3,
        shadowOpacity: 0.75,
        shadowRadius: 1,
        shadowColor: 'gray',
        shadowOffset: { height: 0, width: 0 },
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputStyle: {
        color: '#000',
        padding: 10,
        height: 50,
        fontSize: 18,
        lineHeight: 23,
        flex: 2
    },
    locationStyle: {
        zIndex: 99
    },
    markerStyle: {
        zIndex: 98
    }
};

const mapStateToProps = ({ loc }) => {
    const {
        location,
        currentLocation,
        inputData,
        predictions,
        sanjose
    } = loc;
    return { location, currentLocation, inputData, predictions, sanjose };
};
const mapActionCreators = {
    locationChanged,
    getCurrentLocation,
    getInputData,
    getAddressPredictions,
    getSelectedAddress,
    fetchSanJoseAPI,
};

export default connect(mapStateToProps, mapActionCreators)(MapScreen);
