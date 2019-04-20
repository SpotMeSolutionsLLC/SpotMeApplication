
// React base dependencies
import React from "react";
import {
    Dimensions,
    View
} from "react-native";

// Other modules
import {
    SafeAreaView
} from "react-navigation"

// Local assets and dependencies
import MapScreen from "./MapScreen";
import InfoPopup from "./InfoPopup";

class MainScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View
                style = {{
                    height: Dimensions.get("screen").height,
                    width: Dimensions.get("screen").width,
                    top: 0
                }}
            >
                <MapScreen />

                <View
                    style = {{
                        height: Dimensions.get("screen").height,
                        width: Dimensions.get("screen").width,
                        position: "absolute",
                        top: 0
                    }}
                >
                    <InfoPopup />
                </View>

            </View>
        )
    }
}

export default MainScreen;