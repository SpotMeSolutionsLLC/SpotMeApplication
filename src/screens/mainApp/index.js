// React dependencies
import React from "react";
import {
    Dimensions,
} from "react-native"

// Native modules
import MapView, {
    Marker
} from "react-native-maps"

// Other modules
import {
    SafeAreaView
} from "react-navigation"
import {
    connect
} from "react-redux"

// Local assets and dependencies

import {
    changeLocation,
    refreshMarkers
} from "SpotmeDetached/src/redux/actions/MapActions"

class MainApp extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount = () => {
        this.props.updateMarkers();
    }

    generateMarkers = () => {
        return this.props.markers.map((marker) => {
            return (
                <Marker
                    key = {marker.keyName}
                    coordinate = {{
                        latitude: marker.lat,
                        longitude: marker.lng
                    }}
                />
            )
        })
    }

    render() {
        return (
            <SafeAreaView>
                <MapView
                    pitchEnabled={false}
                    showsCompass={false}
                    provider="google"
                    initialRegion={this.props.startCoordinates}
                    style={{
                        height: Dimensions.get("screen").height,
                        width: Dimensions.get("screen").width,
                        top: 0,
                        left: 0,
                        zIndex: 99
                    }}
                >
                    {this.generateMarkers()}
                </MapView>
            </SafeAreaView>
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
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainApp);