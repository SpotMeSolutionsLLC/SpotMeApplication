import _ from "lodash";
import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image, Animated } from "react-native";

import { connect } from "react-redux";

import { MapView } from "expo";

import MidnightCommander from "./mapstyles/MidnightCommander";

import { changeLocation } from "../../redux/actions/LocationAction";
import { setSearchIsFocused } from "../../redux/actions/searchActions";
import { showInfo } from "../../redux/actions/slideActions";

import { getColor, getMarkers } from "../../functions";

import refreshIcon from "spotmesolutions/assets/images/refreshIcon.png"

const MapContainerStyles = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject
    },
    customMarker: {
        borderTopRightRadius: 13,
        borderTopLeftRadius: 13,
        borderBottomLeftRadius: 13,
        height: 40,
        width: 55,
        alignItems: "center",
        justifyContent: "center",

    },
    markerText: {
        fontFamily: "OpenSans",
        fontWeight: "bold",
        color: "white",
        fontSize: 20
    },
    locationStyle: {
        zIndex: 99
    },
    callOut: {
        justifyContent: "flex-start"
    }
});

class CustomMarker extends Component {
    render() {
        return (
            <View
                style={[
                    MapContainerStyles.customMarker,
                    {
                        backgroundColor: getColor(this.props.percent)
                    }
                ]}
            >
                <Text style={MapContainerStyles.markerText}>
                    {Math.trunc(this.props.percent) + "%"}
                </Text>
            </View>
        );
    }
}

//Container for the map, used to load stuff onto map such as markers
class MapContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            markers: []
        };

        this.animations = {
            refresh: new Animated.Value(0),
        }

    }

    componentDidMount() {
        this.reloadMarkers();
    }

    reloadMarkers() {
        getMarkers().then(res => {
            this.setState({
                markers: res.data
            });
        });
    }

    //Used to get information on markers from API
    generateMarkers() {
        return this.state.markers.map(markerInstance => (
            <MapView.Marker
                coordinate={{
                    latitude: markerInstance.lat,
                    longitude: markerInstance.lng
                }}
                //Can later pull coord, title, descrip from API when implemented
                // title={markerInstance.name}
                // description={markerInstance.description}
                key={markerInstance.keyName}
                onPress={e => {
                    e.stopPropagation();
                    this.props.showGarageInfo(markerInstance.keyName);
                }}
                anchor={{
                    x: 1,
                    y: 1
                }}
                calloutAnchor={{
                    x: 0,
                    y: 0
                }}
                callout
            >
                <CustomMarker
                    percent={
                        (markerInstance.current / markerInstance.max) * 100
                    }
                />
            </MapView.Marker>
        ));
    }

    render() {
        return (
            <>
                <MapView
                    pitchEnabled = {false}
                    showsCompass={false}
                    provider={"google"}
                    style={MapContainerStyles.map}
                    initialRegion={this.props.coordinates}
                    customMapStyle={MidnightCommander}
                    onPress={e => {
                        this.props.blurText();
                        this.props.hideGarageInfo();
                    }}
                >
                    {this.generateMarkers()}
                </MapView>
                <TouchableOpacity
                    onPress={() => {
                        this.reloadMarkers();
                        Animated.timing(this.animations.refresh, {
                            toValue: 180,
                            duration: 250,
                            useNativeDriver: true
                        }).start(() => {
                            this.animations.refresh.setValue(0);
                        });
                    }}
                    style={{
                        right: 30,
                        bottom: 50,
                        height: 40,
                        width: 40,
                        position: "absolute",
                    }}
                >
                    {}
                    <Animated.Image
                        source={refreshIcon}
                        resizeMode="contain"
                        style={{
                            height: "100%",
                            width: "100%",
                            transform: [
                                {
                                    rotate: this.animations.refresh.interpolate({
                                        inputRange: [0, 360],
                                        outputRange: ["0deg", "360deg"]
                                    })
                                }
                            ]
                        }}
                    />
                </TouchableOpacity>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        coordinates: state.loc.coordinates
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLocation: coordinates => {
            dispatch(changeLocation(coordinates));
        },
        blurText: () => {
            dispatch(setSearchIsFocused(false));
        },
        showGarageInfo: keyName => {
            dispatch(showInfo(true, keyName));
        },
        hideGarageInfo: () => {
            dispatch(showInfo(false));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MapContainer);
