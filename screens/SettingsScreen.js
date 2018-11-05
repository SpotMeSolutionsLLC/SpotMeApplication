//import _ from 'lodash';
import React, { Component } from 'react';
import { View, Text, Button, AsyncStorage } from 'react-native';
//import { AppLoading } from 'expo';
//import Slides from '../components/Slides';

class SettingsScreen extends Component {

  signOut = async () => {
    AsyncStorage.clear()
    this.props.navigation.navigate('AuthLoadingScreen')
  }
  render() {
    return (
			<View>
				<Button title="Sign Out" onPress={this.signOut} />
			</View>
    );
  }
}

export default SettingsScreen;