// React base dependencies
import React from "react";
import {
    View,
    Image,
    TouchableOpacity,
    Animated
} from "react-native";

// Javascript dependencies
import {
    connect
} from "react-redux";

// Local dependencies
import {
    refreshMarkers
} from "SpotmeDetached/src/redux/actions/MapActions.js"

import RefreshIcon from "SpotmeDetached/assets/refreshIcon.png";

class RefreshButton extends React.Component{
    constructor(props){
        super(props);
        this.animations = {
            buttonRotation: new Animated.Value(0),
        }
    }

    render(){
        return(
            <Animated.View
                style = {{
                    // Positioning on Top right corner of screen
                    position: "absolute",
                    zIndex: 50,
                    right: 10,
                    top: 10,
                    transform: [
                        {
                            rotate: this.animations.buttonRotation.interpolate({
                                inputRange: [0, 180],
                                outputRange: ["0deg", "180deg"]
                            })
                        }
                    ]
                }}
            >
                <TouchableOpacity
                    onPress = {(e) => {
                        Animated.timing(this.animations.buttonRotation,{
                            toValue: 180,
                            useNativeDriver: true,
                            duration: 200
                        }).start(() => {
                            this.animations.buttonRotation.setValue(0);
                        });
                        this.props.Reload_All_Markers(this.props.selectedMarker);
                        e.stopPropagation();
                    }}
                >
                    <Image
                        style = {{
                            width: 40,
                            height: 40
                        }}
                        resizeMode = "contain"
                        source = {RefreshIcon}
                    />
                </TouchableOpacity>
            </Animated.View>
        )
    }
}

const mapStateToProps = state => {
    return {
        selectedMarker: state.MapReducer.selectedMarker
    }
}

const mapDispatchToProps = dispatch => {
    return {
        Reload_All_Markers: async (currentSelected) => {
            dispatch(await refreshMarkers(currentSelected));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RefreshButton);