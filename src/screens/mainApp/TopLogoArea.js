
// React base dependencies
import React from "react";
import {
    TouchableOpacity
} from "react-native";

// Redux Dependencies
import {
    connect
} from "react-redux"

// Native modules
import SVG, {
    Rect
} from "react-native-svg";

// Local dependencies
import {
    selectMarker
} from "SpotmeDetached/src/redux/actions/MapActions";


class TopLogoArea extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TouchableOpacity // Component Wrapper
                style={{
                    // overflow: "hidden",
                    zIndex: 40,

                    top: 0,
                    left: 0,

                    height: 50,
                    width: 50,

                    padding: 10,

                    backgroundColor: "transparent"
                }}

                onPress = {() => {
                    this.props.deselectMarker();
                    this.props.onPress();
                }}
            >
                <SVG
                    width = "100%"
                    height = "100%"
                >
                    <Rect
                        x = "10%"
                        y = "20%"
                        width = "80%"
                        height = "10%"
                        fill = {this.props.color}
                    />
                    <Rect
                        x = "10%"
                        y = "45%"
                        width = "80%"
                        height = "10%"
                        fill = {this.props.color}
                    />
                    <Rect
                        x = "10%"
                        y = "70%"
                        width = "80%"
                        height = "10%"
                        fill = {this.props.color}
                    />
                </SVG>

            </TouchableOpacity>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        deselectMarker: () => {
            dispatch(selectMarker(null));
        }
    }
}

export default connect(null, mapDispatchToProps)(TopLogoArea);