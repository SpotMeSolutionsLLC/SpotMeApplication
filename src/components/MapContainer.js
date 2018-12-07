import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
    Image,
    Platform,
} from 'react-native';

import { connect } from 'react-redux';

import { Speech, Constants, Location, Permissions } from 'expo';

import MapView, {
    PROVIDER_GOOGLE,
    Marker,
    AnimatedRegion,
    Animated,
    Callout
} from 'react-native-maps';

import {
    slideUp,
    slideDown,
    sendKey
} from '../actions/slideActions';

import {
    focusClick,
    blurClick,
    sendLocData,
} from '../actions/searchActions'

import {
    getMarkerColor
} from '../actions/speechActions'


import MidnightCommander from '../mapstyles/MidnightCommander';

import styles from './Styling.style.js';
import Axios from 'axios';
import reducers from '../reducers';

import { store } from '../App';

import carMarker from '../images/car_icon.png';
import banana from '../images/banana.png';
import spotMarker from '../images/spotmarker.png';


class MapContainer extends Component {
    constructor(props) {
        super(props);
        console.log('MapContainer Loaded');
        this.state = {
            markers: [],
            coordinate: {
                latitude: 0,
                longitude: 0
            },
        };
        Axios.get('https://project-one-203604.appspot.com/garages/getMarkers').then((res) => {
            console.log(res.data);
            this.setState({
                markers: res.data
            });
        });

        this.initialLocation = {
            latitude: 0,
            longitude: 0,
            latitudeDelta: 0.00112,
            longitudeDelta: 0.001412
        };
    }

    //The state of current location
    state = {
        location: null,
        errorMessage: null,
    };

    //Calls the function to get current location
    componentDidMount() {
        if (Platform.OS === 'android' && !Constants.isDevice) {
          this.setState({
            errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
          });
        } else {
          this.getLocationAsync();
        }
    }

    //Gets the current location and changes the state of current location
    getLocationAsync = async () => {
        const { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
          this.setState({
            errorMessage: 'Permission to access location was denied',
          });
        }

        //Changes the location to be current location
        const location = await Location.getCurrentPositionAsync();
        console.log(location);

        this.changeLocation(location.coords.latitude, location.coords.longitude);
        //Needed for current location marker to get updated
        this.setState({ location });
      };

    getColor = async () => {

    }

    getMarkers() {
        return this.state.markers.map(markerInstance => (
            <Marker
                coordinate={{ latitude: markerInstance.lat, longitude: markerInstance.lng }}
                //Can later pull coord, title, descrip from API when implemented
                title={markerInstance.name}
                // description={markerInstance.description}
                style={styles.MapContainer.markerStyle}
                image={spotMarker}
                key={markerInstance.key}
                onPress={(e) => {
                    e.stopPropagation();
                    this.props.sendKey(markerInstance.key);
                    this.props.slideUp(true);
                    this.props.blurClick(true);
                }}
            >
                {/* <Image
                    source={garageMarker}
                    style={styles.MapContainer.markerStyleImage}
                >

                </Image> */}
            </Marker>
        ));
    }

    changeLocation(lat, lng) {
        // console.log('MapContainer changeLocation() called');
        // this.startingLoc.timing({
        //     latitude: lat,
        //     longitude: lng,
        // }, duration).start();
        lat = parseFloat(lat);
        lng = parseFloat(lng);
        this.setState({
            coordinate: {
                latitude: lat,
                longitude: lng
            }
        });

        this.mapRef._component.animateToCoordinate({
            latitude: lat,
            longitude: lng,
        });
    }

    shouldComponentUpdate(newProps, newState) {
        if (newProps.currentMarkerColor !== this.props.currentMarkerColor && newProps.currentMarkerColor != ''){
            Speech.speak('The status of the garage is ' + newProps.currentMarkerColor);
            if (newProps.currentMarkerColor === 'red') {
                Speech.speak('The garage is full.');
            } else if (newProps.currentMarkerColor === 'orange') {
                Speech.speak('The garage is more than 75% filled!');
            } else if (newProps.currentMarkerColor === 'yellow') {
                Speech.speak('The garage is fairly empty, it is likely you will find parking at this garage.');
            } else {
                Speech.speak('The garage is basically empty. It is very likely you will find parking here.');
            }
            //const num = this.props.spotNum / this.props.garageMax;
            //console.log(getPercentFull);
            //Speech.speak('The garage is ' + getPercentFull + ' percent filled');
        }
        return true;
    }

    componentDidUpdate() {
        // console.log('componentDidUpdate fired');
        // console.log(nextProps);
        if (this.props.latitude !== undefined && this.props.longitude != undefined) {
            // console.log('Change Location Called');
            this.changeLocation(this.props.latitude, this.props.longitude);
            this.props.resetLocData();
        }
    }


    render() {
      
        let longitude = 0;
        let latitude = 0;
        if (this.state.errorMessage) {
            longitude = this.state.errorMessage;
            latitude = this.state.errorMessage;
        } else if (this.state.location) {
            longitude = this.state.location.coords.longitude;
            latitude = this.state.location.coords.latitude;
        }
        console.log('current location coords');
        console.log(longitude);
        console.log(latitude);
        console.log('MapContainer rendered');
        return (
            <MapView.Animated

                provider={PROVIDER_GOOGLE}
                style={styles.MapContainer.map}
                //props error on region, expected number but got object
                //error doesnt have big effect/matter but gives a warning
                initialRegion={this.initialLocation}
                //   customMapStyle={MidnightCommander}
                ref={(instance) => {
                    this.mapRef = instance;
                }}

                customMapStyle={MidnightCommander}

                onPress={() => {
                    this.props.slideDown(true);
                    this.props.blurClick(true);
                }}
            >
                <View >
                    <Marker.Animated
                        coordinate={this.state.coordinate}
                        description={'Your Destination'}
                        style={styles.MapContainer.markerStyle}
                        ref={marker => {
                            this.marker = marker;
                        }}
                        image={banana}
                        zIndex={98}
                    />

                    <Marker
                        coordinate={{ latitude, longitude }}
                        description={'Current Location'}
                        //Current location being called multiple times, may affect rendering
                        //onPress={Speech.speak('This is your current location.')}
                        //image={carMarker}
                        style={styles.locationStyle}
                        image={carMarker}
                        zIndex={99}
                    />
                </View>

                {this.state.markers.length !== 0 && this.getMarkers()}

            </MapView.Animated>

        );
    }
}

const mapStateToProps = (state) => {
    // console.log('MapContainer mapStateToProps called');
    console.log(state.speech);
    return {
        latitude: state.searchBar.latitude,
        longitude: state.searchBar.longitude,
        currentMarkerColor: state.speech.color
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        slideUp: (status) => {
            dispatch(slideUp(status));
        },
        slideDown: (status) => {
            dispatch(slideDown(status));
        },
        sendKey: (key) => {
            dispatch(sendKey(key));
        },
        focusClick: (status) => {
            dispatch(focusClick(status));
        },
        blurClick: (status) => {
            dispatch(blurClick(status));
        },
        resetLocData: () => {
            dispatch(sendLocData(undefined, undefined));
        },

        resetMarkerColor: () => {
            dispatch(getMarkerColor(''));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps, null, {
    pure: false
})(MapContainer);
