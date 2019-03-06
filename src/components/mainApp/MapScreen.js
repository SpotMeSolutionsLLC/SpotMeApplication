import React, { Component } from 'react';
import {
    View,
    TouchableHighlight,
    Image,
    SafeAreaView,
    Dimensions,
    Platform,
    StyleSheet
} from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import MapContainer from './MapContainer';
import GarInfoContainer from './GarageInfoContainer';

const MapScreenStyles = StyleSheet.create({
    gestureZone: {
        position: 'absolute',
        backgroundColor: 'transparent',
        left: 0,
        width: 40,
        height: Dimensions.get('window').height
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    outerContainer: {
        flex: 1,
    },
    menuButton: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        left: 20,
        top: 30,
        zIndex: 99,
        width: '15%',
        height: 50
    },
    menuButtonImage: {
        height: 30,
        width: 30,
        opacity: .5
    }
})

//Overall map screen, used to display map onto application
class MapScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            garageList: null,
            garageListLoaded: false,
            mapRef: null
        }
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
                        <TouchableHighlight
                            style={MapScreenStyles.menuButton}
                            onPress={() => this.props.navigation.openDrawer()}
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