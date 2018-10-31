import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableHighlight, Image } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { connect } from 'react-redux';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import SearchBox from './SearchBox';
//import DarkMapStyles from '../mapstyles/DarkMapStyles';
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
//import carMarker from '../images/car_icon.png';
import carMarker from '../images/car.png';


class MapScreen extends Component {
    constructor(props) {
      super(props);
      
      this.state = {
        lat: this.currentLocation.lat,
        long: this.currentLocation.long
      };
    }

    componentWillMount() {
      this.props.getCurrentLocation();
    }

    componentDidMount() {
      console.log(this.state);
    }

    render() {
      const currentInstance = this;
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
                region={{
                  latitude: currentInstance.state.lat,
                  longitude: currentInstance.state.long,
                  latitudeDelta: 0.0112,
                  longitudeDelta: 0.01412
                }}
                customMapStyle={MidnightCommander}
                //customMapStyle={DarkMapStyles}
              > 

                  <MapView.Marker 
                  coordinate={{ latitude: currentInstance.state.lat, longitude: currentInstance.state.long }}
                  description={currentInstance.state.description}
                  //image={carMarker}
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

              <GooglePlacesAutocomplete
                placeholder='Search a location or garage!' 
                minLength={2} //Minimum length of text entered for autocomplete results
                autoFocus={false}
                listViewDisplayed='false'
                returnKeyType={'default'}
                fetchDetails
                renderDescription={row => row.description}
                onPress={(data, details = null) => {
                  console.log(data, details);
                  //console.log(details.address_components);
                  //console.log(details.geometry.location);
                  //console.log(details.geometry.location.lat);
                  //console.log(details.geometry.location.lng);
                  //console.log(data.description);
                  //console.log('Reached');
              
                  currentInstance.setState({
                    //Latitude and Longitude
                    lat: details.geometry.location.lat,
                    long: details.geometry.location.lng,
                    //Title
                    description: data.description
                  });

                  // console.log("Lat" + currentInstance.state.lat);

                  return details;
                }}
                getDefaultValue={() => ''}
                query={{ key: 'AIzaSyAknyin7pzbkZ89IRg6QeQ0gC2sVjSKRpY' }}
                styles={{
                  textInputContainer: {
                    width: '100%',
                    backgroundColor: '#42b8ba'
                    //backgroundColor: 'transparent'
                  },
                  listView: {
                    backgroundColor: 'white',
                    //backgroundColor: 'transparent',
                    height: '100%'
                  },
                  description: {
                    fontWeight: 'bold',
                    fontSize: 18,
                    //color: 'white'
                  },
                }}
              />

              </MapView>
            )}
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
