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

const CONFIG = {
    height: 60,
    width: 60,
    fontSize: 24
}

class CustomMarker extends React.Component{
    constructor(props){
        super(props);
        this.animations = {
            scale: new Animated.Value(0.8),
            positionY: new Animated.Value(CONFIG.height * 0.1)
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
                        height: "80%",
                        width: "100%",
                        borderRadius: 10,
                        backgroundColor: this.props.color,
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                >
                    <Text
                        style = {{
                            color: "white",
                            fontSize: CONFIG.fontSize,
                            fontFamily: "Alleyn"
                        }}
                    >
                        {this.props.text}
                    </Text>
                </View>

                {/* This is the triangle component underneath the marker info body */}
                <View
                    style = {{
                        height: "20%",
                        width: 20,
                        borderStyle: "solid",
                        borderLeftWidth: 10,
                        borderRightWidth: 10,
                        borderTopWidth: CONFIG.height * .2,
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
        selectedMarker: state.MapReducer.selectedMarker
    }
}

export default connect(mapStateToProps, null)(CustomMarker);