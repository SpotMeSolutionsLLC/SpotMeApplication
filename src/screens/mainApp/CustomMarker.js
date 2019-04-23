// React base dependencies
import React from "react";
import {
    View,
    Text,
    Animated
} from "react-native";

// Other modules
import {
    connect
} from "react-redux"

// Local modules
import {
    MARKER_TYPES
} from "SpotmeDetached/src/helpers/settingHelpers"

const CONFIG = {
    height: 60,
    width: 60,
    fontSize: 20
}

class CustomMarker extends React.Component{
    constructor(props){
        super(props);
        this.animations = {
            scale: new Animated.Value(0.8),
            positionY: new Animated.Value(CONFIG.height * 0.1)
        }
    }

    getMarkerInnerIcon = () => { // Returns markers depending on settings
        if(this.props.currentSettings.markerType == MARKER_TYPES.CHECKMARKS){
            return (this.props.percentage < 50) ? "✓" : "X";
        }
        else{
            return this.props.percentage;
        }
    }

    _getFontSize = () => { // Jank solution to get correct marker formatting depending on settings
        if(this.props.currentSettings.markerType == MARKER_TYPES.CHECKMARKS){
            return (this.props.percentage < 50) ? CONFIG.fontSize + 10 : CONFIG.fontSize;
        }
        else{
            return CONFIG.fontSize;
        }
    }

    componentDidUpdate = () => {
        if(this.props.selectedMarker && this.props.selectedMarker.keyName == this.props.keyName){
            Animated.parallel([
                Animated.timing(this.animations.scale, {
                    toValue: 1,
                    useNativeDriver: true,
                    duration: 200
                }),
                Animated.timing(this.animations.positionY, {
                    toValue: 0,
                    useNativeDriver: true,
                    duration: 200
                })
            ]).start();
        }
        else {
            Animated.parallel([
                Animated.timing(this.animations.scale, {
                    toValue: 0.8,
                    useNativeDriver: true,
                    duration: 200
                }),
                Animated.timing(this.animations.positionY, {
                    toValue: CONFIG.height * 0.1,
                    useNativeDriver: true,
                    duration: 200
                })
            ]).start();
        }
    }

    render(){
        return(
            <Animated.View
                style = {{
                    overflow: "visible",
                    height: CONFIG.height,
                    width: CONFIG.width,
                    backgroundColor: "transparent",
                    alignItems: "center",
                    transform: [
                        {
                            scaleX: this.animations.scale
                        },
                        {
                            scaleY: this.animations.scale
                        },
                        {
                            translateY: this.animations.positionY
                        }
                    ]
                }}
            >
                <View
                    style = {{
                        top: 5,

                        height: "80%",
                        width: "80%",

                        borderRadius: 40,

                        backgroundColor: this.props.color,

                        alignItems: "center",
                        justifyContent: "center"
                    }}
                >
                    <Text // Replace Jank solution with SVG files later
                        style = {{
                            color: "white",
                            fontSize: this._getFontSize(),
                            fontFamily: (this.props.percentage < 50 && this.props.currentSettings.markerType == MARKER_TYPES.CHECKMARKS) ? null : "Alleyn",
                            fontWeight: "bold"
                        }}
                    >
                        {this.getMarkerInnerIcon()}
                    </Text>
                </View>

                {/* This is the triangle component underneath the marker info body */}
                <View
                    style = {{
                        height: "20%",
                        width: 20,
                        borderStyle: "solid",
                        borderLeftWidth: 15,
                        borderRightWidth: 15,
                        borderTopWidth: CONFIG.height * 0.2,
                        borderLeftColor: "transparent",
                        borderRightColor: "transparent",
                        borderTopColor: this.props.color,
                        backgroundColor: "transparent"
                    }}
                />
            </Animated.View>
        )
    }
}

const mapStateToProps = state => {
    return {
        selectedMarker: state.MapReducer.selectedMarker,
        currentSettings: state.Settings
    }
}

export default connect(mapStateToProps, null)(CustomMarker);