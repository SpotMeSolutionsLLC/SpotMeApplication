
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
            <SafeAreaView>
                <MapScreen />

                <View
                    style = {{
                        height: Dimensions.get("window").height,
                        width: Dimensions.get("window").width,
                    }}
                >
                    <InfoPopup />
                </View>

            </SafeAreaView>
        )
    }
}

export default MainScreen;