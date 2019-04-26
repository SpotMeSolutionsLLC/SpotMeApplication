// React base dependencies
import React from "react";
import {
    View,
    Text,
    SafeAreaView,
    TouchableWithoutFeedback,
    TouchableOpacity,
    StyleSheet
} from "react-native";

// Native modules
import AsyncStorage from "@react-native-community/async-storage";

// Redux dependencies
import {
    connect
} from "react-redux";

// Local dependencies
import TopLogoArea from "../TopLogoArea"

import {
    MARKER_TYPES
} from "SpotmeDetached/src/helpers/settingHelpers.js"
import {
    setSettings
} from "SpotmeDetached/src/redux/actions/SettingActions"
import {
    MAIN_COLORS
} from "SpotmeDetached/src/helpers"

class Settings extends React.Component {
    constructor(props) {
        super(props);
    }

    _generateMarkerSettings = () => { // This is bad, however it's done so navigation through this massive file is easier
        return (
            <View // Marker Settings
                style={{
                    width: "100%"
                }}
            >
                <Text
                    style={styles.SettingsSectionLabelText}
                >
                    Marker Type
                </Text>
                <View // Marker Type Selection
                    style={{
                        flexDirection: "row",
                        width: "100%",
                        height: 50,
                    }}
                >
                    <View // Checkmark Type Wrapper
                        style={styles.MarkerContainer}
                    >
                        <TouchableWithoutFeedback // Checkmark Type Touch Detector
                            onPress={() => {
                                this.props.setSettings({
                                    markerType: MARKER_TYPES.CHECKMARKS
                                })
                            }}
                        >
                            <View // Added so text can be aligned in center with IOS compatibility
                                style={[styles.MarkerSelectionTextWrapper, {
                                    backgroundColor: (this.props.currentSettings.markerType == MARKER_TYPES.CHECKMARKS) ? MAIN_COLORS.BASE : "white"
                                }]}
                            >
                                <Text
                                    style={[styles.MarkerSelectionText, {
                                        color: (this.props.currentSettings.markerType == MARKER_TYPES.CHECKMARKS) ? "white" : MAIN_COLORS.BASE,
                                    }]}
                                >
                                    Checkmark
                                </Text>
                            </View>

                        </TouchableWithoutFeedback>
                    </View>

                    <View // Percentage Type Wrapper
                        style={styles.MarkerContainer}
                    >
                        <TouchableWithoutFeedback // Percentage Type Touch Detector
                            onPress={() => {
                                this.props.setSettings({
                                    markerType: MARKER_TYPES.PERCENTAGES
                                })
                            }}
                        >
                            <View // Added so text can be aligned in center with IOS compatibility
                                style={[styles.MarkerSelectionTextWrapper, {
                                    backgroundColor: (this.props.currentSettings.markerType == MARKER_TYPES.PERCENTAGES) ? MAIN_COLORS.BASE : "white"
                                }]}
                            >
                                <Text
                                    style={[styles.MarkerSelectionText, {
                                        color: (this.props.currentSettings.markerType == MARKER_TYPES.PERCENTAGES) ? "white" : MAIN_COLORS.BASE,
                                    }]}
                                >
                                    Percentage
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>

                </View>
            </View>
        )
    }

    _generateStorageReset = () => {
        return (
            <View
                style={{
                    width: "100%"
                }}
            >
                <Text
                    style={styles.SettingsSectionLabelText}
                >
                    Other Options
                </Text>

                <View // Reset Storage Cache
                    style={{
                        height: 50,
                        width: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: 10,
                    }}
                >
                    <TouchableOpacity
                        style={{
                            backgroundColor: MAIN_COLORS.BASE,

                            height: "100%",
                            width: "60%",

                            justifyContent: "center",
                            alignItems: "center",

                            overflow: "hidden",
                            borderRadius: 10,
                        }}
                        onPress={() => {
                            AsyncStorage.clear();
                        }}
                    >
                        <Text
                            style={{
                                textAlign: "center",
                                fontFamily: "Alleyn",
                                width: "100%",
                                color: "white"
                            }}
                        >
                            Clear all stored data
                        </Text>
                    </TouchableOpacity>
                </View>

            </View>
        );
    }

    render() {
        return (
            <SafeAreaView
                style={{
                    flex: 1,
                }}
            >
                <View // Wrapper so that the abosolutely positioned "TopLogoArea" will work on both Android and IOS
                    style={{
                        height: "100%",
                        width: "100%",
                        zIndex: 40
                    }}
                >
                    <View // Header
                        style={{
                            width: "100%",

                            // This part makes it so that the statusbar area will be the same color as the header, works on iPhoneX
                            height: 100,
                            paddingTop: 50,
                            transform: [
                                {
                                    translateY: -50
                                }
                            ],

                            backgroundColor: MAIN_COLORS.BASE,

                            justifyContent: "center",
                            alignItems: "center",

                            position: "absolute",
                            top: 0,

                            zIndex: 5
                        }}
                    >
                        <Text
                            style={{
                                fontFamily: "Alleyn",
                                fontSize: 18,
                                color: "white",
                                letterSpacing: 1
                            }}
                        >
                            SETTINGS
                        </Text>
                    </View>
                    <View // Wrapper so menu button is positioned correctly on IOS
                        style = {{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            zIndex: 70
                        }}
                    >
                        <TopLogoArea
                            onPress={() => {
                                this.props.navigation.openDrawer();
                            }}
                            color="white"
                        />
                    </View>


                    <View // Settings Body
                        style={{
                            marginTop: 50, // Spacing out the header, also doesn't apply background color in margin zone
                            padding: 10,
                            width: "100%",
                            height: "100%",

                            // This must be set to counteract SafeAreaView's background color of blue
                            backgroundColor: "white"
                        }}
                    >
                        {this._generateMarkerSettings()}
                        {this._generateStorageReset()}
                    </View>
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    SettingsSectionLabelText: {
        width: "100%",
        fontFamily: "Alleyn",
        textAlign: "center",
        color: MAIN_COLORS.BASE,
        padding: 8
    },
    MarkerContainer: {
        width: "50%",
        height: "100%",

        padding: 10
    },
    MarkerSelectionTextWrapper: {
        height: "100%",
        width: "100%",

        justifyContent: "center",
        alignItems: "center",

        borderRadius: 10,
        overflow: "hidden",
    },
    MarkerSelectionText: {
        textAlign: "center",

        width: "100%",

        fontFamily: "Alleyn",
    }
})

const mapStateToProps = state => {
    return {
        currentSettings: state.Settings
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setSettings: (newSettings) => {
            dispatch(setSettings(newSettings));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);