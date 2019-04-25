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
            buttonY: new Animated.Value(0),
            buttonRotation: new Animated.Value(0),
        }
    }

    componentWillReceiveProps = (newProps) => {
        if (newProps.selectedMarker == null) { // Corresponds to action "deselectMarker"
            Animated.timing(this.animations.buttonY, {
                toValue: 0,
                useNativeDriver: true,
                duration: 250
            }).start();
        }
        else {
            Animated.timing(this.animations.buttonY, {
                toValue: -200,
                useNativeDriver: true,
                duration: 250
            }).start();
        }
    }

    render(){
        return(
            <Animated.View
                style = {{
                    position: "absolute",
                    right: 20,
                    bottom: 20,
                    transform: [
                        {
                            translateY: this.animations.buttonY
                        },
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