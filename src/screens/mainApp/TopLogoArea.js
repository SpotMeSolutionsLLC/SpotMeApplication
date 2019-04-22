
// React base dependencies
import React from "react";
import {
    View,
    Dimensions
} from "react-native";

// Native modules
import SVG, {
    Circle
} from "react-native-svg";
import SplashScreen from "react-native-splash-screen";

// Local dependencies
import {
    MAIN_COLORS
} from "SpotmeDetached/src/helpers";

import IconSVG from "SpotmeDetached/assets/Icon.svg";


class TopLogoArea extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View // Component Wrapper
                style={{
                    // overflow: "hidden",
                    zIndex: 30,

                    position: "absolute",
                    top: 0,

                    height: 75,
                    width: Dimensions.get("window").width,

                }}
            >
                <View
                    style = {{
                        zIndex: 10
                    }}
                >
                    <SVG
                        width="100%"
                        height="100%"
                    >
                        <Circle
                            cx={Dimensions.get("window").width / 2}
                            cy={-(Dimensions.get("window").width * 2) + 75}
                            r={Dimensions.get("window").width * 2}
                            fill={MAIN_COLORS.BASE}
                        />
                    </SVG>
                </View>

                <View
                    style={{
                        zIndex: 99,

                        position: "absolute",

                        width: "100%",
                        height: "100%",

                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <IconSVG
                        width={60}
                        height={60}
                    />
                </View>

            </View>
        )
    }
}

export default TopLogoArea;