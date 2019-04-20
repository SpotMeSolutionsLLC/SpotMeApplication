// React base dependencies
import React from "react";
import {
    View,
    Animated,
    Text,
    Dimensions,
    StatusBar
} from "react-native"

// Native modules
import {
    PanGestureHandler,
    State
} from "react-native-gesture-handler"

// Other modules
import {
    connect
} from "react-redux"

// Local modules
import {
    selectMarker
} from "SpotmeDetached/src/redux/actions/MapActions";

class InfoPopup extends React.Component {
    constructor(props) {
        super(props);
        this.animations = {
            popupTranslationY: new Animated.Value(Dimensions.get("window").height)
        }
    }

    slideUp = (callback = null) => {
        Animated.timing(this.animations.popupTranslationY, {
            toValue: Dimensions.get("window").height - 300,
            useNativeDriver: true,
            duration: 250
        }).start((callback) ? callback() : null);
    }

    slideDown = (callback = null) => {
        Animated.timing(this.animations.popupTranslationY, {
            toValue: Dimensions.get("window").height,
            useNativeDriver: true,
            duration: 250
        }).start((callback) ? callback() : null);
    }
    

    componentDidUpdate = () => {
        if (this.props.selectedMarker == null) {
            this.slideDown();
        }
        else {
            this.slideUp();
        }
    }

    render() {
        return (
            <Animated.View
                style={{
                    width: "100%",
                    height: Dimensions.get("window").height,
                    position: "absolute",
                    top: 0,
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
                    onGestureEvent={({nativeEvent}) => {
                        // Gets position relative to the display, taking into consideration the statusbar
                        let realPosition = nativeEvent.absoluteY - StatusBar.currentHeight;

                        // Doesn't allow the menu to be dragged up past a certain point
                        if(realPosition > Dimensions.get("window").height - 450)
                            this.animations.popupTranslationY.setValue(realPosition);
                    }}
                    onHandlerStateChange = {({nativeEvent}) => {
                        // Gets position relative to the display, taking into consideration the statusbar
                        let realPosition = nativeEvent.absoluteY - StatusBar.currentHeight;

                        // When you release tap
                        if(nativeEvent.state == State.END ){ 

                            // Detects when someone slides down on the menu
                            if(realPosition > (Dimensions.get("window").height - 150)){
                                
                                // Deselects current marker when menu is swiped down
                                this.slideDown(this.props.deselectMarker); 

                            }
                            else{
                                
                                // Resets to regular position when neither slide up or down is detected
                                this.slideUp();
                            }
                        }
                            
                    }}
                >
                    <View
                        style = {{
                            backgroundColor: (this.props.selectedMarker) ? "green" : "red",
                            width: "100%",
                            height: 60
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

const mapDispatchToProps = dispatch => {
    return {
        deselectMarker: () => {
            dispatch(selectMarker(null));
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(InfoPopup);