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
import {
  locationChanged,
  getCurrentLocation,
  getInputData,
  getAddressPredictions,
  getSelectedAddress,
  fetchSanJoseAPI
} from '../actions';

class MapScreen extends Component {
    //Need constructor to initialize state and regionChange,
    //otherwise will get type errors(not a function) 
    /*constructor() {
        super();
        this.state = {
            region: {
                latitude: 37.3382082,
                longitude: -121.8863286,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05
            },
        };
        this.onRegionChange = this.onRegionChange.bind(this);
    }*/

    componentWillMount() {
      this.props.getCurrentLocation();
    }

    /*onRegionChange(region) {
        this.setState({ region });
    }*/

    //renders the map view
    //renders markers in map view
    //hard coded markers for now (proof of concept)
    //will change to API called markers in future
    /*render() {
        return (

          <View style={styles.outerContainer}>
              <View style={styles.navigationBar}>
                <Text style={styles.companyText}>SpotMeSolutions</Text>
              </View>

              <View style={styles.container}>
                  <MapView
                      style={styles.map}
                      region={this.state.region}
                      onRegionChange={this.onRegionChange}
                  > 

                  <SearchBox 
                    getInputData={this.props.getInputData}
                    getAddressPredictions={this.props.getAddressPredictions}
                    inputData={this.props.inputData}
                  />

                  <MapView.Marker
                      coordinate={{
                          latitude: 37.339222,
                          longitude: -121.880724,
                      }}
                      //Can later pull title and description from API when implemented
                      title={'SJSU North Parking Garage'}
                      description={'The best parking garage! Sample: Spots Filled: 977/1490'}
                  />
                  <MapView.Marker
                      coordinate={{
                          latitude: 37.332303,
                          longitude: -121.882986,
                      }}
                      //Can later pull title and description from API when implemented
                      title={'SJSU West Parking Garage'}
                      description={'Spots Filled: 827/1135'}
                  />
                  <MapView.Marker
                      coordinate={{
                          latitude: 37.333088,
                          longitude: -121.880797,
                      }}
                      //Can later pull title and description from API when implemented
                      title={'SJSU South Parking Garage'}
                      description={'Spots Filled: 1377/1500'}
                  />
                  </MapView>
              </View>
          </View>
        );
    }*/

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
                customMapStyle={DarkMapStyles}
              >
                  <MapView.Marker 
                  coordinate={this.props.currentLocation}
                  title={this.props.sanjose.garageName}
                  description={this.props.sanjose.garageAvailable}
                  />
                  <MapView.Marker
                        coordinate={{ latitude: 37.339222, longitude: -121.880724, }}
                        //Can later pull coord, title, descrip from API when implemented
                        title={'SJSU North Parking Garage'}
                        description={'The best parking garage! Sample: Spots Filled: 977/1490'}
                  />
                  <MapView.Marker
                      coordinate={{ latitude: 37.332303, longitude: -121.882986, }}
                      title={'SJSU West Parking Garage'}
                      description={'Spots Filled: 827/1135'}
                  />
                  <MapView.Marker
                      coordinate={{ latitude: 37.333088, longitude: -121.880797, }}
                      title={'SJSU South Parking Garage'}
                      description={'Spots Filled: 1377/1500'}
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
    fetchSanJoseAPI
  };

//export default MapScreen;
export default connect(mapStateToProps, mapActionCreators)(MapScreen);
