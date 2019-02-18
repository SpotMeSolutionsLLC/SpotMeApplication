import React, { Component } from 'react';
import {
    Dimensions,
    View,
    TouchableHighlight,
    Image,
    SafeAreaView,
    BackHandler,
} from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import MapContainer from './MapContainer';
import GarInfoContainer from './GarageInfoContainer';
import GoogleSearchResults from './GoogleSearchResults';
import { MapScreenStyles } from './Styling.style.js';
import PubSub from 'pubsub-js';

//Overall map screen, used to display map onto application
class MapScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            garageList: null,
            garageListLoaded: false,
            mapRef: null
        }
        BackHandler.addEventListener("hardwareBackPress", () => {
            PubSub.publish("slideDown");
            PubSub.publish("onBlur");
            return true;
        });
    }

    //Displays navigation menu to open when user swipes right
    onSwipeRight = (state) => {
        if(state.x0 < 40){
            this.props.navigation.openDrawer();
        }
    }


    //Renders the map, markers, garage info, etc.
    //Styles to make sure the map isnt messed up
    render() {
        return (
            <SafeAreaView style={MapScreenStyles.outerContainer}>
                <GestureRecognizer
                    style = {{
                        flex: 1
                    }}
                    onSwipeRight = {this.onSwipeRight}
                >
                    <View style={MapScreenStyles.container}>
                        <MapContainer
                            ref={instance => {
                                if (this.state.mapRef == null) {
                                    this.setState({
                                        mapRef: instance
                                    });
                                }
                            }}
                        />
                        <View //Gesture Recognizer Zone
                            style = {MapScreenStyles.gestureZone}
                        >
                        </View>
                        <GoogleSearchResults />
                        <TouchableHighlight
                            style={MapScreenStyles.menuButton}
                            onPress={() => this.props.navigation.openDrawer()}
                            underlayColor={'white'}
                        >
                            <Image source={require('./images/menu.png')}
                                style={MapScreenStyles.menuButtonImage} />

                        </TouchableHighlight>
                        <GarInfoContainer/>
                    </View>
                </GestureRecognizer>
            </SafeAreaView>
        );
    }
}


export default MapScreen;
