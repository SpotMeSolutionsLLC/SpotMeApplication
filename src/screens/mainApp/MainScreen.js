
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

                <View // This is added so the menu button is properly positioned
                    style = {{
                        zIndex: 40,
                        position: "absolute",
                        left: 0,
                        top: 0,
                    }}
                >
                    <TopLogoArea
                        onPress={() => {
                            this.props.navigation.openDrawer();
                        }}
                        color={MAIN_COLORS.BASE}
                    />
                </View>

                <InfoPopup />
            </SafeAreaView>
        )
    }
}

export default MainScreen;