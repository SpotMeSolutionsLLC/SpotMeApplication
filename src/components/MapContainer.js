import React, { Component } from 'react';
import {
    View,
    Platform,
} from 'react-native';

import { connect } from 'react-redux';
import { Speech, Constants, Location, Permissions } from 'expo';
import Axios from 'axios';
import MapView, { PROVIDER_GOOGLE, Marker, } from 'react-native-maps';
import { slideUp, slideDown, sendKey } from '../actions/slideActions';
import {
    focusClick,
    blurClick,
    sendLocData,
} from '../actions/searchActions';
import { getMarkerColor } from '../actions/speechActions';
import MidnightCommander from '../mapstyles/MidnightCommander';
import styles from './Styling.style.js';
import carMarker from '../images/car_icon.png';
import banana from '../images/banana.png';
import spotMarker from '../images/spotmarker.png';

//Container for the map, used to load stuff onto map such as markers
class MapContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            markers: [],
            coordinate: {
                latitude: 0,
                longitude: 0
            },
            currentLoc: {
                latitude: 0,
                longitude: 0
            }
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
        this.changeLocation = this.changeLocation.bind(this);
        
        PubSub.subscribe("changeLocation", this.changeLocation);
        PubSub.subscribe("sendBack", (data) => {
            PubSub.publish(data.publishLoc, {
                references: this
            });
        });
        this.setLoc();
    }


    testFunc(){
        console.log("testFunc has been fired");
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
        // console.log(location);

        //Needed for current location marker to get updated

        return location;
    }

    setLoc = async () => {
        const location = await this.getLocationAsync();
        this.changeLocation(null, {
            lat: location.coords.latitude,
            lng: location.coords.longitude
        });
    }

    //Used to get information on markers from API
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
                    PubSub.publish("slideUp");
                    PubSub.publish("updateData", {
                        key: markerInstance.key
                    });
                    PubSub.publish("onBlur");
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

    changeLocation(context, data) {
        // console.log('MapContainer changeLocation() called');
        // this.startingLoc.timing({
        //     latitude: lat,
        //     longitude: lng,
        // }, duration).start();
        lat = parseFloat(data.lat);
        lng = parseFloat(data.lng);
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

    render() {
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
                    PubSub.publish("onBlur");
                    PubSub.publish("slideDown");
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
                    />


                </View>

                <Marker
                    coordinate={{ latitude: this.state.currentLoc.latitude, longitude: this.state.currentLoc.longitude }}
                    description={'Current Location'}
                    //Current location being called multiple times, may affect rendering
                    //onPress={Speech.speak('This is your current location.')}
                    //image={carMarker}
                    style={styles.locationStyle}
                    image={carMarker}
                />

                {this.state.markers.length !== 0 && this.getMarkers()}

            </MapView.Animated>

        );
    }
}

const mapStateToProps = (state) => {
    return {

    }
}





const mapDispatchToProps = (dispatch) => {
    return {

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer);
