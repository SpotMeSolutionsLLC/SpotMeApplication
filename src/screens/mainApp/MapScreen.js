// React dependencies
import React from "react";
import {
    StyleSheet
} from "react-native"

// Native modules
import MapView, {
    Marker
} from "react-native-maps"
import SplashScreen from "react-native-splash-screen"

// Other modules
import {
    connect
} from "react-redux"

// Local assets and dependencies

import CustomMarker from "./CustomMarker"

import {
    changeLocation,
    refreshMarkers,
    selectMarker
} from "SpotmeDetached/src/redux/actions/MapActions"

import {
    getColor
} from "SpotmeDetached/src/helpers"

const INITIAL_CAMERA = {
    center:{
        latitude: 37.330318358466485,
        longitude: -121.88207309693097
    },
    heading: 0,
    pitch: 0,
    zoom: 14.386643409729004,
    altitude: 14.22858715057373
}

class MapScreen extends React.Component {
    constructor(props) {
        super(props);
        this.mapRef = null;
    }

    componentDidMount = () => {
        this.props.updateMarkers();
    }

    test = () => {
        console.log(this.mapRef.getCamera());
    }

    generateMarkers = () => {
        return this.props.markers.map((marker) => {
            return (
                <Marker
                    identifier = {marker.keyName}
                    key={marker.keyName}
                    coordinate={{
                        latitude: marker.lat,
                        longitude: marker.lng
                    }}
                    onPress={(e) => {
                        this.props.selectMarker(marker);
                        this.mapRef.animateCamera({
                            center: {
                                latitude: marker.lat,
                                longitude: marker.lng
                            },
                            zoom: 16
                        })
                        e.stopPropagation();
                    }}
                >
                    <CustomMarker
                        percentage = {Math.floor(100 * marker.current / marker.max)}
                        color = {getColor(marker.current / marker.max)}
                        keyName = {marker.keyName}
                    />
                </Marker>
            )
        })
    }

    render() {
        return (
            <MapView
                ref={(instance) => {
                    this.mapRef = instance;
                }}
                pitchEnabled={false}
                moveOnMarkerPress={false}
                showsCompass={false}
                toolbarEnabled={false}
                provider="google"
                initialCamera={INITIAL_CAMERA}
                style={{
                    ...StyleSheet.absoluteFill,
                    flex: 1,
                    zIndex: 10,

                }}
                onPress={() => {
                    this.props.selectMarker(null);
                }}
                onMapReady = {() => {
                    SplashScreen.hide();
                }}
            >
                {this.generateMarkers()}
            </MapView>
        )
    }
}

const mapStateToProps = state => {
    return {
        startCoordinates: state.MapReducer.coordinates,
        markers: state.MapReducer.markers
    }
}

const mapDispatchToProps = dispatch => {
    return {
        changeLocation: coordinates => {
            dispatch(changeLocation(coordinates));
        },
        updateMarkers: async () => {
            dispatch(await refreshMarkers());
        },
        selectMarker: (marker) => {
            dispatch(selectMarker(marker))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MapScreen);