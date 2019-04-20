// React dependencies
import React from "react";
import {
    Dimensions,
    StyleSheet
} from "react-native"

// Native modules
import MapView, {
    Marker
} from "react-native-maps"

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

class MapScreen extends React.Component {
    constructor(props) {
        super(props);
        this.mapRef = null;
    }

    componentDidMount = () => {
        this.props.updateMarkers();
    }

    generateMarkers = () => {
        return this.props.markers.map((marker) => {
            return (
                <Marker
                    key={marker.keyName}
                    coordinate={{
                        latitude: marker.lat,
                        longitude: marker.lng
                    }}
                    onPress={() => {
                        this.props.selectMarker(marker);
                        this.mapRef.animateCamera({
                            center: {
                                latitude: marker.lat,
                                longitude: marker.lng
                            },
                            zoom: 16
                        })
                    }}
                >
                    <CustomMarker
                        text = {Math.floor(100 * marker.current / marker.max)}
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
                showsCompass={false}
                provider="google"
                initialRegion={this.props.startCoordinates}
                style={{
                    height: "100%",
                    width: "100%",
                    top: 0,
                    left: 0,
                    zIndex: 10
                }}
                onPress={() => {
                    this.props.selectMarker(null);
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