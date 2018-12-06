//import _ from 'lodash';
import React, { Component } from 'react';
import { StyleSheet, View, Text, AsyncStorage, ActivityIndicator } from 'react-native';
import { createBottomTabNavigator, createSwitchNavigator, createStackNavigator } from 'react-navigation';

//import { AppLoading } from 'expo';
//import Slides from '../components/Slides';


class AuthLoadingScreen extends Component {
  constructor() {
    super()
    this.loadApp()
  }

  loadApp = async() => {
    const userToken = await AsyncStorage.getItem('fb_token'); //This checks if the user previously logged in, if so it skips the authentication screen
    this.props.navigation.navigate(userToken ? 'App': 'Welcome');
  }

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default AuthLoadingScreen;
