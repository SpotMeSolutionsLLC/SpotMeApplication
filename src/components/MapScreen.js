import React, { Component } from 'react';
import {
    Dimensions,
    StyleSheet,
    View,
    Text,
    TouchableHighlight,
    Image,
    Platform,
    SafeAreaView,
} from 'react-native';
import { connect } from 'react-redux';
import {
    locationChanged,
    getCurrentLocation,
    getInputData,
    getAddressPredictions,
    getSelectedAddress,
    fetchSanJoseAPI
} from '../actions';

import MapContainer from "./MapContainer";
import DataTable from "./DataTable";
import GarList from "./GarList";
import SearchBar from "./SearchBar";

import styles from "./Styling.style.js";


class MapScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            garageList: null,
            garageListLoaded: false,
            mapRef: null
        }
    }


    render() {

        return (
            <SafeAreaView style={[styles.mapScreen.outerContainer, styles.safeAreaViewAndroid]}>

                <View style={styles.mapScreen.container}>


                    <MapContainer
                        ref={instance => {
                            if(this.state.mapRef == null){
                                this.setState({
                                    mapRef: instance
                                });
                            }
                        }}
                    />


                    

                    <TouchableHighlight
                        style={styles.mapScreen.menuButton}
                        onPress={() => this.props.navigation.openDrawer()}
                        underlayColor={'white'}
                    >
                        <Image source={require('../images/menu.png')}
                        style={{
                            height: 30,
                            width: 30,
                            opacity: .5
                        }}/>

                    </TouchableHighlight>

                    {this.state.mapRef != null &&
                        <SearchBar
                            mainMap={this.state.mapRef}
                        />
                    }

                    <GarList></GarList>
                </View>

            </SafeAreaView>
        );
    }
}


export default MapScreen;
