import React, { Component } from 'react';
import {
    View,
    Image,
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity
} from 'react-native';
import MapContainer from './MapContainer';
import GarInfoContainer from './GarageInfoContainer';

const MapScreenStyles = StyleSheet.create({

    container: {
        height: Dimensions.get("screen").height,
        width: Dimensions.get("screen").width,
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
    },
    logoArea: {
        top: 0,
        height: 60,
        width: "100%",
        backgroundColor: "#00b7ff",
    },
    logoTextWrapper: {
        height: 60,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
    },
    logoText: {
        fontFamily: "OpenSans",
        fontSize: 30,
        fontWeight: "900",
        color: "white"
    },
    logoText2: {
        fontFamily: "OpenSans",
        fontSize: 30,
        fontWeight: "100",
        color: "white"
    },
    menuButton: {
        top: 0,
        left: 0,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: "center",
        position: 'absolute',
        zIndex: 99,
        width: 60,
        height: 60,
    },
    menuButtonImage: {
        height: 30,
        width: 30,
    }
})

//Overall map screen, used to display map onto application
class MapScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            garageList: null,
            garageListLoaded: false,
            mapRef: null
        }
    }

    //Displays navigation menu to open when user swipes right

    //Renders the map, markers, garage info, etc.
    //Styles to make sure the map isnt messed up
    render() {
        return (
            <View style={MapScreenStyles.container}>
                <View style={MapScreenStyles.logoArea}>
                    <View style={MapScreenStyles.logoTextWrapper}>
                        <Text style={MapScreenStyles.logoText}>
                            {"SpotMe"}
                        </Text>
                        <Text style={MapScreenStyles.logoText2}>
                            {" solutions"}
                        </Text>
                    </View>
                </View>

                <View style={{
                    height: Dimensions.get("window").height - 60,
                    width: "100%",
                }}>
                    <MapContainer
                        ref={instance => {
                            if (this.state.mapRef == null) {
                                this.setState({
                                    mapRef: instance
                                });
                            }
                        }}
                    />
                </View>

                <GarInfoContainer />

            </View>
        );
    }
}

export default MapScreen;