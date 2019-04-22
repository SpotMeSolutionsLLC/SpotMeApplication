
// React base dependencies
import React from "react";
import {
    Dimensions,
    View
} from "react-native";

// Other modules

// Local assets and dependencies
import TopLogoArea from "./TopLogoArea"
import MapScreen from "./MapScreen";
import InfoPopup from "./InfoPopupContainer";

class MainScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View
                style={{
                    height: Dimensions.get("screen").height,
                    width: Dimensions.get("screen").width,
                    top: 0
                }}
            >
                <MapScreen />

                <TopLogoArea/>

                <InfoPopup />

            </View>
        )
    }
}

export default MainScreen;