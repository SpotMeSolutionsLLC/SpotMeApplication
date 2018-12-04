import React, { Component } from "react";
import {
    StyleSheet,
    View,
    Dimensions,
    Image,

} from "react-native";

import {connect} from "react-redux";

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
    sendLocQuery
} from "../actions/searchActions"

// import carMarker from '../images/car.png';
// import banana from '../images/banana.png';
import garageMarker from '../images/garage.png';
// import GarList from "./GarList";

import MidnightCommander from "../mapstyles/MidnightCommander";

import styles from "./Styling.style.js";

class MapContainer extends Component {
    constructor(props) {
        super(props);
        console.log("MapContainer Loaded");
        this.state = {
            markers: [{
                coordiantes: {
                    latitude: 37.339222,
                    longitude: -121.880724
                },
                title: "SJSU North Parking Garage",
                key:"SJNorth"
            },{
                coordiantes: {
                    latitude: 37.332303,
                    longitude: -121.882986
                },
                title: "SJSU West Parking Garage",
                key:"SJWest"
            },{
                coordiantes: {
                    latitude: 37.333088,
                    longitude: -121.880797
                },
                title: "SJSU South Parking Garage",
                key: "SJSouth"
            }]
        };

        this.coordinate = new AnimatedRegion({
            latitude: 37.339222,
            longitude: -121.880724
        });
        this.startingLoc = new AnimatedRegion({
            latitude: 37.339222,
            longitude: -121.880724,
            latitudeDelta: 0.00112,
            longitudeDelta: 0.001412
        });
        this.sjNorth = {
            loaded: false
        };
    }

    getMarkers(){
        return this.state.markers.map( markerInstance => (
            <Marker
                coordinate={{latitude: markerInstance.coordiantes.latitude, longitude: markerInstance.coordiantes.longitude}}
                //Can later pull coord, title, descrip from API when implemented
                title={markerInstance.title}
                description={markerInstance.description}
                style={styles.MapContainer.markerStyle}
                key={markerInstance.key}
                onPress = {(e) => {
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
        // console.log("MapContainer changeLocation() called");
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


    shouldComponentUpdate(nextProps, nextState){
        // console.log("shouldComponentUpdate fired");
        // console.log(nextProps);
        if(nextProps.latitude != undefined && nextProps.longitude != undefined){
            // console.log("Change Location Called");
            nextProps.resetLocData();
            this.changeLocation(nextProps.latitude, nextProps.longitude);
            return false;
        }
        else if(nextState.toUpdate == true){
            return true;
        }
        else{
            return false;
        }
    }


    render() {
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

                onPress = {() => {
                    this.props.slideDown(true);
                    this.props.blurClick(true);
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
                    {this.getMarkers()}
                </View>

            </MapView.Animated>
               
        );
    }
}

const mapStateToProps = (state) => {
    // console.log("MapContainer mapStateToProps called");
    return {
        latitude: state.searchBar.latitude,
        longitude: state.searchBar.longitude,
        query: state.searchBar.toChangeLoc
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        slideUp: (status) => {
            dispatch(slideUp(status))
        },
        slideDown: (status) => {
            dispatch(slideDown(status));
        },
        sendKey: (key) =>{
            dispatch(sendKey(key));
        },
        focusClick: (status) => {
            dispatch(focusClick(status));
        },
        blurClick: (status) => {
            dispatch(blurClick(status));
        },
        resetLocData: () => {
            dispatch(sendLocQuery(false));
            dispatch(sendLocData(undefined,undefined));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer);