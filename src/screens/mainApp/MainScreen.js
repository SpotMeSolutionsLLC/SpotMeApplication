
// React base dependencies
import React from "react";
import {
    View,
    SafeAreaView
} from "react-native";

// Local assets and dependencies
import {
    MAIN_COLORS
} from "SpotmeDetached/src/helpers"

import TopLogoArea from "./TopLogoArea"
import MapScreen from "./MapScreen";
import InfoPopup from "./InfoPopupContainer";
import RefreshButton from "./RefreshButton";

class MainScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <SafeAreaView
                style={{
                    flex: 1,
                }}
            >
                <MapScreen />


                <View // Hacky way to enable react-navigation drag in from left. MUST COME BEFORE MENU BUTTON
                    style={{
                        zIndex: 30,

                        position: "absolute",
                        left: 0,
                        top: 0,

                        height: "100%",
                        width: 20
                    }}
                />

                <View // This is added so the menu button is properly positioned. MUST COME AFTER DRAWER DRAG-IN AREA
                    style={{
                        zIndex: 40,
                        height: "100%",
                        width: "100%"
                    }}
                    pointerEvents="box-none"
                >
                    <TopLogoArea
                        onPress={() => {
                            this.props.navigation.openDrawer();
                        }}
                        color={MAIN_COLORS.BASE}
                    />
                    <RefreshButton />
                </View>

                <InfoPopup />
            </SafeAreaView>
        )
    }
}

export default MainScreen;