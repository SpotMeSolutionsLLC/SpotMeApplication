import React, { Component } from "react";
import {
    StyleSheet,
    View,
    Dimensions,
    Image,

} from "react-native";

import { connect } from "react-redux";


import MapView, {
    PROVIDER_GOOGLE,
    Marker,
    AnimatedRegion,
    Animated,
    Callout
} from "react-native-maps";

import {
    slideUp,
    slideDown,
    sendKey
} from "../actions/slideActions";

import {
    focusClick,
    blurClick,
    sendLocData,
} from "../actions/searchActions"

import {
    getMarkerColor
} from "../actions/speechActions"

// import carMarker from '../images/car.png';
// import banana from '../images/banana.png';
import garageMarker from '../images/garage.png';
// import GarList from "./GarList";

import MidnightCommander from "../mapstyles/MidnightCommander";

import styles from "./Styling.style.js";
import Axios from "axios";
import reducers from "../reducers";

import { Speech } from "expo";

import { store } from "../App";

import PubSub from "pubsub-js";

class MapContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            markers: [],
            coordinate: {
                latitude: 37.339222,
                longitude: -121.880724
            },
        }
        Axios.get("https://project-one-203604.appspot.com/garages/getMarkers").then((res) => {
            console.log(res.data);
            this.setState({
                markers: res.data
            });
        });
        //Array of objects with keys: lat, lng, name, key

        this.initialLocation = {
            latitude: 37.339222,
            longitude: -121.880724,
            latitudeDelta: 0.00112,
            longitudeDelta: 0.001412
        }
    
        PubSub.subscribe("test", () => {
            return "asdf";
        })

        console.log("PubSub Test " + PubSub.publish("test",null,() => {
        }));
    }

    getMarkers() {

        return this.state.markers.map(markerInstance => (

            <Marker
                coordinate={{ latitude: markerInstance.lat, longitude: markerInstance.lng }}
                //Can later pull coord, title, descrip from API when implemented
                title={markerInstance.name}
                // description={markerInstance.description}
                style={styles.MapContainer.markerStyle}
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

    changeLocation(lat, lng) {
        // console.log("MapContainer changeLocation() called");
        // this.startingLoc.timing({
        //     latitude: lat,
        //     longitude: lng,
        // }, duration).start();

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
                    />

                </View>
                {this.state.markers.length != 0 && this.getMarkers()}

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