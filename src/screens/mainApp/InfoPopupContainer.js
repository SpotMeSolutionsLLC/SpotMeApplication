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
} from "react-native-gesture-handler";

// Other modules
import {
    connect
} from "react-redux"

// Local modules
import InfoPopupData from "./InfoPopupData";
import {
    getColor
} from "SpotmeDetached/src/helpers"
import {
    selectMarker
} from "SpotmeDetached/src/redux/actions/MapActions";

let CONFIG = {
    GESTURE_AREA_HEIGHT: 40,
    DATA_CONTAINER_HEIGHT: 150,
    DRAG_UP_MAX_HEIGHT: 0,
    GAP_BOTTOM_HEIGHT: 5,
}

CONFIG.ENTIRE_AREA_HEIGHT = CONFIG.GESTURE_AREA_HEIGHT + CONFIG.DATA_CONTAINER_HEIGHT;


class InfoPopupContainer extends React.Component {
    constructor(props) {
        super(props);
        this.animations = {
            popupTranslationY: new Animated.Value(Dimensions.get("window").height)
        }
        this.state = { // Local state currentMarker used so menu changes ONLY when it's off screen
            currentMarker: this.props.selectedMarker
        }
    }

    slideUp = (callback) => { // Animates menu up, with callback executing after animation ends
        Animated.timing(this.animations.popupTranslationY, {
            // This must be done to ensure the menu slides up to the correct position
            toValue: Dimensions.get("window").height - CONFIG.ENTIRE_AREA_HEIGHT - CONFIG.GAP_BOTTOM_HEIGHT, 
            useNativeDriver: true,
            duration: 250
        }).start(callback);
    }

    slideDown = (callback) => { // Animates menu down, with callback executing after animation ends
        Animated.timing(this.animations.popupTranslationY, {
            toValue: Dimensions.get("window").height,
            useNativeDriver: true,
            duration: 250
        }).start(callback);
    }
    

    componentWillReceiveProps = (newProps) => {
        if (newProps.selectedMarker == null) { // Corresponds to action "deselectMarker"
            this.slideDown(() => { // If global state selectedMarker is null, slides menu down and sets local state to null afterwards
                this.setState({
                    currentMarker: null
                });
            });
        }
        else {
            this.setState({ // If global state is not null, update current display to correct data
                currentMarker: newProps.selectedMarker
            },this.slideUp);
        }
    }

    render() {
        return (
            <Animated.View // Wraps entire display. Covers entire screen, then translates it Down right underneath the screen
                style={{
                    width: Dimensions.get("window").width * .9,
                    height: CONFIG.ENTIRE_AREA_HEIGHT + CONFIG.DRAG_UP_MAX_HEIGHT, 

                    zIndex: 20,

                    borderRadius: 10,

                    overflow: "hidden",

                    backgroundColor: "white",

                    position: "absolute",
                    top: 0,
                    left: Dimensions.get("window").width * .05,
                    transform: [
                        {
                            translateY: this.animations.popupTranslationY
                        }
                    ],
                }}

            >
                <PanGestureHandler
                    onGestureEvent={({nativeEvent}) => {
                        // Gets position relative to the display, taking into consideration the statusbar and Gesture area height
                        let realPosition = nativeEvent.absoluteY - StatusBar.currentHeight - CONFIG.GESTURE_AREA_HEIGHT / 2;

                        // Doesn't allow the menu to be dragged up past a certain point
                        if( realPosition > Dimensions.get("window").height - CONFIG.ENTIRE_AREA_HEIGHT - CONFIG.DRAG_UP_MAX_HEIGHT)

                            this.animations.popupTranslationY.setValue(realPosition);
                    }}
                    onHandlerStateChange = {({nativeEvent}) => {
                        // Gets position relative to the display, taking into consideration the statusbar
                        let realPosition = nativeEvent.absoluteY - StatusBar.currentHeight - CONFIG.GESTURE_AREA_HEIGHT / 2;

                        // When you release tap
                        if(nativeEvent.state == State.END ){ 

                            // Detects when someone slides down on the menu, when the touch ends underneath the lower half of the entire display container
                            if(realPosition > (Dimensions.get("window").height - (CONFIG.ENTIRE_AREA_HEIGHT / 2))){
                                // Deselects current marker when menu is swiped down
                                this.props.deselectMarker(); 

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
                            backgroundColor: (this.state.currentMarker) ? getColor(this.state.currentMarker.current / this.state.currentMarker.max) : "red",
                            width: "100%",
                            height: CONFIG.GESTURE_AREA_HEIGHT
                        }}
                    />
                </PanGestureHandler>

                { this.state.currentMarker && // Renders InfoPopupData only if currentMarker exists
                    <InfoPopupData
                        name = {this.state.currentMarker.name}
                        max = {this.state.currentMarker.max}
                        current = {this.state.currentMarker.current}
                    />
                }
                
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


export default connect(mapStateToProps, mapDispatchToProps)(InfoPopupContainer);