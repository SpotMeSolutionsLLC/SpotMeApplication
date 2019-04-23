// React base Dependencies
import React from "react";
import {
    View,
    Platform,
    StatusBar,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image
} from "react-native"


// Local dependencies
import MainScreen from "./MainScreen";
import Settings from "./MenuScreens/Settings";

import MapIcon from "SpotmeDetached/assets/MapIcon.png";
import SettingsIcon from "SpotmeDetached/assets/SettingsIcon.png";

import {
    MAIN_COLORS
} from "SpotmeDetached/src/helpers"

// React Navigation dependencies
import {
    createDrawerNavigator,
    createAppContainer,
    NavigationActions
} from "react-navigation";

const CONFIG = {
    ICON_SIZE: 30
}

const styles = StyleSheet.create({
    ScreenOption:{
        paddingLeft: 20,
        height: 40,
        justifyContent: "center",
    }
})

class DrawerComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentScreen: "MainScreen"
        }
        this.screens = [
            {
                keyName: "MainScreen",
                displayName: "Map",
                icon: MapIcon
            },
            {
                keyName: "Settings",
                displayName: "Settings",
                icon: SettingsIcon
            }
        ]
    }

    generateScreenOptions = () => {
        return this.screens.map((value) => {
            return (
                <View
                    key = {value.keyName}
                    style = {[styles.ScreenOption, {
                        backgroundColor: (this.state.currentScreen == value.keyName) ? "hsl(0, 0%, 90%)" : "white",
                    }]}
                >
                    <TouchableOpacity
                        onPress = {() => {
                            this.props.navigation.navigate(value.keyName);
                            this.props.navigation.closeDrawer();
                            this.setState({
                                currentScreen: value.keyName
                            })
                        }}
                        style = {{
                            height: "100%",
                            width: "100%",

                            justifyContent: "flex-start",
                            alignItems: "center",
                            flexDirection: "row",
                        }}
                    >
                        <Image
                            style = {{
                                height: CONFIG.ICON_SIZE,
                                width: CONFIG.ICON_SIZE
                            }}
                            resizeMode = "contain"
                            source = {value.icon}
                        />
                        <Text
                            style = {{
                                paddingLeft: 20,
                                letterSpacing: 1,
                                fontFamily: "Alleyn"
                            }}
                        >
                            {value.displayName.toUpperCase()}
                        </Text>
                    </TouchableOpacity>
                </View>
            )
        });
    }

    render() {
        return (
            <View // Root Container
                style={{
                    // If on IOS, pads by 20px (default amount), if on android, pads by statusbar height
                    borderTopWidth: (Platform.OS == "android") ? parseInt(StatusBar.currentHeight) : 20,
                    borderColor: MAIN_COLORS.BASE,

                    height: "100%",
                    width: "100%",
                }}
            >
                <View // Header
                    style={{
                        alignItems: "center",
                        justifyContent: "center",

                        backgroundColor: MAIN_COLORS.BASE,

                        height: 100,

                        padding: 20,

                        flexDirection: "column",
                    }}
                >
                    <Text
                        style={{
                            width: "100%",
                            textAlign: "left",
                            fontFamily: "Alleyn",
                            color: "white",
                            fontSize: 30
                        }}
                    >
                        spotme
                    </Text>
                    <Text
                        style={{
                            width: "100%",
                            textAlign: "left",
                            fontFamily: "Alleyn",
                            color: "white",
                            fontSize: 18,
                            transform: [
                                {
                                    translateY: -7
                                },
                                {
                                    translateX: 5
                                }
                            ]
                        }}
                    >
                        solutions
                    </Text>
                </View>
                <View // Screen Selection Container
                    style={{
                        width: "100%",

                        justifyContent: "center",
                    }}
                >
                    {this.generateScreenOptions()}
                </View>
            </View>
        )
    }
}

const MainDrawerNav = createDrawerNavigator({
    MainScreen,
    Settings
},{
    contentComponent: DrawerComponent
});

export default createAppContainer(MainDrawerNav);