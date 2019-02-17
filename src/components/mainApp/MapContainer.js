import _ from "lodash";
import React, { Component } from 'react';
import {
    View,
} from 'react-native';

import { connect } from 'react-redux';
import Axios from 'axios';
import MapView, { PROVIDER_GOOGLE, Marker, AnimatedRegion, } from 'react-native-maps';
import MidnightCommander from './mapstyles/MidnightCommander';

import styles from './Styling.style.js';
import carMarker from './images/car_icon.png';
import banana from './images/banana.png';
import spotMarker from './images/spotmarker.png';

import { changeLocation } from "../../redux/actions/LocationAction";
import { setSearchIsFocused } from "../../redux/actions/searchActions";

import { getLocationAsync } from "../../functions"

//Container for the map, used to load stuff onto map such as markers
class MapContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            markers: [],
            coordinate: new AnimatedRegion({
                latitude: this.props.coordinates.latitude,
                longitude: this.props.coordinates.longitude

            }),
            currentLoc: {
                latitude: this.props.coordinates.latitude,
                longitude: this.props.coordinates.latitude,
            }
        };
        Axios.get('https://project-one-203604.appspot.com/garages/getMarkers').then((res) => {
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

        this.setLoc();
    }

    setLoc = async () => {
        const location = await getLocationAsync();
        this.changeLocation({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
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
                }}
            >
            </Marker>
        ));
    }

    changeLocation(coordinates) {
        this.state.coordinate.timing({
            latitude: coordinates.latitude,
            longitude: coordinates.longitude
        }, 1).start();

        this.mapRef._component.animateToCoordinate({
            latitude: coordinates.latitude,
            longitude: coordinates.longitude,
        });
    }

    shouldComponentUpdate(newProps, newState){
        if(!_.isEmpty(newProps.coordinates)){
            this.changeLocation(newProps.coordinates);
            return false;
        }
        else{
            return true;
        }
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
                    this.props.blurText();
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
        coordinates: state.loc.coordinates
    }
}





const mapDispatchToProps = (dispatch) => {
    return {
        changeLocation: (coordinates) => {
            dispatch(changeLocation(coordinates));
        },
        blurText: () => {
            dispatch(setSearchIsFocused(false));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer);
