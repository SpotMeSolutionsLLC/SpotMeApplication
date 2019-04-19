// React base dependencies
import React from "react";
import {
    View,
    Animated,
    Text,
    Dimensions
} from "react-native"

// Native modules
import {
    PanGestureHandler
} from "react-native-gesture-handler"

// Other modules
import {
    connect
} from "react-redux"

class InfoPopup extends React.Component {
    constructor(props) {
        super(props);
        this.animations = {
            popupTranslationY: new Animated.Value(300)
        }
    }

    componentDidUpdate = () => {
        if (this.props.selectedMarker == null) {
            Animated.timing(this.animations.popupTranslationY, {
                toValue: 300,
                duration: 250,
                useNativeDriver: true
            }).start();
        }
        else {
            Animated.timing(this.animations.popupTranslationY, {
                toValue: 0,
                duration: 250,
                useNativeDriver: true
            }).start();
        }
    }

    render() {
        return (
            <Animated.View
                style={{
                    width: "100%",
                    height: 300,
                    position: "absolute",
                    bottom: 0,
                    backgroundColor: "blue",
                    transform: [
                        {
                            translateY: this.animations.popupTranslationY
                        }
                    ],
                    zIndex: 20
                }}
            >
                <PanGestureHandler
                    onGestureEvent={(event) => {
                        console.log(event.nativeEvent.y);
                        this.animations.popupTranslationY.setValue(event.nativeEvent.absoluteY - Dimensions.get("window").height + 300);
                    }}
                >
                    <View
                        style = {{
                            backgroundColor: "red",
                            width: "100%",
                            height: 20
                        }}
                    />
                </PanGestureHandler>
                <Text>
                    {this.props.selectedMarker && this.props.selectedMarker.current}
                </Text>
            </Animated.View>
        )
    }
}

const mapStateToProps = state => {
    return {
        selectedMarker: state.MapReducer.selectedMarker
    }
}


export default connect(mapStateToProps, null)(InfoPopup);