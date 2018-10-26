/*import React, { Component } from 'react';
import {
  Text,
  Image,
  Button,
  TouchableHighlight,
  TextInput,
  TouchableOpacity
} from 'react-native';
// NOTE: need to be enabled in google api for map
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; 


import { connect } from 'react-redux';
import {
  locationChanged,
  getCurrentLocation,
  getInputData,
  getAddressPredictions,
  getSelectedAddress,
  fetchSanJoseAPI
} from '../actions';

import { Actions } from 'react-native-router-flux';
import SearchResults from './SearchResults';
import SearchBox from './SearchBox';
import { View } from 'native-base';
import { StyleSheet } from 'react-native';

class MapScreen extends Component {
  
  componentWillMount() {
    this.props.getCurrentLocation(); //***** Bugs message: Unable to fetch location within 5.0s. 
  }
 
  render() {
    return (
      <View style={styles.outerContainer}>
      <View style={styles.navigationBar}>
          <TouchableHighlight
            onPress={() => this.props.navigation.openDrawer()}
            underlayColor={'white'}
          >
            <Image source={require('../images/menu.png')} />
          </TouchableHighlight>

          <Text style={styles.companyText}>SPOT ME</Text>

          <Image source={require('../images/icon.jpg')} />
        </View>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }} 
        />
        <SearchBox
            getInputData={this.props.getInputData}
            getAddressPredictions={this.props.getAddressPredictions}
            inputData={this.props.inputData}
          />
      </View>
    );
  }

 /*
  render() {
    return (
      <View style={styles.outerContainer}>
        <View style={styles.navigationBar}>
          <TouchableHighlight
            onPress={() => this.props.navigation.openDrawer()}
            underlayColor={'white'}
          >
            <Image source={require('../images/menu.png')} />
          </TouchableHighlight>

          <Text style={styles.companyText}>SPOT ME</Text>

          <Image source={require('../images/icon.jpg')} />
        </View>

        <View style={styles.container}>
          {this.props.currentLocation.latitude && (
            <MapView
              provider={PROVIDER_GOOGLE}
              style={styles.map}
              region={this.props.currentLocation}
            >
              <MapView.Marker 
              coordinate={this.props.currentLocation}
              title =  {this.props.sanjose.garageName}
              description = {this.props.sanjose.garageAvailable}
              />
            </MapView>
          )}

          <SearchBox
            getInputData={this.props.getInputData}
            getAddressPredictions={this.props.getAddressPredictions}
            inputData={this.props.inputData}
          />
          
        </View>
      </View>
    );
  }
}*/

import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableHighlight, Image } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { connect } from 'react-redux';
import SearchBox from './SearchBox';
import DarkMapStyles from '../mapstyles/DarkMapStyles';
import MidnightCommander from '../mapstyles/MidnightCommander';
import {
  locationChanged,
  getCurrentLocation,
  getInputData,
  getAddressPredictions,
  getSelectedAddress,
  fetchSanJoseAPI
} from '../actions';

import garageMarker from '../images/garage.png';
import carMarker from '../images/car.png';

class MapScreen extends Component {
    componentWillMount() {
      this.props.getCurrentLocation();
    }

    render() {
      return (
        <View style={styles.outerContainer}>
          <View style={styles.navigationBar}>
            
            <TouchableHighlight
              onPress={() => this.props.navigation.openDrawer()}
              underlayColor={'white'}
            >
              
              <Image source={require('../images/menu.png')} />
            
            </TouchableHighlight>
  
            <Text style={styles.companyText}>SpotMeSolutions</Text>
  
            <Image source={require('../images/icon.jpg')} />
          </View>
  
          <View style={styles.container}>
            {this.props.currentLocation.latitude && (
              <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                region={this.props.currentLocation}
                customMapStyle={MidnightCommander}
                //customMapStyle={DarkMapStyles}
              >
                  <MapView.Marker 
                  coordinate={this.props.currentLocation}
                  //title={this.props.sanjose.garageName}
                  description={'Current location'}
                  image={carMarker}
                  //description={this.props.sanjose.garageAvailable}
                  />
                  <MapView.Marker
                        coordinate={{ latitude: 37.339222, longitude: -121.880724, }}
                        //Can later pull coord, title, descrip from API when implemented
                        title={'SJSU North Parking Garage'}
                        description={'Spots Filled: 977/1490'}
                        image={garageMarker}
                  />
                  <MapView.Marker
                      coordinate={{ latitude: 37.332303, longitude: -121.882986, }}
                      title={'SJSU West Parking Garage'}
                      description={'Spots Filled: 827/1135'}
                      image={garageMarker}
                  />
                  <MapView.Marker
                      coordinate={{ latitude: 37.333088, longitude: -121.880797, }}
                      title={'SJSU South Parking Garage'}
                      description={'Spots Filled: 1377/1500'}
                      image={garageMarker}
                  />
              </MapView>
            )}

            <SearchBox
              getInputData={this.props.getInputData}
              getAddressPredictions={this.props.getAddressPredictions}
              inputData={this.props.inputData}
            />
            
          </View>
        </View>
      );
    }
}

  const styles = {
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    map: {
      ...StyleSheet.absoluteFillObject
    },
    outerContainer: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center'
    },
    companyText: {
      fontSize: 30,
      color: '#42b8ba',
      fontWeight: '900',
      alignItems: 'center',
      width: 380,
      textAlign: 'center'
    },
    navigationBar: {
      marginTop: 20,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    mapAndSearchBarContainer: {
      alignItems: 'center',
  
      height: '90%',
      width: '100%'
    },
    mapContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    },
    inputContainer: {
      //height: 40,
      elevation: 1,
      backgroundColor: 'white',
      width: '90%',
      height: '10%',
      top: 40,
      borderRadius: 3,
      shadowOpacity: 0.75,
      shadowRadius: 1,
      shadowColor: 'gray',
      shadowOffset: { height: 0, width: 0 },
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    },
    inputStyle: {
      color: '#000',
      padding: 10,
      height: 50,
      fontSize: 18,
      lineHeight: 23,
      flex: 2
    },
    locationRadiusMarker: {
      height: 50,
      width: 50,
      borderRadius: 50 / 2,
      overflow: 'hidden',
      backgroundColor: 'rgba(0, 112, 255, 0.3)',
      borderWidth: 1,
      borderColor: 'rgba(0, 122, 255, 0.3',
      alignItems: 'center',
      justifyContent: 'center'
    },
    locationMarker: {
      height: 20,
      width: 20,
      borderWidth: 3,
      borderColor: 'white',
      borderRadius: 20 / 2,
      overflow: 'hidden',
      backgroundColor: '#007AFF'
    }
  };

  const mapStateToProps = ({ loc }) => {
    const {
      location,
      currentLocation,
      inputData,
      predictions,
      sanjose
    } = loc;
    return { location, currentLocation, inputData, predictions, sanjose };
  };
  const mapActionCreators = {
    locationChanged,
    getCurrentLocation,
    getInputData,
    getAddressPredictions,
    getSelectedAddress,
    fetchSanJoseAPI,
  };

//export default MapScreen;
export default connect(mapStateToProps, mapActionCreators)(MapScreen);
