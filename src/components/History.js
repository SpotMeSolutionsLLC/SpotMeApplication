// import React, { Component } from 'react';
// import { Text, View, Image, Button } from 'react-native';

// import styles from "./Styling.style.js";

// class History extends Component {
//   render() {
//   return (
//     <View style={styles.history.containerStyle}>
//     <View style={styles.history.imageStyle}>
//     <Button
//     onPress={() => this.props.navigation.openDrawer()}
//     title='back'
//     />
//     <Text style={styles.history.headerText}>Recently Searched </Text>

//       <Image
//         source={require('../images/icon.jpg')}
//       />
//     </View>

//       <View style={styles.history.garageNameStyle}>
//         <View style={styles.history.detailStyleLeftColumn}>
//           <Text style={styles.history.subHeaderText}>Name</Text>
//         </View>

//         <View style={styles.history.detailStyleRightColumn}>
//           <Text style={styles.history.subHeaderText}>Slots</Text>
//         </View>
       
//         <View style={styles.history.detailStyleRightColumn}>
//           <Text style={styles.history.subHeaderText}>Price</Text>
//         </View>
//       </View>

//       <View style={styles.history.garageNameStyle}>
//         <View style={styles.history.detailStyleLeftColumn}>
//           <Text style={styles.history.detailText}>Santa Clara</Text>
//         </View>
//         <View style={styles.history.detailStyleRightColumn}>
//           <Text style={styles.history.detailText}>120/250</Text>
//         </View>
      
//       <View style={styles.history.detailStyleRightColumn}>
//       <Text style={styles.history.detailText}>$8/hr</Text>
//     </View>
//       </View>

//       <View style={styles.history.garageNameStyle}>
//         <View style={styles.history.detailStyleLeftColumn}>
//           <Text style={styles.history.detailText}>San Jose</Text>
//         </View>
//         <View style={styles.history.detailStyleRightColumn}>
//           <Text style={styles.history.detailText}>100/200</Text>
//         </View>
      
//       <View style={styles.history.detailStyleRightColumn}>
//       <Text style={styles.history.detailText}>$10/hr</Text>
//     </View>
//       </View>

//       <View style={styles.history.garageNameStyle}>
//         <View style={styles.history.detailStyleLeftColumn}>
//           <Text style={styles.history.detailText}>SF</Text>
//         </View>
//         <View style={styles.history.detailStyleRightColumn}>
//           <Text style={styles.history.detailText}>220/350</Text>
//         </View>
      
//       <View style={styles.history.detailStyleRightColumn}>
//       <Text style={styles.history.detailText}>$15/hr</Text>
//     </View>
//       </View>
//     </View>

//   );
// }
// }

// export default History;

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';
import { showLocation, Popup } from 'react-native-map-link';


const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class History extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
         <View>
        <Button 
        onPress={() => {
            showLocation({
              latitude: 37.339169,
              longitude: -121.880684,
              //sourceLatitude: -8.0870631,  // optionally specify starting location for directions
              //sourceLongitude: -34.8941619,  // not optional if sourceLatitude is specified
              title: 'SJSU North Garage',  // optional
              //googleForceLatLon: false,  // optionally force GoogleMaps to use the latlon for the query instead of the title
              googlePlaceId: 'ChIJGVtI4by3t4kRr51d_Qm_x58',  // optionally specify the google-place-id
              dialogTitle: 'Opening in Maps', // optional (default: 'Open in Maps')
              dialogMessage: 'This is the amazing dialog Message', // optional (default: 'What app would you like to use?')
              cancelText: 'This is the cancel button text', // optional (default: 'Cancel')
              appsWhiteList: ['apple-maps', 'google-maps', 'citymapper', 'uber', 'lyft', 'waze'], // optionally you can set which apps to show (default: will show all supported apps installed on device)
              app: 'google-maps'  // optionally specify specific app to use
          });
        }}
        title="Start Navigation"
        color="green"
        />

      </View>

      </View>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
