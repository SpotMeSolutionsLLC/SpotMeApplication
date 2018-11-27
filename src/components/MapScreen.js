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

import MapContainer from './MapContainer';
import DataTable from './DataTable';
import GarList from './GarList';
import SearchBar from './SearchBar';

import styles from './Styling.style.js';


class MapScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            garageList: null,
            garageListLoaded: false,
            mapRef: null
        };
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
            <View style={styles.mapScreen.outerContainer}>

                <View style={styles.mapScreen.container}>


                    { this.state.garageListLoaded && <MapContainer
                        ref={instance => {
                            if (this.state.mapRef == null) {
                                this.setState({
                                    mapRef: instance
                                });
                            }
                        }}
                        onMarkerPress={this.state.garageList.slideUp}
                        onMapPress={this.state.garageList.slideDown}
                    />
                    }

                    <TouchableHighlight
                        style={styles.mapScreen.menuButton}
                        onPress={() => this.props.navigation.openDrawer()}
                        underlayColor={'white'}
                    >
                        <Image 
                            source={require('../images/menu.png')}
                            style={{
                                height: 30,
                                width: 30,
                                opacity: 0.5
                            }}
                        />

                    </TouchableHighlight>

                    {this.state.mapRef != null &&
                        <SearchBar
                            mainMap={this.state.mapRef}
                        />
                    }

                    <GarList
                        ref={(instance) => {
                            console.log('GarList has loaded');
                            if (!this.state.garageListLoaded) {
                                this.setState({
                                    garageList: instance,
                                    garageListLoaded: true
                                });
                            }
                        }}
                    />
                </View>
            </View>
        );
    }
}


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
