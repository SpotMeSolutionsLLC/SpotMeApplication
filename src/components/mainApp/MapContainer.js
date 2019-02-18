import _ from "lodash";
import React, { Component } from 'react';
import {
    View,
} from 'react-native';

import { connect } from 'react-redux';
import Axios from 'axios';
import MapView, { PROVIDER_GOOGLE, Marker, AnimatedRegion, } from 'react-native-maps';
import MidnightCommander from './mapstyles/MidnightCommander';

import { MapContainerStyles } from './Styling.style.js';
import carMarker from './images/car_icon.png';
import banana from './images/banana.png';
import spotMarker from './images/spotmarker.png';

import { changeLocation } from "../../redux/actions/LocationAction";
import { setSearchIsFocused } from "../../redux/actions/searchActions";
import { showInfo } from "../../redux/actions/slideActions";

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
        Axios.get('https://spotmeapi.herokuapp.com/garages/getMarkers').then((res) => {
            console.log("Data has been returned");
            console.log
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
                style={MapContainerStyles.markerStyle}
                key={markerInstance.key}
                onPress={(e) => {
                    e.stopPropagation();
                    this.props.showGarageInfo(markerInstance.key);
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

    componentWillReceiveProps(newProps){
        if(!_.isEqual(this.props.coordinates, newProps.coordinates)){
            console.log("changeLocation called");
            this.changeLocation(newProps.coordinates);
        }
    }

    render() {
        return (
            <MapView.Animated

                provider={PROVIDER_GOOGLE}
                style={MapContainerStyles.map}
                initialRegion={this.initialLocation}
                ref={(instance) => {
                    this.mapRef = instance;
                }}

                customMapStyle={MidnightCommander}

                onPress={(e) => {
                    this.props.blurText();
                    this.props.hideGarageInfo();
                }}
            >
                <Marker.Animated
                    coordinate={this.state.coordinate}
                    description={'Your Destination'}
                    style={MapContainerStyles.markerStyle}
                    ref={marker => {
                        this.marker = marker;
                    }}
                    image={banana}
                />

                <Marker
                    coordinate={{ latitude: this.state.currentLoc.latitude, longitude: this.state.currentLoc.longitude }}
                    description={'Current Location'}
                    //Current location being called multiple times, may affect rendering
                    //onPress={Speech.speak('This is your current location.')}
                    //image={carMarker}
                    style={MapContainerStyles.locationStyle}
                    image={carMarker}
                />

                {this.getMarkers()}

            </MapView.Animated>

        );
    }
}

const mapStateToProps = (state) => {
    return {
        coordinates: state.loc.coordinates,
    }
}





const mapDispatchToProps = (dispatch) => {
    return {
        changeLocation: (coordinates) => {
            dispatch(changeLocation(coordinates));
        },
        blurText: () => {
            dispatch(setSearchIsFocused(false));
        },
        showGarageInfo: (keyName) => {
            dispatch(showInfo(true, keyName));
        },
        hideGarageInfo: () => {
            dispatch(showInfo(false));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer);
