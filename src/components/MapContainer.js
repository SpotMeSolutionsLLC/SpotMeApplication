import React, {Component} from "react";
import {
    StyleSheet,
    View,
    Dimensions
} from "react-native";

import MapView, {PROVIDER_GOOGLE, Marker, AnimatedRegion, Animated} from "react-native-maps";

import carMarker from '../images/car.png';
import banana from '../images/banana.png';
import spotMarker from '../images/spotmarker.png';


class MapContainer extends Component{
    constructor(props){
        super(props);
        this.state = {
        };
        this.coordinate = new AnimatedRegion({
            latitude: 37.339222,
            longitude: -121.880724,
        });
        this.startingLoc = new AnimatedRegion({
            latitude: 37.339222,
            longitude: -121.880724,
            latitudeDelta: 0.00112,
            longitudeDelta: 0.001412
        });
    }

    changeLocation(lat,lng){
        console.log("MapContainer changeLocation() called");
        const duration = 3000;
        // new AnimatedRegion({
        //     latitude: lat,
        //     longitude: lng,
        //     latitudeDelta: 0.0312,
        //     longitudeDelta: 0.03412,
        // });
        // this.mapRef.animateToRegion(new AnimatedRegion({
        //     latitude: lat,
        //     longitude: lng,
        //     latitudeDelta: 0.0312,
        //     longitudeDelta: 0.03412,
        // }), 500);
        this.startingLoc.timing({
            latitude: lat,
            longitude: lng,
            latitudeDelta: 1,
            longitudeDelta: 1
        }, duration).start();
        this.coordinate.timing({
            latitude: lat,
            longitude: lng,
        }, duration).start();
    }


    render(){
        return(
            <MapView.Animated
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                //props error on region, expected number but got object
                //error doesnt have big effect/matter but gives a warning
                region={this.startingLoc}
                //   customMapStyle={MidnightCommander}
                ref={(instance) => {
                    this.mapRef = instance;
                }}
            >
                <View >
                    <Marker.Animated 
                        coordinate={this.coordinate}
                        //Description is not being displayed
                        //description={this.state.description}
                        description={'Your Destination'}
                        image={banana}
                        style={styles.markerStyle}
                        ref={marker => {
                            this.marker = marker;
                        }}
                    />
                    <Marker
                        coordinate={{ latitude: 37.339222, longitude: -121.880724, }}
                        //Can later pull coord, title, descrip from API when implemented
                        title={'SJSU North Parking Garage'}
                        description={'Spots Filled: 977/1490'}
                        image={spotMarker}
                        style={styles.markerStyle}
                    />
                    <Marker
                        coordinate={{ latitude: 37.332303, longitude: -121.882986, }}
                        title={'SJSU West Parking Garage'}
                        description={'Spots Filled: 827/1135'}
                        image={spotMarker}
                        style={styles.markerStyle}
                    />
                    <Marker
                        coordinate={{ latitude: 37.333088, longitude: -121.880797, }}
                        title={'SJSU South Parking Garage'}
                        description={'Spots Filled: 1377/1500'}
                        image={spotMarker}
                        style={styles.markerStyle}
                    />
                </View> 
              
            </MapView.Animated>
        );
    }
}

const styles = {
    map:{
        ...StyleSheet.absoluteFillObject,
        // flex: 1,
        // width: Dimensions.get('window').width,
        // height: Dimensions.get('window').height
    },
    markerStyle: {
        zIndex: 98
    },
    locationStyle: {
        zIndex: 99
    },
}

export default MapContainer;