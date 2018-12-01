import React, { Component } from 'react';
import axios from 'axios';
import {
    StyleSheet,
    View,
    Dimensions,
    Platform,
    Text
} from 'react-native';

import MapView, {
    PROVIDER_GOOGLE,
    Marker,
    AnimatedRegion,
    Animated,
    Callout
} from 'react-native-maps';

import { Constants, Location, Permissions } from 'expo';

// import carMarker from '../images/car.png';
// import banana from '../images/banana.png';
import garageMarker from '../images/garage.png';
// import GarList from './GarList';

import MidnightCommander from '../mapstyles/MidnightCommander';

import styles from './Styling.style.js';

class MapContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            markers: [{
                coordinates: {
                    latitude: 37.339222,
                    longitude: -121.880724
                },
                title: 'SJSU North Parking Garage',
                key: 'SJNorth'
            }, {
                coordinates: {
                    latitude: 37.332303,
                    longitude: -121.882986
                },
                title: 'SJSU West Parking Garage',
                key: 'SJWest'
            }, {
                coordinates: {
                    latitude: 37.333088,
                    longitude: -121.880797
                },
                title: 'SJSU South Parking Garage',
                // description: '',
                key: 'SJSouth'
            }],
        };
        this.coordinate = new AnimatedRegion({
            latitude: 0,
            longitude: 0
        });
        this.startingLoc = new AnimatedRegion({
            latitude: 0,
            longitude: 0,
            latitudeDelta: 0.00112,
            longitudeDelta: 0.001412
        });
        this.sjNorth = {
            loaded: false
        };
    }

      state = {
        location: null,
        errorMessage: null,
      };
    
      componentWillMount() {
        if (Platform.OS === 'android' && !Constants.isDevice) {
          this.setState({
            errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
          });
        } else {
          this._getLocationAsync();
        }
      }
    
      _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
          this.setState({
            errorMessage: 'Permission to access location was denied',
          });
        }
    
        let location = await Location.getCurrentPositionAsync({});
        this.setState({ location });
      };

    getMarkers() {
        return this.state.markers.map(markerInstance => (
            <Marker
                coordinate={{ latitude: markerInstance.coordinates.latitude, longitude: markerInstance.coordinates.longitude }}
                //Can later pull coord, title, descrip from API when implemented
                title={markerInstance.title}
                description={markerInstance.description}
                image={garageMarker}
                style={styles.MapContainer.markerStyle}
                key={markerInstance.key}
                onPress={(coordinate, position) => {
                    this.props.onMarkerPress(markerInstance.key);
                }}
            />
        ));
    }

    changeLocation(lat, lng) {
        console.log('MapContainer changeLocation() called');
        const duration = 3000;
        // this.startingLoc.timing({
        //     latitude: lat,
        //     longitude: lng,
        // }, duration).start();

        this.coordinate.timing({
            latitude: lat,
            longitude: lng
        }, 1).start();

        this.mapRef._component.animateToCoordinate({
            latitude: lat,
            longitude: lng,
        });
    }

    render() {
        let longitude = 'Waiting..';
        let latitude = 'Waiting..';
        if (this.state.errorMessage) {
            longitude = this.state.errorMessage;
            latitude = this.state.errorMessage;
        } else if (this.state.location) {
            //Getting the information of current location from state
            //Error for andriod when getting long, lat because
            //it returns the values in a string form that ios can convert to double
            //but andriod can not convert it to double (null to be specific)
            longitude = this.state.location.coords.longitude;
            latitude = this.state.location.coords.latitude;
            //int long = parseInt(longitude);
            //int lat = parseInt(latitude);
        }


        //Gets the data for SJ Garages from SJ API
        axios.get('http://api.data.sanjoseca.gov/api/v2/datastreams/PARKI-GARAG-DATA/data.json/?auth_key=974e8db20c97825c8fe806dcbeaa3889c7b8c921&limit=50').then(instance => {
        console.log(instance.data.result.fArray);
        console.log('this is reached');
        console.log(instance.data.result.fArray[4].fStr);
            //fourthStreetGarageName: instance.data.result.fArray[4].fStr,
            //fourthStreetGarageStatus: 'Status: ' + instance.data.result.fArray[5].fStr,
            //fourthStreetGarageSpaces: 'Spaces filled: ' + instance.data.result.fArray[6].fStr + '/' + instance.data.result.fArray[7].fStr,
            
            // cityHallGarageName: instance.data.result.fArray[8].fStr,
            // cityHallGarageSpaces: 'Spaces filled: ' + instance.data.result.fArray[6].fStr + '/' + instance.data.result.fArray[7].fStr,
            // thirdStreetGarageName: instance.data.result.fArray[12].fStr,
            // thirdStreetGarageSpaces: 'Spaces filled: ' + instance.data.result.fArray[14].fStr + '/' + instance.data.result.fArray[15].fStr,
            // marketSanPedroSquareGarageName: instance.data.result.fArray[16].fStr,
            // marketSanPedroSquareGarageSpaces: 'Spaces filled: ' + instance.data.result.fArray[18].fStr + '/' + instance.data.result.fArray[19].fStr,
            // conventionCenterGarageName: instance.data.result.fArray[20].fStr,
            // conventionCenterGarageSpaces: 'Spaces filled: ' + instance.data.result.fArray[22].fStr + '/' + instance.data.result.fArray[23].fStr,
            // secondSanCarlosGarageName: instance.data.result.fArray[24].fStr,
            // secondSanCarlosGarageSpaces: 'Spaces filled: ' + instance.data.result.fArray[26].fStr + '/' + instance.data.result.fArray[27].fStr
        });
        return (
            <MapView.Animated

                provider={PROVIDER_GOOGLE}
                style={styles.MapContainer.map}
                //props error on region, expected number but got object
                //error doesnt have big effect/matter but gives a warning
                region={this.startingLoc}
                //   customMapStyle={MidnightCommander}
                ref={(instance) => {
                    this.mapRef = instance;
                }}

                customMapStyle={MidnightCommander}

                onPress={() => {
                    this.props.onMapPress();
                }}
            >
                <View >
                    <Marker.Animated
                        coordinate={this.coordinate}
                        description={'Your Destination'}
                        style={styles.MapContainer.markerStyle}
                        ref={marker => {
                            this.marker = marker;
                        }}
                    />
                    <Marker.Animated
                        coordinate={{ latitude, longitude }}
                        description={'CurrentLocation'}
                    />
                    {this.getMarkers()}
                </View>

            </MapView.Animated>
        );
    }
}

export default MapContainer;
