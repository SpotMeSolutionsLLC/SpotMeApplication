import React, { Component } from 'react';
import {
    View,
    Image,
    Dimensions,
    StyleSheet,
} from 'react-native';

import {
    SafeAreaView
} from "react-navigation"

import {
    Constants
} from "expo";

import MapContainer from './MapContainer';
import GarInfoContainer from './GarageInfoContainer';
import Logo from "spotmesolutions/assets/images/SpotMeLogo.png"

const MapScreenStyles = StyleSheet.create({

    container: {
        paddingTop: Constants.statusBarHeight,
        height: Dimensions.get("window").height,
        width: Dimensions.get("window").width,
        flex: 1,
        // justifyContent: 'center',
        position: "relative",
        alignItems: 'center',
    },
    logoArea: {
        height: 60,
        width: "100%",
        position: "relative",
        alignItems: "center",
        justifyContent: "center"
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
        console.log(Constants.statusBarHeight);
    }

    //Displays navigation menu to open when user swipes right

    //Renders the map, markers, garage info, etc.
    //Styles to make sure the map isnt messed up
    render() {
        return (
            <SafeAreaView style={MapScreenStyles.container}>

                <View style={{
                    bottom: 0,
                    height: Dimensions.get("window").height,
                    width: Dimensions.get("window").width,
                    position: "absolute"
                }}>
                    <MapContainer/>
                </View>

                <View style={MapScreenStyles.logoArea}>
                    <View
                        style={{
                            height: Dimensions.get("window").width * 2,
                            width: Dimensions.get("window").width * 2,
                            borderBottomLeftRadius: Dimensions.get("window").width * 2,
                            borderBottomRightRadius: Dimensions.get("window").width * 2,
                            backgroundColor: "#054CE4",
                            position: "absolute",
                            overflow: "hidden",
                            bottom: 0
                        }}
                    />
                    <Image
                        source = {Logo}
                        resizeMode = "contain"
                        style = {{
                            height: 50,
                            width: 50
                        }}
                    />
                </View>

                <GarInfoContainer />

            </SafeAreaView>
        );
    }
}

export default MapScreen;